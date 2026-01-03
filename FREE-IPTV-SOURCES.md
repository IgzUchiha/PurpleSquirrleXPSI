# Free IPTV Sources for Testing

## Setup xTeve

1. **Open xTeve Web Interface**
   - Go to: http://localhost:34400/web/

2. **Add M3U Playlist**
   - Click "Playlist" in the left menu
   - Click "New" or "+"
   - Choose "M3U" as type
   - Add one of these free sources:

## Free IPTV M3U Sources

### Option 1: IPTV-Org (Best for testing)
```
https://iptv-org.github.io/iptv/index.m3u
```
- 8000+ channels worldwide
- News, sports, entertainment
- Most reliable for testing

### Option 2: Free-TV (US/UK focused)
```
https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8
```
- US and UK channels
- News and entertainment

### Option 3: Pluto TV (Legal, high quality)
```
https://i.mjh.nz/PlutoTV/all.m3u8
```
- Official Pluto TV channels
- High quality streams
- Legal content

## Configuration Steps

1. **Add Playlist in xTeve:**
   - Name: "Free IPTV"
   - Type: M3U
   - URL: (paste one from above)
   - Click "Save"

2. **Update Channels:**
   - Click "Update" to fetch channels
   - Wait for it to load

3. **Map Channels:**
   - Go to "Mapping" tab
   - Select channels you want
   - Assign channel numbers
   - Click "Save"

4. **Reload App:**
   - Go back to your React Native app
   - Pull to refresh or restart
   - Channels should appear!

## Testing in React Native App

Once configured:
- Open the app
- You'll see channel grid with numbers
- Tap any channel to start streaming
- Netflix-style interface!

## Troubleshooting

**No channels showing?**
- Make sure xTeve updated successfully
- Check http://localhost:34400/lineup.json
- Should show array of channels

**Streams not playing?**
- Some free streams may be offline
- Try different channels
- Check stream URL is accessible

## Next Steps

- Add EPG (Electronic Program Guide) for channel info
- Filter channels by category
- Add channel logos
- Create favorites list
