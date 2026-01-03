#!/bin/bash

echo "Setting up Virtual HDHomeRun Emulator..."
echo ""
echo "This creates a virtual HDHomeRun device that Plex can discover."
echo "You can then feed it IPTV streams through xTeve."
echo ""

# Create config directory
mkdir -p config/telly

# Copy config if it doesn't exist
if [ ! -f config/telly/telly.json ]; then
    echo "Creating Telly configuration..."
    cp config-telly.json config/telly/telly.json
    echo "✅ Configuration created at config/telly/telly.json"
else
    echo "⚠️  Configuration already exists at config/telly/telly.json"
fi

echo ""
echo "Starting services..."
docker-compose -f docker-compose.hdhomerun-emulator.yml up -d

echo ""
echo "✅ Virtual HDHomeRun is starting!"
echo ""
echo "Access your services:"
echo "  • Plex:                    http://localhost:32400/web"
echo "  • xTeve:                   http://localhost:34400"
echo "  • Virtual HDHomeRun:       http://localhost:6077"
echo ""
echo "Next steps:"
echo "  1. Configure xTeve with IPTV sources at http://localhost:34400"
echo "  2. In Plex: Settings > Live TV & DVR > Set up Plex DVR"
echo "  3. Plex should detect 'Virtual HDHomeRun'"
echo "  4. Select it and follow the setup wizard"
echo ""
echo "See VIRTUAL-HDHOMERUN.md for detailed setup instructions"
echo ""
