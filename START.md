# Quick Start Guide

## Your Plex claim token is already configured! ✅

## Step 1: Start Docker

Docker Desktop needs to be running. 

**If you don't have Docker installed:**
1. Download Docker Desktop for Mac: https://www.docker.com/products/docker-desktop/
2. Install and open Docker Desktop
3. Wait for Docker to start (whale icon in menu bar)

**If Docker is installed but not running:**
1. Open Docker Desktop from Applications
2. Wait for it to start (you'll see the whale icon in your menu bar)

## Step 2: Start Your Plex Server

Once Docker is running, execute:

```bash
docker-compose up -d
```

This will download and start:
- Plex Media Server
- xTeve (IPTV proxy)
- TVHeadend (DVR backend)

First time will take a few minutes to download images.

## Step 3: Access Your Services

Once running, open these URLs:

- **Plex**: http://localhost:32400/web
- **xTeve**: http://localhost:34400
- **TVHeadend**: http://localhost:9981

## Step 4: Configure Plex

1. Open Plex and sign in
2. Name your server
3. Add media libraries:
   - Movies: `/data/movies`
   - TV Shows: `/data/tv`
   - Music: `/data/music`
   - Photos: `/data/photos`

## Step 5: Set Up Live TV

### Option A: Plex's Built-in Live TV (Easiest)
1. In Plex, go to Settings > Live TV & DVR
2. Click "Set up Plex Live TV"
3. Follow the wizard
4. Done! 300+ free channels

### Option B: HDHomeRun (Best Quality - OTA TV)
1. Get HDHomeRun device ($100-200) and TV antenna
2. Run `./start-hdhomerun.sh`
3. Visit https://my.hdhomerun.com/ to scan channels
4. In Plex: Settings > Live TV & DVR > Set up Plex DVR
5. Select HDHomeRun device
6. See `HDHOMERUN-SETUP.md` for details

### Option C: Add IPTV Sources via xTeve
1. Open xTeve at http://localhost:34400
2. Add M3U playlist (see `iptv-sources.md` for free sources)
3. Add EPG URL for program guide
4. Save and enable buffer
5. In Plex: Settings > Live TV & DVR > Add DVR Device
6. Select xTeve

## Adding Your Media

Put your media files in these folders:
- `media/movies/` - Your movie files
- `media/tv/` - Your TV show files
- `media/music/` - Your music files
- `media/photos/` - Your photos

Plex will automatically scan and add them.

## Useful Commands

```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f plex

# Stop services
docker-compose stop

# Start services
docker-compose start

# Restart everything
docker-compose restart

# Stop and remove containers
docker-compose down

# Update to latest versions
docker-compose pull
docker-compose up -d
```

## Troubleshooting

**Can't access Plex?**
- Make sure Docker is running
- Check containers: `docker-compose ps`
- View logs: `docker-compose logs plex`

**Need to reclaim your server?**
- Get a new token: https://www.plex.tv/claim/
- Update `.env` file with new token
- Restart: `docker-compose restart plex`

## Next Steps

- Check `README.md` for detailed documentation
- Check `iptv-sources.md` for free legal IPTV sources
- Run `./backup.sh` to backup your configuration

Enjoy your Plex server! 🎬📺
