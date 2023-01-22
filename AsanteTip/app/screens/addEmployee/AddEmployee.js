import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import Toast from 'react-native-simple-toast';
import AuthService from '../../Service/AuthService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import Navigation from '../../Navigation';

const {height, width} = Dimensions.get('window');

const AddEmployee = ({navigation}) => {
  // console.log(`qrCode-------`, );

  const [addEmployee, setAddEmployee] = useState('');

  const [employeeList, setEmployeeList] = useState([]);

  const [staffNo, setStaffNo] = useState('');

  const [businessID, setBusinessID] = useState('');

  const toggleEmployee = () => {
    setAddEmployee(!addEmployee);
  };

  useEffect(() => {
    getAccount();

    let fo = navigation.addListener('focus', e => {
      getAccount();
    });
    return fo;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    // console.log(`id-------`, result);
    fetchEmployee(result.bussiness_id);
    setBusinessID(result.bussiness_id);
  };

  const fetchEmployee = async val => {
    let data = {
      bussiness_id: val,
    };

    // console.log(`dataFetch--------`, data);
    let result = await AuthService.employeeFetch(data);
    // console.log(`resultFetch-------`, result);
    if (result != null && result.status) {
      // console.log(`resultFetch-------`, result);

      setEmployeeList(result.data);
    }
  };

  const registerEmployee = async val => {
    let data = {
      bussiness_id: businessID,
      user_id: staffNo,
    };

    console.log(`dataRegister-------`, data);

    let result = await AuthService.employeeRegister(data);
    console.log(`updated-------`, result);
    if (result != null && result.status == true) {
      fetchEmployee(businessID);
      Toast.show('Details Updated');
      setStaffNo('');
    } else {
      Toast.show('Already Registered');
      setStaffNo('');
    }
  };

  // console.log(`EmployeeList---------`, employeeList);
  // console.log(`staffNO-------`, staffNo);

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
                type="AntDesign"
                style={styles.arrowLeft}
                onPress={() => Navigation.back()}
              />
            </Neomorph>
            <Text style={styles.settingsTxt}>Add Employee</Text>
          </View>
        </View>
        <NeomorphFlex
          //   inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={styles.blueBar}>
          <Text style={styles.employeeTxt}>Add Employee</Text>
          <Icon
            name={addEmployee ? 'chevron-small-up' : 'chevron-small-down'}
            type="Entypo"
            onPress={toggleEmployee}
            style={styles.arrowIcon}
          />
        </NeomorphFlex>

        {addEmployee ? (
          <>
            <View style={{...styles.topView}}>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Link to QR code"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  value={staffNo}
                  onChangeText={val => setStaffNo(val)}
                />
              </NeomorphFlex>
            </View>

            <View style={styles.continueView}>
              <View
                style={{
                  borderBottomColor: COLORS.whiteAsh,
                  borderBottomWidth: 1,
                  width: '45%',
                }}
              />
              <Text style={styles.continueTxt}>OR</Text>
              <View
                style={{
                  borderBottomColor: COLORS.whiteAsh,
                  borderBottomWidth: 1,
                  width: '45%',
                }}
              />
            </View>

            <View
              style={{
                ...styles.topView,
                marginHorizontal: moderateScale(50),
                marginTop: verticalScale(0),
              }}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ScanQRStack', {name: 'AddEmployee'})
                }
                style={styles.socialBtn}>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.socialNeomorph}>
                  <Text style={styles.socialTxt}>Scan QR</Text>
                </NeomorphFlex>
              </Pressable>

              <Pressable onPress={registerEmployee} style={styles.loginBtn}>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphbtn}>
                  <LinearGradient
                    colors={['#7E8BEE', '#5E6FE4']}
                    start={{x: 0.3, y: 0}}
                    end={{x: 0.7, y: 1}}
                    style={styles.btnGradient}>
                    <Text style={styles.loginTxt}>Save</Text>
                  </LinearGradient>
                </NeomorphFlex>
              </Pressable>
            </View>
          </>
        ) : null}

        <NeomorphFlex
          //   inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={styles.blueBar}>
          <Text style={styles.employeeTxt}>Employee List</Text>
        </NeomorphFlex>

        <FlatList
          data={employeeList}
          key={'#'}
          keyExtractor={(item, index) => index}
          vertical={true}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          // numColumn={1}
          renderItem={({item, index}) => {
            // console.log(`item-----`, item);
            return (
              //   <View>
              <NeomorphFlex
                //   inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphList}>
                <View style={styles.cardView}>
                  <View style={styles.leftView}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    <Text style={styles.staffTxt}>
                      Staff Number: {item.stuff_no}
                    </Text>
                    <Text style={styles.accountTxt}>
                      Account :
                      <Text style={styles.statusTxt}> {item.status}</Text>
                    </Text>
                  </View>
                  <View style={styles.rightView}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('QRCodeBusiness', {
                          userData: item.path + item.qr_code,
                        })
                      }>
                      <Image
                        source={require('../../assets/qr.png')}
                        style={{
                          height: moderateScale(40),
                          width: moderateScale(40),
                        }}
                      />
                    </Pressable>

                    <Text
                      onPress={() =>
                        navigation.navigate('EditEmployee', {details: item})
                      }
                      style={styles.editTxt}>
                      Edit
                    </Text>
                  </View>
                </View>
              </NeomorphFlex>
              //   </View>
            );
          }}
        />
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AddEmployee;

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

  blueBar: {
    shadowRadius: 10,
    // borderRadius: 25,
    // backgroundColor: COLORS.white,
    // borderWidth: 1,
    backgroundColor: COLORS.themeColor,
    // width: width,
    height: verticalScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(20),
  },
  employeeTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.white,
    fontSize: moderateScale(14),
  },
  arrowIcon: {
    color: COLORS.black,
  },
  inputView: {
    marginTop: verticalScale(30),
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
    paddingHorizontal: moderateScale(15),
  },
  input: {
    fontFamily: 'Playfair-Display',
    height: verticalScale(40),
    flex: 1,
    color: COLORS.black,
    fontSize: moderateScale(14),
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
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(20),
    height: verticalScale(50),
    // marginTop: verticalScale(30),
    // backgroundColor: 'red',
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
  socialBtn: {
    // backgroundColor: 'red',

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
  list: {
    marginVertical: verticalScale(25),
    paddingHorizontal: moderateScale(20),
  },

  neomorphList: {
    shadowRadius: 5,
    borderRadius: 25,
    backgroundColor: COLORS.textInputViolet,
    // paddingVertical: moderateScale(5),
    // backgroundColor: 'red',
    // width: width - 40,
    height: verticalScale(70),
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    //   justifyContent: 'space-around',
    paddingHorizontal: moderateScale(20),

    // flex: 1,
  },
  leftView: {
    flex: 2,
    // backgroundColor: 'green',
    // paddingStart: moderateScale(15),
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'space-evenly',
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
  editTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.valentineBlue,
    fontSize: moderateScale(11),
  },
});
