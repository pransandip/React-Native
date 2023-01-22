import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';
import Toast from 'react-native-simple-toast';
import {Icon} from 'native-base';

const {height, width} = Dimensions.get('window');

const EditEmployee = props => {
  const {details} = props.route.params;

  const delEmployee = async () => {
    let data = {
      employee_table_id: details.id,
    };

    console.log(`data------->>>`, data);

    let result = await AuthService.deleteEmployees(data);

    if (result != null && result.status) {
      Toast.show(result.data);
      Navigation.back();
    }
  };

  console.log(`details--------->>>`, details);

  const [click, setClick] = useState(false);

  // console.log('click---------', click);

  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />

      <LinearGradient
        colors={['#CCD6FB', '#EAF0FB']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.bgGradient}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.topView}>
          <Text style={styles.headingTxt}>AsanteTip</Text>
          <View style={styles.neomorphImgView}>
            <Neomorph
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphImg}>
              <Icon
                name="arrowleft"
                type="AntDesign"
                onPress={() => Navigation.back()}
                style={styles.arrowLeft}
              />
            </Neomorph>
            <Text style={styles.settingsTxt}>Edit Employee Details</Text>
          </View>
        </View>
        <NeomorphFlex
          //   inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={styles.blueBar}>
          <Text style={styles.employeeTxt}>Employee Details</Text>
        </NeomorphFlex>

        <View
          style={{
            ...styles.topView,
          }}>
          <NeomorphFlex
            //   inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphList}>
            <Text style={styles.nameTxt}>Name : {details.name}</Text>
            <Text style={styles.staffTxt}>
              Staff Number : {details.stuff_no}
            </Text>
          </NeomorphFlex>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              // placeholder="ABC2456"
              value={details.stuff_no}
              editable={false}
              placeholderTextColor={COLORS.placeholderTextColor}
              style={[styles.input, {fontFamily: 'Quicksand'}]}
            />
          </NeomorphFlex>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder="https://bit.example.com/"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={[styles.input, {fontFamily: 'Playfair-Display'}]}
            />
          </NeomorphFlex>

          <View style={styles.upperBottomView}>
            <View style={styles.leftView}>
              <Text style={styles.statusTxt}>
                Status: &nbsp;
                <Text
                  style={{
                    color: COLORS.gratitudeGreen,
                  }}>
                  Linked
                </Text>
              </Text>
              <Icon
                name="exclamationcircleo"
                type="AntDesign"
                style={styles.ExclamationIcon}
                onPress={() => setClick(!click)}
              />
            </View>

            <View style={styles.rightBtnsView}>
              <Pressable
                onPress={() => Navigation.navigate('ScanQR')}
                style={styles.socialBtn}>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.socialNeomorph}>
                  <Text style={[styles.socialTxt, {fontWeight: 'bold'}]}>
                    Scan QR
                  </Text>
                </NeomorphFlex>
              </Pressable>
              <Pressable onPress={delEmployee} style={styles.socialBtn}>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.socialNeomorph}>
                  <Text
                    style={[
                      styles.socialTxt,
                      {fontWeight: 'bold', color: '#D7384E'},
                    ]}>
                    Remove
                  </Text>
                </NeomorphFlex>
              </Pressable>
            </View>
          </View>
        </View>

        {click ? (
          <View style={styles.unionImgView}>
            <ImageBackground
              numberOfLines={1}
              resizeMode="contain"
              source={require('../../assets/union.png')}
              style={styles.unionImg}>
              <Text style={styles.unionTxt}>linked with Mpesa account</Text>
            </ImageBackground>
          </View>
        ) : null}

        <View style={{...styles.topView}}>
          <Pressable style={styles.loginBtn}>
            <NeomorphFlex
              // inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphbtn}>
              <LinearGradient
                colors={['#7E8BEE', '#5E6FE4']}
                start={{x: 0.3, y: 0}}
                end={{x: 0.7, y: 1}}
                style={styles.btnGradient}>
                <Text style={styles.loginTxt}>Save</Text>
              </LinearGradient>
            </NeomorphFlex>
          </Pressable>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default EditEmployee;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(30),

    // backgroundColor: 'red',
  },
  headingTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    alignSelf: 'center',
    fontSize: moderateScale(30),
  },
  neomorphImgView: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
    flexDirection: 'row',
    // alignItems: 'center',
    width: width,
    // paddingStart: moderateScale(20),
  },
  neomorphImg: {
    shadowRadius: moderateScale(2),
    // shadowOpacity: moderateScale(0.2),
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.statusBar,
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeft: {
    color: COLORS.blueGrey,
    fontSize: moderateScale(18),
  },
  settingsTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lovePurple,
    fontSize: moderateScale(20),
    paddingStart: moderateScale(15),
  },
  blueBar: {
    shadowRadius: 10,
    // borderRadius: 25,
    // backgroundColor: COLORS.white,
    // borderWidth: 1,
    backgroundColor: COLORS.themeColor,
    // width: width,
    height: verticalScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(20),
  },
  employeeTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.white,
    fontSize: moderateScale(14),
  },
  neomorphList: {
    shadowRadius: 5,
    borderRadius: 20,
    backgroundColor: COLORS.textInputViolet,
    // paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    // alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // width: width - 40,
    justifyContent: 'center',
    height: verticalScale(60),
    marginVertical: verticalScale(10),
  },
  nameTxt: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: moderateScale(13),
    fontFamily: 'Quicksand',
  },
  staffTxt: {
    color: COLORS.black,
    fontFamily: 'Quicksand',
    fontWeight: '600',
    fontSize: moderateScale(13),
    // fontSize: moderateScale(10),
    // backgroundColor: 'red',
  },
  neomorphInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // width: width - 70,
    // width: '100%',
    height: verticalScale(40),
    marginTop: verticalScale(10),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15),
  },
  input: {
    height: verticalScale(40),
    flex: 1,
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
  upperBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    paddingHorizontal: moderateScale(2),
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '33%',
    justifyContent: 'space-between',
  },
  statusTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
  },
  ExclamationIcon: {
    fontSize: moderateScale(12),
  },
  rightBtnsView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
    width: '55%',
    justifyContent: 'space-between',
  },
  unionImgView: {
    bottom: verticalScale(30),
    marginHorizontal: moderateScale(9),
  },
  unionImg: {
    height: verticalScale(80),
    width: moderateScale(130),
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: verticalScale(30),
    // marginRight: moderateScale(30),
  },
  unionTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(11),
  },
  socialBtn: {
    // backgroundColor: 'red',
    // marginVertical: verticalScale(20),
  },
  socialNeomorph: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(75),
    height: moderateScale(30),
    justifyContent: 'center',

    alignItems: 'center',
  },
  socialTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(10),
  },
  loginBtn: {
    width: '50%',
    alignSelf: 'center',
    // paddingHorizontal: moderateScale(30),
    height: verticalScale(50),
    marginVertical: verticalScale(30),
  },
  btnGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  neomorphbtn: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: 'transparent',
    borderWidth: 1,
    // backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  loginTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(15),
  },
});
