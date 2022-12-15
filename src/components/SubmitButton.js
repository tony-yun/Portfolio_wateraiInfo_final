import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {BLUE_COLOR} from 'assets/color/Palette';

/**
 * the button component which is being used in many screens.
 * @type {string} text - the text shows on button
 * @type {function} onPress - the function which activates when button is pressed.
 * @returns onPress function
 */
const SubmitButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

SubmitButton.prototype = {
  text: PropTypes.string.isRequired,
};

export default SubmitButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: BLUE_COLOR,
    padding: 15,
    borderRadius: 50,
    width: '70%',
    margin: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
