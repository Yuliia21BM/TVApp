import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {AppStackParamList, STACK_SCREENS} from './types';
import {HomeScreen, EpisodeScreen} from '../screens';
import {NetworkError} from '../components';

const StackTV = createNativeStackNavigator<AppStackParamList>();

export const navigationRef = createNavigationContainerRef();

const Root = (): React.JSX.Element => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <View style={styles.root}>
      <NavigationContainer ref={navigationRef}>
        <StackTV.Navigator screenOptions={{headerShown: false}}>
          <StackTV.Screen
            name={STACK_SCREENS.HOME_SCREEN}
            component={HomeScreen}
          />
          <StackTV.Screen
            name={STACK_SCREENS.EPISODE_SCREEN}
            component={EpisodeScreen}
          />
        </StackTV.Navigator>
      </NavigationContainer>

      {!isConnected && <NetworkError />}
    </View>
  );
};

export default Root;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
