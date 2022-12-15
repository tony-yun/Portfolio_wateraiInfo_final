import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import HeadTitle from 'assets/fonts/HeadTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DARK_GREY, GREY_COLOR} from 'assets/color/Palette';
import {BASE_URL} from 'api/Url';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import InfoForm from 'components/InfoForm';

/**
 * The actual footer in detailScreen (since the detailScreen uses the flatlist, this is the component of the flatlist's footer content)
 * @param {object} detailData - the imgPath includes originPath and detectedPath, shows on SwiperFlatList.
 * @type {number} id - riverId = deviceId
 * @type {number} userId - the id of user in DB user table
 * @type {string} rivername - the name of the river
 * @type {string} location - the location of the river
 * @type {string} recordtype - the recordtype of the river
 * @type {object} detailData - the object data which includes the recording time of the river.
 * @type {boolean} isInHomeScreen - if is in homeScreen, user sees the button which can press to bookmark
 * @type {boolean} isInBookmarkScreen - if is in bookmarkScreen, means that user already bookmarked button, so there only shows the un-bookmark button.
 * @returns rivername, location, recordtype, detailData.time, bookmark or unbookmark button.
 */
const DetailScreenFooter = ({
  id,
  userId,
  rivername,
  location,
  recordtype,
  detailData,
  isInHomeScreen,
  isInBookmarkScreen,
}) => {
  const navigation = useNavigation();
  const goBackHome = () => {
    navigation.goBack();
  };
  const wateraiInfoUserlike = useCallback(async () => {
    await axios
      .post(`${BASE_URL}/wateraiInfoUserlike`, {
        userId,
        id,
      })
      .then(res => {
        console.log('res:', res);
        if (res?.data?.ok === true) {
          Alert.alert(
            `${res?.data?.results}`, //알림:즐겨찾기에 등록하셨습니다.
            '메인 페이지의 bookmark 아이콘을 눌러서 즐겨찾기로 이동하세요!',
          );
        } else {
          Alert.alert(`${res?.data?.error}`);
        }
      })
      .catch(e => Alert.alert(e));
  }, [userId, id]);
  const wateraiInfoRemoveUserlike = useCallback(async () => {
    await axios
      .post(`${BASE_URL}/wateraiInfoRemoveUserlike`, {
        userId,
        id,
      })
      .then(res => {
        console.log('res:', res);
        if (res?.data?.ok === true) {
          Alert.alert(
            `${res?.data?.results}`, //알림:즐겨찾기에서 해제되었습니다.
          );
        } else {
          Alert.alert(`${res?.data?.error}`);
        }
      })
      .catch(e => Alert.alert(e));
  }, [userId, id]);
  return (
    <>
      <View style={styles.footer}>
        <HeadTitle text="하천 정보 : " isInDetailScreen={true} />
        <InfoForm
          isRivername={true}
          text={`${rivername}`}
          isInDetailScreen={true}
        />
        <InfoForm
          isLocation={true}
          text={`${location}`}
          isInDetailScreen={true}
        />
        <InfoForm
          isTime={true}
          text={`${detailData[0].time}`}
          isInDetailScreen={true}
        />
        <InfoForm
          isRecordtype={true}
          text={`${recordtype}`}
          isInDetailScreen={true}
        />
        <View style={styles.homeiconview}>
          <TouchableOpacity style={styles.homeicon} onPress={goBackHome}>
            <Ionicons name="ios-home" size={25} color={DARK_GREY} />
          </TouchableOpacity>
        </View>
        <View style={styles.bookmarkiconview}>
          {isInHomeScreen ? (
            <TouchableOpacity
              style={styles.bookmarkicon}
              onPress={() => {
                Alert.alert(
                  '해당 하천을 즐겨찾기에 등록하시겠습니까?',
                  '즐겨찾기에 등록하여 더 빠르게 정보에 접근하세요!',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        wateraiInfoUserlike();
                      },
                    },
                  ],
                );
              }}>
              <Ionicons name="bookmark" color={DARK_GREY} size={28} />
            </TouchableOpacity>
          ) : isInBookmarkScreen ? (
            <TouchableOpacity
              style={styles.bookmarkicon}
              onPress={() => {
                Alert.alert(
                  '해당 하천을 즐겨찾기에서 해제하시겠습니까?',
                  '즐겨찾기에서 해당 하천이 해제됩니다.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        wateraiInfoRemoveUserlike();
                      },
                    },
                  ],
                );
              }}>
              <MaterialCommunityIcons
                name="book-remove"
                color={DARK_GREY}
                size={28}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default DetailScreenFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: GREY_COLOR,
    height: '85%',
    margin: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GREY_COLOR,
    paddingTop: 5,
  },
  homeiconview: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  homeicon: {
    borderWidth: 3,
    borderRadius: 25,
    borderColor: GREY_COLOR,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkiconview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '10%',
  },
  bookmarkicon: {
    borderWidth: 3,
    borderRadius: 25,
    borderColor: GREY_COLOR,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
