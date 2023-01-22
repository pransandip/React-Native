import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
// import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon, Picker} from 'native-base';
import Navigation from '../../Navigation';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AuthService from '../../Service/AuthService';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setuser} from '../../Redux/reducer/User';
import Toast from 'react-native-simple-toast';

const {height, width} = Dimensions.get('window');

const PersonalInformation = props => {
  const dispatch = useDispatch();
  const {userData} = props.route.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState('Date of Birth');

  const [gender, setGender] = useState([
    {
      label: 'Gender',
      value: 'Gender',

      hidden: true,
    },
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Female',
      value: 'Female',
    },
    {
      label: 'Others',
      value: 'Others',
    },
  ]);

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
  const [selectedCurrency, setselectedCurrency] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [recoveryMobile, setRecoveryMobile] = useState('');
  const [selectedGender, setSelectedGender] = useState('Gender');

  console.log(`selectedCountry------>>>`, selectedCountry);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  console.log(`userData----------->>>>`, userData);

  // useEffect(() => {
  //   getCountry();
  // }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    setDate(moment(date).format('DD - MM - YYYY'));
    hideDatePicker();
  };

  const personalInfo = async () => {
    let data = {
      user_id: userData.user_id,
      fast_name: firstName,
      last_name: lastName,
      date_of_birth: date,
      gender: selectedGender,
      rupess_type: selectedCurrency,
      country: selectedCountry,
      mobile: mobile,
      recovery_mobile: recoveryMobile,
    };

    console.log(`data-------->`, data);

    let result = await AuthService.personalInfo(data);
    console.log(`result--------->>`, result);
    if (result != null && result.status) {
      console.log(`result--------->>`, result);

      AuthService.setAccount(result.data);
      dispatch(setuser(result.data));
      Navigation.navigate('HomeUser');
    } else {
      Toast.show('All fields required');
    }
  };

  const chooseCountry = val => {
    setSelectedCountry(val);
    // currency.map((item,index))
    let filterCurrency = currency.filter(it => it.country == val);
    console.log('filterCurrency----', filterCurrency);
    setNewCurrency(filterCurrency);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{flex: 1}}>
      {/* <KeyboardAwareScrollView> */}
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
                  source={require('../../assets/laptopGirl.png')}
                  style={styles.logo}
                />
              </Neomorph>
            </View>
          </View>

          <Text style={styles.businessTxt}>Personal Information</Text>
          <Text style={styles.infoTxt}>This info needs to be accurate</Text>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder="First name"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              onChangeText={val => setFirstName(val)}
            />
          </NeomorphFlex>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder="Second name"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              onChangeText={val => setLastName(val)}
            />
          </NeomorphFlex>

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder="Mobile"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              onChangeText={val => setMobile(val)}
              maxLength={15}
            />
          </NeomorphFlex>
          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              placeholder="Recovery Mobile"
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
              onChangeText={val => setRecoveryMobile(val)}
              maxLength={15}
            />
          </NeomorphFlex>

          <View style={styles.dateOfBirthGenderView}>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={{
                ...styles.neomorphInput,
                width: '47%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text onPress={showDatePicker} style={styles.dobTxt}>
                {date}
              </Text>

              <Icon
                name="angle-down"
                onPress={showDatePicker}
                type="FontAwesome"
                style={styles.angleDown}
              />

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </NeomorphFlex>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={{
                ...styles.neomorphInput,
                width: '45%',
              }}>
              <DropDownPicker
                items={gender}
                defaultValue={selectedGender}
                labelStyle={{
                  fontFamily: 'Playfair-Display',
                  fontSize: moderateScale(14),
                  color: COLORS.placeholderTextColor,
                }}
                containerStyle={{height: 40}}
                style={{
                  backgroundColor: 'transparent',
                }}
                // autoScrollToDefaultValue={true}
                scrollViewProps={{
                  persistentScrollbar: true,
                }}
                itemStyle={{justifyContent: 'flex-start'}}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setSelectedGender(item.value)}
              />
            </NeomorphFlex>
          </View>
          {/* {console.log('=====', currency.length)} */}

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
          ) : null}

          <NeomorphFlex
            inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.neomorphInput}>
            <TextInput
              // placeholder="Email"
              editable={false}
              value={userData.email}
              placeholderTextColor={COLORS.placeholderTextColor}
              style={styles.input}
            />
          </NeomorphFlex>

          <Pressable
            style={styles.loginBtn}
            // onPress={() => Navigation.navigate('cardBankSetup')}
            onPress={personalInfo}>
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
        {/* </ScrollView> */}
      </LinearGradient>
      {/* </KeyboardAwareScrollView> */}
    </KeyboardAwareScrollView>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(34),

    marginBottom: verticalScale(50),
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
  neomorphInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // width: width - 70,
    // width: '100%',
    height: verticalScale(40),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15),
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
  input: {
    fontFamily: 'Playfair-Display',
    height: verticalScale(40),
    flex: 1,
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  dateOfBirthGenderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: 200,
    zIndex: 10,
  },
  dobTxt: {
    fontFamily: 'Playfair-Display',
    fontSize: moderateScale(14),
    color: COLORS.placeholderTextColor,
  },
  angleDown: {
    fontSize: moderateScale(15),
    marginTop: verticalScale(5),
  },
  Genderpicker: {
    fontFamily: 'Playfair-Display',
    color: 'red',
  },
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(30),
    height: verticalScale(50),
    marginVertical: verticalScale(30),
    // marginBottom: verticalScale(100),
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
  picker: {
    color: COLORS.placeholderTextColor,
  },
});
