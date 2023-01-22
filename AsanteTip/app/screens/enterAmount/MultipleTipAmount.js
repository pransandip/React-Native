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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon, Textarea} from 'native-base';
import Navigation from '../../Navigation';
import CheckBox from '../../Components/CheckBox/CheckBox';
import AuthService from '../../Service/AuthService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');
const MultipleTipAmount = props => {
  const {userData} = props.route.params;

  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
  const [senderID, setSenderID] = useState('');
  const [empIds, setEmpIds] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState('');

  const [employeeList, setEmployeeList] = useState(userData.employee);

  useEffect(() => {
    getAccount();
  }, []);

  // console.log(`Checked------>>`, checked);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`Result----------->>>`, result);
    setSenderID(
      result.type == 'bussiness' ? result.bussiness_id : result.user_id,
    );
  };

  const payMultipleTip = async () => {
    if (amount > 0) {
      setLoading(true);
      let data = {
        sender_id: senderID,
        recever_id: empIds,
        ammount: amount,
        comment: comments,
      };
      // console.log('data======', data.recever_id);

      if (data.recever_id.length > 0) {
        let result = await AuthService.multiplePay(data);
        // console.log(`result------->>`, result);
        if (
          result.status == true &&
          result.error == null &&
          result.data == 'successfully'
        ) {
          setLoading(false);
          Toast.show('Tip send successfully');
          Navigation.back();
        } else {
          setLoading(false);
          Toast.show(result.error);
        }
      } else if (employeeList == null) {
        setLoading(false);
        Toast.show('No employess added');
      } else {
        setLoading(false);
        Toast.show('Select atleast 1 employee');
      }
    } else {
      Toast.show('Enter amount');
    }
  };

  const checkAll = val => {
    if (val) {
      let arr = employeeList.map(item => {
        return item.employee_id;
      });
      setEmpIds(arr);

      setRefresh(!refresh);
      console.log(`arr--------------------->>>`, arr);
    } else {
      setEmpIds([]);
      setRefresh(!refresh);
    }
  };

  const getSelectedValue = val => {
    let index = empIds.findIndex(it => it == val);
    if (index >= 0) {
      return true;
    }
    return false;
  };

  // console.log(`employee list------------->>>`, employeeList);

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
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          //   style={{paddingBottom: 10}}
          contentContainerStyle={{paddingBottom: 10}}> */}
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
            <Text style={styles.settingsTxt}>Pay Tip Amount</Text>
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
              <View style={{paddingHorizontal: moderateScale(10)}}>
                <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphInput}>
                  <TextInput
                    placeholder="Enter Amount"
                    keyboardType="number-pad"
                    placeholderTextColor={COLORS.placeholderTextColor}
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
                </NeomorphFlex>

                <Text style={styles.settingsTxt}>{userData.data.name}</Text>
                {/* <ScrollView showsVerticalScrollIndicator={false}> */}

                {employeeList != null &&
                employeeList.length > 0 &&
                employeeList ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingStart: moderateScale(10),
                    }}>
                    <CheckBox onChangeVal={val => checkAll(val)} />
                    <Text
                      style={{
                        fontFamily: 'Playfair-Display',
                        paddingStart: moderateScale(10),
                        marginVertical: verticalScale(10),
                        color: COLORS.placeholderTextColor,
                      }}>
                      Select All
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={employeeList}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index}
                  style={styles.list}
                  renderItem={({item, index}) => {
                    return (
                      <NeomorphFlex
                        swapShadows // <- change zIndex of each shadow color
                        style={styles.neomorphList}>
                        <View>
                          <View style={styles.cardView}>
                            <View style={styles.leftView}>
                              {console.log('empIds---->>', empIds)}
                              <CheckBox
                                value={getSelectedValue(item.employee_id)}
                                onChangeVal={val => {
                                  console.log('val----', val);
                                  setChecked(val);
                                  if (val) {
                                    setEmpIds(state => [
                                      ...state,
                                      item.employee_id,
                                    ]);
                                  } else {
                                    let arr = empIds;
                                    // console.log(`list arr--------->`, arr);
                                    let arrIndex = arr.findIndex(
                                      it => it == item.employee_id,
                                    );
                                    if (arrIndex >= 0) {
                                      arr.splice(arrIndex, 1);
                                      setEmpIds(arr);
                                    }
                                  }
                                }}
                              />
                              <View>
                                <Text style={styles.nameTxt}>{item.name}</Text>

                                <Text style={styles.staffTxt}>
                                  {item.employee_id}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.rightView}>
                              <Image
                                source={{uri: item.qr_path + item.qr_code}}
                                style={styles.qrCode}
                              />
                            </View>
                          </View>
                          <Text
                            onPress={() =>
                              Navigation.navigate('CustomTipAmount', {
                                id: item.employee_id,
                                name: item.name,
                              })
                            }
                            style={{
                              alignSelf: 'center',
                              // backgroundColor: 'red',
                              // marginTop: moderateScale(5),
                              marginEnd: moderateScale(15),
                              fontFamily: 'Quicksand',
                              color: COLORS.black,
                            }}>
                            Pay Custom Tip
                          </Text>
                        </View>
                      </NeomorphFlex>
                    );
                  }}
                />
                {/* </ScrollView> */}
                <Pressable
                  // onPress={() => Navigation.navigate('SingleTipAmount')}
                  onPress={payMultipleTip}
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
              </View>
            </LinearGradient>
          </NeomorphFlex>
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default MultipleTipAmount;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
    // backgroundColor: 'blue',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(30),
    // flex: 1,
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
    // height: verticalScale(470),
    // paddingTop: verticalScale(40),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
  },
  cardGradient: {
    // height: '100%',
    // width: '100%',
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
    height: verticalScale(100),
  },
  textArea: {
    // backgroundColor: 'red',
    fontFamily: 'Playfair-Display',
    height: verticalScale(100),
    // color: COLORS.placeholderTextColor,
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
  neomorphList: {
    shadowRadius: 2,
    borderRadius: 5,
    backgroundColor: COLORS.textInputViolet,
    // paddingVertical: moderateScale(5),
    // backgroundColor: 'red',
    // width: width - 40,
    height: verticalScale(70),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    //   justifyContent: 'space-around',
    paddingHorizontal: moderateScale(10),

    // flex: 1,
  },
  leftView: {
    flex: 2,
    // backgroundColor: 'green',
    // paddingStart: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'space-evenly',
  },
  qrCode: {
    height: moderateScale(30),
    width: verticalScale(30),
  },
  nameTxt: {
    color: COLORS.black,
    fontFamily: 'Quicksand',
  },
  staffTxt: {
    color: COLORS.black,
    fontFamily: 'Quicksand',
    fontSize: moderateScale(10),
  },
  accountTxt: {
    color: COLORS.black,
    fontFamily: 'Quicksand',
    fontSize: moderateScale(10),
  },
  statusTxt: {
    fontFamily: 'Quicksand',
    fontSize: moderateScale(10),
    color: COLORS.gratitudeGreen,
  },
});
