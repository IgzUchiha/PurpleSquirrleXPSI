import axios from 'axios';
import {PLEX_URL, PLEX_TOKEN, XTEVE_URL} from '../config';

class PlexService {
  async getLibraries() {
    try {
      const response = await axios.get(`${PLEX_URL}/library/sections`, {
        headers: {'X-Plex-Token': PLEX_TOKEN},
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching libraries:', error);
      return [];
    }
  }

  async getLibraryContent(libraryId) {
    try {
      const response = await axios.get(
        `${PLEX_URL}/library/sections/${libraryId}/all`,
        {
          headers: {'X-Plex-Token': PLEX_TOKEN},
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching content:', error);
      return [];
    }
  }

  async getLiveTV() {
    try {
      const response = await axios.get(`${XTEVE_URL}/lineup.json`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching live TV:', error);
      return [];
    }
  }

  async getWatchlist() {
    try {
      // Plex watchlist is stored on plex.tv, not local server
      const response = await axios.get(
        'https://metadata.provider.plex.tv/library/sections/watchlist/all',
        {
          headers: {
            'X-Plex-Token': PLEX_TOKEN,
            'Accept': 'application/json',
          },
        },
      );
      console.log('Watchlist from plex.tv:', response.data);
      return response.data;
    } catch (error) {
      console.log('Plex.tv watchlist not available, trying On Deck...');
      
      // Fallback: Try to get "On Deck" items from local server
      try {
        const onDeckResponse = await axios.get(`${PLEX_URL}/library/onDeck`, {
          headers: {'X-Plex-Token': PLEX_TOKEN},
        });
        return onDeckResponse.data;
      } catch (onDeckError) {
        console.error('Error fetching watchlist/on deck:', onDeckError.message);
        return null;
      }
    }
  }

  async getStreamUrl(key) {
    try {
      // First, get the metadata to find the actual media file
      const response = await axios.get(`${PLEX_URL}${key}`, {
        headers: {'X-Plex-Token': PLEX_TOKEN},
      });
      
      const metadata = response.data?.MediaContainer?.Metadata?.[0];
      
      if (metadata?.Media?.[0]?.Part?.[0]?.key) {
        // Direct video file path
        const partKey = metadata.Media[0].Part[0].key;
        const url = `${PLEX_URL}${partKey}?X-Plex-Token=${PLEX_TOKEN}`;
        console.log('Direct stream URL:', url);
        return url;
      }
      
      // Fallback to the key itself
      const url = `${PLEX_URL}${key}?X-Plex-Token=${PLEX_TOKEN}`;
      console.log('Fallback stream URL:', url);
      return url;
    } catch (error) {
      console.error('Error getting stream URL:', error);
      return `${PLEX_URL}${key}?X-Plex-Token=${PLEX_TOKEN}`;
    }
  }

  // Get episodes for a TV show
  async getShowEpisodes(showKey) {
    try {
      // Get all episodes for a show
      const response = await axios.get(`${PLEX_URL}${showKey}/allLeaves`, {
        headers: {'X-Plex-Token': PLEX_TOKEN},
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      return null;
    }
  }

  // Get seasons for a TV show
  async getShowSeasons(showKey) {
    try {
      const response = await axios.get(`${PLEX_URL}${showKey}/children`, {
        headers: {'X-Plex-Token': PLEX_TOKEN},
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching seasons:', error);
      return null;
    }
  }

  getThumbnailUrl(thumb) {
    return `${PLEX_URL}${thumb}?X-Plex-Token=${PLEX_TOKEN}`;
  }

  getChannelStreamUrl(url) {
    return url;
  }
}

export default new PlexService();
