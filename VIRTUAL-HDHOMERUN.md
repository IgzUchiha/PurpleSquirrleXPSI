# Virtual HDHomeRun Setup

This setup creates a virtual HDHomeRun device using Telly, which makes xTeve appear as an HDHomeRun to Plex. This is useful if you don't have physical HDHomeRun hardware but want to use IPTV sources.

## What This Does

- **Telly**: Emulates an HDHomeRun device on your network
- **xTeve**: Manages IPTV streams and EPG data
- **Plex**: Sees the virtual HDHomeRun and can use it for Live TV

## Quick Start

```bash
./setup-virtual-hdhomerun.sh
```

Or manually:

```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml up -d
```

## Setup Steps

### 1. Start the Virtual HDHomeRun

```bash
./setup-virtual-hdhomerun.sh
```

This will:
- Create necessary configuration files
- Start Plex, xTeve, and Telly (HDHomeRun emulator)
- Make the virtual device discoverable on your network

### 2. Configure xTeve with IPTV Sources

1. **Open xTeve**: http://localhost:34400

2. **Add IPTV Playlist**:
   - Click "Playlist" tab
   - Click "Add Playlist"
   - Choose one:
     - **M3U URL**: Paste your IPTV playlist URL
     - **M3U File**: Upload a local .m3u file
   - Click "Save"

3. **Add EPG (Program Guide)**:
   - Click "XMLTV" tab
   - Add EPG XML URL (see sources below)
   - Click "Save"

4. **Enable and Configure**:
   - Go to "Settings" tab
   - Enable "Buffer"
   - Set buffer size (recommended: 4MB)
   - Save settings

5. **Map Channels**:
   - Go to "Mapping" tab
   - Match channels with EPG data
   - Assign channel numbers
   - Save mapping

### 3. Configure Telly to Use xTeve

The virtual HDHomeRun needs to know where to get streams from.

**Edit** `config/telly/telly.json`:

```json
{
  "Device": {
    "FriendlyName": "Virtual HDHomeRun",
    "Manufacturer": "Silicondust",
    "ModelNumber": "HDTC-2US",
    "TunerCount": 6
  },
  "Source": {
    "Provider": "Custom",
    "M3U": "http://localhost:34400/m3u/xteve.m3u",
    "EPG": "http://localhost:34400/xmltv/xteve.xml"
  },
  "Web": {
    "BaseAddress": "0.0.0.0:6077",
    "ListenAddress": "0.0.0.0:6077"
  }
}
```

**Restart after editing**:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml restart hdhr-emulator
```

### 4. Add Virtual HDHomeRun to Plex

1. **Open Plex**: http://localhost:32400/web

2. **Go to Settings** > **Live TV & DVR**

3. **Click "Set up Plex DVR"**

4. **Plex should detect "Virtual HDHomeRun"**
   - If not detected, wait 30 seconds and try again
   - Or manually add: `http://localhost:6077`

5. **Select the device** and click "Continue"

6. **Select channels** you want to include

7. **Configure EPG** (Electronic Program Guide)

8. **Done!** You now have Live TV in Plex

## Free IPTV Sources

### Legal Free IPTV Playlists

**iptv-org (8000+ channels)**:
```
https://iptv-org.github.io/iptv/index.m3u
```

**EPG for iptv-org**:
```
https://iptv-org.github.io/epg/guides/en.xml
```

**Pluto TV**:
- Use xTeve's built-in Pluto TV integration
- Or find M3U playlists online

**Free News Channels**:
```
https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8
```

### Adding Your Own M3U

If you have an IPTV subscription or custom M3U:

1. Place M3U file in `config/xteve/`
2. In xTeve, add as "File" instead of "URL"
3. Point to `/config/your-playlist.m3u`

## Troubleshooting

### Plex Doesn't Detect Virtual HDHomeRun

**Check if Telly is running**:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml ps
```

**Check Telly logs**:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml logs hdhr-emulator
```

**Test if device is accessible**:
```bash
curl http://localhost:6077/discover.json
```

Should return device information.

**Manually add in Plex**:
- Settings > Live TV & DVR
- Click "Set up Plex DVR"
- If auto-detection fails, manually enter: `http://localhost:6077`

### No Channels Showing

**Check xTeve has channels**:
1. Open http://localhost:34400
2. Go to "Mapping" tab
3. Ensure channels are enabled and mapped

**Check Telly configuration**:
1. Verify `config/telly/telly.json` has correct xTeve URLs
2. Restart Telly: `docker-compose -f docker-compose.hdhomerun-emulator.yml restart hdhr-emulator`

**Check xTeve M3U output**:
```bash
curl http://localhost:34400/m3u/xteve.m3u
```

Should show channel list.

### Streams Not Playing

**Check xTeve buffer**:
- Open xTeve settings
- Enable buffer
- Increase buffer size to 8MB

**Check stream URLs**:
- Some IPTV streams may be geo-blocked
- Try different sources
- Check if streams work in VLC first

**Check Plex logs**:
- Settings > Manage > Console
- Look for errors related to Live TV

### Poor Stream Quality

**Increase buffer in xTeve**:
- Settings > Buffer > 8MB or higher

**Check network bandwidth**:
- IPTV streams need stable connection
- Wired connection recommended

**Try different streams**:
- Some free IPTV sources have variable quality
- Premium IPTV services usually more reliable

## Configuration Files

### Telly Config Location
```
config/telly/telly.json
```

### xTeve Config Location
```
config/xteve/
```

### Example Telly Config

```json
{
  "Device": {
    "FriendlyName": "Virtual HDHomeRun",
    "Manufacturer": "Silicondust",
    "ModelNumber": "HDTC-2US",
    "FirmwareName": "hdhomerun_atsc",
    "TunerCount": 6,
    "FirmwareVersion": "20150826",
    "DeviceID": "12345678"
  },
  "Source": {
    "Provider": "Custom",
    "M3U": "http://localhost:34400/m3u/xteve.m3u",
    "EPG": "http://localhost:34400/xmltv/xteve.xml"
  },
  "Web": {
    "BaseAddress": "0.0.0.0:6077",
    "ListenAddress": "0.0.0.0:6077"
  },
  "Log": {
    "Level": "info"
  }
}
```

## Docker Commands

### Start services:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml up -d
```

### Stop services:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml down
```

### View logs:
```bash
# All services
docker-compose -f docker-compose.hdhomerun-emulator.yml logs -f

# Just Telly
docker-compose -f docker-compose.hdhomerun-emulator.yml logs -f hdhr-emulator

# Just xTeve
docker-compose -f docker-compose.hdhomerun-emulator.yml logs -f xteve
```

### Restart services:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml restart
```

### Check status:
```bash
docker-compose -f docker-compose.hdhomerun-emulator.yml ps
```

## Ports Used

| Service | Port | Purpose |
|---------|------|---------|
| Plex | 32400 | Web interface |
| xTeve | 34400 | Configuration interface |
| Telly | 6077 | HDHomeRun emulation |

## Advantages of Virtual HDHomeRun

✅ **No hardware needed** - Pure software solution
✅ **Use IPTV sources** - Any M3U playlist
✅ **Plex integration** - Works like real HDHomeRun
✅ **Flexible** - Easy to add/remove channels
✅ **Cost effective** - No hardware purchase

## Disadvantages

❌ **No OTA channels** - Can't receive broadcast TV
❌ **Depends on IPTV quality** - Stream quality varies
❌ **Internet required** - Unlike OTA which works offline
❌ **Legal concerns** - Ensure IPTV sources are legal

## Comparison: Virtual vs Physical HDHomeRun

| Feature | Virtual (Telly) | Physical HDHomeRun |
|---------|----------------|-------------------|
| Cost | Free | $100-200 |
| Channels | IPTV (varies) | OTA (20-80) |
| Quality | Depends on source | Uncompressed HD |
| Internet Required | Yes | No |
| Setup Complexity | Medium | Easy |
| Reliability | Varies | Very reliable |

## Legal Notice

Only use IPTV sources you have legal rights to access. Many free IPTV services are legal (like Pluto TV, Xumo), but pirated streams are illegal. This guide focuses on legal sources only.

## Alternative: Just Use xTeve Directly

You don't actually need Telly! Plex can connect directly to xTeve:

1. Configure xTeve with IPTV sources
2. In Plex: Settings > Live TV & DVR
3. Add DVR device
4. Select xTeve (not HDHomeRun)
5. Done!

**Why use Telly then?**
- Some users prefer the HDHomeRun interface in Plex
- Better compatibility with certain Plex features
- Mimics real HDHomeRun behavior

## Support

- **Telly**: https://github.com/tellytv/telly
- **xTeve**: https://github.com/xteve-project/xTeve
- **Plex Live TV**: https://support.plex.tv/articles/225877347-live-tv-dvr/

## Summary

Virtual HDHomeRun setup:
1. Run `./setup-virtual-hdhomerun.sh`
2. Configure xTeve with IPTV sources
3. Add virtual HDHomeRun to Plex
4. Enjoy Live TV!

No physical hardware needed!
