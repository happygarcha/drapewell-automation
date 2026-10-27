#!/usr/bin/env python3
"""Fetch a CJ supplier product video that is free or already purchased.

Usage: CJ_ACCESS_TOKEN=... python3 scripts/cj_fetch_video.py <CJ_PRODUCT_ID> <OUT_DIR>

Calls POST /api2.0/v1/product/queryVideosByProductId (CJ API 2.0, section 6.1),
prints videoUrl host/videoState/isFree/isBuy for each result (never the token),
and downloads the first video that is ON_STATE and (isFree == "1" or isBuy is true)
with the documented Referer header. Never buys anything.
"""
import json
import os
import sys
import urllib.parse
import urllib.request

AUTH = "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken"
API = "https://developers.cjdropshipping.com/api2.0/v1/product/queryVideosByProductId"
REFERER = "https://developers.cjdropshipping.com/"


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    pid, out_dir = sys.argv[1], sys.argv[2]
    api_key = os.environ.get("CJ_ACCESS_TOKEN")
    if not api_key:
        sys.exit("CJ_ACCESS_TOKEN is not set in this session")
    # CJ_ACCESS_TOKEN holds the API key; exchange it for a session token (kept in memory only).
    auth = urllib.request.Request(
        AUTH,
        data=json.dumps({"apiKey": api_key}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(auth, timeout=30) as r:
        token = (json.load(r).get("data") or {}).get("accessToken")
    if not token:
        sys.exit("CJ token exchange returned no access token")
    req = urllib.request.Request(
        API,
        data=json.dumps({"productId": pid}).encode(),
        headers={"CJ-Access-Token": token, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        body = json.load(r)
    print({k: body.get(k) for k in ("code", "result", "message", "success")})
    videos = body.get("data") or []
    if not videos:
        sys.exit("No videos returned for this CJ product ID")
    chosen = None
    for v in videos:
        host = urllib.parse.urlparse(v.get("videoUrl") or "").netloc
        print({"host": host, "videoState": v.get("videoState"), "isFree": v.get("isFree"), "isBuy": v.get("isBuy")})
        if chosen is None and v.get("videoState") == "ON_STATE" and (str(v.get("isFree")) == "1" or v.get("isBuy") is True):
            chosen = v
    if chosen is None:
        sys.exit("Videos exist but none is listed AND (free or already purchased); nothing downloaded")
    os.makedirs(out_dir, exist_ok=True)
    url = chosen["videoUrl"]
    name = os.path.basename(urllib.parse.urlparse(url).path) or "video.mp4"
    dest = os.path.join(out_dir, name)
    dl = urllib.request.Request(url, headers={"Referer": REFERER})
    with urllib.request.urlopen(dl, timeout=120) as r, open(dest, "wb") as f:
        while chunk := r.read(1 << 20):
            f.write(chunk)
    print("saved", dest, os.path.getsize(dest), "bytes")


if __name__ == "__main__":
    main()
