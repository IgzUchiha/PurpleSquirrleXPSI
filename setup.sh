#!/bin/bash

echo "Setting up Plex Media Server with Live TV..."

# Create directory structure
echo "Creating directories..."
mkdir -p config/plex
mkdir -p config/xteve/tmp
mkdir -p config/tvheadend
mkdir -p media/movies
mkdir -p media/tv
mkdir -p media/music
mkdir -p media/photos
mkdir -p recordings
mkdir -p transcode

# Set permissions
echo "Setting permissions..."
chmod -R 755 config
chmod -R 755 media
chmod -R 755 recordings
chmod -R 777 transcode

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your Plex claim token"
    echo "   Get it from: https://www.plex.tv/claim/"
    echo ""
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your Plex claim token"
echo "2. Run: docker-compose up -d"
echo "3. Access Plex at: http://localhost:32400/web"
echo "4. Access xTeve at: http://localhost:34400"
echo "5. Access TVHeadend at: http://localhost:9981"
echo ""
