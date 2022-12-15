import {DARK_GREY} from 'assets/color/Palette';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * the component that shows horizontally text, text1 and text2 show on same horizon.
 * @param {string} text - the first text shows on left.
 * @param {string} secondtext - the second text shows on right.
 * @returns It can be used, but this component is not being used in the project.
 */
const TwinTitle = ({text, secondtext}) => {
  return (
    <>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.secondtext}>{secondtext}</Text>
    </>
  );
};

export default TwinTitle;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 10,
  },
  secondtext: {
    color: DARK_GREY,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 13,
  },
});
