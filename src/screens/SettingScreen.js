import AsyncStorage from '@react-native-async-storage/async-storage';
import {GREY_COLOR} from 'assets/color/Palette';
import BigTitle from 'assets/fonts/BigTitle';
import {AuthContext} from 'components/Context';
import SubmitButton from 'components/SubmitButton';
import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import InfoForm from 'components/InfoForm';
import Copyright from 'assets/fonts/Copyright';
import axios from 'axios';
import {BASE_URL} from 'api/Url';

/**
 * Shows the information of logged-in user, able to check the username, email, phonenumber, usertype.
 * @function jwt_decode - decode the jwt token which includes id(userId), username, email, phonenumber, usertype.
 * @returns able to withdrawal or signOut.
 */
const SettingScreen = () => {
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
  console.log('info:', info);
  /* getting the token information finish*/

  const withDrawalLogic = () => {
    return Alert.alert(
      '정말 wateraiInfo를 떠나실 건가요?',
      '계정 탈퇴 시 모든 개인정보가 삭제됩니다.',
      [
        {
          text: '다시 생각해 볼게요',
          style: 'cancel',
        },
        {
          text: '계정 탈퇴',
          onPress: async () => {
            await axios
              .post(`${BASE_URL}/wateraiInfoWithdrawal`, {
                info,
              })
              .then(res => {
                console.log('res:', res);
                if (res?.data?.ok === true) {
                  Alert.alert('계정 탈퇴 완료', '메인 화면으로 돌아갑니다.', [
                    {
                      text: 'Ok',
                      onPress: () => {
                        signOut();
                      },
                    },
                  ]);
                }
              })
              .catch(e => Alert.alert(e));
          },
        },
      ],
    );
  };

  return (
    <View style={styles.view}>
      <View style={styles.titlebig}>
        <BigTitle text={`Welcome, ${info.username} !`} />
      </View>
      <View style={styles.textsheet}>
        <Image
          source={require('assets/images/waterai2.png')}
          style={styles.image}
        />
        <InfoForm isUsername={true} text={`${info.username}`} />
        <InfoForm isEmail={true} text={`${info.email}`} />
        <InfoForm
          isPhonenumber={true}
          text={
            `${info.phonenumber}`.substring(0, 3) +
            '-' +
            `${info.phonenumber}`.substring(3, 7) +
            '-' +
            `${info.phonenumber}`.substring(7, 11)
          }
        />
        <InfoForm isUsertype={true} text={`${info.usertype}`} />
        {info?.usertype === 'guestmode' ? null : (
          <TouchableOpacity
            style={styles.withdrawal}
            onPress={() => {
              withDrawalLogic();
            }}>
            <Copyright text="계정 탈퇴" isUnderLine={true} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.button}>
        {info?.usertype === 'guestmode' ? (
          <SubmitButton
            text="회원가입 하러가기"
            onPress={() => {
              signOut();
            }}
          />
        ) : (
          <SubmitButton
            text="로그아웃"
            onPress={() => {
              signOut();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  titlebig: {
    height: '5%',
    marginHorizontal: 20,
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: Platform.OS === 'ios' ? 5 : null,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: GREY_COLOR,
  },
  textsheet: {
    backgroundColor: 'white',
    height: '60%',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: GREY_COLOR,
  },
  image: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: GREY_COLOR,
    marginBottom: 10,
  },
  withdrawal: {justifyContent: 'center', alignItems: 'center'},
  button: {
    alignItems: 'center',
  },
});
