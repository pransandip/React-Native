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
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {Picker} from 'native-base';

const {height, width} = Dimensions.get('window');

const AddBankAccount = () => {
  const {userData} = useSelector(state => state.User);
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  // const [bankName, setBankName] = useState('');
  // const [branchName, setBranchName] = useState('');
  // const [ifscCode, setIfscCode] = useState('');
  // const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountBank, setAccountBank] = useState('');
  const [allBanks, setAllBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState({});
  const [allBranch, setAllBranch] = useState([]);
  const [branchAvail, setBranchAvail] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState({});
  const [benificaryName, setBenificaryName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  console.log('userData', userData);

  useEffect(() => {
    getAllBanks();
    // getAccount();
  }, []);

  const getAllBanks = () => {
    if (
      userData.country == 'NG' ||
      userData.country == 'GH' ||
      userData.country == 'KE' ||
      userData.country == 'UG' ||
      userData.country == 'ZA' ||
      userData.country == 'TZ'
    ) {
      const config = {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer FLWSECK_TEST-a4c9bdbf843f02ca60d6b4f8050ea7fa-X',
        },
      };
      fetch(`https://api.flutterwave.com/v3/banks/${userData.country}`, config)
        .then(response => response.json())
        .then(res => {
          // console.log("res", res);
          if (res.status == 'success') {
            setAllBanks(res.data);
          }
        });
    }
  };

  const getBranch = bankDetails => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer FLWSECK_TEST-a4c9bdbf843f02ca60d6b4f8050ea7fa-X',
      },
    };

    fetch(
      `https://api.flutterwave.com/v3/banks/${bankDetails.id}/branches`,
      config,
    )
      .then(response => response.json())
      .then(res => {
        console.log('res', res);
        if (res.status == 'success') {
          setBranchAvail(true);
          setAllBranch(res.data);
        } else {
          setBranchAvail(false);
          setAllBranch([]);
        }
      });
  };

  // const getAccount = async () => {
  //   let result = await AuthService.getAccount();
  //   console.log(`loginID--------------->>>>`, result);
  //   setId(result.type == 'user' ? result.user_id : result.bussiness_id);
  //   setType(result.type);
  // };

  const addAccount = async () => {
    let bankData = {
      narration: '',
      currency: userData.currency,
    };
    if (userData.currency == 'GBP') {
      bankData.beneficiary_name = benificaryName;
      bankData.meta.AccountNumber = accountNumber;
      bankData.meta.RoutingNumber = routingNumber;
      bankData.meta.SwiftCode = swiftCode;
      bankData.meta.BankName = selectedBank.name;
      bankData.meta.BeneficiaryName = benificaryName;
      bankData.meta.BeneficiaryCountry = userData.country;
      bankData.meta.PostalCode = postalCode;
      bankData.meta.StreetNumber = streetNumber;
      bankData.meta.StreetName = streetName;
      bankData.meta.City = city;
    } else if (userData.currency == 'GHS' || userData.currency == 'TZS') {
      bankData.account_bank = selectedBank.code;
      bankData.account_number = accountNumber;
      bankData.destination_branch_code = selectedBranch.branch_code;
      bankData.beneficiary_name = benificaryName;
    } else if (userData.currency == 'KES') {
      bankData.account_bank = selectedBank.code;
      bankData.account_number = accountNumber;
      bankData.meta.sender = 'Asante Tip';
      bankData.meta.sender_country = '';
      bankData.meta.mobile_number = mobileNo;
    } else if (userData.currency == 'ZAR') {
      bankData.account_bank = selectedBank.code;
      bankData.account_number = accountNumber;
      bankData.meta.first_name = benificaryName.split(' ')[0];
      bankData.meta.last_name = benificaryName.split(' ')[1];
      bankData.meta.email = email;
      bankData.meta.mobile_number = mobileNo;
      bankData.meta.recipient_address = streetName;
    } else if (userData.currency == 'NGN') {
      bankData.account_bank = selectedBank.code;
      bankData.account_number = accountNumber;
    }
    let request;
    if (userData.type == 'user') {
      let data = {
        user_id:
          userData.type == 'user' ? userData.user_id : userData.bussiness_id,
        bank_name: selectedBank.name,
        account_number: accountNumber,
        transaction_data: JSON.stringify(bankData),
      };

      console.log(`Account Data------------>>>>`, data);
      setLoading(true);
      request = await AuthService.addUserBankAccounts(data);
    } else {
      let data = {
        bussiness_id: id,
        account_bank: accountBank,
        account_number: accountNumber,
      };

      console.log(`Account Data------------>>>>`, data);
      setLoading(true);
      request = await AuthService.addBusinessBankAccounts(data);

      console.log(`User bank Account-------------->>>`, request);
    }

    if (request != null && request.status) {
      setLoading(false);
      Navigation.back();
      Toast.show('Bank Account Added');
    } else {
      Toast.show(request.error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <StatusBar
        backgroundColor="#CCD6FB"
        barStyle="dark-content"
        translucent={false}
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
                  source={require('../../assets/bank.png')}
                  style={styles.logo}
                />
              </Neomorph>
            </View>
          </View>
          <Text style={styles.setupTxt}>Bank Setup</Text>

          <View style={styles.numberView}>
            <Text style={styles.numberTxt}>Bank Name</Text>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphInput}>
              <Picker
                mode="dropdown"
                placeholder="Select One"
                placeholderStyle={({color: '#112F43'}, {fontSize: 3})}
                style={styles.picker}
                //   note={false}
                selectedValue={selectedBank.id}
                onValueChange={val => {
                  if (val != '') {
                    let bank = allBanks.find(it => it.id == val);
                    setSelectedBank(bank);
                    getBranch(bank);
                  }
                }}>
                <Picker.Item label="Select Bank" value={''} />
                {allBanks.map((item, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={`${item.name} (${item.code})`}
                      value={item.id}
                    />
                  );
                })}
              </Picker>
            </NeomorphFlex>
          </View>

          {branchAvail ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Branch Name</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <Picker
                  mode="dropdown"
                  placeholder="Select One"
                  placeholderStyle={({color: '#112F43'}, {fontSize: 3})}
                  style={styles.picker}
                  selectedValue={selectedBranch.id}
                  onValueChange={val => {
                    if (val != '') {
                      let branch = allBranch.find(it => it.id == val);
                      setSelectedBranch(branch);
                    }
                  }}>
                  <Picker.Item label="Select Branch" value={''} />
                  {allBranch.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={`${item.branch_name}`}
                        value={item.id}
                      />
                    );
                  })}
                </Picker>
              </NeomorphFlex>
            </View>
          ) : null}

          {userData.currency == 'GBP' ||
          userData.currency == 'ZAR' ||
          userData.currency == 'GHS' ||
          userData.currency == 'TZS' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Beneficiary Name</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Beneficiary Name"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  onChangeText={val => setBenificaryName(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          <View style={styles.numberView}>
            <Text style={styles.numberTxt}>Account Number</Text>
            <NeomorphFlex
              inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.neomorphInput}>
              <TextInput
                placeholder="Enter account number"
                placeholderTextColor={COLORS.placeholderTextColor}
                style={styles.input}
                maxLength={18}
                keyboardType="numeric"
                onChangeText={val => setAccountNumber(val)}
              />
            </NeomorphFlex>
          </View>

          {userData.currency == 'GBP' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Routing Number</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Enter routing number"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  maxLength={18}
                  onChangeText={val => setRoutingNumber(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          {userData.currency == 'GBP' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Swift Code</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Enter swift code"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  maxLength={18}
                  onChangeText={val => setSwiftCode(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          {userData.currency == 'GBP' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Postal Code</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Enter postal code"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  maxLength={18}
                  onChangeText={val => setPostalCode(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          {userData.currency == 'GBP' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Street Number</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Enter street number"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  maxLength={18}
                  onChangeText={val => setStreetNumber(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          {userData.currency == 'GBP' || userData.currency == 'ZAR' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>Street Name</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Enter street name"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  maxLength={18}
                  onChangeText={val => setStreetName(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          {userData.currency == 'GBP' ? (
            <View style={styles.numberView}>
              <Text style={styles.numberTxt}>City</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  placeholder="Enter city"
                  placeholderTextColor={COLORS.placeholderTextColor}
                  style={styles.input}
                  maxLength={18}
                  onChangeText={val => setCity(val)}
                />
              </NeomorphFlex>
            </View>
          ) : null}

          <Pressable onPress={addAccount} style={styles.loginBtn}>
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
        {/* </ScrollView> */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AddBankAccount;

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
    // height: height + StatusBar.currentHeight,
    // width: width,
  },
  topView: {
    marginTop: verticalScale(15),
    paddingHorizontal: moderateScale(34),
    // backgroundColor: 'red',
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
    height: verticalScale(100),
    width: moderateScale(120),
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
    flexDirection: 'row',
    alignItems: 'center',
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
