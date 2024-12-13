import React, {useCallback, useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TVEventControl,
  BackHandler,
  Alert,
  View,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {AppStackParamList, STACK_SCREENS} from './IRoot';
import {HomeScreen, EpisodeScreen} from '../screens';
import {NetworkError} from '../components';

const StackTV = createNativeStackNavigator<AppStackParamList>();

export const navigationRef = createNavigationContainerRef();

const ComponentsTV = {
  HomeScreen: HomeScreen,
  EpisodeScreen: EpisodeScreen,
};

function Root(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    NetInfo.addEventListener(value => {
      return setIsConnected(value.isConnected);
    });
  }, []);

  return (
    <View style={styles.root}>
      <NavigationContainer ref={navigationRef}>
        <StackTV.Navigator screenOptions={{headerShown: false}}>
          <StackTV.Screen
            name={STACK_SCREENS.HOME_SCREEN}
            component={ComponentsTV.HomeScreen}
          />
          <StackTV.Screen
            name={STACK_SCREENS.EPISODE_SCREEN}
            component={ComponentsTV.EpisodeScreen}
          />
        </StackTV.Navigator>
      </NavigationContainer>

      {!isConnected && <NetworkError />}
    </View>
  );
}

export default Root;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
