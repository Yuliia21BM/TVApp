import MaskedView from '@react-native-masked-view/masked-view';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Banner} from '../../redux/types';
import {styles} from './styles';

export const HomeHeader = ({focusedItem}: {focusedItem: Banner|null}) => (
  <>
    <MaskedView
      style={styles.maskedView}
      maskElement={
        <LinearGradient
          style={{flex: 1}}
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
        />
      }>
      <MaskedView
        style={{flex: 1}}
        maskElement={
          <LinearGradient
            style={{flex: 1}}
            colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
            start={{x: 0.5, y: 0.7}}
            end={{x: 0.5, y: 1}}
          />
        }>
        <FastImage
          style={styles.bannerImage}
          source={{uri: focusedItem?.banner}}
        />
      </MaskedView>
    </MaskedView>
    <View style={styles.topSection}>
      <FastImage
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.bannerTitle}>{focusedItem?.title}</Text>
      <Text style={styles.bannerDescription}>{focusedItem?.description}</Text>
    </View>
  </>
);
