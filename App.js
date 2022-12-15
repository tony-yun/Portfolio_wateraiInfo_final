import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Stack from 'navigation/Stack';
import Tab from 'navigation/Tab';
import {AuthContext} from 'components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from 'api/Url';
import {Alert} from 'react-native';
import DetailStack from 'navigation/DetailStack';
import RNRestart from 'react-native-restart';

//로그인, 비로그인 상태를 App.js에서 확인하기.
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const NativeStack = createNativeStackNavigator();

const App = () => {
  const restart = () => RNRestart.Restart();
  const initialLoginState = {
    userToken: null,
  }; //default state, use reducer to change.

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.userToken,
        };
      case 'REGISTER':
        return {
          ...prevState,
          // userToken: action.userToken, //원래 회원가입하면 토큰을 받아오는 로직을 구성했으나, 로그인 화면으로 넘어가게 함.
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      /*SignInScreen.js*/
      signIn: async (phonenumber, password) => {
        axios
          .post(`${BASE_URL}/loginUser`, {
            phonenumber,
            password,
          })
          .then(res => {
            console.log(res);
            if (res?.data?.ok === true) {
              AsyncStorage.setItem(
                'userToken',
                JSON.stringify(res?.data?.token),
              );
              console.log(res?.data?.token);
              dispatch({
                type: 'LOGIN',
                userToken: res?.data?.token,
              });
            } else {
              Alert.alert(`${res?.data?.error}`);
            }
          })
          .catch(e => Alert.alert(e));
      },

      /*HomeScreen.js*/
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },

      /*SignUpScreen.js*/
      signUp: async (username, email, phonenumber, password, usertype) => {
        await axios
          .post(`${BASE_URL}/registerUser`, {
            username,
            email,
            phonenumber,
            password,
            usertype,
          })
          .then(res => {
            console.log('res:', res);
            if (res?.data?.ok === true) {
              dispatch({type: 'REGISTER'});
              Alert.alert(
                'Welcome to WaterAI membership!',
                'Please head to SignInScreen',
                [{text: 'OK', onPress: () => restart()}],
              );
            } else {
              Alert.alert(`${res?.data?.error}`);
            }
          })
          .catch(e => Alert.alert(e));
      },
    }),
    [],
  );

  //앱 진입 시 스플래시 스크린 띄우기
  const onRefresh = React.useCallback(() => {
    wait(2000).then(() => SplashScreen.hide());
  }, []);

  const checkToken = async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      console.log('checkedToken:', userToken);
    } catch (e) {
      console.log(e);
    } //userToken흐름: null -> getItem -> dispatch
    dispatch({type: 'RETRIEVE_TOKEN', userToken: userToken});
  };

  useEffect(() => {
    onRefresh();
    checkToken();
  }, [onRefresh]);

  //loginState에 유저토큰이 있으면 Tab 및 DetailStack으로 화면 전환, 없으면(비로그인) 상태면 Stack만 보여줌.
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <NativeStack.Navigator screenOptions={{headerShown: false}}>
          {loginState.userToken === null ? (
            <NativeStack.Screen name="Stack" component={Stack} />
          ) : (
            <>
              <NativeStack.Screen name="Tab" component={Tab} />
              <NativeStack.Screen name="DetailStack" component={DetailStack} />
            </>
          )}
        </NativeStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
export default App;
