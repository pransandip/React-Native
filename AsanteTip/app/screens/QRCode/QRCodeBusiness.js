import {
  StyleSheet,
  Text,
  View,
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
import AuthService from '../../Service/AuthService';
import Navigation from '../../Navigation';

const {height, width} = Dimensions.get('window');

const QRCodeBusiness = props => {
  const {userData} = props.route.params;

  // console.log(`qrCode----------`, userData);

  return (
    <View style={{flex: 1}}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topView}>
            <View style={styles.logoView}>
              <View style={styles.neomorphImgView}>
                <Neomorph
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphImg}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/cardLogo.png')}
                    style={styles.logo}
                  />
                </Neomorph>
              </View>
            </View>
            <Text style={styles.uniqueTxt}>
              This is your employee’s UNIQUE QR code
            </Text>
            <View style={styles.qrView}>
              <Image
                // resizeMode="contain"
                source={{
                  uri: userData,
                }}
                style={styles.qrCode}
              />
              <Text style={styles.showTxt}>Show this QR to receive tips</Text>
            </View>
            <NeomorphFlex
              inner
              swapShadows
              style={{
                shadowRadius: moderateScale(2),
                borderRadius: moderateScale(10),
                backgroundColor: COLORS.textInputViolet,
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginTop: verticalScale(20),
                height: verticalScale(40),
                justifyContent: 'space-between',
              }}>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="https://bit.example.com/"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                />
              </NeomorphFlex>
              <Pressable
                style={{
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={{
                    ...styles.neomorphInput,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // width: '20%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Playfair-Display',
                      fontSize: moderateScale(15),
                      color: COLORS.black,
                    }}>
                    Copy
                  </Text>
                </NeomorphFlex>
              </Pressable>
            </NeomorphFlex>
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
                  <Text style={styles.loginTxt}>Share QR code</Text>
                </LinearGradient>
              </NeomorphFlex>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default QRCodeBusiness;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginVertical: verticalScale(40),
    paddingHorizontal: moderateScale(34),
    // backgroundColor: 'red',
  },
  logoView: {
    // backgroundColor: 'red',
  },
  neomorphImgView: {
    // marginTop: verticalScale(20),
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  neomorphImg: {
    shadowRadius: moderateScale(10),
    // shadowOpacity: moderateScale(0.2),
    // borderRadius: moderateScale(25),
    backgroundColor: COLORS.statusBar,
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: moderateScale(130),
    width: moderateScale(130),
  },
  uniqueTxt: {
    textAlign: 'center',
    fontFamily: 'Playfair-Display',
    // fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: '600',
    color: COLORS.lovePurple,
    fontSize: moderateScale(18),
    marginTop: verticalScale(20),
  },
  qrView: {
    alignSelf: 'center',
    marginTop: verticalScale(40),
  },
  qrCode: {
    height: moderateScale(200),
    width: moderateScale(200),
  },
  showTxt: {
    textAlign: 'center',
    fontFamily: 'Playfair-Display',
    fontSize: moderateScale(8),
    marginTop: verticalScale(10),
    color: COLORS.black,
  },
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(30),
    height: verticalScale(50),
    marginTop: verticalScale(30),
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
  neomorphInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    width: '75%',
    // width: '100%',

    height: verticalScale(40),
    marginTop: verticalScale(20),
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Playfair-Display',
    paddingHorizontal: moderateScale(20),
    color: COLORS.black,
  },
});
