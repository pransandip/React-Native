import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Picker} from 'native-base';
import Toast from 'react-native-simple-toast';
import Navigation from '../../Navigation';
import {setuser} from '../../Redux/reducer/User';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthService from '../../Service/AuthService';
import {useDispatch} from 'react-redux';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

const {height, width} = Dimensions.get('window');

const BusinessInformation = props => {
  const dispatch = useDispatch();
  const {userData} = props.route.params;
  console.log(`userData------->`, userData.email);

  const [currency, setCurrency] = useState([
    {label: 'NGN', value: 'NGN', hidden: true, country: 'NG'},
    {label: 'GHS', value: 'GHS', country: 'GH'},
    {label: 'KES', value: 'KES', country: 'KE'},
    {label: 'TZS', value: 'TZS', country: 'TZ'},
    {label: 'ZAR', value: 'ZAR', country: 'ZA'},
    {label: 'USD', value: 'USD', country: 'GH'},
    {label: 'USD', value: 'USD', country: 'KE'},
    {label: 'USD', value: 'USD', country: 'TZ'},
    {label: 'USD', value: 'USD', country: 'ZA'},
    {label: 'USD', value: 'USD', country: 'UG'},
    {label: 'USD', value: 'USD', country: 'NG'},
    {label: 'GBP', value: 'GBP', country: 'UG'},
  ]);
  const [country, setCountry] = useState([
    {value: 'NG', label: 'Nigeria'},
    {value: 'GH', label: 'Ghana'},
    {value: 'KE', label: 'Kenya'},
    {value: 'UG', label: 'Uganda'},
    {value: 'ZA', label: 'South Africa'},
    {value: 'TZ', label: 'Tanzania'},
  ]);

  const [newCurrency, setNewCurrency] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCurrency, setselectedCurrency] = useState('');
  const [landLine, setLandLine] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [mobileNumber, setMobileNumber] = useState(
    !isNaN(userData.email ? userData.email : ''),
  );
  // const [emailId, setEmailId] = useState(
  //   isNaN(userData.email ? userData.email : ''),
  // );

  // console.log('mobileNumber----', mobileNumber, emailId);

  const businesssInfo = async () => {
    let data = {
      // bussiness_id: userData.bussiness_id,
      // mobile: landLine,
      // company_name: companyName,
      // rupess_type: selectedCurrency,
      // country: selectedCountry,

      bussiness_id: userData.bussiness_id,
      mobile: mobileNumber ? userData.email : landLine,
      company_name: companyName,
      rupess_type: selectedCurrency,
      country: selectedCountry,
      email: !mobileNumber ? userData.email : email,
    };

    console.log(`data--------->`, data);

    let result = await AuthService.businessInfo(data);

    // console.log(`result------------->>`, result);
    if (
      result != null &&
      result.status &&
      country != 'Select country' &&
      currency != 'Currency'
    ) {
      console.log(`result------------->>`, result);

      AuthService.setAccount(result.data);
      dispatch(setuser(result.data));
      Navigation.navigate('HomeBusiness');
    } else {
      Toast.show(result.error);
    }
  };

  const chooseCountry = val => {
    setSelectedCountry(val);
    // currency.map((item,index))
    let filterCurrency = currency.filter(it => it.country == val);
    // console.log('filterCurrency----', filterCurrency);
    setNewCurrency(filterCurrency);
  };

  // const emaiMobileVerify = val => {
  //   let numberRegx = /^[1-9]\d*$/;
  //   let mobileRegx = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  //   let emailRegx =
  //     /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,20}[\.][a-z]{2,5}/g;

  //   if (!userData.email.match(numberRegx) && !userData.email.match(emailRegx)) {
  //     setEmailId(userData.email);
  //   } else {
  //     setMobileNumber(userData.email);
  //   }
  // };

  // console.log(`emailmobile------`, emaiMobileVerify);

  console.log(`mobile------------>>>`, mobileNumber);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topView}>
            <View style={styles.logoView}>
              <View style={styles.neomorphImgView}>
                <Neomorph
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphImg}>
                  <Image
                    source={require('../../assets/laptopGirl.png')}
                    style={styles.logo}
                  />
                </Neomorph>
              </View>
            </View>

            <Text style={styles.businessTxt}>Business Information</Text>
            <Text style={styles.infoTxt}>This info needs to be accurate</Text>
            <Text style={styles.nameTxt}>Company Name</Text>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphInput}>
              <TextInput
                placeholder="Company Name"
                placeholderTextColor={COLORS.placeholderTextColor}
                style={styles.input}
                onChangeText={val => setCompanyName(val)}
              />
            </NeomorphFlex>
            <Text style={styles.nameTxt}>Registered Email</Text>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphInput}>
              <TextInput
                placeholder="company@exmaple.com"
                value={!mobileNumber ? userData.email : null}
                // value={emailId}
                onChangeText={val => setEmail(val)}
                placeholderTextColor={COLORS.placeholderTextColor}
                style={styles.input}
                editable={mobileNumber == false ? false : true}
              />
            </NeomorphFlex>
            <Text style={styles.nameTxt}>Landline Number</Text>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphInput}>
              <TextInput
                placeholder="Landline Number"
                keyboardType="phone-pad"
                maxLength={12}
                value={mobileNumber ? userData.email : null}
                placeholderTextColor={COLORS.placeholderTextColor}
                style={styles.input}
                editable={mobileNumber == true ? false : true}
                onChangeText={val => setLandLine(val)}
              />
            </NeomorphFlex>

            <Text style={styles.nameTxt}>Country</Text>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={{
                ...styles.neomorphInput,
                // width: '45%',
              }}>
              <View style={styles.picker_view}>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  placeholderStyle={({color: '#112F43'}, {fontSize: 3})}
                  style={styles.picker}
                  //   note={false}
                  selectedValue={selectedCountry}
                  onValueChange={val => chooseCountry(val)}>
                  <Picker.Item label="Select country" />
                  {country.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    );
                  })}
                </Picker>
              </View>
            </NeomorphFlex>

            {newCurrency.length > 0 ? (
              <>
                <Text style={styles.nameTxt}>Currency</Text>
                <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={{
                    ...styles.neomorphInput,
                    // width: '45%',
                  }}>
                  <View style={styles.picker_view}>
                    <Picker
                      mode="dropdown"
                      placeholder="Select One"
                      placeholderStyle={({color: '#112F43'}, {fontSize: 3})}
                      style={styles.picker}
                      // note={false}
                      selectedValue={selectedCurrency}
                      onValueChange={setselectedCurrency}>
                      <Picker.Item label="Currency" />
                      {newCurrency.map((item, index) => {
                        return (
                          <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </NeomorphFlex>
              </>
            ) : null}

            <Pressable
              // onPress={() => Navigation.navigate('HomeBusiness')}
              onPress={businesssInfo}
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
                  <Text style={styles.loginTxt}>Next</Text>
                </LinearGradient>
              </NeomorphFlex>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default BusinessInformation;

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
  },
  logoView: {
    // backgroundColor: 'red',
  },
  neomorphImgView: {
    // marginTop: verticalScale(20),
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  neomorphImg: {
    shadowRadius: moderateScale(10),
    // shadowOpacity: moderateScale(0.2),
    // borderRadius: moderateScale(25),
    backgroundColor: COLORS.statusBar,
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: moderateScale(130),
    width: moderateScale(130),
  },
  businessTxt: {
    fontSize: moderateScale(20),
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.lovePurple,
    paddingTop: moderateScale(20),
    width: width,
  },
  infoTxt: {
    fontFamily: 'Playfair-Display',
    // fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: '600',
    fontSize: moderateScale(11),
    color: COLORS.valentineBlue,
  },
  nameTxt: {
    fontFamily: 'Playfair-Display',
    color: COLORS.valentineBlue,
    marginTop: moderateScale(10),
    fontSize: moderateScale(13),
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
  dateOfBirthGenderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  angleDown: {
    fontSize: moderateScale(11),
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
  picker_view: {
    borderWidth: 1,
    borderColor: 'transparent',
    height: verticalScale(40),
    backgroundColor: 'transparent',
    // alignSelf: 'center',
    width: '100%',
    // marginTop: verticalScale(10),
  },
  picker: {
    color: COLORS.placeholderTextColor,
  },
});
