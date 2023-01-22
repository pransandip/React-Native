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

import AuthService from '../../Service/AuthService';
import Navigation from '../../Navigation';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('window');

const CardBankSetup = () => {
  const [togglecardBank, setTogglecardBank] = useState('card');

  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  //   const toggle = () => {
  //     setTogglecardBank(!togglecardBank);
  //   };

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`loginID--------------->>>>`, result);
    setId(result.type == 'user' ? result.user_id : result.bussiness_id);
    setType(result.type);
  };

  const addAccount = async () => {
    let request;

    if (
      accountNumber != '' &&
      ifscCode != '' &&
      accountHolderName != '' &&
      bankName != '' &&
      branchName != ''
    ) {
      let request;
      if (type == 'user') {
        let data = {
          user_id: id,
          bank_name: bankName,
          branch_name: branchName,
          Ifsc_code: ifscCode,
          account_holder_name: accountHolderName,
          account_number: accountNumber,
        };

        // console.log(`Account Data------------>>>>`, data);

        request = await AuthService.addUserBankAccounts(data);
        if (request != null && request.status) {
          // console.log(`User bank Account-------------->>>`, request);

          Navigation.navigate('HomeUser');
          Toast.show('Bank Account Added');
        }
      } else {
        let data = {
          bussiness_id: id,
          bank_name: bankName,
          branch_name: branchName,
          Ifsc_code: ifscCode,
          account_holder_name: accountHolderName,
          account_number: accountNumber,
        };

        // console.log(`Account Data------------>>>>`, data);

        request = await AuthService.addBusinessBankAccounts(data);
        if (request != null && request.status) {
          // console.log(`User bank Account-------------->>>`, request);

          Navigation.navigate('HomeBusiness');
          Toast.show('Bank Account Added');
        }
      }
    } else {
      Toast.show('All fields required');
    }

    // if (type == 'user') {
    //   let data = {
    //     user_id: id,
    //     bank_name: bankName,
    //     branch_name: branchName,
    //     Ifsc_code: ifscCode,
    //     account_holder_name: accountHolderName,
    //     account_number: accountNumber,
    //   };

    //   // console.log(`Account Data------------>>>>`, data);

    //   request = await AuthService.addUserBankAccounts(data);
    //   if (request != null && request.status) {
    //     // console.log(`User bank Account-------------->>>`, request);

    //     Navigation.navigate('HomeUser');
    //     Toast.show('Bank Account Added');
    //   }
    // } else {
    //   let data = {
    //     bussiness_id: id,
    //     bank_name: bankName,
    //     branch_name: branchName,
    //     Ifsc_code: ifscCode,
    //     account_holder_name: accountHolderName,
    //     account_number: accountNumber,
    //   };

    //   // console.log(`Account Data------------>>>>`, data);

    //   request = await AuthService.addBusinessBankAccounts(data);
    //   if (request != null && request.status) {
    //     // console.log(`User bank Account-------------->>>`, request);

    //     Navigation.navigate('HomeBusiness');
    //     Toast.show('Bank Account Added');
    //   }
    // }
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
            <View style={styles.logoView}>
              <View style={styles.neomorphImgView}>
                <Neomorph
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphImg}>
                  <Image
                    resizeMode="contain"
                    source={
                      togglecardBank === 'card'
                        ? require('../../assets/card.png')
                        : require('../../assets/bank.png')
                    }
                    style={styles.logo}
                  />
                </Neomorph>
              </View>
            </View>

            <View style={styles.neomorphCheckBoxView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingHorizontal: moderateScale(20),
                  // backgroundColor: 'red',
                  width: '25%',
                }}>
                <Pressable onPress={() => setTogglecardBank('card')}>
                  <Neomorph
                    style={{
                      shadowRadius: 2,
                      borderRadius: 100,
                      backgroundColor:
                        togglecardBank === 'card' ? '#E3EBFA' : '#DAE1FB',
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Neomorph
                      inner
                      style={{
                        shadowRadius: 2,
                        borderRadius: 100,
                        backgroundColor:
                          togglecardBank === 'card' ? '#DAE1FB' : '#E3EBFA',
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></Neomorph>
                  </Neomorph>
                </Pressable>

                <Text style={styles.cardBanktxt}>Card</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingHorizontal: moderateScale(20),
                  // backgroundColor: 'green',
                  width: '25%',
                }}>
                <Pressable onPress={() => setTogglecardBank('bank')}>
                  <Neomorph
                    style={{
                      shadowRadius: 2,
                      borderRadius: 100,
                      backgroundColor:
                        togglecardBank === 'bank' ? '#E3EBFA' : '#DAE1FB',
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Neomorph
                      inner
                      style={{
                        shadowRadius: 2,
                        borderRadius: 100,
                        backgroundColor:
                          togglecardBank === 'bank' ? '#DAE1FB' : '#E3EBFA',
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></Neomorph>
                  </Neomorph>
                </Pressable>
                <Text style={styles.cardBanktxt}>Bank</Text>
              </View>
            </View>
            {togglecardBank === 'card' ? (
              <>
                <Text style={styles.setupTxt}>Card Setup</Text>
                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Card Number</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="____/____/____/____"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      keyboardType="numeric"
                      maxLength={16}
                    />
                  </NeomorphFlex>
                </View>

                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Card holders Name</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Card holders name"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                    />
                  </NeomorphFlex>
                </View>

                <View style={styles.expiryCVVview}>
                  {/* <Text style={styles.numberTxt}>Expiry</Text> */}
                  <View
                    style={{
                      width: '45%',
                    }}>
                    <Text style={styles.numberTxt}>Expiry</Text>
                    <NeomorphFlex
                      inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      // style={[styles.neomorphInput, {width: width - 240}]}>
                      style={{
                        ...styles.neomorphInput,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        placeholder="__/__"
                        placeholderTextColor={COLORS.placeholderTextColor}
                        style={styles.input}
                      />
                    </NeomorphFlex>
                  </View>
                  <View
                    style={{
                      width: '45%',
                    }}>
                    <Text style={styles.numberTxt}>CVV</Text>
                    <NeomorphFlex
                      inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      // style={[styles.neomorphInput, {width: width - 240}]}>
                      style={{
                        ...styles.neomorphInput,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        placeholder="___"
                        placeholderTextColor={COLORS.placeholderTextColor}
                        style={styles.input}
                      />
                    </NeomorphFlex>
                  </View>
                </View>

                <Pressable
                  onPress={() => Navigation.navigate('QRCodeUser')}
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
                      <Text style={styles.loginTxt}>Submit</Text>
                    </LinearGradient>
                  </NeomorphFlex>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.setupTxt}>Bank Setup</Text>
                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Account Number</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="______________"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      onChangeText={val => setAccountNumber(val)}
                      maxLength={18}
                      keyboardType="numeric"
                    />
                  </NeomorphFlex>
                </View>

                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>IFSC code</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="IFSC code"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      onChangeText={val => setIfscCode(val)}
                    />
                  </NeomorphFlex>
                </View>

                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Account holder’s name</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Account holder’s name"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      onChangeText={val => setAccountHolderName(val)}
                    />
                  </NeomorphFlex>
                </View>
                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Branch Name</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Branch Name"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      onChangeText={val => setBranchName(val)}
                    />
                  </NeomorphFlex>
                </View>

                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Bank Name</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Bank Name"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      onChangeText={val => setBankName(val)}
                    />
                  </NeomorphFlex>
                </View>

                <Pressable
                  // onPress={() => Navigation.navigate('QRCodeUser')}
                  onPress={addAccount}
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
                      <Text style={styles.loginTxt}>Submit</Text>
                    </LinearGradient>
                  </NeomorphFlex>
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default CardBankSetup;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(34),
    // backgroundColor: 'red',
  },

  neomorphImgView: {
    alignItems: 'center',
  },
  neomorphImg: {
    shadowRadius: moderateScale(10),

    backgroundColor: COLORS.statusBar,
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: verticalScale(140),
    width: moderateScale(170),
  },
  neomorphCheckBoxView: {
    // backgroundColor: 'yellow',
    // width: width,
    flexDirection: 'row',
    marginTop: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal: moderateScale(20),
    // flex: 1,
    // backgroundColor: 'green',
  },
  // bankCardView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   // backgroundColor: 'red',
  //   // flex: 1,
  //   justifyContent: 'space-between',
  //   width: '20%',
  // },
  cardBanktxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.valentineBlue,
    fontSize: moderateScale(14),
  },
  setupTxt: {
    // width: '100%',
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.lovePurple,
    // paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(20),
    fontSize: moderateScale(15),
  },
  numberView: {
    // backgroundColor: 'red',
    marginTop: verticalScale(20),
    // alignSelf: 'center',
    // width: '100%',
  },
  numberTxt: {
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.valentineBlue,
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
  },
  input: {
    fontFamily: 'Playfair-Display',
    paddingHorizontal: moderateScale(20),
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  expiryCVVview: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    // marginBottom: verticalScale(40),
    // width: width,
    justifyContent: 'space-between',
  },
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(30),
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
  // loginBtn: {
  //   width: '80%',
  //   height: verticalScale(50),
  //   marginVertical: verticalScale(20),
  //   marginBottom: verticalScale(40),
  // },
  // btnGradient: {
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: moderateScale(10),
  // },
  // neomorphbtn: {
  //   shadowRadius: moderateScale(20),
  //   borderRadius: moderateScale(10),
  //   backgroundColor: 'transparent',
  //   borderWidth: 1,
  //   // backgroundColor: COLORS.white,
  //   borderColor: COLORS.white,
  // },
  // loginTxt: {
  //   fontFamily: 'Playfair-Display',
  //   color: COLORS.white,
  //   fontSize: moderateScale(15),
  // },
});
