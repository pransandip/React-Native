import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';

const HomeHeader = (props) => {
  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header_view: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#002E6D',
    justifyContent: 'center',
  },
  headerTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
});
