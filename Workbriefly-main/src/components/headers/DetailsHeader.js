import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import axios from 'axios';

import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const DetailsHeader = (props) => {
  const [saved, setSaved] = useState(false);

  const call = () => {
    // props.menuModal()
    props.handleModal(true);
  };

  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      {/* <View style={styles.headerView} > */}
      <TouchableOpacity onPress={() => props.back()}>
        <Icon name="arrowleft" type="AntDesign" style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
      <View style={styles.rightView}>
        {/* <TouchableOpacity
            onPress={() => {
              setSaved(!saved);
            }}>
            {saved ? (
              <Icon
                name="favorite"
                type="MaterialIcons"
                // onPress={()=>props.favmodal()}
                style={[styles.arrow, {fontSize: moderateScale(23)}]}
              />
            ) : (
              <Icon
                name="favorite-border"
                type="MaterialIcons"
                // onPress={()=>props.favmodal()}
                style={[styles.arrow, {fontSize: moderateScale(23)}]}
              />
            )}
          </TouchableOpacity> */}

        <Pressable
          // onPress={() => props.menuModal()}
          // onPress={alert('sayak')}
          disabled={props.disable ? true : false}>
          <Icon
            name="dots-three-vertical"
            type="Entypo"
            //  onPress={()=>{console.log('clicked')}}
            // onPress={() => props.menuModal()}
            onPress={call}
            style={[
              styles.arrow,
              {
                color: props.disable ? 'transparent' : 'white',
                fontSize: moderateScale(17),
              },
            ]}
          />
        </Pressable>
      </View>

      {/* </View> */}
    </View>
  );
};

export default DetailsHeader;

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
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    //   width: moderateScale(45),
    justifyContent: 'space-between',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    color: 'white',
  },
});
