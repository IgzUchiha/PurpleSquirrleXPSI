# Setup xTeve as HDHomeRun Emulator

Good news! xTeve has **built-in HDHomeRun emulation**. You don't need any additional containers - xTeve can pretend to be an HDHomeRun device that Plex can discover.

## Quick Setup

Your services are already running:
- **Plex**: http://localhost:32400/web
- **xTeve**: http://localhost:34400

## Step 1: Add IPTV Sources to xTeve

1. **Open xTeve**: http://localhost:34400

2. **Add M3U Playlist**:
   - Click **"Playlist"** tab
   - Click **"New"** or **"+"**
   - Choose source type:
     - **M3U URL**: For online playlists
     - **M3U File**: For local files
   
3. **Free IPTV Sources** (legal):
   ```
   # iptv-org (8000+ channels worldwide)
   https://iptv-org.github.io/iptv/index.m3u
   
   # US News channels
   https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8
   ```

4. **Add EPG (Program Guide)**:
   - Click **"XMLTV"** tab
   - Click **"New"**
   - Add EPG URL:
   ```
   # EPG for iptv-org
   https://iptv-org.github.io/epg/guides/en.xml
   ```

5. **Save and Update**

## Step 2: Configure xTeve Settings

1. In xTeve, go to **"Settings"** tab

2. **Enable Buffer**:
   - Turn on "Buffer"
   - Set buffer size: **4-8 MB**
   - This improves streaming stability

3. **Enable HDHomeRun Mode** (if available):
   - Look for "HDHomeRun" or "Tuner" settings
   - Enable HDHomeRun emulation
   - Set number of tuners: **6**

4. **Save Settings**

## Step 3: Map Channels

1. Go to **"Mapping"** tab in xTeve

2. **Enable channels** you want:
   - Check boxes next to channels
   - Assign channel numbers
   - Match with EPG data

3. **Save Mapping**

## Step 4: Add xTeve to Plex

### Option A: As HDHomeRun Device (Recommended)

1. **Open Plex**: http://localhost:32400/web

2. **Go to Settings** > **Live TV & DVR**

3. **Click "Set up Plex DVR"**

4. **Plex should auto-detect xTeve** as an HDHomeRun device
   - Wait 30 seconds if not immediately visible
   - Look for "xTeve" or "HDHomeRun" in device list

5. **Select the device** and click **"Continue"**

6. **Select channels** to include in Plex

7. **Configure EPG**:
   - Choose "Use Plex's program guide" (easiest)
   - Or "Use XMLTV guide from xTeve"

8. **Done!** Live TV is now available in Plex

### Option B: Direct xTeve Integration

If Plex doesn't detect xTeve as HDHomeRun:

1. In Plex: **Settings** > **Live TV & DVR**

2. Click **"Set up Plex DVR"**

3. Look for **"xTeve"** in the device list (not HDHomeRun)

4. Select it and follow the wizard

## Step 5: Watch Live TV!

1. In Plex, click **"Live TV"** in the sidebar

2. Browse channels and start watching

3. You can also:
   - Record shows (requires Plex Pass)
   - Set up scheduled recordings
   - Watch on any Plex client

## Troubleshooting

### Plex Doesn't Detect xTeve

**Check xTeve is running**:
```bash
docker-compose ps
```

**Check xTeve web interface**:
- Open http://localhost:34400
- Should load without errors

**Restart services**:
```bash
docker-compose restart
```

**Wait and retry**:
- Sometimes takes 30-60 seconds for Plex to discover
- Try refreshing Plex's DVR setup page

**Manual connection**:
- In Plex DVR setup, try entering manually:
  - `http://localhost:34400`
  - Or your server's IP: `http://192.168.1.x:34400`

### No Channels Showing

**Check xTeve has channels**:
1. Open http://localhost:34400
2. Go to "Mapping" tab
3. Ensure channels are enabled (checked)

**Check M3U playlist**:
1. Go to "Playlist" tab
2. Click "Update" to refresh
3. Verify channels are loaded

**Test M3U URL**:
```bash
curl http://localhost:34400/m3u/xteve.m3u
```
Should return channel list.

### Streams Won't Play

**Enable buffer in xTeve**:
- Settings > Buffer > Enable
- Increase buffer size to 8MB

**Check stream URLs**:
- Some IPTV streams may be offline
- Try different sources
- Test in VLC player first

**Check Plex transcoding**:
- Settings > Transcoder
- Ensure transcoding is enabled
- Check available disk space

**Network issues**:
- IPTV requires stable internet
- Wired connection recommended
- Check bandwidth

### Poor Quality

**Increase buffer**:
- xTeve Settings > Buffer > 8-16 MB

**Check source quality**:
- Free IPTV varies in quality
- Try different streams
- Premium IPTV usually better

**Adjust Plex quality**:
- Settings > Quality
- Set to "Original" or "Maximum"

## Free Legal IPTV Sources

### News Channels
- ABC News Live
- CBS News
- NBC News Now
- Bloomberg TV
- Cheddar News
- Reuters
- Newsmax

### Entertainment
- **Pluto TV**: 250+ free channels
  - Find M3U playlists online
  - Or use Pluto TV app directly

- **Xumo**: 190+ free channels
  - Available as M3U

- **Samsung TV Plus**: 200+ channels
  - M3U available

### International
- **iptv-org**: 8000+ worldwide channels
  ```
  https://iptv-org.github.io/iptv/index.m3u
  ```

### Sports (Free)
- Stadium
- beIN Sports XTRA
- Fox Sports (select events)

## xTeve Configuration Tips

### Best Settings

**Buffer**:
- Enable: Yes
- Size: 8 MB
- Helps with stream stability

**Tuners**:
- Set to 6 (allows 6 simultaneous streams)
- Adjust based on your needs

**EPG Update**:
- Set to update daily
- Recommended time: 3 AM

**Channel Numbers**:
- Assign logical numbers
- Group by category (news, sports, etc.)

### Advanced Features

**Filtering**:
- Filter out unwanted channels
- Use regex patterns
- Remove duplicates

**Custom Channel Names**:
- Rename channels for clarity
- Add logos/icons
- Organize by preference

**Multiple Sources**:
- Combine multiple M3U playlists
- Merge different IPTV providers
- Create unified channel list

## Comparison: xTeve vs Physical HDHomeRun

| Feature | xTeve (Virtual) | Physical HDHomeRun |
|---------|----------------|-------------------|
| Cost | Free | $100-200 |
| Hardware | None | Required |
| Channels | IPTV (unlimited) | OTA (20-80) |
| Quality | Varies | Excellent |
| Internet | Required | Not required |
| Setup | Medium | Easy |
| Flexibility | Very high | Limited |

## Docker Commands

### Check status:
```bash
docker-compose ps
```

### View logs:
```bash
# All services
docker-compose logs -f

# Just xTeve
docker-compose logs -f xteve

# Just Plex
docker-compose logs -f plex
```

### Restart:
```bash
docker-compose restart
```

### Stop:
```bash
docker-compose stop
```

### Start:
```bash
docker-compose start
```

## URLs Reference

- **Plex**: http://localhost:32400/web
- **xTeve**: http://localhost:34400
- **xTeve M3U**: http://localhost:34400/m3u/xteve.m3u
- **xTeve XMLTV**: http://localhost:34400/xmltv/xteve.xml

## Next Steps

1. ✅ Services are running
2. ⏭️ Add IPTV sources to xTeve
3. ⏭️ Configure channels and EPG
4. ⏭️ Add xTeve to Plex as DVR device
5. ⏭️ Enjoy Live TV!

## Support

- **xTeve**: https://github.com/xteve-project/xTeve
- **Plex Live TV**: https://support.plex.tv/articles/225877347-live-tv-dvr/
- **IPTV Sources**: See `iptv-sources.md`

## Legal Notice

Only use IPTV sources you have legal rights to access. This guide focuses on free, legal sources like news channels and public broadcasts. Pirated content is illegal.

---

**You're all set!** xTeve is running and ready to act as your virtual HDHomeRun device. Just add your IPTV sources and connect it to Plex!
