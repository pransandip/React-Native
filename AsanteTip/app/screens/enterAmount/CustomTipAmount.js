import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon, Textarea} from 'native-base';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('window');

const CustomTipAmount = props => {
  const {id, name} = props.route.params;

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [wallet, setWallet] = useState(0);
  const [senderID, setSenderID] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`custom Tip result-------->>>>`, result);
    setCurrency(result.currency);
    setSenderID(
      result.type == 'bussiness' ? result.bussiness_id : result.user_id,
    );
    walletAmount(
      result.type == 'bussiness' ? result.bussiness_id : result.user_id,
      result.type,
    );
  };

  const walletAmount = async (val, type) => {
    let result;
    if (type == 'bussiness') {
      let data = {
        bussiness_id: val,
      };
      // console.log('data', data);
      result = await AuthService.profileFetch(data);
      console.log('result---------------->>>', result);
      if (result != null && result.status) {
        setWallet(result.data[0].wallet);
      }
    } else {
      let data = {
        id: val,
      };
      // console.log(`Data-------------->>>`, data);
      result = await AuthService.profileUser(data);
      // console.log('result---------------->>>', result);
      if (result != null && result.status) {
        setWallet(result.data[0].wallet);
      }
    }
  };

  const singlePay = async () => {
    if (amount > 0) {
      setLoading(true);
      let data = {
        sender_id: senderID,
        recever_id: id,

        ammount: amount,
        comment: comments,
      };

      console.log(`Data------------->`, data);
      let result = await AuthService.singlePay(data);
      console.log('result-----> ', result);
      if (
        result.status == true &&
        result.error == null &&
        result.data == 'successfully'
      ) {
        // console.log('result-----> ', result);
        Toast.show('Tip send successfully');
        setLoading(false);
        Navigation.back();
      } else {
        Toast.show(result.error);
        setLoading(false);
      }
    } else {
      Toast.show('Enter amount');
    }
  };

  console.log(`id, name------->>>`, id, name);

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
                onPress={() => Navigation.back()}
                type="AntDesign"
                style={styles.arrowLeft}
              />
            </Neomorph>
            <Text style={styles.settingsTxt}>Pay Custom Tip Amount</Text>
          </View>

          {/* Card */}
          <NeomorphFlex // inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.centerCard}>
            <LinearGradient
              LinearGradient
              colors={['#EAF0FB', '#CCD6FB']}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.cardGradient}>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.userPhotoNeomorph}>
                <Image source={require('../../assets/userPhoto.png')} />
              </NeomorphFlex>

              <View
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
                    <Text style={styles.amount}>
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
                          width: moderateScale(60),
                        },
                      ]}
                      keyboardType="number-pad"
                      // value={amount != 0 ? amount.toString() : null}
                      onChangeText={val => setAmount(val)}
                    />
                  </View>
                  <Image
                    source={require('../../assets/bottomBar.png')}
                    style={{width: moderateScale(100)}}
                  />
                </View>
              </View>

              <View style={styles.dateView}>
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
              </View>

              <Text style={[styles.sendTipTxt, {marginTop: verticalScale(15)}]}>
                Send to {name}
              </Text>
              <Text style={styles.sendTipTxt}>
                Staff No. {id}
                {/* {userData.type == 'user'
                  ? userData.user_id
                  : userData.bussiness_id} */}
              </Text>

              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInputTextArea}>
                <Textarea
                  style={styles.textArea}
                  placeholderTextColor={COLORS.placeholderTextColor}
                  placeholder="Enter Comments"
                  onChangeText={val => setComments(val)}
                />
              </NeomorphFlex>
              <View style={styles.balanceView}>
                <Text style={styles.balanceTxt}>AsanteTip Balance</Text>
                <Text style={styles.balanceTxt}>
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
                  &nbsp;
                  {wallet}
                </Text>
              </View>

              <Pressable
                // onPress={() => Navigation.navigate('SingleTipAmount')}
                onPress={singlePay}
                disabled={loading ? true : false}
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

              {/* <View style={{paddingHorizontal: moderateScale(10)}}>
                  <Text style={styles.settingsTxt}> {userData.name}</Text>
                  <Text style={styles.nameTxt}>{userData.bussiness_id}</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Enter Amount"
                      keyboardType="number-pad"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      // editable={textInputEditable ? true : false}
                      // keyboardType="numeric"
                      // value={'9738114332'}
                      // value={customerMobile}
                      onChangeText={val => setAmount(val)}
                      style={styles.input}
                    />
                  </NeomorphFlex>

                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInputTextArea}>
                    <Textarea
                      style={styles.textArea}
                      placeholderTextColor={COLORS.placeholderTextColor}
                      placeholder="Enter Comments"
                      onChangeText={val => setComments(val)}
                    />
                  </NeomorphFlex> */}

              {/* <Pressable
                    onPress={() => Navigation.navigate('SingleTipAmount')}
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

              {/* <Pressable
                    // onPress={() => Navigation.navigate('SingleTipAmount')}
                    onPress={singlePay}
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
                  </Pressable>
                </View> */}
            </LinearGradient>
          </NeomorphFlex>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default CustomTipAmount;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
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
  nameTxt: {
    color: COLORS.black,
    fontFamily: 'Quicksand',
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
    // height: verticalScale(470),
    height: verticalScale(470),
    // marginTop: verticalScale(40),
    // paddingTop: verticalScale(40),
    marginBottom: verticalScale(40),
  },
  cardGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 25,

    justifyContent: 'center',
  },

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
    // color: COLORS.placeholderTextColor,
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  neomorphInputTextArea: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    // alignItems: 'center',
    marginHorizontal: moderateScale(30),
    height: verticalScale(70),
    marginTop: verticalScale(20),
  },
  textArea: {
    // backgroundColor: 'red',
    fontFamily: 'Playfair-Display',
    height: '100%',
    width: '100%',
    // color: COLORS.placeholderTextColor,
  },
  TipBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(50),
    height: verticalScale(50),
    marginBottom: verticalScale(20),
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  TipTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(15),
  },

  // New design style
  userPhotoNeomorph: {
    shadowRadius: 3,
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.textInputViolet,
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
    alignSelf: 'center',
    marginTop: verticalScale(25),
  },

  amount: {
    // textAlign: 'center',
    fontFamily: 'Quicksand',
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: '700',

    // marginVertical: verticalScale(20),
  },

  dateView: {
    flexDirection: 'row',
    // width: width,
    // marginTop: verticalScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.lightPurple,
  },

  sendTipTxt: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(15),
  },
  balanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(35),
    marginVertical: verticalScale(20),
  },
  balanceTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
});
