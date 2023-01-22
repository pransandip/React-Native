import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const GigsTopBar = (props) => {
  const [menu, setMenu] = useState([
    {category: 'Request', select: true},
    {category: 'Confirmed', select: false},
    {category: 'Available', select: false},
    {category: 'Applied', select: false},
    {category: 'Saved', select: false},
    {category: 'Completed', select: false},
  ]);

  const selectmenu = (val, item) => {
    let newarr = menu.map((item, index) => {
      if (val == index) {
        item.select = true; //false becomes true
      } else {
        item.select = false;
      }
      return {...item};
    });
    setMenu(newarr);
  };

  return (
    <View style={styles.root_view}>
      <View
        style={{
          paddingStart: moderateScale(15),
          marginTop: verticalScale(14),
        }}>
        <FlatList
          data={menu}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          horizontal={true}
          renderItem={({item, index}) => {
            return (
              <View style={styles.flatlist_view}>
                <Pressable
                  onPress={() => {
                    selectmenu(index, item);
                    props.changeMenuItem(item);
                  }}
                  style={styles.inner_view}>
                  <Text
                    style={[
                      styles.txt,
                      {
                        color: item.select ? '#002E6D' : '#393939',
                        fontWeight: item.select ? 'bold' : '400',
                      },
                    ]}>
                    {item.category}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: item.select
                        ? '#002E6D'
                        : 'transparent',
                      borderBottomWidth: 2,
                      marginTop: verticalScale(15),
                      width: '120%',
                    }}
                  />
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default GigsTopBar;

const styles = StyleSheet.create({
  root_view: {
    height: verticalScale(50),
    backgroundColor: 'white',
  },
  flatlist_view: {
    paddingStart: moderateScale(5),
    paddingEnd: moderateScale(20),
  },
  inner_view: {
    // borderWidth: 1.5,
    // borderColor: '#EDEDED',
    // borderRadius: 20,
    height: verticalScale(40),
    // width: '110%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {},
});
