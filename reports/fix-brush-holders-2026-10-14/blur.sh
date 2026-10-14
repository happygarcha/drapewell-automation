#!/bin/bash
# usage: blur.sh in out W H sigma "x0,y0,x1,y1" ... (coords in px of the image)
in=$1; out=$2; W=$3; H=$4; S=$5; shift 5
args=()
cp "$in" "$out.tmp.png" 2>/dev/null; convert "$in" "$out.tmp.png"
for b in "$@"; do
 IFS=, read x0 y0 x1 y1 <<<"$b"
 convert "$out.tmp.png" \( +clone -blur 0x$S \) \( -size ${W}x${H} xc:black -fill white -draw "roundrectangle $x0,$y0 $x1,$y1 18,18" -blur 0x${FEATHER:-10} \) -composite "$out.tmp.png"
done
convert "$out.tmp.png" -quality 92 "$out"; rm "$out.tmp.png"
