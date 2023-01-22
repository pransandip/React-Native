import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon, Picker} from 'native-base';
import Toast from 'react-native-simple-toast';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('window');

const PaymentSettings = () => {
  const {userData} = useSelector(state => state.User);
  const [cards, setCards] = useState([
    {
      cardImg: require('../../assets/cards/AmericanExpress.png'),
    },
    {
      cardImg: require('../../assets/cards/Maestro.png'),
    },
    {
      cardImg: require('../../assets/cards/Visa.png'),
    },
  ]);
  const [bankAccounts, setBankAccounts] = useState([
    // {
    //   name: 'American Bank',
    //   accountNumber: 'XXXX XX12 34',
    //   type: 'Primary Account',
    // },
  ]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [hideNewCardSection, setHideNewCardSection] = useState(true);
  const [addNewbankAccount, setAddNewbankAccount] = useState(true);
  const [enterNewCard, setenterNewCard] = useState(false);
  const [id, setId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
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
  // console.log('userData', userData);

  const yearRef = useRef();

  const addNewCard = () => {
    setenterNewCard(true);
    setHideNewCardSection(false);
  };

  const newBankAccount = () => {
    setAddNewbankAccount(false);
    setHideNewCardSection(false);
    setenterNewCard(false);
  };

  const showCardSection = () => {
    setAddNewbankAccount(true);
    setHideNewCardSection(true);
  };

  useEffect(() => {
    getAccount();
    getAllBanks();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`loginID--------------->>>>`, result);
    setId(result.type == 'user' ? result.user_id : result.bussiness_id);
    fetchBankAccounts(
      result.type == 'user' ? result.user_id : result.bussiness_id,
    );
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

    console.log(`card data---------------->>>>`, data);

    let result = await AuthService.addCard(data);

    console.log(`result-------------------->>>`, result);

    if (result != null && result.status) {
      Toast.show('Card details Added');
      setenterNewCard(false);
      getAccount();
    } else {
      Toast.show(result.error);
      setenterNewCard(false);
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

    console.log(`result----------->>>>`, result);

    if (result != null && result.status) {
      // setTransferOptions(result.data);
      setBankAccounts(result.data);
    }
  };

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
          // console.log('res bank-------------->>>', res);
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
        // console.log('res branch---------------->>>', res);
        if (res.status == 'success') {
          setBranchAvail(true);
          setAllBranch(res.data);
        } else {
          setBranchAvail(false);
          setAllBranch([]);
        }
      });
  };

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

      // console.log(`Account Data------------>>>>`, data);
      setLoading(true);
      request = await AuthService.addUserBankAccounts(data);
    } else {
      let data = {
        bussiness_id: id,
        account_bank: accountBank,
        account_number: accountNumber,
      };

      // console.log(`Account Data------------>>>>`, data);
      setLoading(true);
      request = await AuthService.addBusinessBankAccounts(data);

      // console.log(`User bank Account-------------->>>`, request);
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

  const addCardNumber = async val => {
    console.log(`val--------->>>`, val);
    setCardNumber(val);
    if (val.length == 4) {
      setCardNumber(val + ' ');
    }
    if (val.length == 9) {
      setCardNumber(val + ' ');
    }
    if (val.length == 14) {
      setCardNumber(val + ' ');
    }
    // if (val.length == 17) {
    //   setCardNumber(val + ' ');
    // }
  };

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
              <Text style={styles.settingsTxt}>Payment settings</Text>
            </View>
          </View>

          <NeomorphFlex
            //   inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.blueBar}>
            <Text style={styles.employeeTxt}>Cards</Text>
            <Icon
              name={addNewbankAccount == true ? null : 'chevron-small-down'}
              type="Entypo"
              onPress={showCardSection}
              // onPress={() => setHideNewCardSection(!hideNewCardSection)}
              style={styles.arrowIcon}
            />
          </NeomorphFlex>

          {hideNewCardSection ? (
            <>
              <View style={styles.cardView}>
                <Text style={styles.addCardTxt}>
                  Add any Debit or Credit card for faster payments
                </Text>

                <FlatList
                  data={cards}
                  keyExtractor={(item, index) => index}
                  showHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{
                    paddingHorizontal: moderateScale(20),
                    marginTop: verticalScale(15),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <Pressable style={styles.cardList}>
                        <Image source={item.cardImg} />
                      </Pressable>
                    );
                  }}
                />
              </View>

              <View
                style={{
                  borderBottomColor: COLORS.whiteAsh,
                  borderBottomWidth: 1,
                  width: '95%',
                  alignSelf: 'center',
                }}
              />
            </>
          ) : null}

          {hideNewCardSection ? (
            <Text onPress={addNewCard} style={styles.addNewCardTxt}>
              + Add New Cards
            </Text>
          ) : null}
          {/* New Card */}

          {enterNewCard ? (
            <>
              <View style={styles.newCardView}>
                <Text style={styles.setupTxt}>New Card</Text>
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
                      maxLength={19}
                      keyboardType="numeric"
                      value={cardNumber}
                      // onChangeText={val => setCardNumber(val)}
                      onChangeText={val => addCardNumber(val)}
                    />
                  </NeomorphFlex>
                </View>

                <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Card holder's Name</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Full name"
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
                          //   onChangeText={val => setMonth(val)}
                          keyboardType="numeric"
                          onChangeText={val => {
                            setMonth(val);
                            if (val.length == 2) {
                              yearRef.current.focus();
                            }
                          }}
                          // ref={monthRef}
                        />
                        <Text
                          style={{
                            marginHorizontal: 2,
                            color: COLORS.placeholderTextColor,
                          }}>
                          /
                        </Text>
                        <TextInput
                          placeholder="YY"
                          value={year}
                          maxLength={2}
                          placeholderTextColor={COLORS.placeholderTextColor}
                          onChangeText={val => setYear(val)}
                          ref={yearRef}
                          style={styles.input}
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
                        onChangeText={val => setCvv(val)}
                        keyboardType="numeric"
                      />
                    </NeomorphFlex>
                  </View>
                </View>

                <Pressable
                  // onPress={() => Navigation.navigate('QRCodeUser')}
                  onPress={addCard}
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
                      <Text style={styles.loginTxt}>Submit</Text>
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
            <Text style={styles.employeeTxt}>Linked Bank Accounts</Text>

            {addNewbankAccount ? (
              <Text
                onPress={newBankAccount}
                style={[styles.employeeTxt, {color: COLORS.black}]}>
                + Add New Bank
              </Text>
            ) : null}
          </NeomorphFlex>

          <View style={styles.bottomView}>
            <Text style={styles.UPITxt}>UPI ID : 1234567809@asantetip</Text>

            {addNewbankAccount ? (
              <FlatList
                data={bankAccounts}
                key={'#'}
                keyExtractor={(item, index) => index}
                vertical={true}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Quicksand',
                          color: COLORS.black,
                          fontSize: moderateScale(15),
                          fontWeight: '600',
                        }}>
                        {item.bank_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Quicksand',
                          color: COLORS.black,
                          fontSize: moderateScale(10),
                        }}>
                        Savings A/c No. {item.account_number}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Quicksand',
                          color: COLORS.pleasureGreen,
                          fontSize: moderateScale(10),
                        }}>
                        {item.type}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.valentineBlue,
                          fontfamily: 'Quicksand',
                          fontSize: moderateScale(10),
                        }}>
                        Check Balance
                      </Text>
                    </View>
                  );
                }}
              />
            ) : null}

            {!addNewbankAccount ? (
              <>
                <Text style={styles.setupTxt}>NEW A/c</Text>
                {/* <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Account Number</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="______________"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      maxLength={18}
                      keyboardType="numeric"
                    />
                  </NeomorphFlex>
                </View> */}

                {/* <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>IFSC Code</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="IFSC Code"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                    />
                  </NeomorphFlex>
                </View> */}

                {/* <View style={styles.numberView}>
                  <Text style={styles.numberTxt}>Account Holder’s name</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphInput}>
                    <TextInput
                      placeholder="Account holder’s name"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                    />
                  </NeomorphFlex>
                </View> */}

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
                <Pressable
                  // onPress={() => Navigation.navigate('QRCodeUser')}
                  onPress={addAccount}
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
              </>
            ) : null}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default PaymentSettings;

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
  },
  arrowIcon: {
    color: COLORS.black,
  },
  cardView: {
    paddingHorizontal: moderateScale(16),
    marginVertical: verticalScale(20),
  },
  addCardTxt: {
    textAlign: 'center',
    // fontSize: moderateScale(14),

    fontFamily: 'Quicksand',
    color: COLORS.black,
  },
  cardList: {
    // flexDirection: 'row',
    paddingHorizontal: moderateScale(5),
    // backgroundColor: 'red',
  },
  addNewCardTxt: {
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(20),
    color: COLORS.valentineBlue,
    fontFamily: 'Quicksand',
  },
  bottomView: {
    paddingHorizontal: moderateScale(30),
    marginVertical: verticalScale(40),
  },
  UPITxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
  list: {
    marginTop: verticalScale(12),
    paddingHorizontal: moderateScale(70),
  },
  newCardView: {
    // marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(30),
  },

  // new card

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
  picker: {
    color: COLORS.placeholderTextColor,
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
});
