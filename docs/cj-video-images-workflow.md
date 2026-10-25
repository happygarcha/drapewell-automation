# CJ Product Video + Images to Shopify: Standard Workflow

Permanent workflow. Applies to every CJ product that gets pictures or a video on a Shopify product.
Last updated 2026-10-25.

## 1. Image gate (UNCHANGED)

The image rules are exactly what is already in force. Nothing in this section was changed on 2026-10-25.

From `CLAUDE.md`, Product publish gate, check 2: "every image is READY and has no visible logo or watermark (view the photos)".

From the Drapewell Dropshipping Playbook, Rules: "No other seller's logo, watermark or brand name on any photo, title or text." and Product pipeline: "Photos with a logo, watermark or Chinese text are removed or replaced."

Note (2026-10-25): no image blurring step is written down in `CLAUDE.md`, the Playbook or this repo. The image gate as it exists removes or replaces a marked photo; it does not blur one. If a separate image blur procedure exists somewhere else, it was not available to the assistant and has not been added or altered here.

Image gate result values for the report:

| Result | Meaning |
|---|---|
| PASSED | Every image viewed, no third-party mark found |
| FLAGGED | A mark was found; the image was removed or replaced under the rule above (name which image) |
| BLOCKED | Images could not be viewed or fetched; nothing attached |
| BLURRED | Reserved for images, only if the owner supplies the image blur procedure |

## 2. Video gate (added 2026-10-25)

### 2.1 Fetch (CJ product ID, never a video ID)

1. Use the CJ product ID (`pid`), for example `2FE133D4-DF2B-4E08-9083-F77BED472299`.
2. `POST https://developers.cjdropshipping.com/api2.0/v1/product/queryVideosByProductId` with body `{"productId": "<pid>"}` and header `CJ-Access-Token`.
3. If the stored value is a CJ API key (not a JWT), exchange it first with `POST /api2.0/v1/authentication/getAccessToken` and `{"apiKey": "<key>"}`. Keep tokens in memory only.
4. Use only a video with `videoState` = `ON_STATE` and (`isFree` = `"1"` or `isBuy` = true). Never buy a video.
5. Download `videoUrl` (host `download-only-api.cjdropshipping.com`) with the header `Referer: https://developers.cjdropshipping.com/`.
6. No active video: stop and report `NO VIDEO` ("No active video found for this CJ product.").
7. Never print, log or save the API key, tokens, email or password.

Helper: `scripts/cj_fetch_video.py <pid> <out_dir>` (needs `CJ_ACCESS_TOKEN` in the environment).

### 2.2 Look at the whole video

Make a contact sheet (about one frame every 1-2 s, full frame) and view it. Then view the corners and edges at finer spacing. Look for any third-party logo, trademark, watermark, brand name, competitor branding, other seller's text or other potentially copyrighted visual mark. Write down every mark with its start time, end time and box (x, y, width, height in source pixels).

### 2.3 Cover every mark (do not reject the video)

If a mark is found, do not reject the video automatically. Cover it with `scripts/video_mark_cover.py`:

- Modes: `blur` (strong blur), `pixel` (mosaic) or `solid` (opaque cover). The cover stays on for the entire time the mark is visible.
- A mark that moves, or a scene change, is described with keyframes (`track`). The tool interpolates the box every 0.1 s and covers the union of consecutive boxes, so the mark is not exposed between samples.
- Only the listed boxes change. The product itself, its colour, shape, size and other details are never covered.
- Duration, resolution and aspect ratio are kept. The tool fails and stops if size or duration change, or if the file is not an MP4.
- Nothing is added: no text, captions, branding or music.
- After encoding, the tool writes `<out>.check.png`, frames sampled across every covered span. Look at it. Then also look at frames just before and after every covered span and at every scene change. Any visible, readable mark means the cover failed.

### 2.4 Audio safety

- If the audio contains copyrighted music or other copyrighted audio, remove the audio track (`--mute-audio`). Do not add replacement music unless the owner provides an approved audio file.
- The assistant cannot listen to audio. It can only detect silence or measure levels. Default rule: unless the owner has said the audio is safe, or the track is confirmed silent, MUTE the audio and report `AUDIO MUTED`. Say plainly that the audio was muted because it could not be verified.

### 2.5 If a mark cannot be reliably covered

Stop before uploading. Report the timestamp(s) and the reason (for example: the mark is large and sits on the product, the box cannot be bounded, or covering it would hide product details). Ask whether to skip the video or whether the owner approves it manually. Do not guess.

### 2.6 Upload to Shopify (only after 2.3 and 2.4 are complete)

Upload only when all of these are true:
- The mark cover is complete and the check sheet was viewed.
- Risky audio was removed or muted.
- The processed file is a valid MP4 (`ffprobe`).
- Shopify's `stagedUploadsCreate` and `fileCreate` steps succeed.
- Shopify reports `fileStatus` READY.

Steps:
1. `stagedUploadsCreate` with `resource: VIDEO`, `mimeType: video/mp4`, `filename: cj-video-<pid>.mp4`, `fileSize` = exact bytes (string), `httpMethod: POST`.
2. Multipart POST of the file to the returned URL (all returned parameters first, the file last). Success is HTTP 204.
3. `fileCreate` with `originalSource` = the returned `resourceUrl`, `contentType: VIDEO`, descriptive `alt`.
4. Poll the file until `fileStatus` = READY. Do not attach while it is UPLOADED or PROCESSING.
5. `fileUpdate` with `referencesToAdd: [<product gid>]`. Never remove or replace existing images or media.
6. Verify: query `product.media`; the video is READY, attached to the right product, and all earlier images are still present.

## 3. Report format

- Image gate result: PASSED / BLURRED / FLAGGED / BLOCKED
- Video gate result: NO VIDEO / CLEAN / BLURRED / AUDIO MUTED / FLAGGED / BLOCKED
  - A video can be both BLURRED and AUDIO MUTED; list both.
- What was blurred or muted, with timestamps
- Final Shopify video status
- Confirmation that the existing Shopify images and media were preserved

## 4. Known limits

- Website playback (live since 2026-10-25, theme "Copy of Copy of Drapewell Discover", repo 8432a85): the product gallery lists `product.media`. A video gets a play-badged thumbnail after the photos that swaps the main photo for a Shopify video player (controls, no autoplay; photo thumbnails and colour changes swap back). Theme changes must keep the `data-video-pane` / `data-thumb-video` code in `theme/sections/product.liquid`, `theme/assets/theme.js` and `theme/assets/theme.css`. After attaching a video to a live product, load the live page and confirm it has the `data-video-pane` block and a `<video>` tag.
- Marks are found by looking at frames, not automatically. A mark that appears only briefly between sampled frames can be missed, so view finer frames around scene changes.
- A cover is visible as a blurred or pixelated patch. That is intended.
