import React, {memo, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {SCALE, SCREEN_HEIGHT} from '../../utils/Constants';
import {styles} from './styles';
import {ShowBanner} from '../ShowBanner';
import {ShowsModuleProps} from './types';

export const ShowsModule = memo(
  ({
    item,
    navigation,
    onFocusCallback,
    setSelectedShowRef,
    isFirstRow,
  }: ShowsModuleProps) => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    return (
      <View>
        <Text style={styles.sectionHeader}>{item.title}</Text>
        <FlatList
          data={item.data}
          renderItem={({item: show, index}) => (
            <ShowBanner
              item={show}
              index={index}
              setFocusedIndex={setFocusedIndex}
              navigation={navigation}
              onFocusCallback={onFocusCallback}
              setSelectedShowRef={setSelectedShowRef}
              isFirstRow={isFirstRow}
              isLastElementInRow={index === item.data.length - 1}
            />
          )}
          keyExtractor={el => el.id.toString()}
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
