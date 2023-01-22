import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Toast from 'react-native-simple-toast';
import AuthService from '../../Service/AuthService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Navigation from '../../Navigation';

const {height, width} = Dimensions.get('window');

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const [typeUser, setTypeUser] = useState('');

  const forgotPass = async () => {
    // setLoading(true);
    let data = {
      email: email,
    };

    console.log(`data----------->`, data);

    let result = await AuthService.forgotPass(data);

    // console.log(`result Type--------->`, result.data.type);
    if (result != null && result.status) {
      console.log(`result Type--------->`, result.data.type);
      setTypeUser(result.data.type);
      setLoading(false);
      // console.log(`result Type--------->`, typeUser);

      if (result.data.type == 'user') {
        Navigation.navigate('Login');
      } else {
        Navigation.navigate('BusinessLogin', {type: 'email'});
      }

      Toast.show('Reset password link has been sent to your email ID');
    } else {
      setLoading(false);
      Toast.show('Enter an email ID');
    }
  };

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
          <View style={styles.logoView}>
            <View style={styles.neomorphImgView}>
              <Neomorph
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphImg}>
                <Image
                  source={require('../../assets/authLogo.png')}
                  style={styles.logo}
                />
              </Neomorph>
            </View>
          </View>
          <Text style={styles.businessTxt}>Forgot Password</Text>
          <Text style={styles.forgotPass}>
            Please provide your registered email address. We will sent reset
            password link to your email address
          </Text>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder="Enter your Email ID"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              value={email}
              onChangeText={val => setEmail(val)}
              keyboardType="email-address"
            />
          </NeomorphFlex>

          <Pressable
            // onPress={() => Navigation.navigate('HomeUser')}
            onPress={forgotPass}
            style={styles.loginBtn}>
            <NeomorphFlex
              // inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphbtn}>
              <LinearGradient
                colors={['#7E8BEE', '#5E6FE4']}
                start={{x: 0.3, y: 0}}
                end={{x: 0.7, y: 1}}
                style={styles.btnGradient}>
                <Text style={[styles.loginTxt, {fontSize: moderateScale(19)}]}>
                  Submit
                </Text>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{marginLeft: 10}}
                  />
                ) : null}
              </LinearGradient>
            </NeomorphFlex>
          </Pressable>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
  },
  topView: {
    marginTop: verticalScale(40),
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
  businessTxt: {
    fontSize: moderateScale(25),
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.lovePurple,
  },
  forgotPass: {
    // width: width,
    // paddingHorizontal: moderateScale(30),
    // paddingTop: verticalScale(8),
    fontFamily: 'Playfair-Display',
    color: COLORS.valentineBlue,
    fontWeight: '600',
    fontSize: moderateScale(11),
    marginVertical: verticalScale(20),
  },
  neomorphInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // width: width - 70,
    // width: '100%',
    height: verticalScale(40),
    // marginTop: verticalScale(20),
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Playfair-Display',
    paddingHorizontal: moderateScale(20),
    fontSize: moderateScale(14),
    color: COLORS.black,
    // height: verticalScale(00),
  },
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(30),
    height: verticalScale(50),
    marginVertical: verticalScale(30),
  },
  neomorphbtn: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: 'transparent',
    borderWidth: 1,
    // backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  btnGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    // fontSize: moderateScale(17),
  },
});
