import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from 'api/Url';
import {DARK_GREY, GREY_COLOR} from 'assets/color/Palette';
import Copyright from 'assets/fonts/Copyright';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailScreenHeader from 'components/DetailScreenHeader';
import DetailScreenFooter from 'components/DetailScreenFooter';

/**
 * when user presses the river menu button, shows the detailScreen of selected river.
 * @param {prop} setOptions - setOptions of navigation
 * @property {number} id - deviceId = the id of river
 * @property {number} userId - userId
 * @property {boolean} isInHomeScreen - to show different contents from HomeScreen or BookmarkScreen
 * @property {boolean} isInBookmarkScreen
 * @property {string} rivername
 * @property {string} location - the location of river
 * @property {string} recordtype - CCTV or smartphone
 * @returns the detail information page of the selected river from HomeScreen.js or BookmarkScreen.js.
 */
const DetailScreen = ({
  navigation: {setOptions},
  route: {
    params: {
      id,
      userId,
      isInHomeScreen,
      isInBookmarkScreen,
      rivername,
      location,
      recordtype,
    },
  },
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const navigation = useNavigation();
  const goBackHome = () => {
    navigation.goBack();
  };
  const wateraiInfoNewImgPath = useCallback(async () => {
    await axios
      .post(`${BASE_URL}/wateraiInfoNewImgPath`, {
        id,
      })
      .then(res => {
        console.log('res:', res);
        if (res?.data?.ok === true) {
          setDetailData(res?.data?.results);
          setLoading(false);
        } else {
          Alert.alert(`${res?.data?.error}`);
        }
      })
      .catch(e => Alert.alert(e));
  }, [id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await wateraiInfoNewImgPath();
    setRefreshing(false);
  };

  console.log('detailData:', detailData);

  useEffect(() => {
    setOptions({
      title: rivername,
    });
    wateraiInfoNewImgPath();
  }, [rivername, setOptions, wateraiInfoNewImgPath]);

  return loading ? (
    <View style={styles.loadingview}>
      <ActivityIndicator size={'small'} />
      <Copyright text="Fetching the image..." isLoading={true} />
      <View style={styles.homeiconview}>
        <TouchableOpacity style={styles.homeicon} onPress={goBackHome}>
          <Ionicons name="ios-home" size={25} color={DARK_GREY} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<DetailScreenHeader detailData={detailData} />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListFooterComponent={
        <DetailScreenFooter
          id={id}
          userId={userId}
          rivername={rivername}
          location={location}
          recordtype={recordtype}
          detailData={detailData}
          isInHomeScreen={isInHomeScreen}
          isInBookmarkScreen={isInBookmarkScreen}
        />
      }
    />
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  loadingview: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  homeiconview: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
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
});
