import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from 'screens/SignInScreen';
import SplashPage from 'screens/SplashPage';
import SignUpScreen from 'screens/SignUpScreen';
import {BLUE_COLOR} from 'assets/color/Palette';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import CopyrightScreen from 'screens/CopyrightScreen';

const NativeStack = createNativeStackNavigator();

/**
 * the Stack navigation shows the screens when user is not logged-in.
 * @param {prop} navigation - onPress to goBack to previous screen,
 * @returns contains: SplashPage, SignInScreen, SignUpScreen, CopyrightScreen.
 */
const Stack = ({navigation}) => {
  const headerLeftIcon = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={25} color="white" />
    </TouchableOpacity>
  );
  const headerLeftIconCopyright = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={25} color="black" />
    </TouchableOpacity>
  );
  return (
    <NativeStack.Navigator initialRouteName="SplashPage">
      <NativeStack.Screen
        name="SplashPage"
        component={SplashPage}
        options={{headerShown: false}}
      />
      <NativeStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: BLUE_COLOR,
          },
          title: '',
          headerLeft: headerLeftIcon,
          headerShadowVisible: false,
        }}
      />
      <NativeStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: BLUE_COLOR,
          },
          title: '',
          headerLeft: headerLeftIcon,
          headerShadowVisible: false,
        }}
      />
      <NativeStack.Screen
        name="CopyrightScreen"
        component={CopyrightScreen}
        options={{
          headerBackTitleVisible: false,
          title: '이용약관, 개인정보 수집 및 이용 동의서',
          headerLeft: headerLeftIconCopyright,
          headerShadowVisible: false,
        }}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
