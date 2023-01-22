import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {verticalScale} from '../../Constants/PixelRatio';

const HelpSupportTopBar = (props) => {
  const [toggle, setToggle] = useState('faq');

  return (
    <View style={styles.rootView}>
      <View style={styles.topbar}>
        <TouchableOpacity
          style={[styles.btns, {position: 'relative'}]}
          onPress={() => props.handleTab('faq', setToggle('faq'))}>
          <Text
            style={[
              styles.barTxt,
              {
                color: toggle == 'faq' ? '#002E6D' : '#393939',
              },
            ]}>
            FAQ
          </Text>
          <View
            style={{
              borderBottomColor: toggle == 'faq' ? '#002E6D' : 'transparent',
              borderBottomWidth: 2,
            }}
          />
          <View
            style={{
              borderBottomColor: toggle == 'faq' ? '#002E6D' : 'transparent',
              // borderBottomColor: '#002E6D',
              borderBottomWidth: 2,
              width: '80%',
              position: 'absolute',
              bottom: -20,
            }}
          />
        </TouchableOpacity>
        {/* <View
          style={{
            // borderBottomColor: toggle == 'faq' ? '#002E6D' : 'transparent',
            borderBottomColor: '#002E6D',
            borderBottomWidth: 2,
            width: 300,
            position: 'absolute',

          }}
        /> */}
        <TouchableOpacity
          style={[styles.btns, {position: 'relative'}]}
          onPress={() =>
            props.handleTab('gettingStarted', setToggle('gettingStarted'))
          }>
          <Text
            style={[
              styles.barTxt,
              {color: toggle == 'gettingStarted' ? '#002E6D' : '#393939'},
            ]}>
            Getting Started
          </Text>
          <View
            style={{
              borderBottomColor:
                toggle == 'gettingStarted' ? '#002E6D' : 'transparent',
              // borderBottomColor: '#002E6D',
              borderBottomWidth: 2,
              width: '80%',
              position: 'absolute',
              bottom: -20,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          borderBottomColor: '#C4C4C4',
          borderBottomWidth: 1,
        }}
      /> */}
    </View>
  );
};

export default HelpSupportTopBar;

const styles = StyleSheet.create({
  rootView: {
    marginVertical: verticalScale(20),
    justifyContent: 'center',
  },
  btns: {
    // backgroundColor: 'red',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // paddingVertical: verticalScale(20),
    // height: verticalScale(56),
  },
  barTxt: {
    fontWeight: 'bold',
    // marginBottom: verticalScale(20),
    color: '#393939',
  },
});
