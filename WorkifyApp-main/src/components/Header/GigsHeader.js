import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const GigsHeader = (props) => {


  // let show = props.handleModal;

  // console.log(`show----------->>>`, show)

  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      {/* <View style={styles.headerView} > */}
    <Text></Text>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
      <Pressable onPress={()=>props.handleModal()} >
      <Image source={require('../../assets/Iicon.png')} />
      </Pressable>
     
      {/* </View> */}
    </View>
  );
};

export default GigsHeader;

const styles = StyleSheet.create({
  header_view: {
    flexDirection: 'row',
    width: '100%',

    alignItems: 'center',
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#002E6D',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(22),
  },
  headerTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
