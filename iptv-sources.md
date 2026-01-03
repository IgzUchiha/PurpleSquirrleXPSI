# Free Legal IPTV Sources

Here are some free, legal IPTV sources you can use with your Plex server.

## Free Streaming Services

### Pluto TV
- **Website**: https://pluto.tv
- **Channels**: 250+ free channels
- **M3U**: Available through third-party tools
- **EPG**: Yes
- **Content**: Movies, TV shows, news, sports

### Xumo
- **Website**: https://xumo.tv
- **Channels**: 190+ free channels
- **Content**: News, entertainment, sports

### Samsung TV Plus
- **Channels**: 200+ free channels
- **Content**: Movies, TV, news

### Stirr
- **Website**: https://stirr.com
- **Channels**: Local news and entertainment
- **Content**: Local channels, movies, TV

### Plex Live TV (Built-in)
- **Free channels**: 300+ channels
- **Setup**: Settings > Live TV & DVR > Set up Plex Live TV
- **No additional hardware needed**

## IPTV Playlist Aggregators

### iptv-org
- **GitHub**: https://github.com/iptv-org/iptv
- **M3U**: https://iptv-org.github.io/iptv/index.m3u
- **Channels**: 8000+ worldwide channels
- **Legal**: Public domain and freely available streams

## Local Channels (OTA)

### HDHomeRun
- **Hardware**: TV tuner device
- **Channels**: Free over-the-air broadcasts
- **Integration**: Native Plex support
- **Cost**: One-time hardware purchase

### Locast (Discontinued)
Note: Locast shut down in 2021

## News Channels

Most news networks offer free live streams:
- ABC News Live
- CBS News
- NBC News Now
- Bloomberg TV
- Cheddar News
- Newsmax
- Reuters

## NASA & Space Content

### NASA Live Streams
- **NASA TV**: https://www.nasa.gov/nasalive
- **ISS HD Earth Viewing Experiment**: https://www.nasa.gov/multimedia/nasatv/iss_ustream.html
- **M3U Direct Stream**: `https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8`
- **ISS Live Stream**: `https://issl.iss.nasa.gov/iss-live/`
- **Content**: Live Earth views from ISS, space missions, educational content
- **Quality**: 1080p HD
- **24/7 Availability**: Yes (when ISS is in sunlight)

### Additional NASA Streams
- **NASA TV Public**: Educational and mission content
- **NASA TV Media**: Press conferences and launches
- **ISS Internal Camera**: Astronaut activities (when available)

## Public Domain Classic Content

### Early Mickey Mouse (Public Domain)
The following early Mickey Mouse cartoons entered public domain in 2024:
- **Steamboat Willie** (1928) - The original Mickey Mouse debut
- **Plane Crazy** (1928) - Mickey's first produced cartoon
- **The Gallopin' Gaucho** (1928) - Early Mickey adventure

**Where to watch**:
- Internet Archive: https://archive.org/details/SteamboatWillie
- YouTube: Search "Steamboat Willie public domain"
- Direct links for streaming:
  - Steamboat Willie: https://archive.org/download/SteamboatWillie/Steamboat_Willie.mp4
  - Plane Crazy: https://archive.org/download/PlaneCrazy1928/PlaneCrazy1928.mp4

### Other Public Domain Animation
- **Felix the Cat** (1920s cartoons)
- **Betty Boop** (early 1930s)
- **Popeye** (selected early cartoons)
- **Looney Tunes** (pre-1928 content)

**Internet Archive Collections**:
- Classic Cartoons: https://archive.org/details/more_animation
- Public Domain Movies: https://archive.org/details/feature_films

## Setup Instructions

### Using xTeve with M3U Playlist

1. Open xTeve: http://localhost:34400
2. Click "Playlist" tab
3. Add new playlist:
   - Name: Your choice
   - M3U URL: Paste URL from above
   - EPG URL: (if available)
4. Click "Save"
5. Go to "Mapping" tab to organize channels
6. In Plex: Settings > Live TV & DVR > Add DVR Device

### Adding NASA TV Stream

Create a custom M3U file with NASA streams:

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="nasa" tvg-name="NASA TV" tvg-logo="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" group-title="Space",NASA TV Public
https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8
#EXTINF:-1 tvg-id="iss" tvg-name="ISS HD Earth Views" tvg-logo="https://www.nasa.gov/sites/default/files/thumbnails/image/iss-logo.png" group-title="Space",ISS HD Earth Viewing
https://issl.iss.nasa.gov/iss-live/
```

Save as `nasa-streams.m3u` and add to xTeve or Plex.

### Adding Public Domain Content to Plex

For public domain movies and cartoons:
1. Download content from Internet Archive
2. Place in your Plex Movies library folder
3. Name files properly: `Steamboat Willie (1928).mp4`
4. Plex will automatically match and add metadata
5. Or use Plex's "Watch Later" feature with Internet Archive URLs

### Using Plex's Built-in Live TV

1. Open Plex
2. Go to Settings > Live TV & DVR
3. Click "Set up Plex Live TV"
4. Follow the wizard
5. No additional configuration needed!

## EPG (Electronic Program Guide) Sources

### Free EPG Sources
- **iptv-org EPG**: https://github.com/iptv-org/epg
- **WebGrab+Plus**: Self-hosted EPG grabber
- **Schedules Direct**: Paid service ($25/year) - most reliable

## Tips

1. **Start with Plex Live TV**: Easiest option, built-in
2. **Test streams**: Not all free streams are reliable
3. **Use xTeve**: Better channel management and filtering
4. **EPG is important**: Makes browsing much better
5. **Legal only**: Only use authorized streams

## Quality Expectations

Free IPTV typically offers:
- 720p to 1080p quality
- Some buffering possible
- Ads included (like regular TV)
- Limited DVR capabilities
- Channel availability varies by region

## Paid Alternatives (Better Quality)

If you want more reliable service:
- **YouTube TV**: $73/month
- **Hulu + Live TV**: $77/month
- **Sling TV**: $40/month
- **FuboTV**: $75/month

These can be integrated with Plex using third-party tools.

## Legal Disclaimer

Only use IPTV sources that you have legal access to. This guide focuses on free, publicly available streams. Pirated IPTV services are illegal and not recommended.
