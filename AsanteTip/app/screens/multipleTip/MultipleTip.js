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
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const MultipleTip = props => {
  // const [hideStaff, setHideStaff] = useState('');
  const Navigation = useNavigation();
  const {id} = props.route.params;
  const [businessUserID, setBusinessUserID] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let fo = props.navigation.addListener('focus', e => {
      setBusinessUserID('');
    });
    return fo;

    getAccount();

    const unsubscribe = Navigation.addListener('focus', () => {
      console.log('id================', id);
      if (id != '') {
        setBusinessUserID(id);
      }
      setRefresh(!refresh);
    });
    return unsubscribe;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    // console.log(`result------------>`, result);
  };

  const fetchData = async val => {
    if (businessUserID != '') {
      let data = {
        bussiness_or_user: businessUserID,
      };

      // console.log(`ID------------>>>`, data);

      let result = await AuthService.searchTransaction(data);
      if (result != null && result.status && result.data.type == 'bussiness') {
        console.log(`result---------->>>`, result.data.type, result.status);
        Navigation.navigate('MultipleTipAmount', {userData: result});
      } else {
        Toast.show('Please enter valid business ID');
      }
    } else {
      Toast.show('Please provide valid id!!!');
    }
  };

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
            <Text style={styles.headingTxt}>AsanteTip</Text>
            <View style={styles.neomorphImgView}>
              <Neomorph
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphImg}>
                <Icon
                  name="arrowleft"
                  onPress={() => Navigation.goBack()}
                  type="AntDesign"
                  style={styles.arrowLeft}
                />
              </Neomorph>
              <Text style={styles.settingsTxt}>Pay multiple Tip</Text>
            </View>
            <NeomorphFlex
              // inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.centerCard}>
              <LinearGradient
                colors={['#EAF0FB', '#CCD6FB']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.cardGradient}>
                {/* <View style={styles.selectStaffView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Pressable
                      onPress={() => setHideStaff(!hideStaff)}
                      style={styles.socialBtn}>
                      <NeomorphFlex
                        // inner // <- enable shadow inside of neomorph
                        swapShadows // <- change zIndex of each shadow color
                        style={styles.socialNeomorph}>
                        <Text style={styles.socialTxt}>Select Staff</Text>
                        <Icon
                          // name="chevron-small-down"
                          name={
                            hideStaff
                              ? 'chevron-small-up'
                              : 'chevron-small-down'
                          }
                          type="Entypo"
                          style={styles.downAngle}
                        />
                      </NeomorphFlex>
                    </Pressable>
                    <View>
                      <NeomorphFlex style={styles.amountNeomorphOuter}>
                        <NeomorphFlex inner style={styles.amountNeomorphInner}>
                          <Text style={styles.normalTxt}>30 USD</Text>
                        </NeomorphFlex>
                      </NeomorphFlex>
                    </View>
                  </View>

                  {hideStaff ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: moderateScale(10),
                      }}>
                      <NeomorphFlex
                        inner // <- enable shadow inside of neomorph
                        swapShadows // <- change zIndex of each shadow color
                        style={styles.chooseStaffNeomorph}>
                        <Text style={styles.normalTxt}>Choose Staff</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            marginVertical: verticalScale(5),
                            width: '60%',
                          }}
                        />
                        <Text style={styles.normalTxt}>Staff 1</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            width: '60%',
                            marginVertical: verticalScale(5),
                          }}
                        />
                        <Text style={styles.normalTxt}>Staff 2</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            width: '60%',
                            marginVertical: verticalScale(5),
                          }}
                        />
                        <Text style={styles.normalTxt}>Staff 3</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            width: '60%',
                            marginVertical: verticalScale(5),
                          }}
                        />
                      </NeomorphFlex>
                      <NeomorphFlex
                        inner // <- enable shadow inside of neomorph
                        swapShadows // <- change zIndex of each shadow color
                        style={styles.splitAmountNeomorph}>
                        <Text style={styles.normalTxt}>Split</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            marginVertical: verticalScale(5),
                            width: '60%',
                          }}
                        />
                        <Text style={styles.normalTxt}>10$</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            width: '60%',
                            marginVertical: verticalScale(5),
                          }}
                        />
                        <Text style={styles.normalTxt}>10$</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            width: '60%',
                            marginVertical: verticalScale(5),
                          }}
                        />
                        <Text style={styles.normalTxt}>10$</Text>
                        <View
                          style={{
                            borderBottomColor: COLORS.whiteAsh,
                            borderBottomWidth: 2,
                            width: '60%',
                            marginVertical: verticalScale(5),
                          }}
                        />
                      </NeomorphFlex>
                    </View>
                  ) : null}

                  <Pressable
                    // onPress={() => setHideStaff(!hideStaff)}
                    style={styles.allStaffNeomorphBtn}>
                    <NeomorphFlex
                      // inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      style={styles.allStaffNeomorph}>
                      <Text style={styles.socialTxt}>Select all Staff</Text>
                    </NeomorphFlex>
                  </Pressable>
                  <Pressable
                    // onPress={() => setHideStaff(!hideStaff)}
                    style={styles.allStaffNeomorphBtn}>
                    <NeomorphFlex
                      // inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      style={styles.allStaffNeomorph}>
                      <Text style={styles.socialTxt}>
                        Divide to all equally
                      </Text>
                    </NeomorphFlex>
                  </Pressable>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: verticalScale(20),
                    }}>
                    <Text style={styles.socialTxt}>AsanteTip Balance</Text>
                    <Text style={styles.socialTxt}>$100</Text>
                  </View>
                </View> */}
                {/* <Pressable
                  // onPress={() => Navigation.navigate('HomeUser')}
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
                      <Text style={styles.loginTxt}>Add Money to Wallet</Text>
                    </LinearGradient>
                  </NeomorphFlex>
                </Pressable> */}

                <View style={{paddingHorizontal: moderateScale(10)}}>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Search ID"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      // editable={textInputEditable ? true : false}
                      // keyboardType="numeric"
                      // value={'9738114332'}
                      value={businessUserID}
                      // onChangeText={val => setCustomerMobile(val)}
                      onChangeText={val => setBusinessUserID(val)}
                      style={styles.input}
                    />
                  </NeomorphFlex>

                  <Pressable onPress={fetchData} style={styles.TipBtn}>
                    <NeomorphFlex
                      // inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      style={styles.neomorphTipbtn}>
                      <LinearGradient
                        colors={['#7E8BEE', '#5E6FE4']}
                        start={{x: 0.3, y: 0}}
                        end={{x: 0.7, y: 1}}
                        style={styles.btnTipGradient}>
                        <Text style={styles.TipTxt}>PAY TIP</Text>
                      </LinearGradient>
                    </NeomorphFlex>
                  </Pressable>
                </View>
                <View
                  style={{
                    borderBottomColor: COLORS.whiteAsh,
                    borderBottomWidth: 1,
                    marginVertical: verticalScale(20),
                    // width: '30%',
                  }}
                />

                <Pressable
                  onPress={() =>
                    // Navigation.navigate('ScanQR', {name: 'MultipleTip'})
                    Navigation.navigate('ScanQRStack', {name: 'MultipleTip'})
                  }
                  style={styles.socialBtn}>
                  <NeomorphFlex
                    // inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.socialNeomorph}>
                    <Text style={styles.socialTxt}>Scan QR</Text>
                  </NeomorphFlex>
                </Pressable>
              </LinearGradient>
            </NeomorphFlex>
            {/* <Pressable
              // onPress={() => Navigation.navigate('HomeUser')}
              style={styles.TipBtn}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphTipbtn}>
                <LinearGradient
                  colors={['#7E8BEE', '#5E6FE4']}
                  start={{x: 0.3, y: 0}}
                  end={{x: 0.7, y: 1}}
                  style={styles.btnTipGradient}>
                  <Text style={styles.TipTxt}>PAY TIP</Text>
                </LinearGradient>
              </NeomorphFlex>
            </Pressable> */}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default MultipleTip;

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
  centerCard: {
    shadowRadius: 5,
    borderRadius: 25,
    backgroundColor: 'transparent',
    //   width: 150,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: COLORS.socialBtnColor,
    borderLeftColor: COLORS.socialBtnColor,
    // height: verticalScale(500),
    height: verticalScale(361),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
    // marginTop: verticalScale(40),
  },
  cardGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 25,
    justifyContent: 'center',
  },
  // selectStaffView: {
  //   // flexDirection: 'row',
  //   // alignItems: 'center',
  //   // justifyContent: 'space-between',
  //   paddingHorizontal: moderateScale(20),
  // },
  // // socialBtn: {
  // //   // backgroundColor: 'red',
  // //   width: '65%',
  // //   marginVertical: verticalScale(20),
  // //   borderRadius: moderateScale(30),
  // // },
  // // socialNeomorph: {
  // //   shadowRadius: moderateScale(5),
  // //   borderRadius: moderateScale(30),
  // //   backgroundColor: COLORS.socialBtnColor,
  // //   // width: moderateScale(180),
  // //   height: moderateScale(40),
  // //   justifyContent: 'space-between',
  // //   flexDirection: 'row',
  // //   paddingHorizontal: moderateScale(25),
  // //   alignItems: 'center',
  // // },
  // // socialTxt: {
  // //   fontFamily: 'Quicksand',
  // //   color: COLORS.black,
  // //   fontSize: moderateScale(14),
  // // },
  // downAngle: {
  //   color: COLORS.black,
  //   fontSize: moderateScale(18),
  // },

  // amountNeomorphOuter: {
  //   shadowRadius: 3,
  //   borderRadius: 100,
  //   backgroundColor: COLORS.textInputViolet,
  //   width: 80,
  //   height: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // amountNeomorphInner: {
  //   shadowRadius: 2,
  //   borderRadius: 90,
  //   backgroundColor: COLORS.textInputViolet,
  //   width: 60,
  //   height: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // normalTxt: {
  //   fontFamily: 'Quicksand',
  //   color: COLORS.black,
  // },
  // chooseStaffNeomorph: {
  //   height: verticalScale(150),
  //   width: '50%',
  //   shadowRadius: 3,
  //   borderRadius: moderateScale(20),
  //   backgroundColor: COLORS.textInputViolet,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // paddingHorizontal: moderateScale(30),

  //   // alignSelf: 'center',
  //   // marginVertical: verticalScale(15),
  // },
  // splitAmountNeomorph: {
  //   height: verticalScale(150),
  //   shadowRadius: 3,
  //   width: '35%',
  //   borderRadius: moderateScale(20),
  //   backgroundColor: COLORS.textInputViolet,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // paddingHorizontal: moderateScale(30),

  //   // alignSelf: 'center',
  //   // marginVertical: verticalScale(15),
  // },
  // allStaffNeomorphBtn: {
  //   // backgroundColor: 'red',
  //   width: '80%',
  //   alignSelf: 'center',
  //   marginTop: verticalScale(20),
  //   borderRadius: moderateScale(30),
  // },
  // allStaffNeomorph: {
  //   shadowRadius: moderateScale(5),
  //   borderRadius: moderateScale(30),
  //   backgroundColor: COLORS.socialBtnColor,
  //   // width: moderateScale(180),
  //   height: moderateScale(40),
  //   justifyContent: 'center',
  //   flexDirection: 'row',
  //   paddingHorizontal: moderateScale(25),
  //   alignItems: 'center',
  // },
  // loginBtn: {
  //   // backgroundColor: 'red',
  //   paddingHorizontal: moderateScale(50),
  //   height: verticalScale(40),
  //   // marginTop: verticalScale(20),
  // },
  // btnGradient: {
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: moderateScale(15),
  // },
  // neomorphbtn: {
  //   shadowRadius: moderateScale(5),
  //   borderRadius: moderateScale(15),
  //   backgroundColor: 'transparent',
  //   borderWidth: 1,
  //   // backgroundColor: COLORS.white,
  //   borderColor: COLORS.white,
  // },
  // loginTxt: {
  //   fontFamily: 'Quicksand',
  //   color: COLORS.white,
  //   fontSize: moderateScale(15),
  // },
  TipBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(50),
    height: verticalScale(50),
    // marginVertical: verticalScale(40),
  },
  neomorphTipbtn: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(30),
    backgroundColor: 'transparent',
    borderWidth: 1,
    // backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  btnTipGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
  },
  TipTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(15),
  },

  // New styles

  neomorphInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // width: width - 70,
    // width: '100%',
    height: verticalScale(40),
    marginVertical: verticalScale(20),
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Playfair-Display',
    paddingHorizontal: moderateScale(20),
    color: COLORS.placeholderTextColor,
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  socialBtn: {
    // backgroundColor: 'red',
    paddingHorizontal: moderateScale(30),
    marginVertical: verticalScale(20),
  },
  socialNeomorph: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    // width: moderateScale(180),
    height: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.valentineBlue,
    fontSize: moderateScale(14),
  },
});
