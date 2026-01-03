#!/bin/bash

echo "Starting Plex Media Server with HDHomeRun support..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "   Run ./setup.sh first"
    exit 1
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    exit 1
fi

# Check if HDHomeRun is reachable
echo "Checking for HDHomeRun device on network..."
if ping -c 1 hdhomerun.local &> /dev/null; then
    echo "✅ HDHomeRun device found!"
    echo ""
else
    echo "⚠️  HDHomeRun device not detected on network"
    echo "   Make sure your HDHomeRun is:"
    echo "   1. Plugged in and powered on"
    echo "   2. Connected to your network via Ethernet"
    echo "   3. On the same network as this computer"
    echo ""
    echo "   Visit https://my.hdhomerun.com/ to verify your device"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start services
echo "Starting Docker containers..."
docker-compose -f docker-compose.hdhomerun.yml up -d

echo ""
echo "✅ Services started!"
echo ""
echo "Access your services:"
echo "  • Plex:              http://localhost:32400/web"
echo "  • xTeve:             http://localhost:34400"
echo "  • HDHomeRun Setup:   https://my.hdhomerun.com/"
echo ""
echo "Next steps:"
echo "  1. Visit https://my.hdhomerun.com/ to scan for channels"
echo "  2. Open Plex and go to Settings > Live TV & DVR"
echo "  3. Click 'Set up Plex DVR' and select your HDHomeRun"
echo ""
echo "See HDHOMERUN-SETUP.md for detailed instructions"
echo ""
