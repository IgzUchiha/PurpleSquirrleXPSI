# Quick Start Guide

## What You Built
A React Native streaming app that connects to your Plex server.

## Running the App

### Backend (Already Running)
```bash
cd backend
npm start
# Running on http://localhost:3001
```

### iOS Simulator (Fastest - No Signing Required)
```bash
npx react-native run-ios --simulator="iPhone 16 Pro"
```

### Physical iPhone (Requires Apple Developer Account)
1. Open `ios/StreamingApp.xcworkspace` in Xcode
2. Select StreamingApp target → Signing & Capabilities
3. Enable "Automatically manage signing"
4. Select your Team
5. Run: `npx react-native run-ios`

## First Build
- Takes 5-10 minutes (compiling native code)
- Subsequent builds: 30 seconds - 2 minutes
- Just let it run, grab coffee ☕

## Troubleshooting

**Metro bundler not starting?**
```bash
npx react-native start
```

**Clear cache:**
```bash
npx react-native start --reset-cache
```

**Clean build:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

## Next Steps
- Add more content to your Plex server
- Customize the UI colors/layout
- Add search functionality
- Integrate xTeve for live TV
