import {BLUE_COLOR} from 'assets/color/Palette';
import {MemoInputForm} from 'components/InputForm';
import SubmitButton from 'components/SubmitButton';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from 'components/Context';

/**
 * SignIn or take a look in guest mode.
 * @property {number} phonenumber
 * @property {string} password
 * @returns if the SignInLogic passes, the phonenumber and password will be sent to App.js through AuthContext.
 */
const SignInScreen = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  console.log(`phonenumber:${phonenumber}\npassword:${password}`);

  const {signIn} = React.useContext(AuthContext);

  const SignInLogic = () => {
    if (phonenumber === '' || password === '') {
      return Alert.alert('입력하지 않은 정보가 있습니다.');
    } else if (phonenumber.toString().length !== 11) {
      return Alert.alert('휴대전화 번호를 11자리까지 입력해주세요.');
    } else {
      return signIn(phonenumber, password);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('assets/images/waterai2.png')}
        />
        <Text style={styles.title}>Welcome Back !</Text>
      </View>
      <View style={styles.footer}>
        <MemoInputForm
          placeholder="Phonenumber"
          setPhonenumber={setPhonenumber}
          isPhonenumber={true}
          value={phonenumber}
        />
        <MemoInputForm
          placeholder="Password"
          setPassword={setPassword}
          isPassword={true}
          value={password}
        />
        <View style={styles.button}>
          <SubmitButton text="Sign In" onPress={SignInLogic} />
        </View>
        <TouchableOpacity
          style={styles.touchabletext}
          //게스트 모드는 아래 phonenumber,password으로 로그인을 하는 로직이기 때문에, DB에서 해당 정보는 지우면 안됨.
          onPress={() => {
            let phonenumber = '01012341234';
            let password = 'qwer';
            return signIn(phonenumber, password);
          }}>
          <Text style={styles.text}>Take a look in Guest Mode →</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_COLOR,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'grey',
    marginBottom: '5%',
  },
  touchabletext: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: '15%',
  },
});
