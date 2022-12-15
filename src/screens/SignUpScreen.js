import {BLUE_COLOR, GREY_COLOR} from 'assets/color/Palette';
import Copyright from 'assets/fonts/Copyright';
import {AuthContext} from 'components/Context';
import {MemoInputForm} from 'components/InputForm';
import SubmitButton from 'components/SubmitButton';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

/**
 * Send signUp logic to App.js
 * @param {prop} navigation navigate to CopyrightScreen.js
 * @property {string} username - could be either English or Korean.
 * @property {string} email - must include '@'.
 * @property {number} phonenumber - the length must be 11.
 * @property {string} password - the password must same as verifyPassword.
 * @returns After the SignUpLogic is being checked on client, the inserted value will be sent to App.js through AuthContext.
 */
const SignUpScreen = ({navigation}) => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [usertype, setUsertype] = useState('guest');
  console.log(
    `username:${username}\nemail:${email}\nphonenumber:${phonenumber}\npassword:${password}\nverifyPassword:${verifyPassword}\nuserType:${usertype}`,
  );

  const {signUp} = React.useContext(AuthContext);

  const SignUpLogic = () => {
    if (
      username === '' ||
      email === '' ||
      phonenumber === '' ||
      password === '' ||
      verifyPassword === ''
    ) {
      return Alert.alert('입력하지 않은 정보가 있습니다.');
    } else if (email.includes('@') === false) {
      return Alert.alert('이메일 형식이 맞는지 확인해주세요.');
    } else if (phonenumber.toString().length !== 11) {
      return Alert.alert('휴대전화 번호를 11자리까지 입력해주세요.');
    } else if (password !== verifyPassword) {
      return Alert.alert('비밀번호를 정확히 입력했는지 확인해주세요.');
    } else if (checkboxState === false) {
      return Alert.alert(
        '이용약관, 개인정보 수집 및 이용에 동의해주시기 바랍니다.',
      );
    } else {
      Alert.alert(
        '해당 정보로 회원가입 하시겠습니까?',
        `유저:${username}\n이메일:${email}\n핸드폰번호:${phonenumber}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () =>
              signUp(username, email, phonenumber, password, usertype),
          },
        ],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Welcome !'}</Text>
      </View>

      <ScrollView style={styles.footer}>
        <MemoInputForm
          placeholder="username"
          isUsername={true}
          setUsername={setUsername}
          value={username}
        />
        <MemoInputForm
          placeholder="email"
          isEmail={true}
          setEmail={setEmail}
          value={email}
        />
        <MemoInputForm
          placeholder="phonenumber"
          isPhonenumber={true}
          setPhonenumber={setPhonenumber}
          value={phonenumber}
        />
        <MemoInputForm
          placeholder="password"
          isPassword={true}
          setPassword={setPassword}
          value={password}
        />
        <MemoInputForm
          placeholder="verifyPassword"
          isVerifyPassword={true}
          setVerifyPassword={setVerifyPassword}
          value={verifyPassword}
        />
        <View style={styles.checkbox}>
          <BouncyCheckbox
            size={22}
            fillColor={BLUE_COLOR}
            unfillColor={GREY_COLOR}
            isChecked={checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
          />
          <TouchableOpacity
            style={styles.checkboxTouchable}
            onPress={() =>
              navigation.navigate('Stack', {screen: 'CopyrightScreen'})
            }>
            <Copyright
              text={'이용약관, 개인정보 수집 및 이용 동의(필수)'}
              isUnderLine={true}
              onSignUpScreen={true}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <SubmitButton text="Sign Up" onPress={SignUpLogic} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_COLOR,
  },
  header: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  footer: {
    // flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    marginLeft: '9%',
  },
  checkboxTouchable: {
    right: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
