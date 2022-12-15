import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from 'screens/DetailScreen';

const NativeStack = createNativeStackNavigator();

/**
 * After user logged-in, onPress the river menu, it should show the Stack screen.
 * @returns contains: DetailScreen
 */
const DetailStack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerBackVisible: false}}
      />
    </NativeStack.Navigator>
  );
};

export default DetailStack;
