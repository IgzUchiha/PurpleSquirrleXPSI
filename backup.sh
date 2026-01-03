#!/bin/bash

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="plex_backup_${TIMESTAMP}.tar.gz"

echo "Creating backup..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Stop containers
echo "Stopping containers..."
docker-compose stop

# Create backup
echo "Backing up configuration..."
tar -czf "${BACKUP_DIR}/${BACKUP_FILE}" \
    config/ \
    .env \
    docker-compose.yml

# Start containers
echo "Starting containers..."
docker-compose start

echo "✅ Backup created: ${BACKUP_DIR}/${BACKUP_FILE}"
echo ""
echo "To restore:"
echo "1. Stop containers: docker-compose down"
echo "2. Extract backup: tar -xzf ${BACKUP_DIR}/${BACKUP_FILE}"
echo "3. Start containers: docker-compose up -d"
