# How to Start Your React Native App

## Quick Start (3 Steps)

### 1. Start Metro Bundler
```bash
cd StreamingApp
npx react-native start
```
Leave this running in the terminal.

### 2. Start Backend API (New Terminal)
```bash
cd StreamingApp/backend
npm start
```
Leave this running too.

### 3. Run the App (New Terminal)

**For iOS Simulator:**
```bash
cd StreamingApp
npx react-native run-ios --simulator="iPhone 16 Pro"
```

**For Physical iPhone:**
```bash
cd StreamingApp
npx react-native run-ios
```

**For Android:**
```bash
cd StreamingApp
npx react-native run-android
```

## Already Running?

If Metro is already running, just reload:
- **iOS Simulator:** Press `Cmd + R`
- **Physical Device:** Shake device → Tap "Reload"
- **Metro Terminal:** Press `r`

## Troubleshooting

**Metro not starting?**
```bash
cd StreamingApp
npx react-native start --reset-cache
```

**Build errors?**
```bash
cd StreamingApp/ios
rm -rf Pods Podfile.lock
pod install
cd ..
npx react-native run-ios
```

**Backend not running?**
```bash
cd StreamingApp/backend
npm start
```

## What's Running Now

Check your running processes:
- Metro Bundler: http://localhost:8081
- Backend API: http://localhost:3001
- Plex Server: http://localhost:32400
- xTeve: http://localhost:34400

## Current Status

Your app has:
✅ Netflix-style UI with hero banner
✅ Horizontal scrolling rows
✅ Dynamic thumbnail resizing
✅ Working video playback (HLS streams)
✅ Backend API connected
✅ Plex server integration ready

Just run the commands above and you're good to go!
