# Plex Media Server with Live TV

A complete Plex media server setup with live TV support using Docker.

## Features

- **Plex Media Server**: Stream your personal media library
- **Live TV Support**: Watch and record live TV channels
- **xTeve**: IPTV proxy for M3U playlists and EPG data
- **TVHeadend**: DVR backend for TV tuners and IPTV streams

## Prerequisites

- Docker and Docker Compose installed
- At least 2GB RAM (4GB+ recommended)
- Storage space for media files
- (Optional) TV tuner hardware for OTA channels
- (Optional) IPTV subscription or M3U playlist URLs

## Quick Start

1. **Clone and setup**
   ```bash
   cp .env.example .env
   ```

2. **Get Plex claim token**
   - Visit https://www.plex.tv/claim/
   - Copy the claim token
   - Paste it in `.env` file

3. **Create required directories**
   ```bash
   ./setup.sh
   ```

4. **Start the services**
   ```bash
   docker-compose up -d
   ```

5. **Access the services**
   - Plex: http://localhost:32400/web
   - xTeve: http://localhost:34400
   - TVHeadend: http://localhost:9981

## Configuration

### Plex Setup

1. Open Plex at http://localhost:32400/web
2. Sign in with your Plex account
3. Add your media libraries:
   - Movies: `/data/movies`
   - TV Shows: `/data/tv`
   - Music: `/data/music`
   - Photos: `/data/photos`

### Live TV Setup Options

#### Option 1: IPTV with xTeve (Recommended for beginners)

1. Open xTeve at http://localhost:34400
2. Add your M3U playlist URL or upload file
3. Add EPG (Electronic Program Guide) XML URL
4. Enable the buffer and save
5. In Plex, go to Settings > Live TV & DVR
6. Add DVR device and select xTeve
7. Configure channel lineup and EPG

#### Option 2: HDHomeRun (Recommended for OTA TV)

**Easiest option for over-the-air broadcasts!**

1. Connect HDHomeRun device to your network
2. Connect TV antenna to HDHomeRun
3. Visit https://my.hdhomerun.com/ and scan for channels
4. In Plex: Settings > Live TV & DVR > Set up Plex DVR
5. Select your HDHomeRun device
6. Done! No additional containers needed

**See `HDHOMERUN-SETUP.md` for detailed setup guide**

To start with HDHomeRun support:
```bash
./start-hdhomerun.sh
# or
docker-compose -f docker-compose.hdhomerun.yml up -d
```

#### Option 3: TV Tuner with TVHeadend

1. Connect your TV tuner hardware
2. Open TVHeadend at http://localhost:9981
3. Run the setup wizard
4. Scan for channels
5. Configure EPG grabber
6. In Plex, add TVHeadend as DVR device

### Adding IPTV Channels

Free IPTV sources (legal channels):
- Pluto TV
- Xumo
- Samsung TV Plus
- Stirr
- Local News

Add M3U playlist in xTeve:
```
http://example.com/playlist.m3u8
```

## Directory Structure

```
.
├── config/
│   ├── plex/          # Plex configuration
│   ├── xteve/         # xTeve configuration
│   └── tvheadend/     # TVHeadend configuration
├── media/
│   ├── movies/        # Your movie files
│   ├── tv/            # Your TV show files
│   ├── music/         # Your music files
│   └── photos/        # Your photos
├── recordings/        # DVR recordings
└── transcode/         # Temporary transcoding files
```

## Media Organization

### Movies
```
movies/
  ├── Movie Name (Year)/
  │   └── Movie Name (Year).mkv
```

### TV Shows
```
tv/
  ├── Show Name/
  │   ├── Season 01/
  │   │   ├── Show Name - S01E01.mkv
  │   │   └── Show Name - S01E02.mkv
```

## Troubleshooting

### Plex not accessible
- Check if port 32400 is available
- Verify claim token is correct
- Check logs: `docker-compose logs plex`

### Live TV not working
- Ensure xTeve/TVHeadend is running
- Verify M3U playlist URL is accessible
- Check network_mode is set to host
- Review logs: `docker-compose logs xteve`

### Transcoding issues
- Ensure transcode directory has write permissions
- Check available disk space
- Consider hardware transcoding (Plex Pass required)

## Maintenance

### Update containers
```bash
docker-compose pull
docker-compose up -d
```

### Backup configuration
```bash
./backup.sh
```

### View logs
```bash
docker-compose logs -f plex
docker-compose logs -f xteve
docker-compose logs -f tvheadend
```

## Performance Tips

1. Use SSD for Plex metadata (config directory)
2. Enable hardware transcoding (requires Plex Pass)
3. Optimize your media files (H.264/H.265)
4. Use appropriate quality settings for remote streaming
5. Consider a reverse proxy (nginx/Caddy) for remote access

## Security

- Change default passwords in TVHeadend
- Use strong Plex account password
- Enable two-factor authentication on Plex
- Consider VPN for remote access
- Keep containers updated

## Remote Access

### Option 1: Plex Remote Access (Easiest)
Enable in Plex Settings > Remote Access

### Option 2: Reverse Proxy
Use nginx or Caddy for custom domain access

## Legal Notice

Only use content you own or have rights to stream. Respect copyright laws in your jurisdiction.

## Support

- Plex: https://support.plex.tv
- xTeve: https://github.com/xteve-project/xTeve
- TVHeadend: https://tvheadend.org/

## License

MIT License - Use at your own risk
