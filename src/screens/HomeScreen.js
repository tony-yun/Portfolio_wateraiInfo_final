import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {BASE_URL} from 'api/Url';
import SubmitButton from 'components/SubmitButton';
import RiverMedia from 'components/RiverMedia';
import HeadTitle from 'assets/fonts/HeadTitle';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

/**
 * Send the usertype to server and get proper river information (such as admin, gyeonggi, flood, guest, guestmode).
 * @function jwt_decode - decode the jwt token which includes id(userId), username, email, phonenumber, usertype.
 * @returns the user information is settled in 'resultInfo' function.
 */
const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [resultInfo, setResultInfo] = useState([]); //getting the whole data

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

  const wateraiInfo = async () => {
    await axios
      .post(`${BASE_URL}/wateraiInfo`, {
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
    await wateraiInfo();
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
      thumbnailPath={item.detectedPath}
      rivername={item.rivername}
      location={item.location}
      recordtype={item.recordtype}
      waterlevel={item.waterlevel}
      userId={info.id}
      isInHomeScreen={true} //bookmark screen에서 보는 아이콘과 차별하기 위함.
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <FlatList
        data={resultInfo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <HeadTitle text={`River Information (${resultInfo.length})`} />
        }
        ListFooterComponent={
          <SubmitButton
            text="정보 불러오기"
            onPress={() => {
              wateraiInfo();
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

export default HomeScreen;

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
});
