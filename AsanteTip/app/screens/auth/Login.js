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
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import Navigation from '../../Navigation';
import CheckBox from '../../Components/CheckBox/CheckBox';
import Toast from 'react-native-simple-toast';
import AuthService from '../../Service/AuthService';
import {useDispatch} from 'react-redux';
import {setuser} from '../../Redux/reducer/User';
// import IMEI from 'react-native-imei';

const {height, width} = Dimensions.get('window');

const Login = props => {
  useEffect(() => {
    let fo = props.navigation.addListener('focus', e => {
      setEmail('');
      setMobile('');
      setPassMobile('');
      setPassEmail('');
    });
    return fo;
  }, []);

  const dispatch = useDispatch();

  // const [onChecked, setOnChecked] = useState(props.onChecked);
  const [loading, setLoading] = useState(false);

  const [toggleEmailMobile, setToggleEmailMobile] = useState('email');

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  // const [password, setPassword] = useState('');
  const [passEmail, setPassEmail] = useState('');
  const [passMobile, setPassMobile] = useState('');
  const [loginCheck, setLoginCheck] = useState('');

  const handleLogin = async () => {
    if (toggleEmailMobile === 'email') {
      let emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (emailRegx.test(email) === false) {
        Toast.show('Please enter valid email');
        return false;
      }
      if (!loginCheck) {
        Toast.show('Please check Terms and Conditions');
        return false;
      }
    } else {
      let mobileRegx = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if (mobileRegx.test(mobile) === false) {
        Toast.show('Please enter valid mobile number');
        return false;
      }
      if (!loginCheck) {
        Toast.show('Please check Terms and Conditions');
        return false;
      }
    }

    setLoading(true);
    let data = {
      // email_or_number: email,
      email_or_number: toggleEmailMobile == 'email' ? email : mobile,
      password: toggleEmailMobile == 'email' ? passEmail : passMobile,
    };
    // console.log('data=====', data);
    let result = await AuthService.login(data);
    console.log('result------', result);

    if (result != null && result.status) {
      setLoading(false);
      AuthService.setAccount(result.data);
      dispatch(setuser(result.data));
      Navigation.navigate('HomeUser', {userData: result.data});
      console.log(`result Data Type-------->`, result.data.type);
    } else if (toggleEmailMobile === 'email') {
      setLoading(false);
      Toast.show('Invalid email or password');
    } else if (toggleEmailMobile === 'mobile') {
      setLoading(false);
      Toast.show('Invalid mobile number or password');
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
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#CCD6FB', '#EAF0FB']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.bgGradient}>
          {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false}> */}
          <View style={styles.topView}>
            <View style={styles.logoView}>
              <Text
                onPress={() => Navigation.navigate('SignIn')}
                style={styles.signIn}>
                Sign up
              </Text>

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

            <Text style={styles.businessTxt}>Login</Text>

            {toggleEmailMobile === 'email' ? (
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  value={email}
                  onChangeText={val => setEmail(val)}
                />
              </NeomorphFlex>
            ) : (
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Mobile Number"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  value={mobile}
                  maxLength={18}
                  keyboardType="numeric"
                  onChangeText={val => setMobile(val)}
                />
              </NeomorphFlex>
            )}
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphInput}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={COLORS.placeholderTextColor}
                style={styles.input}
                value={toggleEmailMobile === 'email' ? passEmail : passMobile}
                onChangeText={
                  toggleEmailMobile === 'email'
                    ? val => setPassEmail(val)
                    : val => setPassMobile(val)
                }
              />
            </NeomorphFlex>

            <View style={styles.forgotPassView}>
              {toggleEmailMobile === 'email' ? (
                <Pressable
                  onPress={() => {
                    setToggleEmailMobile('mobile'),
                      setEmail(''),
                      setPassEmail('');
                  }}>
                  <Text style={styles.forgotPass}>Sign in with Mobile.</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    setToggleEmailMobile('email'),
                      setMobile(''),
                      setPassMobile('');
                  }}>
                  <Text style={styles.forgotPass}>Sign in with Email.</Text>
                </Pressable>
              )}
              <Text
                onPress={() => Navigation.navigate('ForgotPass')}
                style={styles.forgotPass}>
                Forgot Password ?
              </Text>
            </View>

            <Pressable
              // onPress={() => Navigation.navigate('HomeUser')}
              onPress={handleLogin}
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
                  <Text
                    style={[styles.loginTxt, {fontSize: moderateScale(19)}]}>
                    Login
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

            <Pressable
              onPress={() => {
                // console.log('toggleEmailMobile', toggleEmailMobile);
                Navigation.navigate('BusinessLogin', {
                  type: toggleEmailMobile === 'email' ? 'email' : 'mobile',
                });
              }}
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
                  <Text
                    style={[styles.loginTxt, {fontSize: moderateScale(15)}]}>
                    Login Business A/c
                  </Text>
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
                borderBottomWidth: 1,
                marginTop: verticalScale(5),
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

          <View style={styles.checkboxView}>
            <CheckBox onChangeVal={val => setLoginCheck(val)} />

            <Text style={styles.tcTxt}>Terms and conditions</Text>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </LinearGradient>
      </View>
    </KeyboardAwareScrollView>
    // <View style={{height: height, width: width}}>
    //   <StatusBar
    //     backgroundColor="transparent"
    //     barStyle="dark-content"
    //     translucent={true}
    //     hidden={false}
    //   />
    //   {/* <KeyboardAwareScrollView> */}
    //   {/* <ScrollView style={{flex: 1}}> */}
    //   <LinearGradient
    //     colors={['#CCD6FB', '#EAF0FB']}
    //     start={{x: 0, y: 0}}
    //     end={{x: 0, y: 1}}
    //     style={styles.bgGradient}>
    //     <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
    //       <View style={styles.topView}>
    //         <View style={styles.logoView}>
    //           <Text
    //             onPress={() => Navigation.navigate('SignIn')}
    //             style={styles.signIn}>
    //             Sign up
    //           </Text>

    //           <View style={styles.neomorphImgView}>
    //             <Neomorph
    //               inner // <- enable shadow inside of neomorph
    //               swapShadows // <- change zIndex of each shadow color
    //               style={styles.neomorphImg}>
    //               <Image
    //                 source={require('../../assets/authLogo.png')}
    //                 style={styles.logo}
    //               />
    //             </Neomorph>
    //           </View>
    //         </View>

    //         <Text style={styles.businessTxt}>Login</Text>

    //         {toggleEmailMobile === 'email' ? (
    //           <NeomorphFlex
    //             inner // <- enable shadow inside of neomorph
    //             swapShadows // <- change zIndex of each shadow color
    //             style={styles.neomorphInput}>
    //             <TextInput
    //               placeholder="Email"
    //               placeholderTextColor={COLORS.placeholderTextColor}
    //               style={styles.input}
    //               value={email}
    //               onChangeText={val => setEmail(val)}
    //             />
    //           </NeomorphFlex>
    //         ) : (
    //           <NeomorphFlex
    //             inner // <- enable shadow inside of neomorph
    //             swapShadows // <- change zIndex of each shadow color
    //             style={styles.neomorphInput}>
    //             <TextInput
    //               placeholder="Mobile Number"
    //               placeholderTextColor={COLORS.placeholderTextColor}
    //               style={styles.input}
    //               value={mobile}
    //               onChangeText={val => setMobile(val)}
    //             />
    //           </NeomorphFlex>
    //         )}
    //         <NeomorphFlex
    //           inner // <- enable shadow inside of neomorph
    //           swapShadows // <- change zIndex of each shadow color
    //           style={styles.neomorphInput}>
    //           <TextInput
    //             placeholder="Password"
    //             secureTextEntry={true}
    //             placeholderTextColor={COLORS.placeholderTextColor}
    //             style={styles.input}
    //             value={toggleEmailMobile === 'email' ? passEmail : passMobile}
    //             onChangeText={
    //               toggleEmailMobile === 'email'
    //                 ? val => setPassEmail(val)
    //                 : val => setPassMobile(val)
    //             }
    //           />
    //         </NeomorphFlex>

    //         <View style={styles.forgotPassView}>
    //           {toggleEmailMobile === 'email' ? (
    //             <Pressable onPress={() => setToggleEmailMobile('mobile')}>
    //               <Text style={styles.forgotPass}>Sign in with Mobile.</Text>
    //             </Pressable>
    //           ) : (
    //             <Pressable onPress={() => setToggleEmailMobile('email')}>
    //               <Text style={styles.forgotPass}>Sign in with Email.</Text>
    //             </Pressable>
    //           )}
    //           <Text
    //             onPress={() => Navigation.navigate('ForgotPass')}
    //             style={styles.forgotPass}>
    //             Forgot Password ?
    //           </Text>
    //         </View>

    //         <Pressable
    //           // onPress={() => Navigation.navigate('HomeUser')}
    //           onPress={handleLogin}
    //           style={styles.loginBtn}>
    //           <NeomorphFlex
    //             // inner // <- enable shadow inside of neomorph
    //             swapShadows // <- change zIndex of each shadow color
    //             style={styles.neomorphbtn}>
    //             <LinearGradient
    //               colors={['#7E8BEE', '#5E6FE4']}
    //               start={{x: 0.3, y: 0}}
    //               end={{x: 0.7, y: 1}}
    //               style={styles.btnGradient}>
    //               <Text
    //                 style={[styles.loginTxt, {fontSize: moderateScale(19)}]}>
    //                 Login
    //               </Text>
    //               {loading ? (
    //                 <ActivityIndicator
    //                   size="small"
    //                   color="#fff"
    //                   style={{marginLeft: 10}}
    //                 />
    //               ) : null}
    //             </LinearGradient>
    //           </NeomorphFlex>
    //         </Pressable>

    //         <Pressable
    //           onPress={() => {
    //             // console.log('toggleEmailMobile', toggleEmailMobile);
    //             Navigation.navigate('BusinessLogin', {
    //               type: toggleEmailMobile === 'email' ? 'email' : 'mobile',
    //             });
    //           }}
    //           style={styles.loginBtn}>
    //           <NeomorphFlex
    //             // inner // <- enable shadow inside of neomorph
    //             swapShadows // <- change zIndex of each shadow color
    //             style={styles.neomorphbtn}>
    //             <LinearGradient
    //               colors={['#7E8BEE', '#5E6FE4']}
    //               start={{x: 0.3, y: 0}}
    //               end={{x: 0.7, y: 1}}
    //               style={styles.btnGradient}>
    //               <Text
    //                 style={[styles.loginTxt, {fontSize: moderateScale(15)}]}>
    //                 Login Business A/c
    //               </Text>
    //             </LinearGradient>
    //           </NeomorphFlex>
    //         </Pressable>
    //       </View>

    //       <View style={styles.continueView}>
    //         <View
    //           style={{
    //             borderBottomColor: COLORS.whiteAsh,
    //             borderBottomWidth: 1,
    //             marginTop: verticalScale(5),
    //             width: '35%',
    //           }}
    //         />
    //         <Text style={styles.continueTxt}>or continue with</Text>
    //         <View
    //           style={{
    //             borderBottomColor: COLORS.whiteAsh,
    //             borderBottomWidth: 1,
    //             marginTop: verticalScale(5),
    //             width: '35%',
    //           }}
    //         />
    //       </View>

    //       <View style={styles.socialBtnsView}>
    //         <Pressable>
    //           <Neomorph
    //             // inner // <- enable shadow inside of neomorph
    //             swapShadows // <- change zIndex of each shadow color
    //             style={styles.socialNeomorph}>
    //             <View
    //               style={[
    //                 styles.socialView,
    //                 {paddingHorizontal: moderateScale(25)},
    //               ]}>
    //               <Image
    //                 source={require('../../assets/google.png')}
    //                 style={styles.googleIcon}
    //               />
    //               <Text style={styles.socialTxt}>Google</Text>
    //             </View>
    //           </Neomorph>
    //         </Pressable>
    //         <Pressable>
    //           <Neomorph
    //             // inner // <- enable shadow inside of neomorph
    //             swapShadows // <- change zIndex of each shadow color
    //             style={styles.socialNeomorph}>
    //             <View style={styles.socialView}>
    //               <Icon
    //                 name="facebook-square"
    //                 type="AntDesign"
    //                 style={styles.FBIcon}
    //               />
    //               <Text style={styles.socialTxt}>Facebook</Text>
    //             </View>
    //           </Neomorph>
    //         </Pressable>
    //       </View>

    //       <View style={styles.checkboxView}>
    //         <CheckBox onChangeVal={val => setLoginCheck(val)} />

    //         <Text style={styles.tcTxt}>Terms and conditions</Text>
    //       </View>
    //     </KeyboardAwareScrollView>
    //   </LinearGradient>
    //   {/* </ScrollView> */}
    //   {/* </KeyboardAwareScrollView> */}
    // </View>
  );
};

export default Login;

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
  },
  input: {
    fontFamily: 'Playfair-Display',
    paddingHorizontal: moderateScale(20),
    fontSize: moderateScale(14),
    // height: verticalScale(00),
    color: COLORS.black,
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
    fontSize: moderateScale(14),
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
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
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
    // fontSize: moderateScale(17),
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
