import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  Modal,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Swiper from 'react-native-swiper';
// import navigation from '../../Navigation';
import {useNavigationState} from '@react-navigation/native';
import AuthService from '../../Service/AuthService';
import Toast from 'react-native-simple-toast';
import SimpleToast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');

const TransferToBank = ({navigation}) => {
  // const Navigation = useNavigationState();
  const [wallet, setWallet] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [transferOptions, setTransferOptions] = useState([]);
  const [type, setType] = useState('');
  // const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState('');
  const [tableID, setTableID] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [selectedAccount, setSelectedAccount] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAccount();
    let fo = navigation.addListener('focus', e => {
      getAccount();
    });
    return fo;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    // console.log(`LoginId---------->>>`, result);
    fetchBankAccounts(
      result.type == 'user' ? result.user_id : result.bussiness_id,
    );
    setType(result.type);

    setId(result.type == 'user' ? result.user_id : result.bussiness_id);
    // withdrawAmount(
    //   result.type == 'user' ? result.user_id : result.bussiness_id,
    // );

    let request;
    if (result.type == 'user') {
      let data = {
        id: result.user_id,
      };

      request = await AuthService.profileUser(data);
    } else {
      let data = {
        bussiness_id: result.bussiness_id,
      };

      request = await AuthService.profileFetch(data);
    }

    if (request != null && request.status) {
      setWallet(request.data[0].wallet);
      setCurrency(request.data[0].currency);
    }
  };

  const fetchBankAccounts = async val => {
    let result;
    if (type == 'user') {
      let data = {
        user_id: val,
      };

      result = await AuthService.userBankAccounts(data);

      // setCurrency(result.data[0].currency);
    } else {
      let data = {
        bussiness_id: val,
      };

      result = await AuthService.businessBankAccounts(data);
      // console.log(`business result----------->>>>`, result);
    }

    console.log(`bank details----------->>>>`, result);

    if (result != null && result.status) {
      setTransferOptions(result.data);
    }
  };

  // console.log(`currency---------->>>`, currency);

  const deleteAccount = async val => {
    // console.log(`val--------->>>`, val);

    let data = {
      id: val,
    };

    console.log(`Delete ID--------->>>`, data);

    let result = await AuthService.deleteBankAccount(data);

    if (result != null && result.status) {
      Toast.show('Account Deleted');
      // setRefresh(!refresh);
      getAccount();
    }
  };

  const withdrawAmount = async (amt, tableId) => {
    let data = {
      user_id: id,
      ammount: amt,
      bank_id: tableId,
    };

    console.log(`data-------->>>>`, data);

    let result = await AuthService.userWithdrawBalance(data);

    console.log(`result------>>>`, result);
    getAccount();
  };

  const withdrawMoney = () => {
    setLoader(true);
    // console.log("selectedAccount", selectedAccount)
    let tranData = JSON.parse(selectedAccount.transaction_data);
    tranData.amount = Number(amount);
    // console.log("tranData", tranData)
    const config = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer FLWSECK_TEST-a4c9bdbf843f02ca60d6b4f8050ea7fa-X',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tranData),
    };
    fetch(`https://api.flutterwave.com/v3/transfers`, config)
      .then(response => response.json())
      .then(res => {
        console.log('res--------------->>', res);
        if (res.status == 'success') {
          SimpleToast.show(res.message);
          setLoader(false);
          setModalVisible(false);
          withdrawAmount(Number(amount), selectedAccount.table_id);
        } else {
          SimpleToast.show(res.error);
        }
      });
  };

  // console.log(`TableID------>>>`, tableID);

  // console.log(`transferOptions------------->>>`, transferOptions);

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
                  onPress={() => navigation.goBack()}
                  type="AntDesign"
                  style={styles.arrowLeft}
                />
              </Neomorph>
              <Text style={styles.settingsTxt}>Transfer to Bank</Text>
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
                    : null}{' '}
                  {wallet}
                </Text>
                {/* 
                <View style={styles.shadowBtnView}>
                  <Pressable
                    onPress={() => navigation.navigate('SingleTip')}
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
                    onPress={() => navigation.navigate('MultipleTip')}
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
                </View> */}
              </LinearGradient>
            </NeomorphFlex>
          </View>
          <Text style={styles.transferText}>Transfer Options</Text>
          <View style={styles.bottomView}>
            <FlatList
              data={transferOptions}
              key={'#'}
              keyExtractor={(item, index) => index}
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              renderItem={({item}) => {
                let accountNo = item.account_number.slice(-4);
                return (
                  <Pressable
                    style={styles.allStaffNeomorphBtn}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setSelectedAccount(item);
                    }}>
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
                        <Image source={require('../../assets/bankSmall.png')} />

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              styles.transferTxt,
                              {paddingStart: moderateScale(10)},
                            ]}>
                            {item.bank_name}-
                          </Text>
                          <Text style={styles.transferTxt}>{accountNo}</Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // backgroundColor: 'red',
                          flex: 1,
                          // justifyContent: 'space-between',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setSelectedAccount(item);
                          }}
                          style={styles.transferDestinationTxt}>
                          Transfer &nbsp;
                        </Text>

                        <Icon
                          onPress={() => deleteAccount(item.table_id)}
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

            <Pressable
              onPress={() => navigation.navigate('AddBankAccount')}
              style={styles.allStaffNeomorphBtn}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.allStaffNeomorph}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/bankSmall.png')} />
                  <Text style={styles.transferTxt}>Add bank account</Text>
                </View>
                <Text style={styles.transferDestinationTxt}>Add</Text>
              </NeomorphFlex>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setModalVisible(false)} />

          <View style={styles.modalView}>
            <View style={{backgroundColor: COLORS.textInputViolet}}>
              <Text style={styles.transferAccount}>Transfer To Bank</Text>
              <View
                style={{
                  borderBottomColor: COLORS.whiteAsh,
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <View style={{paddingHorizontal: moderateScale(10)}}>
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

              <Pressable onPress={withdrawMoney} style={styles.TipBtn}>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphTipbtn}>
                  <LinearGradient
                    colors={['#7E8BEE', '#5E6FE4']}
                    start={{x: 0.3, y: 0}}
                    end={{x: 0.7, y: 1}}
                    style={styles.btnTipGradient}>
                    <Text style={styles.TipTxt}>Transfer</Text>
                    {loader ? (
                      <ActivityIndicator
                        size="small"
                        color={'#fff'}
                        style={{marginLeft: 10}}
                      />
                    ) : null}
                  </LinearGradient>
                </NeomorphFlex>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TransferToBank;

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
    // height: verticalScale(225),
    // marginTop: verticalScale(40),
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
  tipBoxTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.tipBlue,
    textAlign: 'center',
    marginTop: verticalScale(10),
    fontSize: moderateScale(10),
  },
  transferText: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lovePurple,
    fontSize: moderateScale(15),
    paddingStart: moderateScale(25),
    marginTop: verticalScale(20),
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
    // paddingStart: moderateScale(10),
  },
  transferDestinationTxt: {
    color: COLORS.valentineBlue,
    fontFamily: 'Quicksand',
    fontSize: moderateScale(10),
  },
  // list: {
  //   marginBottom: verticalScale(25),
  //   // paddingHorizontal: moderateScale(20),
  // },

  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    backgroundColor: COLORS.textInputViolet,

    // height: verticalScale(320),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  transferAccount: {
    fontFamily: 'Quicksand',
    paddingHorizontal: moderateScale(30),
    marginVertical: verticalScale(20),
    color: COLORS.lovePurple,
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
  TipBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(50),
    height: verticalScale(50),
    marginVertical: verticalScale(20),
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
  },
  TipTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.white,
    fontSize: moderateScale(15),
  },
});
