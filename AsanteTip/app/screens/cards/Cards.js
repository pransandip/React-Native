import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import AuthService from '../../Service/AuthService';
import Navigation from '../../Navigation';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Cards = () => {
  const [id, setId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [hideShow, setHideShow] = useState(false);
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cardDetails, setCardDetails] = useState([]);

  const monthRef = useRef();
  const yearRef = useRef();

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`loginID--------------->>>>`, result);
    setId(result.type == 'user' ? result.user_id : result.bussiness_id);
    fetchCards(result.type == 'user' ? result.user_id : result.bussiness_id);
  };

  const addCard = async () => {
    let expDateConf = month + '/' + year;

    let data = {
      user_bussiness_id: id,
      card_number: cardNumber,
      holder_name: cardHolderName,
      exp_date: expDateConf,
      cvv: cvv,
    };

    // console.log(`card data---------------->>>>`, data);

    let result = await AuthService.addCard(data);

    // console.log(`result-------------------->>>`, result);

    if (result != null && result.status) {
      Toast.show('Card details Added');
      setHideShow(!hideShow);
      getAccount();
    } else {
      Toast.show(result.error);
    }
  };

  const fetchCards = async val => {
    let result;
    if (id == 'user') {
      let data = {
        user_id: val,
      };

      // console.log(`fetch cards data---------->>>`, data);

      result = await AuthService.userFetchCards(data);
      // console.log(`user fetched cards----------->>>>`, result.data);
    } else {
      let data = {
        bussiness_id: val,
      };

      // console.log(`fetch cards data---------->>>`, data);

      result = await AuthService.businessFetchCards(data);
      // console.log(`Business fetched cards----------->>>>`, result);
    }

    if (result != null && result.status) {
      setCardDetails(result.data);
    }
  };

  const deleteCard = async val => {
    let data = {
      table_id: val,
    };

    console.log(`val==========>>>`, data);

    let result = await AuthService.deleteCard(data);

    if (result != null && result.status) {
      Toast.show('Card deleted');
      getAccount();
    } else {
      Toast.show(result.error);
    }
  };

  // const checkExpiry = val => {
  //   // setExpDate(val);

  //   if (val.length == 2) {
  //     console.log("val + ' / '====", val + '/');
  //     setExpDate(val + '/');
  //   } else {
  //     setExpDate(val);
  //   }
  // };

  return (
    // <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
    // <View style={{flex: 1}}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{flexGrow: 1}}>
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
                  resizeMode="contain"
                  source={require('../../assets/card.png')}
                  style={styles.logo}
                />
              </Neomorph>
            </View>
          </View>

          {hideShow == true ? (
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
                    onChangeText={val => setCardNumber(val)}
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
                    onChangeText={val => setCardHolderName(val)}
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
                    {/* <TextInput
                    placeholder="__/__"
                    placeholderTextColor={COLORS.placeholderTextColor}
                    style={styles.input}
                    value={expDate}
                    onChangeText={val => checkExpiry(val)}
                  /> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        placeholder="MM"
                        placeholderTextColor={COLORS.placeholderTextColor}
                        value={month}
                        maxLength={2}
                        style={styles.input}
                        keyboardType="numeric"
                        //   onChangeText={val => setMonth(val)}
                        onChangeText={val => {
                          setMonth(val);
                          if (val.length == 2) {
                            yearRef.current.focus();
                          }
                        }}
                        ref={monthRef}
                      />
                      <Text style={{marginHorizontal: 2}}>/</Text>
                      <TextInput
                        placeholder="YY"
                        placeholderTextColor={COLORS.placeholderTextColor}
                        value={year}
                        maxLength={2}
                        style={styles.input}
                        onChangeText={val => setYear(val)}
                        ref={yearRef}
                        keyboardType="numeric"
                      />
                    </View>
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
                      maxLength={3}
                      keyboardType="numeric"
                      onChangeText={val => setCvv(val)}
                    />
                  </NeomorphFlex>
                </View>
              </View>

              <Pressable onPress={addCard} style={styles.loginBtn}>
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
          ) : null}
        </View>
        {hideShow == false ? (
          <View style={styles.bottomView}>
            <Pressable
              onPress={() => setHideShow(!hideShow)}
              style={styles.allStaffNeomorphBtn}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.allStaffNeomorph}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Image source={require('../../assets/bankSmall.png')} /> */}
                  <Icon
                    name="credit-card"
                    type="EvilIcons"
                    style={[styles.profileIcon, {fontSize: moderateScale(40)}]}
                  />
                  <Text style={styles.transferTxt}>Add card </Text>
                </View>
                <Text style={styles.transferDestinationTxt}>Add</Text>
              </NeomorphFlex>
            </Pressable>

            <FlatList
              data={cardDetails}
              key={'#'}
              keyExtractor={(item, index) => index}
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              renderItem={({item}) => {
                console.log(`flatlist card fetch--------->>>>`, item);
                let cardNumber = item.card_number.slice(-4);
                return (
                  <Pressable style={styles.allStaffNeomorphBtn}>
                    <NeomorphFlex
                      // inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      style={styles.allStaffNeomorph}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // backgroundColor: 'green',
                          flex: 2.5,
                        }}>
                        <Icon
                          name="credit-card"
                          type="EvilIcons"
                          style={[
                            styles.profileIcon,
                            {fontSize: moderateScale(40)},
                          ]}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.transferTxt}>HDFC</Text>
                          <Text style={styles.transferTxt}>{cardNumber}</Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // backgroundColor: 'red',
                          // flex: 1,
                          justifyContent: 'space-between',
                        }}>
                        <Icon
                          onPress={() => deleteCard(item.table_id)}
                          // onPress={() => console.log(item.table_id)}
                          name="delete"
                          type="AntDesign"
                          style={{fontSize: moderateScale(15)}}
                        />
                      </View>
                    </NeomorphFlex>
                  </Pressable>
                );
              }}
            />
          </View>
        ) : null}
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
    // </View>
  );
};

export default Cards;

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
    // flex: 1,
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

  allStaffNeomorphBtn: {
    // backgroundColor: 'red',
    // width: '80%',
    // alignSelf: 'center',
    marginTop: verticalScale(10),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(20),
  },
  allStaffNeomorph: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    // width: moderateScale(180),
    height: moderateScale(40),
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    marginBottom: verticalScale(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    paddingStart: moderateScale(10),
  },
  transferDestinationTxt: {
    color: COLORS.valentineBlue,
    fontFamily: 'Quicksand',
    fontSize: moderateScale(14),
  },
  bottomView: {
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(20),
    marginTop: verticalScale(15),
  },
  allStaffNeomorphBtn: {
    // backgroundColor: 'red',
    // width: '80%',
    // alignSelf: 'center',
    marginTop: verticalScale(10),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(20),
  },
  allStaffNeomorph: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    // width: moderateScale(180),
    height: moderateScale(40),
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    marginBottom: verticalScale(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    paddingStart: moderateScale(10),
  },
  transferDestinationTxt: {
    color: COLORS.valentineBlue,
    fontFamily: 'Quicksand',
    fontSize: moderateScale(14),
  },
  profileIcon: {
    fontSize: moderateScale(28),
    color: '#3B4F7D',
  },
});
