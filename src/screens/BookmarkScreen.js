import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {BASE_URL} from 'api/Url';
import SubmitButton from 'components/SubmitButton';
import RiverMedia from 'components/RiverMedia';
import HeadTitle from 'assets/fonts/HeadTitle';
import Copyright from 'assets/fonts/Copyright';
import {AuthContext} from 'components/Context';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

/**
 * sends the 'info' object to server, and server takes out userId in it, to check the user's like button pressed contents.
 * @returns the river contents which user pressed bookmark button.
 */
const BookmarkScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [resultInfo, setResultInfo] = useState([]); //getting the whole data

  const {signOut} = React.useContext(AuthContext);
  /* getting the token information */
  const [info, setInfo] = useState('');
  const getData = () => {
    try {
      AsyncStorage.getItem('userToken').then(value => {
        if (value != null) {
          setInfo(jwt_decode(value));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(info);
  /* getting the token information finish*/

  const wateraiInfoBookmarked = async () => {
    await axios
      .post(`${BASE_URL}/wateraiInfoBookmarked`, {
        info,
      })
      .then(res => {
        console.log('res:', res);
        if (res?.data?.ok === true) {
          setResultInfo(res?.data?.results);
        } else {
          Alert.alert(`${res?.data?.error}`);
        }
      })
      .catch(e => Alert.alert(e));
  };
  console.log('resultInfo:', resultInfo);

  const onRefresh = async () => {
    setRefreshing(true);
    await wateraiInfoBookmarked();
    wait(600).then(() => setRefreshing(false));
  };

  /**
   * The renderItem in the Flatlist.
   * @param {prop} item - the prop from resultInfo function.
   * @property {number} id - riverId (riverId = deviceId)
   * @returns renderItem은 RiverMedia.js 안의 component를 사용함.
   */
  const renderItem = ({item}) => (
    <RiverMedia
      key={item.id} //필수값,unique
      id={item.id} //river id(deviceId)
      thumbnailPath={item.thumbnail}
      rivername={item.placeName}
      location={item.location}
      recordtype={item.recordtype}
      waterlevel={item.waterlevel}
      userId={info.id}
      isInBookmarkScreen={true}
    />
  );
  return info?.usertype === 'guestmode' ? (
    <View style={styles.button}>
      <Copyright
        text={'Sign up to check your \n bookmarked river information!'}
      />
      <View style={styles.separateview} />
      <SubmitButton
        text="To Sign Up Screen"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={resultInfo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <HeadTitle text={`Bookmarked River (${resultInfo.length})`} />
        }
        ListFooterComponent={
          <SubmitButton
            text="즐겨찾기 정보 불러오기"
            onPress={() => {
              wateraiInfoBookmarked();
            }}
          />
        }
        ListFooterComponentStyle={styles.button}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '23%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separateview: {height: 20},
});
