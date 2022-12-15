import React from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * The HeadTitle format which is being used in DetailScreen(flatlist footer), BookmarkScreen, HomeScreen
 * @param {string} text - the HeadTitle text.
 * @param {boolean} isInDetailScreen - to change the layout in detailScreen.
 * @returns
 */
const HeadTitle = ({text, isInDetailScreen}) => {
  return <Text style={styles(isInDetailScreen).text}>{text}</Text>;
};

export default HeadTitle;

const styles = isInDetailScreen =>
  StyleSheet.create({
    text: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 20,
      marginVertical: 10,
      paddingLeft: isInDetailScreen ? '8%' : null,
    },
  });
