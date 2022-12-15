import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {COPYRIGHT} from 'assets/color/Palette';

/**
 * Copyright text with is being used (in SignUpScreen, SettingScreen, DetailScreen, CopyrightScreen, BookmarkScreen)
 * @param {string} text - the copyright text
 * @param {boolean} isUnderLine - the boolean to show underline
 * @param {boolean} onSignUpScreen - onSignUpScreen to see the different layout
 * @param {boolean} onDetailScreen - onDetailScreen to see the different layout
 * @param {boolean} isItalic - the boolean to show the italic text 기울임체
 * @param {boolean} isLoading - the boolean to show the text on loading screen.
 * @returns copyright text which is grey color
 */
const Copyright = ({
  text,
  isUnderLine,
  onSignUpScreen,
  onDetailScreen,
  isItalic,
  isLoading,
}) => {
  return (
    <Text
      style={
        styles(isUnderLine, onSignUpScreen, isItalic, isLoading, onDetailScreen)
          .text
      }>
      {text}
    </Text>
  );
};

Copyright.prototype = {
  text: PropTypes.string.isRequired,
};

export default Copyright;

const styles = (
  isUnderLine,
  onSignUpScreen,
  isItalic,
  isLoading,
  onDetailScreen,
) =>
  StyleSheet.create({
    text: {
      fontSize: onSignUpScreen ? 13 : 15,
      fontWeight: '600',
      color: COPYRIGHT,
      marginLeft: onSignUpScreen ? 0 : 10,
      marginTop: onSignUpScreen ? 0 : isLoading ? 10 : 5,
      paddingVertical: onSignUpScreen ? 15 : null,
      textAlign: 'center',
      textDecorationLine: isUnderLine ? 'underline' : 'none',
      fontStyle: isItalic ? 'italic' : 'normal',
      marginBottom: onDetailScreen ? 5 : 0,
    },
  });
