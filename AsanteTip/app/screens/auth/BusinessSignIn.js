import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Icon} from 'native-base';
import Navigation from '../../Navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '../../Components/CheckBox/CheckBox';
import Toast from 'react-native-simple-toast';
import AuthService from '../../Service/AuthService';
import {useDispatch} from 'react-redux';
import {setuser} from '../../Redux/reducer/User';

const {height, width} = Dimensions.get('window');

const BusinessSignIn = props => {
  const dispatch = useDispatch();
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);

  // const [passVal, setPassVal] = useState(false);

  // const [togglePassEye, setTogglePassEye] = useState(true);

  // const [reEnterTogglePassEye, setReEnterTogglePassEye] = useState(true);

  // const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [businessSigninCheck, setBusinessSigninCheck] = useState('');

  // const hideShowIcon = () => {
  //   setTogglePassEye(!togglePassEye);
  // };

  // const reEnterHideShowIcon = () => {
  //   setReEnterTogglePassEye(!reEnterTogglePassEye);
  // };

  // const passwordCheck = async val => {
  //   let number = false;
  //   let upperC = false;
  //   let lowerC = false;

  //   setPassword(val);

  //   let numReg = /\d/;
  //   let lowerCase = /[a-z]/;
  //   let upperCase = /[A-Z]/;

  //   if (numReg.test(val) == true) {
  //     // console.log(`number====>`, password);
  //     number = true;
  //   }

  //   if (lowerCase.test(val) == true) {
  //     // console.log(`loweCase====>`, password);
  //     upperC = true;
  //   }

  //   if (upperCase.test(val) == true) {
  //     // console.log(`upperCase=====>`, password);
  //     lowerC = true;
  //   }

  //   if (number && upperC && lowerC && val.length >= 7) {
  //     setPassVal(false);
  //   } else {
  //     setPassVal(true);
  //   }
  // };

  // const handleRegister = async () => {
  //   if (businessSigninCheck == true) {
  //     if (email != '' && password != '' && confirmPassword != '' && !passVal) {
  //       let emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  //       if (emailRegx) {
  //         if (emailRegx.test(email) === false) {
  //           Toast.show('Please Enter Valid Email');
  //           return false;
  //         }
  //       }

  //       setLoading(true);
  //       let data = {
  //         email: email,
  //         password: password,
  //         confirm_password: confirmPassword,
  //       };

  //       let result = await AuthService.businessRegister(data);
  //       // console.log('result------', result);

  //       if (result != null && result.status) {
  //         setLoading(false);
  //         // AuthService.setAccount(result.data);
  //         // dispatch(setuser(result.data));
  //         Navigation.navigate('BusinessInformation', {userData: result.data});
  //         // AuthService.setAccount(result.data);
  //         // console.log(`result.data--------->`, result.data);
  //       } else {
  //         setLoading(false);
  //         Toast.show(result.error);
  //       }
  //     } else {
  //       Toast.show('All fields required');
  //     }
  //   } else {
  //     Toast.show('Please check Terms and Conditions');
  //   }
  // };
  const [passVal, setPassVal] = useState(false);

  const [togglePassEye, setTogglePassEye] = useState(true);

  const [reEnterTogglePassEye, setReEnterTogglePassEye] = useState(true);
  const [emailMobVal, setEmailMobVal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailMobile, setEmailMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [signinCheck, setSigninCheck] = useState('');

  const hideShowIcon = () => {
    setTogglePassEye(!togglePassEye);
  };

  const passwordCheck = async val => {
    let number = false;
    let upperC = false;
    let lowerC = false;
    setPassword(val);
    let numberReg = /\d/;
    let lowerCase = /[a-z]/;
    let upperCase = /[A-Z]/;

    if (numberReg.test(val) == true) {
      // console.log('number===', password);
      number = true;
    }
    if (lowerCase.test(val) == true) {
      // console.log('lowerCase===', password);
      upperC = true;
    }
    if (upperCase.test(val) == true) {
      // console.log('upperCase===', password);
      lowerC = true;
    }

    if (number && upperC && lowerC && val.length >= 7) {
      setPassVal(false);
    } else {
      setPassVal(true);
    }
  };

  const reEnterHideShowIcon = () => {
    setReEnterTogglePassEye(!reEnterTogglePassEye);
  };

  const handleRegister = async () => {
    const valid = validation();

    if (valid) {
      let data = {
        email: emailMobile,
        password: password,
        confirm_password: confirmPassword,
      };
      console.log('data-----------', data);
      let result = await AuthService.businessRegister(data);

      // console.log('result-----------', result);

      if (result != null && result.status) {
        setLoading(false);
        // AuthService.setAccount(result.data);
        // dispatch(setuser(result.data));
        Navigation.navigate('BusinessInformation', {
          userData: result.data,
        });
      } else {
        setLoading(false);
        Toast.show(result.error);
      }
    }
  };

  const validation = () => {
    let numberRegx = /^[1-9]\d*$/;
    let mobileRegx = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    let emailRegx =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;
    // console.log('emailRegx----', email, mobile);

    if (!emailMobile.match(numberRegx) && !emailMobile.match(emailRegx)) {
      setEmailMobVal(true);
    } else {
      setEmailMobVal(false);
    }

    if (!emailMobile.match(numberRegx) && !emailMobile.match(emailRegx)) {
      Toast.show('Please enter a valid email');
      return false;
    }

    if (!emailMobile.match(mobileRegx) && emailMobile.match(numberRegx)) {
      // console.log('provide ph', val.length);
      Toast.show('Please enter a valid mobile number');
      return false;
    }

    if (passVal) {
      if (password != confirmPassword) {
        Toast.show('Password not matched');
        return false;
      }
      Toast.show(
        'Password must be atleat 7 characters, 1 lowercase, 1 uppercase and 1 number',
      );
      return false;
    }

    if (!businessSigninCheck) {
      Toast.show('Please check Terms and Conditions');
      return false;
    }

    return true;
  };

  const chackEmail = val => {
    setEmailMobile(val);

    let numberRegx = /^[1-9]\d*$/;
    let mobileRegx = /^(\+\d{1,3}[- ]?)?\d{9}$/;
    let emailRegx =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;

    if (!emailMobile.match(numberRegx) && !emailMobile.match(emailRegx)) {
      setEmailMobVal(true);
    } else if (
      !emailMobile.match(mobileRegx) &&
      emailMobile.match(numberRegx)
    ) {
      setEmailMobVal(true);
    } else {
      setEmailMobVal(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{flex: 1}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />
      {/* <KeyboardAwareScrollView style={{height: height, width: width}}> */}
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

          <Text style={styles.businessTxt}>Business Sign Up</Text>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder=" Company’s Email or mobile number"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              // value={email}
              value={emailMobile}
              onChangeText={val => chackEmail(val)}
            />
          </NeomorphFlex>
          {emailMobVal ? (
            <Text style={styles.passValTxt}>
              Please enter valid email or mobile number
            </Text>
          ) : null}
          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
              ...styles.neomorphInput,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Create Password"
              secureTextEntry={togglePassEye ? true : false}
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              value={password}
              // onChangeText={val => setPassword(val)}

              onChangeText={val => passwordCheck(val)}
            />

            <Pressable onPress={() => hideShowIcon()}>
              <Image
                source={
                  togglePassEye
                    ? require('../../assets/passHide.png')
                    : require('../../assets/passShow.png')
                }
                style={styles.hideShowIcon}
              />
            </Pressable>
          </NeomorphFlex>
          {passVal ? (
            <Text style={styles.passValTxt}>
              Password must be atleat 7 characters, 1 lowercase, 1 uppercase and
              1 number
            </Text>
          ) : null}
          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
              ...styles.neomorphInput,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Re-enter Password"
              secureTextEntry={reEnterTogglePassEye ? true : false}
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              value={confirmPassword}
              onChangeText={val => setConfirmPassword(val)}
            />

            <Pressable onPress={() => reEnterHideShowIcon()}>
              <Image
                source={
                  reEnterTogglePassEye
                    ? require('../../assets/passHide.png')
                    : require('../../assets/passShow.png')
                }
                style={styles.hideShowIcon}
              />
            </Pressable>
          </NeomorphFlex>
          <Pressable
            // onPress={() => Navigation.navigate('BusinessInformation')}
            onPress={handleRegister}
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
                <Text style={styles.loginTxt}>Sign up</Text>
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

        <View style={styles.continueView}>
          <View
            style={{
              borderBottomColor: COLORS.whiteAsh,
              borderBottomWidth: 1,
              marginTop: verticalScale(5),
              width: '35%',
            }}
          />
          <Text style={styles.continueTxt}>or continue with</Text>
          <View
            style={{
              borderBottomColor: COLORS.whiteAsh,
              marginTop: verticalScale(5),
              borderBottomWidth: 1,
              width: '35%',
            }}
          />
        </View>

        <View style={styles.socialBtnsView}>
          <Pressable>
            <Neomorph
              // inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.socialNeomorph}>
              <View
                style={[
                  styles.socialView,
                  {paddingHorizontal: moderateScale(25)},
                ]}>
                <Image
                  source={require('../../assets/google.png')}
                  style={styles.googleIcon}
                />
                <Text style={styles.socialTxt}>Google</Text>
              </View>
            </Neomorph>
          </Pressable>
          <Pressable>
            <Neomorph
              // inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.socialNeomorph}>
              <View style={styles.socialView}>
                <Icon
                  name="facebook-square"
                  type="AntDesign"
                  style={styles.FBIcon}
                />
                <Text style={styles.socialTxt}>Facebook</Text>
              </View>
            </Neomorph>
          </Pressable>
        </View>

        {/* <View style={styles.checkboxView}>
            <Neomorph
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphCheckBox}></Neomorph>
            <Text style={styles.tcTxt}>Terms and conditions</Text>
          </View> */}

        <View style={styles.checkboxView}>
          <CheckBox onChangeVal={val => setBusinessSigninCheck(val)} />
          <Text style={styles.tcTxt}>Terms and conditions</Text>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
      {/* </KeyboardAwareScrollView> */}
    </KeyboardAwareScrollView>
  );
};

export default BusinessSignIn;

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

  signIn: {
    right: 0,
    color: COLORS.lovePurple,
    position: 'absolute',
    top: 0,
    fontSize: moderateScale(15),
    // width: width,
    // paddingHorizontal: moderateScale(20),
    fontFamily: 'Playfair-Display',
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

  neomorphInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // width: width - 70,
    // width: '100%',
    height: verticalScale(40),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15),
  },
  input: {
    fontFamily: 'Playfair-Display',
    height: verticalScale(40),
    flex: 1,
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
  hideShowIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: COLORS.lovePurple,
  },
  passValTxt: {
    color: 'red',
    fontSize: moderateScale(10),
    // textAlign: 'center',
    marginStart: moderateScale(10),
  },
  forgotPassView: {
    flexDirection: 'row',
    // width: width,

    alignItems: 'center',
    // backgroundColor: 'red',
    paddingTop: verticalScale(8),
    justifyContent: 'space-evenly',
  },
  forgotPass: {
    // width: width,
    // paddingHorizontal: moderateScale(30),
    // paddingTop: verticalScale(8),
    fontFamily: 'Playfair-Display',
    color: COLORS.valentineBlue,
    fontWeight: '600',
  },
  // btnsView: {
  //   width: '80%',
  //   marginTop: verticalScale(20),
  // },
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
    flexDirection: 'row',
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
    fontSize: moderateScale(19),
  },
  continueView: {
    flexDirection: 'row',
    width: width,
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  continueTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lightPurple,
  },
  socialBtnsView: {
    // marginBottom: verticalScale(50),
    width: width,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(30),
  },

  socialNeomorph: {
    shadowRadius: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(130),
    height: moderateScale(30),
    justifyContent: 'center',
  },
  socialView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: moderateScale(20),
  },
  googleIcon: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  FBIcon: {
    color: COLORS.facebookIcon,
    fontSize: moderateScale(20),
  },
  socialTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
  checkboxView: {
    // width: width,
    // paddingHorizontal: moderateScale(20),
    width: width,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: moderateScale(90),
    marginBottom: verticalScale(40),
  },
  neomorphCheckBox: {
    shadowRadius: moderateScale(2),
    // borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(20),
    height: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tcTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lovePurple,
    fontWeight: '600',
    fontSize: moderateScale(13),
  },
});
