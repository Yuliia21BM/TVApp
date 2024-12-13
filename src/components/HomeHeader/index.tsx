import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Banner} from '../../redux/types';
import {styles} from './styles';

export const HomeHeader = ({focusedItem}: {focusedItem: Banner | null}) => (
  <>
    <View style={styles.maskedView}>
      <FastImage
        style={styles.bannerImage}
        source={{uri: focusedItem?.banner}}
      />
      <LinearGradient
        colors={['#150A35', 'rgba(21, 10, 53, 0)']}
        style={styles.gradientOverlayLeft}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />
      <LinearGradient
        colors={['#150A35', 'rgba(21, 10, 53, 0)']}
        style={styles.gradientOverlayBottom}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
      />
    </View>
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
