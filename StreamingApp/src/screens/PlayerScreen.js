import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import PlexService from '../services/PlexService';

const PlayerScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [streamUrl, setStreamUrl] = useState(null);

  useEffect(() => {
    loadStream();
  }, []);

  const loadStream = async () => {
    if (item.isLiveTV) {
      setStreamUrl(item.streamUrl);
    } else {
      const url = await PlexService.getStreamUrl(item.key);
      setStreamUrl(url);
    }
  };

  if (!streamUrl) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Loading {item.title}...</Text>
      </View>
    );
  }

  return (
    <VideoPlayer
      source={streamUrl}
      title={item.title}
      onBack={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
});

export default PlayerScreen;
