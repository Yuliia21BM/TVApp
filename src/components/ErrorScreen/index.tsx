import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {ErrorScreenProps} from './types';

export const ErrorScreen: React.FC<ErrorScreenProps> = ({error}) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Error: {error}</Text>
  </View>
);
