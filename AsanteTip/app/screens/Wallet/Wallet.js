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
import Toast from 'react-native-simple-toast';
import Navigation from '../../Navigation';

import {PayWithFlutterwave} from 'flutterwave-react-native';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const Wallet = props => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [currency, setCurrency] = useState('');
  const [loading, setLoading] = useState(false);
  // const [refresh, setRefresh] = useState('')

  const [id, setId] = useState('');

  const [balance, setBalance] = useState('');

  useEffect(() => {
    getAccount();

    let fo = props.navigation.addListener('focus', e => {
      getAccount();
    });
    return fo;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log('logedin----', result);
    setEmail(result.email);
    setType(result.type);

    // To show the balance
    let request;
    if (result.type == 'user') {
      setId(result.user_id);
      let data = {
        id: result.user_id,
      };
      request = await AuthService.profileUser(data);
    } else {
      setId(result.bussiness_id);
      let data = {
        bussiness_id: result.bussiness_id,
      };
      // console.log('data------------>>>>', data);
      request = await AuthService.profileFetch(data);
    }

    if (request && request.status) {
      // console.log('result------->>>', request);
      console.log('result------->>>', request.data[0].currency);
      setBalance(request.data[0].wallet);
      setCurrency(request.data[0].currency);
    }
  };

  // console.log(`email--------->>>`, email);

  // const walletAmount = async (val, type) => {
  //   if (type == 'bussiness') {
  //     let data = {
  //       bussiness_id: val,
  //     };

  //     console.log('data------', data);

  //     let result = await AuthService.profileFetch(data);
  //     console.log('result------->>', result);

  //     if (result != null && result.status) {
  //       setWallet(result.data[0].wallet);
  //     }
  //   } else {
  //     let data = {
  //       id: val,
  //     };
  //     let result = await AuthService.profileUser(data);
  //     console.log('result------->>', result);
  //     if (result != null && result.status) {
  //       setWallet(result.data[0].wallet);
  //     }
  //   }
  // };

  // console.log(`wallet------>>>>`, wallet);

  const generateTransactionRef = length => {
    console.log('new request');
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  const handleOnRedirect = async data => {
    console.log('Payment data---->>>', data);

    if (data.status == 'successful') {
      setLoading(true);
      setLoading(false);
      let result;
      if (type == 'user') {
        let data = {
          user_id: id,
          ammount: amount,
        };
        // console.log(`data-------->`, data);
        result = await AuthService.addUserWalletBalance(data);
      } else {
        let data = {
          bussiness_id: id,
          ammount: amount,
        };
        console.log(`data-------->`, data);
        result = await AuthService.addBusinessWalletBalance(data);
      }

      console.log('result----------->>>', result);

      if (amount != null) {
        if (result != null && result.status) {
          setAmount(0);
          console.log(`wallet Result---------->>>`, result.data.total_Ammount);
          // setTotalAmount(Number(balance) + Number(amount));
          // console.log(`totalAmount------------->>`, totalAmount);
          setBalance(result.data.total_Ammount);
          Toast.show('Amount Added');
        } else {
          Toast.show('Please try again later');
        }
      } else {
        Toast.show('Please Enter Amount');
      }
    }
  };

  const addMoney = val => {
    // setAmount(Number(amount + val));
    let num = Number(amount) + Number(val);
    // console.log('num---', num);
    setAmount(num.toString());
  };

  const addMoneyInput = val => {
    setAmount(val);
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
                onPress={() => Navigation.back()}
                type="AntDesign"
                style={styles.arrowLeft}
              />
            </Neomorph>
            <Text style={styles.settingsTxt}>AsanteTip Wallet</Text>
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
              <Text style={styles.balanceTxt}>AsanteTip Balance</Text>
              <View style={styles.balanceTxtView}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Quicksand',
                    color: COLORS.black,
                    fontSize: moderateScale(20),
                  }}>
                  {currency == 'GHS'
                    ? 'GH₵'
                    : currency == 'NGN'
                    ? '₦'
                    : currency == 'KES'
                    ? 'Ksh'
                    : currency == 'TZS'
                    ? 'TSh'
                    : currency == 'ZAR'
                    ? 'R'
                    : currency == 'USD'
                    ? '$'
                    : currency == 'GBP'
                    ? '£'
                    : null}
                  &nbsp;&nbsp;&nbsp;
                </Text>
                <Text
                  style={{
                    // marginStart: moderateScale(10),
                    fontFamily: 'Quicksand',
                    color: COLORS.black,
                    fontSize: moderateScale(20),
                    marginBottom: moderateScale(2),
                  }}>
                  {balance < 1 ? '0' : balance}
                </Text>
              </View>

              {/* {type == 'bussiness' ? (
                <View style={styles.shadowBtnView}>
                  <Pressable
                    onPress={() => Navigation.navigate('SingleTip', {id: ''})}
                    style={styles.btnView}>
                    <NeomorphFlex
                      // inner // <- enable inner shadow
                      useArt // <- set this prop to use non-native shadow on ios
                      style={styles.shadowBtn}>
                      <Image
                        source={require('../../assets/user.png')}
                        style={{
                          height: moderateScale(30),
                          width: moderateScale(30),
                        }}
                      />
                    </NeomorphFlex>
                    <Text style={styles.tipBoxTxt}>Single Tip</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => Navigation.navigate('MultipleTip', {id: ''})}
                    style={styles.btnView}>
                    <NeomorphFlex
                      // inner // <- enable inner shadow
                      useArt // <- set this prop to use non-native shadow on ios
                      style={styles.shadowBtn}>
                      <Image
                        source={require('../../assets/people.png')}
                        style={{
                          height: moderateScale(35),
                          width: moderateScale(35),
                        }}
                      />
                    </NeomorphFlex>
                    <Text style={styles.tipBoxTxt}>Multiple Tip</Text>
                  </Pressable>

                
                </View>
              ) : null} */}
            </LinearGradient>
          </NeomorphFlex>

          <NeomorphFlex
            // inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
              ...styles.centerCard,
              marginVertical: verticalScale(40),
              marginBottom: verticalScale(100),
              height: verticalScale(240),
            }}>
            <LinearGradient
              colors={['#EAF0FB', '#CCD6FB']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.cardGradient}>
              <Text
                style={{
                  fontFamily: 'Quicksand',
                  color: COLORS.black,
                  fontSize: moderateScale(15),
                }}>
                Add Money to
                <Text style={{color: COLORS.themeColor}}>
                  &nbsp; AsanteTip Wallet
                </Text>
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  // justifyContent: 'center',
                  marginVertical: verticalScale(5),
                  marginStart: moderateScale(50),
                  // backgroundColor: 'green',
                  // width: '100%',
                }}>
                {/* <Text style={styles.amount}>200 $</Text> */}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // alignSelf: 'center',
                    width: '100%',
                  }}>
                  <Text style={[styles.amount, {fontSize: moderateScale(20)}]}>
                    {currency == 'GHS'
                      ? 'GH₵'
                      : currency == 'NGN'
                      ? '₦'
                      : currency == 'KES'
                      ? 'Ksh'
                      : currency == 'TZS'
                      ? 'TSh'
                      : currency == 'ZAR'
                      ? 'R'
                      : currency == 'USD'
                      ? '$'
                      : currency == 'GBP'
                      ? '£'
                      : null}
                  </Text>

                  <TextInput
                    placeholder="50"
                    placeholderTextColor={COLORS.placeholderTextColor}
                    style={[
                      styles.amount,
                      {
                        width: moderateScale(100),
                        alignSelf: 'center',
                        fontSize: moderateScale(30),
                        // backgroundColor: 'red',
                      },
                    ]}
                    keyboardType="number-pad"
                    // value={amount != 0 ? amount.toString() : null}
                    value={amount == '' ? null : amount}
                    onChangeText={val => addMoneyInput(val)}

                    // onChangeText={val => setAmount(val)}
                  />
                </View>
                <Image
                  source={require('../../assets/bottomBar.png')}
                  style={{
                    width: moderateScale(100),
                  }}
                />
              </View>
              <View style={styles.btnsView}>
                <Pressable
                  onPress={val => addMoney('100')}
                  style={styles.btnsPressable}>
                  <NeomorphFlex
                    // inner // <- enable inner shadow
                    useArt // <- set this prop to use non-native shadow on ios
                    style={styles.amountBtns}>
                    <Text
                      style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                      + 100
                    </Text>
                  </NeomorphFlex>
                </Pressable>
                <Pressable
                  style={styles.btnsPressable}
                  onPress={val => addMoney('200')}>
                  <NeomorphFlex
                    // inner // <- enable inner shadow
                    useArt // <- set this prop to use non-native shadow on ios
                    style={styles.amountBtns}>
                    <Text
                      style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                      + 200
                    </Text>
                  </NeomorphFlex>
                </Pressable>
                <Pressable
                  style={styles.btnsPressable}
                  onPress={val => addMoney('300')}>
                  <NeomorphFlex
                    // inner // <- enable inner shadow
                    useArt // <- set this prop to use non-native shadow on ios
                    style={styles.amountBtns}>
                    <Text
                      style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                      +300
                    </Text>
                  </NeomorphFlex>
                </Pressable>
              </View>

              <PayWithFlutterwave
                onRedirect={handleOnRedirect}
                options={{
                  tx_ref: generateTransactionRef(10),
                  authorization:
                    'FLWPUBK_TEST-a75bb90e579e36fd57b811be02142e6a-X',
                  customer: {
                    email: email,
                  },
                  amount: amount,
                  currency: currency,
                  payment_options: 'card',
                  // customizations : {'title': 'Pied Piper Payments', 'description': 'Middleout isn\'t free. Pay the price', 'logo': 'https://assets.piedpiper.com/logo.png'}
                }}
                customButton={props => (
                  <Pressable
                    style={styles.loginBtn}
                    onPress={props.onPress}
                    isBusy={props.isInitializing}
                    disabled={props.disabled}>
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
                          Proceed to Add{' '}
                          {currency == 'GHS'
                            ? 'GH₵'
                            : currency == 'NGN'
                            ? '₦'
                            : currency == 'KES'
                            ? 'Ksh'
                            : currency == 'TZS'
                            ? 'TSh'
                            : currency == 'ZAR'
                            ? 'R'
                            : currency == 'USD'
                            ? '$'
                            : currency == 'GBP'
                            ? '£'
                            : null}{' '}
                          {amount < 1 ? '0' : amount}
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
                )}
              />
            </LinearGradient>
          </NeomorphFlex>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
    // borderWidth: 1
  },
  topView: {
    marginTop: StatusBar.currentHeight + 10,
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
    shadowRadius: 3,
    borderRadius: 25,
    backgroundColor: 'transparent',
    //   width: 150,
    // height: verticalScale(225),
    // marginTop: verticalScale(10),
  },
  cardGradient: {
    // height: '100%',
    // width: '100%',
    borderRadius: 25,
    paddingHorizontal: moderateScale(25),
    paddingVertical: moderateScale(20),
  },
  balanceTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(20),
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  balanceTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowBtnView: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    // marginVertical: verticalScale(20),
  },
  btnView: {
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    width: moderateScale(70),
    height: verticalScale(120),
    // flex: 1,
  },
  btnsView: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingTop: verticalScale(20),
    flexDirection: 'row',
  },
  btnsPressable: {
    // backgroundColor: 'red',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    width: moderateScale(60),
    height: verticalScale(25),
  },
  amountBtns: {
    shadowRadius: 3,
    borderRadius: 5,
    backgroundColor: COLORS.textInputViolet,
    //   width: 150,
    // height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: moderateScale(20),
    height: verticalScale(25),
    borderRadius: moderateScale(10),
    // marginTop: verticalScale(10),
  },
  shadowBtn: {
    // shadowOffset: {width: 10, height: 10},
    // shadowOpacity: 1,

    // shadowColor: 'grey',
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    // ...include most of View/Layout styles
  },

  tipBoxTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.tipBlue,
    textAlign: 'center',
    marginTop: verticalScale(10),
    fontSize: moderateScale(10),
  },
  // amountTxt: {
  //   textAlign: 'center',
  //   paddingTop: moderateScale(30),
  //   color: COLORS.black,
  //   fontSize: moderateScale(25),
  // },

  amount: {
    // textAlign: 'center',
    fontFamily: 'Quicksand',
    // fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: '700',
    // marginVertical: verticalScale(20),
  },
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(30),
    height: verticalScale(40),
    marginVertical: verticalScale(20),
  },
  btnGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
  },
  neomorphbtn: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(30),
    backgroundColor: 'transparent',
    borderWidth: 1,
    // backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  loginTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.white,
    fontSize: moderateScale(10),
  },
});
