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
import Toast from 'react-native-simple-toast';
import Navigation from '../../Navigation';
// import {useNavigation} from '@react-navigation/native';
import AuthService from '../../Service/AuthService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PayWithFlutterwave from 'flutterwave-react-native';

const {height, width} = Dimensions.get('window');

const SingleTip = props => {
  // const Navigation = useNavigation();
  const {id} = props.route.params;
  const [businessUserID, setBusinessUserID] = useState('');
  const [refresh, setRefresh] = useState(false);

  // console.log(`Id-------->>`, id);

  // const [userId, setUserId] = useState('');
  // const [amount, setAmount] = useState(0);
  // const [balance, setBalance] = useState('');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [totalAmount, setTotalAmount] = useState('');
  // const [accountType, setAccountType] = useState('');
  // const [businessName, setBusinessName] = useState('');
  // const [businessEmail, setBusinessEmail] = useState('');
  // const [businessId, setBusinessId] = useState('');
  // const [businessAmount, setBusinessAmount] = useState('');
  // const [businessBalance, setBusinessBalance] = useState('');
  // const [businessTotal, setBusinessTotal] = useState('');

  // useEffect(() => {
  //   getAccount();
  // }, []);

  // const getAccount = async () => {
  //   let result = await AuthService.getAccount();
  //   console.log('logedin----', result);

  //   setUserId(result.user_id);

  //   if (result.type == 'user') {
  //     fetchUserProfile(result.user_id);
  //   } else {
  //     fetchBusinessProfile(result.bussiness_id);
  //   }
  //   setAccountType(result.type);
  // };

  // // For User

  // const fetchUserProfile = async val => {
  //   let data = {
  //     id: val,
  //   };
  //   let result = await AuthService.profileUser(data);

  //   console.log(`result------------------------>`, result);

  //   if (result != null && result.status) {
  //     // setId(result.data[0].user_id);
  //     setName(result.data[0].name);
  //     setEmail(result.data[0].email);
  //     setBalance(result.data[0].wallet);
  //     setTotalAmount(result.data[0].wallet);
  //   }
  // };

  // const singleTip = async data => {
  //   console.log('Payment data', data);
  //   // let data = {
  //   //   user_id: userId,
  //   //   ammount: amount,
  //   // };

  //   // // console.log(`data-------->`, data);

  //   // let result = await AuthService.singleTip(data);

  //   // if (result != null && result.status) {
  //   //   // console.log(`singleTip Result---------->>>`, result);
  //   //   setTotalAmount(Number(balance) + Number(amount));
  //   //   // console.log(`totalAmount------------->>`, totalAmount);
  //   //   Toast.show('Amount Added');
  //   // }
  // };

  // // For Business

  // const fetchBusinessProfile = async val => {
  //   let data = {
  //     bussiness_id: val,
  //   };

  //   console.log(`business data--------->>`, data);

  //   let result = await AuthService.profileFetch(data);
  //   console.log(`result----------->>`, result);

  //   if (result != null && result.status) {
  //     setBusinessName(result.data[0].name);
  //     setBusinessId(result.data[0].bussiness_id);
  //     setBusinessBalance(result.data[0].wallet);
  //     setBusinessTotal(result.data[0].wallet);
  //     setBusinessEmail(result.data[0].email);
  //   }
  // };

  // const singleTipBusiness = async data => {
  //   console.log('Payment data', data);

  //   // let data = {
  //   //   bussiness_id: businessId,
  //   //   ammount: businessAmount,
  //   // };

  //   // let result = await AuthService.businessSingleTip(data);

  //   // if (result != null && result.status) {
  //   //   setBusinessTotal(Number(businessBalance) + Number(businessAmount));
  //   // }
  // };

  // // Payment Gateway

  // const generateTransactionRef = length => {
  //   console.log('new request');
  //   var result = '';
  //   var characters =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return `flw_tx_ref_${result}`;
  // };

  // console.log(`Account Type----------->>`, accountType);

  useEffect(() => {
    let fo = props.navigation.addListener('focus', e => {
      setBusinessUserID('');
    });
    return fo;

    getAccount();

    const unsubscribe = props.navigation.addListener('focus', () => {
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
      // console.log(`result---------->>>`, result);
      if (result != null && result.status) {
        console.log(`result---------->>>`, result.data);
        Navigation.navigate('SingleTipAmount', {userData: result.data});
        setBusinessUserID('');
      } else {
        Toast.show(result.error);
      }
    } else {
      Toast.show('Please provide valid id!!!');
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
          <Text style={styles.headingTxt}>AsanteTip</Text>

          <View style={styles.neomorphImgView}>
            <Neomorph
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphImg}>
              <Icon
                name="arrowleft"
                onPress={() => props.navigation.goBack()}
                type="AntDesign"
                style={styles.arrowLeft}
              />
            </Neomorph>
            <Text style={styles.settingsTxt}>Pay single Tip</Text>
          </View>

          {/* card */}

          <NeomorphFlex
            // inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.centerCard}>
            <LinearGradient
              colors={['#EAF0FB', '#CCD6FB']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.cardGradient}>
              {/* <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.userPhotoNeomorph}>
                  <Image source={require('../../assets/userPhoto.png')} />
                </NeomorphFlex> */}

              {/* <View
                  style={{
                    alignSelf: 'center',
                    marginBottom: verticalScale(20),
                    marginTop: verticalScale(10),
                  }}>
                  <View
                    style={{
                      width: moderateScale(100),

                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.amount}>$</Text>

                      {accountType == 'user' ? (
                        <TextInput
                          placeholder="50"
                          placeholderTextColor={COLORS.placeholderTextColor}
                          style={[
                            styles.amount,
                            {
                              width: moderateScale(60),
                            },
                          ]}
                          keyboardType="number-pad"
                          value={amount != 0 ? amount.toString() : null}
                          onChangeText={val => setAmount(val)}
                        />
                      ) : (
                        <TextInput
                          placeholder="50"
                          placeholderTextColor={COLORS.placeholderTextColor}
                          style={[
                            styles.amount,
                            {
                              width: moderateScale(60),
                            },
                          ]}
                          keyboardType="number-pad"
                          value={
                            businessAmount != 0
                              ? businessAmount.toString()
                              : null
                          }
                          onChangeText={val => setBusinessAmount(val)}
                        />
                      )}
                    </View>
                    <Image source={require('../../assets/bottomBar.png')} />
                  </View>
                </View> */}

              {/* <View style={styles.dateView}>
                  <View
                    style={{
                      borderBottomColor: COLORS.whiteAsh,
                      borderBottomWidth: 1,
                      width: '30%',
                    }}
                  />
                  <Text style={styles.dateTxt}>12 Oct 2021 16:40</Text>
                  <View
                    style={{
                      borderBottomColor: COLORS.whiteAsh,
                      borderBottomWidth: 1,
                      width: '30%',
                    }}
                  />
                </View> */}

              {/* {accountType == 'user' ? (
                  <>
                    <Text
                      style={[
                        styles.sendTipTxt,
                        {marginTop: verticalScale(15)},
                      ]}>
                      Send to {name}
                    </Text>
                    <Text style={styles.sendTipTxt}>Staff No. {userId}</Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.sendTipTxt,
                        {marginTop: verticalScale(15)},
                      ]}>
                      Send to {businessName}
                    </Text>
                    <Text style={styles.sendTipTxt}>
                      Staff No. {businessId}
                    </Text>
                  </>
                )} */}

              {/* <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.userMsgNeomorph}>
                  <Text style={styles.userMsg}>
                    “Best food I’ve had in a while!! Thanks for your service”
                  </Text>
                </NeomorphFlex> */}
              {/* <View style={styles.balanceView}>
                  <Text style={styles.balanceTxt}>AsanteTip Balance</Text>

                  {accountType == 'user' ? (
                    <Text style={styles.balanceTxt}>$ {totalAmount}</Text>
                  ) : (
                    <Text style={styles.balanceTxt}>$ {businessTotal}</Text>
                  )}
                </View> */}

              {/* {accountType == 'user' ? (
                  <PayWithFlutterwave
                    // onRedirect={handleOnRedirect}
                    onRedirect={singleTip}
                    options={{
                      tx_ref: generateTransactionRef(10),
                      authorization:
                        'FLWPUBK_TEST-a75bb90e579e36fd57b811be02142e6a-X',
                      customer: {
                        email: 'test@gmail.com',
                      },
                      amount: amount,
                      currency: 'KES',
                      payment_options: 'card',
                      // customizations : {'title': 'Pied Piper Payments', 'description': 'Middleout isn\'t free. Pay the price', 'logo': 'https://assets.piedpiper.com/logo.png'}
                    }}
                    customButton={props => (
                      <Pressable
                        // onPress={() => Navigation.navigate('HomeUser')}
                        // onPress={singleTip}
                        onPress={props.onPress}
                        isBusy={props.isInitializing}
                        disabled={props.disabled}
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
                            <Text style={styles.loginTxt}>
                              Add Money to Wallet
                            </Text>
                          </LinearGradient>
                        </NeomorphFlex>
                      </Pressable>
                    )}
                  />
                ) : (
                  <PayWithFlutterwave
                    // onRedirect={handleOnRedirect}
                    onRedirect={singleTipBusiness}
                    options={{
                      tx_ref: generateTransactionRef(10),
                      authorization:
                        'FLWPUBK_TEST-a75bb90e579e36fd57b811be02142e6a-X',
                      customer: {
                        email: 'test@gmail.com',
                      },
                      amount: businessAmount,
                      currency: 'KES',
                      payment_options: 'card',
                      // customizations : {'title': 'Pied Piper Payments', 'description': 'Middleout isn\'t free. Pay the price', 'logo': 'https://assets.piedpiper.com/logo.png'}
                    }}
                    customButton={props => (
                      <Pressable
                        // onPress={() => Navigation.navigate('HomeUser')}
                        // onPress={singleTipBusiness}
                        onPress={props.onPress}
                        isBusy={props.isInitializing}
                        disabled={props.disabled}
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
                            <Text style={styles.loginTxt}>
                              Add Money to Wallet
                            </Text>
                          </LinearGradient>
                        </NeomorphFlex>
                      </Pressable>
                    )}
                  />
                )} */}

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
                  // Navigation.navigate('ScanQR', {name: 'SingleTip'})
                  Navigation.navigate('ScanQRStack', {name: 'SingleTip'})
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
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default SingleTip;

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

    height: verticalScale(361),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
  },
  cardGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 25,

    justifyContent: 'center',
  },

  // userPhotoNeomorph: {
  //   shadowRadius: 3,
  //   borderRadius: moderateScale(25),
  //   backgroundColor: COLORS.textInputViolet,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: moderateScale(50),
  //   height: moderateScale(50),
  //   alignSelf: 'center',
  //   marginTop: verticalScale(25),
  // },
  // amount: {
  //   // textAlign: 'center',
  //   fontFamily: 'Quicksand',
  //   fontSize: moderateScale(30),
  //   color: COLORS.black,
  //   fontWeight: '700',

  //   // marginVertical: verticalScale(20),
  // },
  // dateView: {
  //   flexDirection: 'row',
  //   // width: width,
  //   // marginTop: verticalScale(20),
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // dateTxt: {
  //   fontFamily: 'Quicksand',
  //   color: COLORS.lightPurple,
  // },
  // sendTipTxt: {
  //   textAlign: 'center',
  //   fontFamily: 'Quicksand',
  //   color: COLORS.black,
  //   fontSize: moderateScale(15),
  // },
  // userMsgNeomorph: {
  //   height: verticalScale(80),
  //   width: '80%',
  //   shadowRadius: 3,
  //   borderRadius: moderateScale(20),
  //   backgroundColor: COLORS.textInputViolet,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingHorizontal: moderateScale(30),

  //   alignSelf: 'center',
  //   marginVertical: verticalScale(15),
  // },
  // userMsg: {
  //   textAlign: 'center',
  //   fontFamily: 'Quicksand',
  //   color: COLORS.black,
  // },
  // balanceView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: moderateScale(35),
  // },
  // balanceTxt: {
  //   fontFamily: 'Quicksand',
  //   color: COLORS.black,
  //   fontSize: moderateScale(14),
  // },
  // loginBtn: {
  //   // width: '80%',
  //   paddingHorizontal: moderateScale(50),
  //   height: verticalScale(40),
  //   marginTop: verticalScale(20),
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

  //New Styles

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

    fontSize: moderateScale(14),
    color: COLORS.black,
    // color: 'red',
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
