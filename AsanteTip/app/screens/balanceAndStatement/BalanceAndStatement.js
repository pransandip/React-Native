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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import AuthService from '../../Service/AuthService';

import Navigation from '../../Navigation';

const {height, width} = Dimensions.get('window');

const BalanceAndStatement = props => {
  const [type, setType] = useState('');

  useEffect(() => {
    getAccount();
    let fo = props.navigation.addListener('focus', e => {
      getAccount();
    });
    return fo;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`loginID-------->>>`, result.type);
    transactionHistory(result.user_id);
    fetchBankAccounts(
      result.type == 'user' ? result.user_id : result.bussiness_id,
    );
    setType(result.type);
  };

  const fetchBankAccounts = async val => {
    let result;
    if (type == 'user') {
      let data = {
        user_id: val,
      };

      result = await AuthService.userBankAccounts(data);
    } else {
      let data = {
        bussiness_id: val,
      };

      result = await AuthService.businessBankAccounts(data);
    }

    console.log(`result---------->>>`, result.data);

    if (result != null && result.status) {
      setTransferOptions(result.data);
    }
  };

  const transactionHistory = async val => {
    let data = {
      user_id: val,
    };

    let result = await AuthService.userTransactionHistory(data);
    // console.log(`result----------->>>`, result.data);

    if (result != null && result.status) {
      setStatements(result.data);
    }
  };

  const [transferOptions, setTransferOptions] = useState([]);

  const [statements, setStatements] = useState([]);

  let history = statements != null ? statements.slice(-5) : statements;
  console.log(`history------------>>>>`, history);

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
                  onPress={() => Navigation.back()}
                  type="AntDesign"
                  style={styles.arrowLeft}
                />
              </Neomorph>
              <Text style={styles.settingsTxt}>Balance & Statement</Text>
            </View>
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
                    // onPress={() => setHideStaff(!hideStaff)}
                    style={styles.allStaffNeomorphBtn}>
                    <NeomorphFlex
                      // inner // <- enable shadow inside of neomorph
                      swapShadows // <- change zIndex of each shadow color
                      style={styles.allStaffNeomorph}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image source={require('../../assets/bankSmall.png')} />

                        <Text style={styles.transferTxt}>
                          {item.bank_name}-
                        </Text>
                        <Text style={styles.transferTxt}>{accountNo}</Text>
                      </View>
                      <Text style={styles.transferDestinationTxt}>
                        Check Balance
                      </Text>
                    </NeomorphFlex>
                  </Pressable>
                );
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: verticalScale(20),
              paddingHorizontal: moderateScale(20),
            }}>
            <Text style={styles.statementTxt}>Statement</Text>
            <Text
              onPress={() => Navigation.navigate('Statement')}
              style={styles.statementTxt}>
              View All
            </Text>
          </View>
          <View style={styles.bottomView}>
            <FlatList
              // data={statements}
              data={history != null ? history.reverse() : history}
              key={'#'}
              keyExtractor={(item, index) => index}
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={{marginTop: verticalScale(15)}}
              renderItem={({item}) => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // marginTop: verticalScale(15),
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/hotel.png')} />
                        <View style={{paddingStart: moderateScale(10)}}>
                          <Text style={styles.hotelNames}>
                            {item.sender_reciver_name != null
                              ? item.sender_reciver_name
                              : 'Bank/Card'}
                          </Text>
                          <Text style={[styles.priceTxt, {fontSize: 10}]}>
                            {item.date}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.hotelNames}>{item.money_status}</Text>

                      <Text style={styles.priceTxt}>$ {item.ammount}</Text>
                    </View>
                    <View
                      style={{
                        borderBottomColor: COLORS.whiteAsh,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginVertical: verticalScale(15),
                        alignSelf: 'flex-end',
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default BalanceAndStatement;

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
  allStaffNeomorphBtn: {
    // backgroundColor: 'red',
    // width: '80%',
    // alignSelf: 'center',
    marginTop: verticalScale(10),
    borderRadius: moderateScale(10),
    // marginHorizontal: moderateScale(10),
  },
  allStaffNeomorph: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    // width: moderateScale(180),
    height: moderateScale(40),
    // justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(7),
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
    fontSize: moderateScale(14),
  },

  statementTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.lovePurple,
    fontSize: moderateScale(15),
    // paddingStart: moderateScale(25),
    // marginTop: verticalScale(20),
  },
  bottomView: {
    paddingHorizontal: moderateScale(30),
  },
  hotelNames: {
    fontFamily: 'Quicksand',
    fontSize: moderateScale(15),
    // paddingStart: moderateScale(10),
    color: COLORS.valentineBlue,
  },
  priceTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
});
