import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';

const HomeScreenEmpty = () => {
  return (
    <View style={styles.rootView}>
      <View style={styles.upperBoxView}>
        <View style={styles.topView}>
          <Text style={styles.addStaffTxtMem}>Add Staff Members</Text>
          <Text style={styles.descTxt}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Text>
        </View>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.addStaffBtn}>
            <Text style={styles.addStaffTxt}>Add Staff</Text>
          </TouchableOpacity>
          <Image source={require('../../../assets/Tv.png')} />
        </View>
      </View>

      <View style={styles.middleBoxView}>
        <View style={styles.topView}>
          <Text style={styles.createGigTxt}>Want To Create a Gig</Text>
          <Text style={[styles.descTxt, {color: 'white'}]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.addStaffBtn}>
            <Text style={styles.addStaffTxt}>Create a Gig</Text>
          </TouchableOpacity>
          <Image source={require('../../../assets/toDo.png')} />
        </View>
      </View>

      <ImageBackground
        // resizeMode="contain"
        style={styles.background}
        source={require('../../../assets/Rectangle.png')}>
        <View style={styles.topTextView}>
          <Text style={styles.addStaffTxtMem}>
            Booked Workers & View Invoices
          </Text>
        </View>
        <View style={styles.bottomTextView}>
          <Text style={styles.descTxt}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreenEmpty;

const styles = StyleSheet.create({
  rootView: {
    // paddingHorizontal: moderateScale(20),
  },
  upperBoxView: {
    backgroundColor: '#C0E4EC',
    marginTop: verticalScale(50),
  },
  topView: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(20),
  },
  addStaffTxtMem: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  descTxt: {
    color: '#545454',
    marginTop: verticalScale(8),
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addStaffBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(36),
    width: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: moderateScale(16),
    borderRadius: moderateScale(4),
  },
  addStaffTxt: {
    color: '#13327C',
    fontWeight: 'bold',
  },
  middleBoxView: {
    backgroundColor: '#002E6D',
    marginVertical: verticalScale(20),
    // marginBottom: 200,
  },
  createGigTxt: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  background: {
    height: verticalScale(175),
    // backgroundColor: 'red',
    marginBottom: verticalScale(200),
  },
  topTextView: {
    // backgroundColor: 'green',
    width: '50%',
    marginTop: verticalScale(44),
    marginStart: moderateScale(16),
  },
  bottomTextView: {
    paddingHorizontal: moderateScale(16),
  },
});
