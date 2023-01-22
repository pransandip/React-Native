import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';

const GigManagerHeader = (props) => {
  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      <Icon name="arrowleft" type="AntDesign" style={styles.arrow} />
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
      <View style={styles.rightView}>
        <Icon
          name="favorite-border"
          type="MaterialIcons"
          style={[styles.arrow, {fontSize: moderateScale(23)}]}
        />
      </View>

      {/* </View> */}
    </View>
  );
};

export default GigManagerHeader;

const styles = StyleSheet.create({
  header_view: {
    flexDirection: 'row',
    width: '100%',

    alignItems: 'center',
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#002E6D',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  headerTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  arrow: {
    color: 'white',
  },
});
