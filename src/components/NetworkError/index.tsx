import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

export function NetworkError(): React.JSX.Element {
  return (
    <View style={styles.root}>
      <View style={styles.main}>
        <Text style={styles.title}>Network Error</Text>
        <Text style={styles.subtitle}>
          Please, check your network connection
        </Text>
      </View>
    </View>
  );
}
