# YouTube Search App

A YouTube search application that allows users to search for videos and play them directly in the browser. Built with Netlify serverless functions.

## Features

- Search YouTube videos
- View recommended videos
- Play videos directly in the browser
- Responsive design
- Modern UI

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install yt-dlp:
   ```bash
   # On Windows (using chocolatey)
   choco install yt-dlp

   # On macOS (using homebrew)
   brew install yt-dlp

   # On Linux
   sudo apt install yt-dlp
   ```

## Local Development

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Start the development server:
   ```bash
   netlify dev
   ```

3. Open http://localhost:8888 in your browser

## Deployment

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `npm install`
   - Publish directory: `public`
   - Functions directory: `netlify/functions`

4. Deploy!

## Environment Variables

No environment variables are required for this project.

## License

MIT 