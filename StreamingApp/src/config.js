import {Platform} from 'react-native';

// IMPORTANT: If testing on a physical device, replace this with your computer's IP address
// Find it by running: ipconfig getifaddr en0 (macOS) or ipconfig (Windows)
const COMPUTER_IP = '192.168.1.100'; // CHANGE THIS TO YOUR COMPUTER'S IP

const getBaseUrl = () => {
  // For physical devices, always use the computer's IP
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Android emulator uses 10.0.2.2 to access host machine
      return '10.0.2.2';
    }
    // iOS simulator can use localhost
    return 'localhost';
  }
  return COMPUTER_IP;
};

export const BASE_URL = getBaseUrl();
export const PLEX_URL = `http://${BASE_URL}:32400`;
export const PLEX_TOKEN = 'RW3FuDLzwtsNXNJE7ZHP';
export const XTEVE_URL = `http://${BASE_URL}:34400`;
export const BACKEND_URL = `http://${BASE_URL}:3001`;
