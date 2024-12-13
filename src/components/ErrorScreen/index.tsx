import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export const ErrorScreen = ({error}: {error: string}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Error: {String(error)}</Text>
    </View>
  );
};
