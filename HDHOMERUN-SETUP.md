# HDHomeRun Setup Guide

HDHomeRun is a network-attached TV tuner that lets you watch and record over-the-air (OTA) broadcast TV channels.

## What You Need

1. **HDHomeRun Device** (one of these):
   - HDHomeRun Connect (2 tuners)
   - HDHomeRun Extend (2 tuners with transcoding)
   - HDHomeRun Flex 4K (4 tuners)
   - HDHomeRun Scribe (DVR with storage)
   - HDHomeRun Quattro (4 tuners)

2. **TV Antenna** - Connected to your HDHomeRun device

3. **Network Connection** - HDHomeRun connected to same network as your Plex server

## Setup Options

### Option 1: Direct Plex Integration (Recommended - Easiest)

Plex can connect directly to HDHomeRun without any additional software.

**Steps:**

1. **Connect HDHomeRun**
   - Plug in your HDHomeRun device
   - Connect TV antenna to HDHomeRun
   - Connect HDHomeRun to your network via Ethernet
   - Wait 1-2 minutes for it to boot up

2. **Verify HDHomeRun is Online**
   ```bash
   # Check if HDHomeRun is detected on your network
   ping hdhomerun.local
   ```
   
   Or visit: https://my.hdhomerun.com/

3. **Scan for Channels**
   - Open https://my.hdhomerun.com/
   - Select your device
   - Click "Scan for Channels"
   - Wait for scan to complete (5-10 minutes)

4. **Add to Plex**
   - Open Plex: http://localhost:32400/web
   - Go to Settings > Live TV & DVR
   - Click "Set up Plex DVR"
   - Plex should auto-detect your HDHomeRun
   - Select your device and click "Continue"
   - Choose which channels to include
   - Set up EPG (Electronic Program Guide)
   - Done!

**Pros:**
- No additional containers needed
- Native Plex integration
- Easy setup
- Automatic channel updates

**Cons:**
- Requires Plex Pass for DVR features (recording)
- Live TV is free for everyone

---

### Option 2: HDHomeRun with xTeve (Advanced)

Use xTeve as a proxy between HDHomeRun and Plex for more control.

**When to use this:**
- You want to filter/customize channels
- You want to combine HDHomeRun with IPTV sources
- You want more control over EPG data

**Steps:**

1. **Start services with HDHomeRun support**
   ```bash
   docker-compose -f docker-compose.hdhomerun.yml up -d
   ```

2. **Configure xTeve**
   - Open xTeve: http://localhost:34400
   - Go to "Playlist" tab
   - Click "Add Playlist"
   - Select "HDHomeRun"
   - Enter your HDHomeRun IP address (find it at https://my.hdhomerun.com/)
   - Click "Save"

3. **Add EPG to xTeve**
   - Go to "XMLTV" tab
   - Add EPG source (Schedules Direct recommended - $25/year)
   - Or use free EPG: https://github.com/iptv-org/epg

4. **Map Channels**
   - Go to "Mapping" tab
   - Match channels with EPG data
   - Save configuration

5. **Add xTeve to Plex**
   - Open Plex: http://localhost:32400/web
   - Settings > Live TV & DVR
   - Add DVR Device
   - Select xTeve
   - Follow setup wizard

**Pros:**
- More control over channels
- Can combine with IPTV
- Custom channel numbering
- Filter unwanted channels

**Cons:**
- More complex setup
- Additional container to manage

---

### Option 3: HDHomeRun DVR Engine (Alternative to Plex DVR)

Use HDHomeRun's own DVR software instead of Plex.

**Steps:**

1. **Start with HDHomeRun DVR**
   ```bash
   docker-compose -f docker-compose.hdhomerun.yml up -d
   ```

2. **Configure HDHomeRun DVR**
   - Open https://my.hdhomerun.com/
   - Set up DVR storage location
   - Configure recording settings

3. **Access Recordings in Plex**
   - Recordings are saved to `./recordings/hdhomerun/`
   - Add this folder as a TV Shows library in Plex
   - Plex will organize and display recordings

**Pros:**
- No Plex Pass required for DVR
- HDHomeRun's DVR is free
- Good recording quality

**Cons:**
- Separate interface from Plex
- Less integrated experience

---

## Finding Your HDHomeRun

### Method 1: Web Interface
Visit https://my.hdhomerun.com/ - it will auto-detect devices on your network

### Method 2: Command Line
```bash
# Ping the device
ping hdhomerun.local

# Or find by IP scanning
nmap -p 65001 192.168.1.0/24
```

### Method 3: HDHomeRun App
Download the HDHomeRun app for Mac/Windows/iOS/Android

---

## Channel Scanning

After connecting your antenna:

1. Visit https://my.hdhomerun.com/
2. Select your device
3. Click "Scan for Channels"
4. Wait 5-10 minutes for full scan
5. Review found channels

**Tips:**
- Position antenna near window for best reception
- Higher placement = better signal
- Rescan after moving antenna
- Use https://www.antennaweb.org/ to find nearby towers

---

## EPG (Program Guide) Options

### Free Options:
1. **Plex's Built-in EPG** - Included with Plex, works automatically
2. **iptv-org EPG** - https://github.com/iptv-org/epg
3. **Gracenote** - Built into HDHomeRun

### Paid Options:
1. **Schedules Direct** - $25/year, most reliable
   - https://www.schedulesdirect.org/
   - Best EPG data quality
   - 14-day guide data

---

## Troubleshooting

### HDHomeRun Not Detected

1. **Check network connection**
   ```bash
   ping hdhomerun.local
   ```

2. **Verify device is on same network**
   - HDHomeRun must be on same LAN as Plex server
   - Check router to see if device is connected

3. **Check firewall**
   - Ensure ports 65001 and 5004 are open
   - Disable firewall temporarily to test

### No Channels Found

1. **Check antenna connection**
   - Ensure antenna is properly connected
   - Try different antenna positions

2. **Check signal strength**
   - Visit https://my.hdhomerun.com/
   - View signal strength for each channel
   - Aim for 75%+ signal quality

3. **Rescan channels**
   - Sometimes takes multiple scans
   - Try scanning at different times of day

### Poor Video Quality

1. **Check signal strength** - Need 75%+ for good quality
2. **Reposition antenna** - Higher and near windows is better
3. **Check network bandwidth** - Ensure good WiFi/Ethernet connection
4. **Use Extend model** - Has built-in transcoding

---

## Recommended HDHomeRun Models

### For Most Users:
**HDHomeRun Flex 4K** ($180)
- 4 tuners (watch/record 4 channels simultaneously)
- ATSC 3.0 support (4K broadcasts)
- Best future-proofing

### Budget Option:
**HDHomeRun Connect** ($100)
- 2 tuners
- Reliable and simple
- Good for 1-2 users

### With Built-in DVR:
**HDHomeRun Scribe Duo** ($180)
- 2 tuners
- 150 hours DVR storage included
- No Plex Pass needed for DVR

---

## Docker Commands

### Start with HDHomeRun support:
```bash
docker-compose -f docker-compose.hdhomerun.yml up -d
```

### Stop services:
```bash
docker-compose -f docker-compose.hdhomerun.yml down
```

### View logs:
```bash
docker-compose -f docker-compose.hdhomerun.yml logs -f
```

### Restart services:
```bash
docker-compose -f docker-compose.hdhomerun.yml restart
```

---

## What Channels Can I Get?

Depends on your location and antenna. Typically:

**Major Networks (Free OTA):**
- ABC
- NBC
- CBS
- FOX
- PBS
- CW
- MyNetworkTV
- Ion Television

**Subchannels:**
- MeTV (classic TV)
- Antenna TV
- Comet (sci-fi)
- Movies! 
- Decades
- And many more!

**Check your area:**
- https://www.antennaweb.org/
- https://www.rabbitears.info/

Enter your address to see available channels.

---

## Cost Breakdown

| Item | Cost | Notes |
|------|------|-------|
| HDHomeRun Device | $100-$200 | One-time purchase |
| TV Antenna | $20-$100 | One-time purchase |
| Broadcast TV | FREE | Forever! |
| Plex Pass (for DVR) | $5/mo or $120 lifetime | Optional |
| Schedules Direct EPG | $25/year | Optional |

**Total to get started: $120-$300 one-time**

Then free TV forever (or $5/mo if you want DVR features).

---

## Comparison: HDHomeRun vs Cable

| Feature | HDHomeRun | Cable TV |
|---------|-----------|----------|
| Monthly Cost | $0 | $50-$150 |
| Channels | 20-80 (varies by location) | 100-500 |
| Picture Quality | Uncompressed HD | Compressed |
| DVR | $5/mo (Plex Pass) | $10-$20/mo |
| Contract | None | Usually required |
| Equipment Fees | None | $10-$20/mo |

---

## Support

- **HDHomeRun Support**: https://www.silicondust.com/support/
- **Plex + HDHomeRun**: https://support.plex.tv/articles/225877347-live-tv-dvr/
- **Community Forum**: https://forum.silicondust.com/

---

## Quick Start Summary

**Absolute easiest setup:**

1. Buy HDHomeRun device ($100-200)
2. Connect TV antenna
3. Plug into network
4. Visit https://my.hdhomerun.com/ and scan channels
5. Open Plex > Settings > Live TV & DVR > Set up Plex DVR
6. Select HDHomeRun device
7. Done! Watch free TV

No additional Docker containers needed for basic setup!
