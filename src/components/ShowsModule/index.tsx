import {memo, useState} from 'react';
import {Row} from '../../redux/types';
import {StackNavigationProps} from '../../routes/IRoot';
import {FlatList, Text, View} from 'react-native';
import {SCALE, SCREEN_HEIGHT} from '../../utils/Constants';
import {styles} from './styles';
import {ShowBunner} from '../ShowBunner';

export const ShowsModule = memo(
  ({item, navigation}: {item: Row; navigation: StackNavigationProps}) => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    return (
      <View>
        <Text style={styles.sectionHeader}>{item.title}</Text>
        <FlatList
          data={item.data}
          renderItem={({item: show, index}) => (
            <ShowBunner
              item={show}
              index={index}
              setFocusedIndex={setFocusedIndex}
              navigation={navigation}
              focusedIndex={focusedIndex}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.sectionContainer}
          style={{
            marginLeft: -(focusedIndex * (SCREEN_HEIGHT * 0.2 + SCALE * 20)),
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
);
