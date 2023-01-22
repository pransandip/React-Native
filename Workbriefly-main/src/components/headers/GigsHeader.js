import {StyleSheet, Text, View, StatusBar, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';


const GigsHeader = (props) => {


  // let show = props.handleModal;

  console.log(`show----------->>>`, props.handleModal)

  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      {/* <View style={styles.headerView} > */}
      <TouchableOpacity onPress={()=>props.handleModal()} >
      <Image source={require('./../../../assets/info.png')} />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
      
      <Image source={require('./../../../assets/Calendar.png')} />
      
     
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
