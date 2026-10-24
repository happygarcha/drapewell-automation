# Setting up youtube-automation-agent on your computer

Source: https://github.com/darkzOGx/youtube-automation-agent (v2.11.0, MIT licence). This guide follows its README and `.env.example`. It is written for a Windows or Mac computer. Nothing here has been run by Claude; the first video is the real test.

The app runs only on your computer. It makes each video, then waits for you to review and approve it in a dashboard before anything is uploaded.

## What you need
- A computer that stays on while the app runs (the scheduler only runs while `npm start` is running).
- Node.js 18.17 or newer. Check with `node -v`. Download from https://nodejs.org if it is older or missing.
- Git, or use GitHub's "Download ZIP" button instead.
- A Google account that owns the YouTube channel.
- One text AI key. The free route is **Gemini**: https://aistudio.google.com/apikey

Keep your keys on your computer. Do not paste them into chat, a GitHub repo or a screenshot.

## Step 1. Get the code
```bash
git clone https://github.com/darkzOGx/youtube-automation-agent.git
cd youtube-automation-agent
npm install
npx playwright install chromium
```
`npm install` also downloads FFmpeg for you. The Playwright line is used to draw the slideshow video frames.

## Step 2. Create the YouTube login (one time, free)
1. Go to https://console.cloud.google.com/ and create a project (any name).
2. In **APIs & Services → Library**, turn on **YouTube Data API v3**. Turn on **YouTube Analytics API** as well if you want retention data.
3. Open **Google Auth Platform** (or "OAuth consent screen"). Set it up as an **External** app.
4. Under **Audience**, add the Google account that owns your channel as a **Test user**. If you skip this, sign-in fails with `Error 403: access_denied`.
5. Under **Clients**, create an OAuth client of type **Desktop app**. Do not choose "Web application".
6. Download the JSON file and save it inside the project as `config/credentials.json`.

From the README:
- While the app is in Testing mode, Google expires the sign-in after 7 days. You will need to sign in again about once a week until the app is published in Google Cloud.

Not from the README (general Google rule, check it yourself): uploads made through a new Google Cloud project that has not passed Google's API audit are usually forced to private. That is fine for testing, since the app defaults to `private` anyway, but videos may stay private until you either pass the audit or change the privacy setting by hand on YouTube.

## Step 3. Settings file
Copy the example file and edit the copy:
```bash
cp .env.example .env        # on Windows PowerShell: copy .env.example .env
```
Open `.env` and set at least:
```env
GEMINI_API_KEY=your-key-here
CHANNEL_NAME=Your Channel Name
DEFAULT_AUTHOR=Your Name
TARGET_AUDIENCE=who the videos are for
DEFAULT_PRIVACY_STATUS=private
VIDEO_PROVIDER=slideshow
```
- `DEFAULT_PRIVACY_STATUS=private` means every upload lands as a private video you can review on YouTube before making it public. Keep it private until you trust the output.
- `VIDEO_PROVIDER=slideshow` is the free local video mode. The AI video providers (Seedance, MiniMax, Kling and the like) cost money. Leave them off.
- You can instead run `npm run walkthrough`, which asks the questions, tests the keys and connects your YouTube channel for you.
- Keep `HOST` unset so the dashboard is only reachable from your own computer.

Optional, not needed to start: ElevenLabs or OpenAI keys for better narration. Without a working narration provider, a video cannot be approved.

## Step 4. Start it
```bash
npm run walkthrough      # first time: tests keys and signs in to YouTube
npm start
```
Open http://localhost:3456 in your browser.

1. Go to **Production readiness** and choose **Run verified check**. It makes small live text and narration requests, checks your channel access and builds a test MP4. It uploads nothing.
2. Open **Autonomous operator**, describe the channel (objective, audience, topics, how often, topics to avoid) and choose **Activate & run now**. Or create a single video from the dashboard first, which is the safer way to start.
3. Finished videos wait in **Pipeline**. Open one and check it before approving.

## Before you approve any video
- Watch the whole video and listen to the narration.
- Check every fact. The **Evidence desk** links each claim to a source.
- Confirm you have the rights to every image, clip and sound.
- For Drapewell product videos: no invented ratings, reviews, prices, health claims or delivery promises. Use only what is on the product page.
- The app can post comment replies, but only after you approve each one.

## Running it every day
`npm start` includes a scheduler that uses the computer's local time: daily content at 06:00, a publishing check every 15 minutes and analytics at 09:00. It only works while the program is running and the computer is awake.

## Running costs
- Gemini text: free tier available, with rate limits.
- Slideshow video: free.
- Narration, images and AI video: free tiers differ by provider; paid keys cost money. Set a cap with `VIDEO_MAX_GENERATED_SECONDS` if you ever use paid video.

## YouTube policy
YouTube can limit monetization on channels that post repetitive or mass-produced videos. Make each video genuinely useful, and disclose AI-made content where YouTube asks you to.

## If something goes wrong
- `Error 403: access_denied` at sign-in: add your account as a Test user (Step 2.4).
- Sign-in stops working after about a week: sign in again; this is Testing mode.
- A video cannot be approved: the dashboard shows why, usually missing narration or placeholder media.
- Check `npm test` and `npm run lint` if you change anything.
