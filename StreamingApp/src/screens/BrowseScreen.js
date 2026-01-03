import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';

const getWindowDimensions = () => {
  const {width, height} = Dimensions.get('window');
  return {width, height};
};

const BrowseScreen = ({navigation}) => {
  const [content, setContent] = useState({
    featured: null,
    trending: [],
    comedy: [],
    action: [],
    space: [],
    classics: [],
    plexLibraries: [], // Array of {title, data} objects for each library
    plexLiveTV: [],
    watchlist: [],
    recentlyAdded: [],
  });
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    loadContent();

    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions({width: window.width, height: window.height});
    });

    return () => subscription?.remove();
  }, []);

  const loadContent = async () => {
    try {
      // Import PlexService
      const PlexService = (await import('../services/PlexService')).default;
      
      // Fetch Plex libraries
      const libraries = await PlexService.getLibraries();
      console.log('Plex libraries:', libraries);
      
      let plexLibraries = [];
      let plexLiveTV = [];
      let watchlist = [];
      let recentlyAdded = [];
      let allContent = [];
      
      // Fetch watchlist or "Continue Watching" (On Deck)
      try {
        const watchlistData = await PlexService.getWatchlist();
        if (watchlistData?.MediaContainer?.Metadata) {
          watchlist = watchlistData.MediaContainer.Metadata.slice(0, 20).map(item => {
            // Watchlist items from plex.tv have full URLs for thumbnails
            let thumbnail = 'https://via.placeholder.com/300x450?text=No+Image';
            if (item.thumb) {
              // Check if it's already a full URL (from plex.tv)
              if (item.thumb.startsWith('http')) {
                thumbnail = item.thumb;
              } else {
                thumbnail = PlexService.getThumbnailUrl(item.thumb);
              }
            }
            return {
              id: item.ratingKey || item.guid,
              title: item.title,
              thumbnail: thumbnail,
              key: item.key,
              isLiveTV: false,
              year: item.year,
              summary: item.summary,
              type: item.type,
              guid: item.guid, // For matching with local library
            };
          });
        }
        console.log('Watchlist loaded:', watchlist.length, 'items');
      } catch (e) {
        console.log('Watchlist not available:', e.message);
      }
      
      // Parse Plex libraries - create separate row for each library
      if (libraries?.MediaContainer?.Directory) {
        const dirs = Array.isArray(libraries.MediaContainer.Directory) 
          ? libraries.MediaContainer.Directory 
          : [libraries.MediaContainer.Directory];
        
        console.log('Found', dirs.length, 'Plex libraries');
        
        for (const lib of dirs) {
          console.log('Processing library:', lib.title, 'type:', lib.type, 'key:', lib.key);
          
          // Handle all library types (movie, show, artist, photo, etc.)
          const libraryData = await PlexService.getLibraryContent(lib.key);
          console.log('Library data for', lib.title, ':', libraryData?.MediaContainer?.Metadata?.length || 0, 'items');
          
          if (libraryData?.MediaContainer?.Metadata) {
            const items = libraryData.MediaContainer.Metadata.slice(0, 30).map(item => ({
              id: item.ratingKey,
              title: item.title,
              thumbnail: item.thumb ? PlexService.getThumbnailUrl(item.thumb) : 'https://via.placeholder.com/300x450?text=No+Image',
              key: item.key,
              isLiveTV: false,
              year: item.year,
              summary: item.summary,
              type: item.type || lib.type,
              addedAt: item.addedAt,
            }));
            
            // Add as separate library row with appropriate emoji
            const emoji = lib.type === 'movie' ? '🎬' : lib.type === 'show' ? '📺' : '📁';
            plexLibraries.push({
              title: `${emoji} ${lib.title}`,
              data: items,
            });
            
            // Collect all content for recently added
            allContent.push(...items);
          }
        }
        
        console.log('Total Plex libraries loaded:', plexLibraries.length);
      }
      
      // Sort all content by addedAt and get most recent
      if (allContent.length > 0) {
        recentlyAdded = allContent
          .sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0))
          .slice(0, 20);
      }
      
      // Try to get Live TV channels
      try {
        const liveChannels = await PlexService.getLiveTV();
        if (Array.isArray(liveChannels)) {
          plexLiveTV = liveChannels.slice(0, 10).map((channel, index) => ({
            id: `live-${index}`,
            title: channel.GuideName || channel.GuideNumber,
            thumbnail: 'https://via.placeholder.com/300x450?text=Live+TV',
            streamUrl: channel.URL,
            isLiveTV: true,
          }));
        }
      } catch (e) {
        console.log('Live TV not available:', e.message);
      }
      
      // Set featured content from Plex if available
      let featured = null;
      if (recentlyAdded.length > 0) {
        const featuredItem = recentlyAdded[0];
        featured = {
          title: featuredItem.title,
          description: featuredItem.summary || 'Watch now on Plex',
          thumbnail: featuredItem.thumbnail,
          key: featuredItem.key,
          isLiveTV: false,
        };
      }
      
      const demoContent = {
        featured: featured || {
          title: 'Big Buck Bunny',
          description:
            'Follow a day of the life of Big Buck Bunny when he meets three bullying rodents.',
          thumbnail:
            'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
          streamUrl:
            'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          isLiveTV: true,
        },
        watchlist: watchlist,
        recentlyAdded: recentlyAdded,
        plexLibraries: plexLibraries,
        plexLiveTV: plexLiveTV,
        trending: [
          {
            id: '1',
            title: 'Sintel',
            thumbnail:
              'https://durian.blender.org/wp-content/uploads/2010/06/05.8b_comp_000272.jpg',
            streamUrl:
              'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            isLiveTV: true,
          },
          {
            id: '2',
            title: 'Tears of Steel',
            thumbnail:
              'https://mango.blender.org/wp-content/uploads/2012/09/01_thom_celia_bridge.jpg',
            streamUrl:
              'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
            isLiveTV: true,
          },
          {
            id: '3',
            title: 'Apple Test Stream',
            thumbnail:
              'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.jpg',
            streamUrl:
              'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
            isLiveTV: true,
          },
        ],
        comedy: [
          {
            id: '4',
            title: 'Sample Stream 1',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
            streamUrl:
              'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            isLiveTV: true,
          },
          {
            id: '5',
            title: 'Sample Stream 2',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
            streamUrl:
              'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
            isLiveTV: true,
          },
          {
            id: '6',
            title: 'Sample Stream 3',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
            streamUrl:
              'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            isLiveTV: true,
          },
        ],
        action: [
          {
            id: '7',
            title: 'Action Stream 1',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
            streamUrl:
              'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
            isLiveTV: true,
          },
          {
            id: '8',
            title: 'Action Stream 2',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
            streamUrl:
              'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            isLiveTV: true,
          },
          {
            id: '9',
            title: 'Action Stream 3',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
            streamUrl:
              'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
            isLiveTV: true,
          },
        ],
        space: [
          {
            id: 'space1',
            title: 'Big Buck Bunny',
            thumbnail:
              'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'Open source animated short film',
            isLiveTV: true,
          },
          {
            id: 'space2',
            title: 'Elephants Dream',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/440px-Elephants_Dream_s5_both.jpg',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Open source animated film',
            isLiveTV: true,
          },
          {
            id: 'space3',
            title: 'For Bigger Blazes',
            thumbnail:
              'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Sample video content',
            isLiveTV: true,
          },
        ],
        classics: [
          {
            id: 'mickey1',
            title: 'Steamboat Willie (1928)',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Steamboat-willie.jpg/440px-Steamboat-willie.jpg',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            description: 'The original Mickey Mouse debut - Public Domain (Demo: Big Buck Bunny)',
          },
          {
            id: 'mickey2',
            title: 'Plane Crazy (1928)',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Plane_crazy_poster.jpg/440px-Plane_crazy_poster.jpg',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            description: 'Mickey\'s first produced cartoon - Public Domain (Demo: Elephants Dream)',
          },
          {
            id: 'mickey3',
            title: 'The Gallopin\' Gaucho (1928)',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/The_Gallopin%27_Gaucho.jpg/440px-The_Gallopin%27_Gaucho.jpg',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            description: 'Early Mickey Mouse adventure - Public Domain (Demo video)',
          },
          {
            id: 'felix1',
            title: 'Felix the Cat - Felix in Hollywood',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Felix_the_Cat.svg/440px-Felix_the_Cat.svg.png',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            description: 'Classic Felix the Cat cartoon - Public Domain (Demo video)',
          },
          {
            id: 'betty1',
            title: 'Betty Boop - Minnie the Moocher',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Betty_Boop.svg/440px-Betty_Boop.svg.png',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            description: 'Classic Betty Boop with Cab Calloway - Public Domain (Demo video)',
          },
          {
            id: 'popeye1',
            title: 'Popeye the Sailor (1933)',
            thumbnail:
              'https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Popeye_the_Sailor_Man.png/440px-Popeye_the_Sailor_Man.png',
            streamUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            description: 'Original Popeye cartoon - Public Domain (Demo video)',
          },
        ],
      };

      setContent(demoContent);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const playContent = async item => {
    // For Plex content (has key, not isLiveTV)
    if (item.key && !item.isLiveTV) {
      // For TV shows, get the first episode to play
      if (item.type === 'show') {
        try {
          const PlexService = (await import('../services/PlexService')).default;
          const episodes = await PlexService.getShowEpisodes(item.key);
          if (episodes?.MediaContainer?.Metadata?.[0]) {
            const firstEpisode = episodes.MediaContainer.Metadata[0];
            navigation.navigate('Player', {
              item: {
                title: `${item.title} - ${firstEpisode.title}`,
                key: firstEpisode.key,
                isLiveTV: false,
              },
            });
            return;
          }
        } catch (e) {
          console.log('Error getting episodes:', e);
        }
      }
      
      // For movies or direct playback
      navigation.navigate('Player', {
        item: {
          title: item.title,
          key: item.key,
          isLiveTV: false,
        },
      });
    } else {
      // For demo/live content with direct streamUrl
      navigation.navigate('Player', {
        item: {
          title: item.title,
          streamUrl: item.streamUrl,
          isLiveTV: true,
        },
      });
    }
  };

  // Dynamic card sizing based on screen width
  const isTablet = dimensions.width > 600;
  const cardWidth = isTablet ? dimensions.width * 0.2 : dimensions.width * 0.35;
  const cardHeight = cardWidth * 1.5; // 2:3 aspect ratio

  const renderRow = ({title, data}) => (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.card, {width: cardWidth, height: cardHeight}]}
            onPress={() => playContent(item)}>
            <ImageBackground
              source={{uri: item.thumbnail}}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}>
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Hero/Featured Section */}
      {content.featured && (
        <TouchableOpacity
          onPress={() => playContent(content.featured)}
          activeOpacity={0.9}>
          <ImageBackground
            source={{uri: content.featured.thumbnail}}
            style={styles.hero}
            imageStyle={styles.heroImage}>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{content.featured.title}</Text>
              <Text style={styles.heroDescription}>
                {content.featured.description}
              </Text>
              <View style={styles.heroButtons}>
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶ Play</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}

      {/* Content Rows */}
      {content.watchlist.length > 0 && renderRow({title: '▶️ Continue Watching', data: content.watchlist})}
      {content.recentlyAdded.length > 0 && renderRow({title: '� xRecently Added', data: content.recentlyAdded})}
      {content.plexLibraries.map((library, index) => (
        <View key={`library-${index}`}>
          {renderRow({title: library.title, data: library.data})}
        </View>
      ))}
      {content.plexLiveTV.length > 0 && renderRow({title: '📡 Live TV', data: content.plexLiveTV})}
      {renderRow({title: '🚀 NASA & Space Live', data: content.space})}
      {renderRow({title: '🎬 Classic Cartoons (Public Domain)', data: content.classics})}
      {renderRow({title: 'Trending Now', data: content.trending})}
      {renderRow({title: 'Comedy', data: content.comedy})}
      {renderRow({title: 'Action & Adventure', data: content.action})}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    minHeight: 300,
    maxHeight: 600,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  heroDescription: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 22,
  },
  heroButtons: {
    flexDirection: 'row',
  },
  playButton: {
    backgroundColor: '#e50914',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 4,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
    marginBottom: 10,
  },
  rowTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
    marginBottom: 10,
  },
  card: {
    marginLeft: 10,
    marginRight: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 8,
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default BrowseScreen;
