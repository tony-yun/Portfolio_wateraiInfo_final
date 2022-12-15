import {BLUE_COLOR} from 'assets/color/Palette';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import SubmitButton from 'components/SubmitButton';
import {BASE_URL} from 'api/Url';
import axios from 'axios';

/**
 * The screen which shows when user is not logged-in.
 * @param {prop} navigation props for navigate to SignUpScreen or SignInScreen.
 * @returns onPress two buttons to navigate to SignUpScreen.js or SignInScreen.js.
 */
const SplashPage = ({navigation}) => {
  //for request the WLAN and cellular data in iOS start
  const requestWLAN = () => {
    let imlogin = 'imlogin';
    axios
      .post(`${BASE_URL}/requestWLAN`, {imlogin})
      .then(res => {
        console.log(res);
        if (res?.data?.ok === true) {
          console.log(res?.data?.ok);
        } else {
          console.log(res?.data?.error);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    requestWLAN();
  }, []);
  //for request the WLAN and cellular data in iOS end
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('assets/images/waterai2.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>{'실시간 하천 정보를\n확인하세요!'}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Stack', {screen: 'SignUpScreen'});
          }}>
          <Text style={styles.text}>Sign up with account ←</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <SubmitButton
            text="Get Started"
            onPress={() => {
              navigation.navigate('Stack', {screen: 'SignInScreen'});
            }}
          />
        </View>
      </View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_COLOR,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashPage;
