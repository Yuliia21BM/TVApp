import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {HomeHeaderProps} from './types';
import {Colors} from '../../utils/Colors';

export const HomeHeader: React.FC<HomeHeaderProps> = ({focusedItem}) => {
  const bannerImageSource = {uri: focusedItem?.banner};
  const logoSource = require('../../../assets/images/logo.png');

  return (
    <View style={styles.container}>
      {/* Masked View */}
      <View style={styles.maskedView}>
        <FastImage style={styles.bannerImage} source={bannerImageSource} />
        <LinearGradient
          colors={[Colors.primaryBackground, Colors.shadow]}
          style={styles.gradientOverlayLeft}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
        <LinearGradient
          colors={[Colors.primaryBackground, Colors.shadow]}
          style={styles.gradientOverlayBottom}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
        />
      </View>

      {/* Top Section */}
      <View style={styles.topSection}>
        <FastImage
          source={logoSource}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.bannerTitle}>{focusedItem?.title}</Text>
        <Text style={styles.bannerDescription}>{focusedItem?.description}</Text>
      </View>
    </View>
  );
};
