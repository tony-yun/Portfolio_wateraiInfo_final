import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IMAGE_URL} from 'api/Url';
import {DARK_GREY, GREY_COLOR} from 'assets/color/Palette';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';

/**
 * One river content itself (in HomeScreen & BookmarkScreen)
 * @type {number} id - deviceId = riverId
 * @type {string} thumbnailPath - shows the detected imagePath, since the client api key name should not change.
 * @type {string} rivername - name of the river
 * @type {string} location - the location of the river
 * @type {string} recordtype - receives CCTV or smartphone
 * @type {number} userId - the userId in DB user table.
 * @type {boolean} isInHomeScreen - if the screen is in HomeScreen, the user sees the subscribe button.
 * @type {boolean} isInBookmarkScreen - if the screen is in BookmarkScreen, the user sees the unsubscribe button.
 * @type {number} waterlevel - the waterlevel of the river.
 * @returns
 */
const RiverMedia = ({
  id,
  thumbnailPath,
  rivername,
  location,
  recordtype,
  userId,
  isInHomeScreen,
  isInBookmarkScreen,
  waterlevel,
}) => {
  const navigation = useNavigation();
  const [pressed, setPressed] = useState(false);
  const images = [
    {
      url: `${IMAGE_URL + thumbnailPath}`,
    },
  ];
  const pressImg = () => {
    setPressed(!pressed);
  };
  //다른 스크린으로 props보내기
  const GoToDetail = () => {
    navigation.navigate('DetailStack', {
      screen: 'DetailScreen',
      params: {
        rivername,
        id,
        userId,
        isInHomeScreen,
        isInBookmarkScreen,
        location,
        recordtype,
      },
    });
  };
  return (
    <View style={styles.Hview}>
      <TouchableOpacity onPress={pressImg}>
        <Image
          style={styles.image}
          source={{uri: `${IMAGE_URL + thumbnailPath}`}}
          resizeMode={'stretch'}
        />
      </TouchableOpacity>
      <View style={styles.Rcolumn}>
        <View style={styles.Ccolumn}>
          <Text style={styles.title}>{rivername}</Text>
          <Text style={styles.recordtype}>수위: {waterlevel / 100} m</Text>
        </View>
        <TouchableOpacity style={styles.iconLocation} onPress={GoToDetail}>
          <Ionicons name="menu-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {pressed ? (
        <Modal visible={true} transparent={true}>
          <ImageViewer
            style={styles.view}
            imageUrls={images}
            enableSwipeDown={true}
            onSwipeDown={pressImg}
            useNativeDriver={true}
            saveToLocalByLongPress={false}
          />
          <TouchableOpacity style={styles.position} onPress={pressImg}>
            <Ionicons name="close" size={25} color="white" />
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  );
};

export default RiverMedia;

const styles = StyleSheet.create({
  Hview: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: GREY_COLOR,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 5,
  },
  iconLocation: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '2%',
    paddingRight: '3%',
  },
  Ccolumn: {flexDirection: 'column'},
  Rcolumn: {flexDirection: 'row', justifyContent: 'space-between'},
  title: {
    color: 'black',
    fontWeight: '500',
    marginTop: 7,
    marginBottom: 5,
    fontSize: 19,
  },
  recordtype: {color: DARK_GREY, fontStyle: 'italic'},
  view: {flex: 1},
  position: {
    position: 'absolute',
    right: '10%',
    top: '10%',
  },
});
