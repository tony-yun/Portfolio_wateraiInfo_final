import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLUE_COLOR, DARK_GREY} from 'assets/color/Palette';
import {Platform, StyleSheet, View} from 'react-native';
import SettingScreen from 'screens/SettingScreen';
import HomeScreen from 'screens/HomeScreen';
import BookmarkScreen from 'screens/BookmarkScreen';

const BottomTab = createBottomTabNavigator();

/**
 * TabNavigation which shows when user logged-in.
 * @returns contains: HomeScreen, BookmarkScreen, SettingScreen.
 */
const Tab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 50,
          ...styles.shadow,
          height: '8%',
        },
        tabBarInactiveTintColor: DARK_GREY,
        tabBarActiveTintColor: BLUE_COLOR,
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              {focused ? (
                <Ionicons name="home" color={color} size={28} />
              ) : (
                <Ionicons name="home-outline" color={color} size={28} />
              )}
            </View>
          ),
          headerTitle: 'Home',
        }}
      />
      <BottomTab.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              {focused ? (
                <Ionicons name="bookmark" color={color} size={28} />
              ) : (
                <Ionicons name="bookmark-outline" color={color} size={28} />
              )}
            </View>
          ),
          title: 'Bookmark',
        }}
      />
      <BottomTab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.icon}>
              {focused ? (
                <Ionicons name="settings" color={color} size={28} />
              ) : (
                <Ionicons name="settings-outline" color={color} size={28} />
              )}
            </View>
          ),
          headerTitle: 'Setting',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default Tab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: BLUE_COLOR,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  icon: {
    textAlignVertical: 'center',
    paddingTop: Platform.OS === 'ios' ? '3%' : null,
  },
  view: {
    // top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: BLUE_COLOR,
    marginTop: Platform.OS === 'ios' ? '8%' : '3%',
  },
  image: {width: 43, height: 43},
});
