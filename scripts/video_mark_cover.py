#!/usr/bin/env python3
"""Cover third-party marks in a product video and (optionally) mute the audio.

Usage:
  python3 scripts/video_mark_cover.py IN.mp4 OUT.mp4 SPEC.json [--mute-audio]

SPEC.json lists every place a mark appears. Boxes are in source pixels. A mark that
moves is described with a "track" of keyframes; boxes are interpolated linearly and
applied in 0.1 s steps so the cover follows the mark.

{
  "covers": [
    {"mode": "blur",   "t0": 29.0, "t1": 35.5, "x": 616, "y": 430, "w": 270, "h": 96},
    {"mode": "pixel",  "track": [
        {"t": 4.0, "x": 40, "y": 60, "w": 200, "h": 70},
        {"t": 6.0, "x": 300, "y": 80, "w": 200, "h": 70}]},
    {"mode": "solid",  "t0": 0, "t1": 2, "x": 10, "y": 10, "w": 100, "h": 40}
  ]
}

Modes: blur (strong box blur), pixel (large mosaic), solid (opaque cover).
Only the listed boxes change. Duration, resolution and aspect ratio are kept, nothing is
added (no text, captions, music or branding). Audio is copied unchanged unless
--mute-audio is given, in which case the audio track is removed.

After encoding the script verifies the output (valid MP4, same size, same duration within
0.15 s) and writes a contact sheet of frames across every covered span next to OUT.mp4
(OUT.check.png) so the result can be looked at before anything is uploaded.
"""
import json
import subprocess
import sys

STEP = 0.1  # seconds between interpolated keyframes for tracked marks
PAD = 6     # extra pixels around each box so edges of the mark are covered


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"ffmpeg/ffprobe failed ({r.returncode}): {r.stderr.strip()[-800:]}")
    return r.stdout


def probe(path):
    info = json.loads(run(["ffprobe", "-v", "error", "-show_entries",
                           "stream=codec_type,codec_name,width,height:format=duration,format_name",
                           "-of", "json", path]))
    v = next(s for s in info["streams"] if s["codec_type"] == "video")
    has_audio = any(s["codec_type"] == "audio" for s in info["streams"])
    return v["width"], v["height"], float(info["format"]["duration"]), has_audio, info["format"]["format_name"]


def segments(spec, w, h, duration):
    out = []
    for c in spec["covers"]:
        mode = c.get("mode", "blur")
        if "track" in c:
            k = sorted(c["track"], key=lambda p: p["t"])
            t = k[0]["t"]
            while t < k[-1]["t"] - 1e-9:
                i = max(j for j in range(len(k) - 1) if k[j]["t"] <= t + 1e-9)
                a, b = k[i], k[i + 1]
                f = (t - a["t"]) / (b["t"] - a["t"])
                box = {n: a[n] + (b[n] - a[n]) * f for n in ("x", "y", "w", "h")}
                # cover the whole step: union of this box and the next sample, so fast motion never exposes the mark
                t2 = min(t + STEP, k[-1]["t"])
                f2 = (t2 - a["t"]) / (b["t"] - a["t"]) if t2 <= b["t"] else 1.0
                nxt = {n: a[n] + (b[n] - a[n]) * min(f2, 1.0) for n in ("x", "y", "w", "h")}
                x0, y0 = min(box["x"], nxt["x"]), min(box["y"], nxt["y"])
                x1 = max(box["x"] + box["w"], nxt["x"] + nxt["w"])
                y1 = max(box["y"] + box["h"], nxt["y"] + nxt["h"])
                out.append((mode, t, t2, x0, y0, x1 - x0, y1 - y0))
                t = t2
        else:
            out.append((mode, c["t0"], c["t1"], c["x"], c["y"], c["w"], c["h"]))
    fixed = []
    for mode, t0, t1, x, y, bw, bh in out:
        x, y = max(0, int(x) - PAD), max(0, int(y) - PAD)
        bw, bh = int(bw) + 2 * PAD, int(bh) + 2 * PAD
        bw, bh = min(bw, w - x), min(bh, h - y)
        bw, bh = bw - bw % 2, bh - bh % 2
        if bw < 2 or bh < 2 or t1 <= t0 or t0 < 0 or t0 > duration:
            sys.exit(f"Bad cover box/time: {(mode, t0, t1, x, y, bw, bh)}")
        fixed.append((mode, t0, t1, x, y, bw, bh))
    return fixed


def build_filter(segs):
    parts, cur = [], "0:v"
    for i, (mode, t0, t1, x, y, bw, bh) in enumerate(segs):
        en = f"between(t,{t0:.3f},{t1:.3f})"
        nxt = f"v{i}"
        if mode == "solid":
            parts.append(f"[{cur}]drawbox=x={x}:y={y}:w={bw}:h={bh}:color=black@1:t=fill:enable='{en}'[{nxt}]")
        else:
            if mode == "pixel":
                pw, ph = max(2, bw // 12), max(2, bh // 12)
                eff = f"scale={pw}:{ph}:flags=neighbor,scale={bw}:{bh}:flags=neighbor"
            else:
                m = min(bw, bh)
                lr, cr = max(1, m // 2 - 1), max(1, m // 4 - 1)  # largest radii boxblur accepts
                eff = f"boxblur=luma_radius={lr}:luma_power=3:chroma_radius={cr}:chroma_power=3"
            parts.append(f"[{cur}]split[a{i}][b{i}];[b{i}]crop={bw}:{bh}:{x}:{y},{eff}[c{i}];"
                         f"[a{i}][c{i}]overlay={x}:{y}:enable='{en}'[{nxt}]")
        cur = nxt
    return ";".join(parts), cur


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    mute = "--mute-audio" in sys.argv
    if len(args) != 3:
        sys.exit(__doc__)
    src, dst, spec_path = args
    spec = json.load(open(spec_path))
    w, h, dur, has_audio, _ = probe(src)
    segs = segments(spec, w, h, dur)
    fc, last = build_filter(segs) if segs else ("", "0:v")
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", src]
    if fc:
        cmd += ["-filter_complex", fc, "-map", f"[{last}]"]
    else:
        cmd += ["-map", "0:v"]
    if has_audio and not mute:
        cmd += ["-map", "0:a", "-c:a", "copy"]
    cmd += ["-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
            "-movflags", "+faststart"] + (["-an"] if mute or not has_audio else []) + [dst]
    run(cmd)
    w2, h2, dur2, has_audio2, fmt = probe(dst)
    problems = []
    if (w2, h2) != (w, h):
        problems.append(f"size changed {w}x{h} -> {w2}x{h2}")
    if abs(dur2 - dur) > 0.15:
        problems.append(f"duration changed {dur:.2f}s -> {dur2:.2f}s")
    if "mp4" not in fmt:
        problems.append(f"container is {fmt}, not MP4")
    if mute and has_audio2:
        problems.append("audio still present after mute")
    # contact sheet across the covered spans for a visual check
    ts = sorted({round(t, 1) for _, t0, t1, *_ in segs for t in (t0, (t0 + t1) / 2, t1)})
    if len(ts) > 24:  # spread the 24 frames across every covered span, not just the earliest
        ts = [ts[round(i * (len(ts) - 1) / 23)] for i in range(24)]
    if ts:
        sel = "+".join(f"lt(abs(t-{t}),0.021)" for t in ts)
        run(["ffmpeg", "-v", "error", "-y", "-i", dst, "-vf", f"select='{sel}',scale=480:-1,tile=4x6",
             "-vsync", "0", "-frames:v", "1", dst.rsplit(".", 1)[0] + ".check.png"])
    print(json.dumps({"in": [w, h, round(dur, 2), has_audio], "out": [w2, h2, round(dur2, 2), has_audio2],
                      "covers": len(segs), "audio": "muted" if mute and has_audio else ("kept" if has_audio else "none"),
                      "problems": problems}))
    if problems:
        sys.exit("STOP: " + "; ".join(problems))


if __name__ == "__main__":
    main()
