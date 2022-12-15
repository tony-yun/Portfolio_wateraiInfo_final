import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Copyright from 'assets/fonts/Copyright';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {BLUE_COLOR, GREY_COLOR} from 'assets/color/Palette';
import {IMAGE_URL} from 'api/Url';

const {height: SCREEN_HEIGHT, width} = Dimensions.get('window');

/**
 * The actual header in detailScreen (since the detailScreen uses the flatlist, this is the component of the flatlist's header content)
 * @param {object} detailData - the imgPath includes originPath and detectedPath, shows on SwiperFlatList.
 * @returns Copyright text and SwiperFlatList.
 */
const DetailScreenHeader = ({detailData}) => {
  return (
    <>
      <Copyright
        text="↓ 화면을 아래로 당겨서 새로운 사진을 가져오세요"
        onDetailScreen={true}
      />
      <SwiperFlatList
        autoplay
        autoplayLoop
        autoplayDelay={10}
        autoplayLoopKeepAnimation={true}
        index={0}
        showPagination
        paginationDefaultColor="grey"
        paginationActiveColor={BLUE_COLOR}
        data={detailData}
        renderItem={({item}) => (
          <View style={{width: width}}>
            <Image
              style={styles.imageSec}
              source={{uri: `${IMAGE_URL + item.imgPath}`}}
              resizeMode={'stretch'}
            />
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default DetailScreenHeader;

const styles = StyleSheet.create({
  imageSec: {
    height: SCREEN_HEIGHT / 3.8,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: GREY_COLOR,
    marginHorizontal: 10,
  },
});
