import {DARK_GREY, GREY_COLOR} from 'assets/color/Palette';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * the text form that shows information(in DetailScreen and SettingScreen)
 * @type {string} text - the text inside the form
 * @type {boolean} isUsername - the username in settingScreen
 * @type {boolean} isEmail - the email address in settingScreen
 * @type {boolean} isPhonenumber - the phonenumber in settingScreen
 * @type {boolean} isUsertype - the usertype in settingScreen
 * @type {boolean} isRivername - the rivername in detailScreen
 * @type {boolean} isLocation - the location in detailScreen
 * @type {boolean} isTime - the time in detailScreen
 * @type {boolean} isRecordtype - the recordtype in detailScreen
 * @type {boolean} isInDetailScreen - the layout form shows different in detailScreen
 * @returns the text form
 */
const InfoForm = ({
  isUsername,
  isEmail,
  isPhonenumber,
  text,
  isUsertype,
  isRivername,
  isLocation,
  isTime,
  isRecordtype,
  isInDetailScreen,
}) => {
  return (
    <View style={styles().view}>
      {isUsername ? (
        <FontAwesome name="user" size={20} color="black" />
      ) : isEmail ? (
        <MaterialCommunityIcons name="email" size={20} color="black" />
      ) : isPhonenumber ? (
        <FontAwesome name="phone" size={20} color="black" />
      ) : isUsertype ? (
        <MaterialIcons name="verified-user" size={20} color="black" />
      ) : isRivername ? (
        <FontAwesome name="location-arrow" size={20} color="black" />
      ) : isLocation ? (
        <Ionicons name="location-sharp" size={20} color="black" />
      ) : isTime ? (
        <Ionicons name="calendar" size={20} color="black" />
      ) : isRecordtype ? (
        <MaterialCommunityIcons name="cctv" size={20} color="black" />
      ) : null}
      <Text style={styles(isInDetailScreen).text}>{text}</Text>
    </View>
  );
};

export default InfoForm;

const styles = isInDetailScreen =>
  StyleSheet.create({
    view: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      backgroundColor: GREY_COLOR,
      padding: 10,
      width: '65%',
      margin: 10,
      borderWidth: isInDetailScreen ? 2 : 0.5,
      borderColor: isInDetailScreen ? GREY_COLOR : DARK_GREY,
      fontSize: isInDetailScreen ? 16 : null,
      fontWeight: isInDetailScreen ? '600' : null,
      color: DARK_GREY,
      borderRadius: 20,
      overflow: 'hidden',
    },
  });
