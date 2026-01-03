# Streaming App

React Native app that streams content from your Plex server.

## Setup

### 1. Get Plex Token
1. Open http://localhost:32400/web
2. Play any video
3. Click the info icon (i)
4. Click "View XML"
5. Copy the `X-Plex-Token` from the URL

### 2. Configure Backend
```bash
cd backend
npm install
echo "PLEX_TOKEN=your_token_here" > .env
npm start
```

### 3. Run Mobile App

**iOS:**
```bash
cd ios
pod install
cd ..
npx react-native run-ios
```

**Android:**
```bash
npx react-native run-android
```

## Features
- Browse Plex library content
- Grid view of movies/TV shows
- Video player with controls
- Direct streaming from Plex

## Architecture
- **Frontend**: React Native with navigation
- **Backend**: Express API proxy for Plex
- **Video**: react-native-video for playback
- **Source**: Your local Plex server

## Next Steps
- Add search functionality
- Implement user authentication
- Add TV show episode selection
- Support for live TV (xTeve integration)
- Add to watchlist feature
