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
import React, {useState, useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon, Picker} from 'native-base';
import Navigation from '../../Navigation';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const ProfileSettings = props => {
  const [textInputEditable, setTextInputEditable] = useState(false);

  const [hideProfile, setHideProfile] = useState(true);

  const [enterAddress, setEnterAddress] = useState(true);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [addBusinessAddress1, setAddBusinessAddress1] = useState('');
  const [addBusinessAddress2, setaddBusinessAddress2] = useState('');
  const [addBusinessPin, setAddBusinessPin] = useState('');
  const [loadingEmployeeDetails, setLoadingEmployeeDetails] = useState(false);
  const [loadingEmployeeAddress, setloadingEmployeeAddress] = useState(false);
  // const employeeNameRef = useRef();
  const employeeNameRef = useRef();
  const customerNameRef = useRef(null);
  // const [userId, setUserId] = useState('');

  const [addCustomerAddress1, setAddCustomerAddress1] = useState('');
  const [addCustomerAddress2, setAddCustomerAddress2] = useState('');
  const [addCustomerPin, setAddCustomerPin] = useState('');

  const [userType, setUserType] = useState('');
  const [id, setId] = useState('');
  const [businessId, setBusinessId] = useState('');

  // const [serialId, setSerialId] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [address, setAddress] = useState([]);
  const [loadingCustomerDetails, setLoadingCustomerDetails] = useState(false);
  const [loadingCustomerAddress, setLoadingCustomerAddress] = useState(false);

  // const [currency, setCurrency] = useState([
  //   {label: 'NGN', value: 'NGN', hidden: true},
  //   {label: 'GHS', value: 'GHS'},
  //   {label: 'KES', value: 'KES'},
  //   {label: 'TZS', value: 'TZS'},
  //   {label: 'ZAR', value: 'ZAR'},
  //   {label: 'USD', value: 'USD'},
  //   {label: 'GBP', value: 'GBP'},
  // ]);

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

  const [selectedCurrency, setselectedCurrency] = useState('');
  const [selectedRupeesType, setSelectedRupeesType] = useState('');
  const [newCurrency, setNewCurrency] = useState([]);
  const [newBusinessCurrency, setNewBusinessCurrency] = useState([]);
  const [refresh, setRefresh] = useState('');

  const showHide = () => {
    setHideProfile(false);
    setEnterAddress(false);
  };

  const downArrowShowHide = () => {
    setHideProfile(true);
    setEnterAddress(true);
  };

  useEffect(() => {
    getAccount();
    console.log('customerNameRef.current---', customerNameRef);
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log('logedin----', result);

    accountType(result.type);
    fetchProfile(result.bussiness_id);
    setId(result.user_id);
    fetchCustomerProfile(result.user_id);
    setCustomerID(result.user_id);
    fetchCustomerAddress(result.user_id);
    setBusinessId(result.bussiness_id);

    fetchEmployeeAddress(result.bussiness_id);

    let filterCurrency = currency.filter(it => it.country == result.country);
    // console.log('filterCurrency----', filterCurrency);
    setNewCurrency(filterCurrency);
    setNewBusinessCurrency(filterCurrency);
  };

  // console.log(`currency--------->>>`, selectedCurrency);

  const accountType = async val => {
    let type = {
      type: val,
    };

    // console.log(`type---------`, type);
    setUserType(type);
  };

  // console.log(`userType---------`, userType.type);
  // console.log(`customer ID-------------`, customerID);

  // For Customer

  const fetchCustomerProfile = async val => {
    let data = {
      id: val,
    };

    console.log(`customer data------------>>>`, data);

    let result = await AuthService.profileUser(data);
    console.log(`user's ID----------`, result.data[0].name);

    if (result != null && result.status) {
      // setAddress(result.data);
      setCustomerName(result.data[0].name);
      setCustomerMobile(result.data[0].mobile);
      setCustomerEmail(result.data[0].email);
    }
  };

  const updateCustomerProfile = async () => {
    setLoadingCustomerDetails(true);
    let data = {
      user_id: customerID,
      user_name: customerName,
      mobile: customerMobile,
      email: customerEmail,
      rupess_type: selectedCurrency,
    };
    console.log(`data----------`, data);
    console.log(`CUStomerID-------->>>`, customerID);
    let result = await AuthService.updateUser(data);
    console.log(`result-----------`, result);
    if (result != null && result.status) {
      Toast.show('Details Updated');
      setLoadingCustomerDetails(false);
      setTextInputEditable(false);
    }
  };

  const addCustomerAddress = async () => {
    setLoadingCustomerAddress(true);
    let data = {
      id: id,
      add1: addCustomerAddress1,
      add2: addCustomerAddress2,
      postal_code: addCustomerPin,
    };

    console.log(`data-----`, data.id);

    if (data.add1 != '' && data.add2 != '' && data.postal_code != '') {
      let result = await AuthService.addUserAddress(data);
      // console.log(`New Address-------`, result);
      if (result != null && result.status) {
        Toast.show('Address Added successfully');
        fetchCustomerAddress(id);
        setAddCustomerAddress1('');
        setAddCustomerAddress2('');
        setAddCustomerPin('');
        setLoadingCustomerAddress(false);
      }
    } else {
      Toast.show('All fields required');
      setLoadingCustomerAddress(false);
    }
  };

  const fetchCustomerAddress = async val => {
    let data = {
      id: val,
    };

    console.log(`idValue--------`, data.id);
    let result = await AuthService.fetchUserAddress(data);

    console.log(`Address-------`, result);

    if (result != null && result.status) {
      setAddress(result.data);
    }
  };

  const deleteCustomerAddress = async val => {
    let data = {
      user_id: id,
      table_id: val,
    };

    console.log(`data--------`, data);
    let result = await AuthService.deleteUserAddress(data);

    console.log(`Deleted Address----------> `, result);

    if (result != null && result.status) {
      Toast.show('Address Deleted');
      fetchCustomerAddress(id);
    }
  };

  // For Employees

  const fetchProfile = async val => {
    let data = {
      bussiness_id: val,
    };

    console.log('data-------', data);
    let result = await AuthService.profileFetch(data);
    // console.log('id-------', result.data);
    // console.log(`type---------`, result.data.type);

    if (result != null && result.status) {
      setName(result.data[0].name);
      setMobile(result.data[0].mobile);
      setEmail(result.data[0].email);
    }
  };

  const updateProfile = async () => {
    setLoadingEmployeeDetails(true);
    let data = {
      bussiness_id: businessId,
      name: name,
      mobile: mobile,
      email: email,
      rupess_type: selectedRupeesType,
    };

    console.log(`data-------`, data);

    let result = await AuthService.updateProfile(data);
    // console.log(`updated-------`, result);
    if (result != null && result.status) {
      Toast.show('Details Updated');
      setLoadingEmployeeDetails(false);
      setTextInputEditable(false);
    } else {
      setLoadingEmployeeDetails(false);
    }
  };

  const fetchEmployeeAddress = async val => {
    let data = {
      bussiness_id: val,
    };

    let result = await AuthService.fetchEmployeeAddress(data);
    // console.log(`result--------`, result.data);

    if (result != null && result.status) {
      setEmployeeAddress(result.data);
    }
  };

  const addEmployeeAddress = async () => {
    setloadingEmployeeAddress(true);
    let data = {
      id: businessId,
      add1: addBusinessAddress1,
      add2: addBusinessAddress2,
      postal_code: addBusinessPin,
    };

    if (data.add1 != '' && data.add2 != '' && data.postal_code != '') {
      let result = await AuthService.addEmployeeAddress(data);
      setloadingEmployeeAddress(false);
      // console.log(`result-------`, result);

      if (result != null && result.status) {
        Toast.show(`Address added successfully`);
        fetchEmployeeAddress(businessId);
        setAddBusinessAddress1('');
        setaddBusinessAddress2('');
        setAddBusinessPin('');
      }
    } else {
      Toast.show('All fields required');
      setloadingEmployeeAddress(false);
    }
  };

  const deleteEmployeeAddress = async val => {
    let data = {
      id: val,
      user_id: businessId,
    };

    console.log(`data---------->`, data);
    console.log(`businessId---------`, businessId);

    let result = await AuthService.deleteEmployeeAddress(data);
    console.log(`result----`, result);
    if (result != null && result.status) {
      Toast.show('Address Deleted');
      fetchEmployeeAddress(businessId);
    }
  };

  const editBtn = val => {
    // console.log('val---', val);
    // console.log('customerNameRef.current---', customerNameRef.current);
    setTextInputEditable(!textInputEditable),
      customerNameRef.current ? customerNameRef.current.focus() : null;
  };

  if (userType.type === 'user') {
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
              <Text style={styles.settingsTxt}>Profile settings</Text>
            </View>
          </View>
          <NeomorphFlex
            //   inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.blueBar}>
            <Text style={styles.employeeTxt}>Profile</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                width: '15%',
                justifyContent: 'space-between',
              }}>
              <Text
                onPress={
                  () => editBtn(textInputEditable)
                  // console.log(customerNameRef.current ? 'bal' : 'chal');
                }
                style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                EDIT
              </Text>

              {hideProfile == false ? (
                <Icon
                  name="angle-down"
                  // onPress={() => setHideProfile(true)}
                  onPress={downArrowShowHide}
                  type="FontAwesome"
                  style={{fontSize: moderateScale(15)}}
                />
              ) : null}
            </View>
          </NeomorphFlex>

          {hideProfile == true ? (
            <View style={styles.profileView}>
              <Text style={styles.numberTxt}>Name</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  editable={textInputEditable ? true : false}
                  // autoFocus={textInputEditable ? true : false}
                  // value={'Sayak Ghosh'}
                  value={customerName}
                  ref={customerNameRef}
                  onChangeText={val => setCustomerName(val)}
                  style={styles.input}
                />
              </NeomorphFlex>
              <Text style={styles.numberTxt}>Recovery Mobile Number</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  editable={textInputEditable ? true : false}
                  keyboardType="numeric"
                  // value={'9738114332'}
                  value={customerMobile}
                  onChangeText={val => setCustomerMobile(val)}
                  style={styles.input}
                />
              </NeomorphFlex>
              <Text style={styles.numberTxt}>E -mail address</Text>
              <NeomorphFlex
                inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.neomorphInput}>
                <TextInput
                  keyboardType="email-address"
                  editable={false}
                  // value={'Sayak21318@gmail.com'}
                  value={customerEmail}
                  // onChangeText={val => setCustomerEmail(val)}
                  style={styles.input}
                />
              </NeomorphFlex>
              <Text style={styles.numberTxt}>Change Currency</Text>
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
                    enabled={textInputEditable ? true : false}
                    placeholder="Select One"
                    placeholderStyle={({color: '#112F43'}, {fontSize: 3})}
                    style={styles.picker}
                    //   note={false}
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

              {textInputEditable ? (
                <Pressable
                  disabled={loadingCustomerDetails ? true : false}
                  onPress={updateCustomerProfile}
                  // onPress={() => Navigation.navigate('HomeUser')}
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
                      <Text style={styles.loginTxt}>Save</Text>
                      {loadingCustomerDetails ? (
                        <ActivityIndicator
                          size="small"
                          color="#fff"
                          style={{marginLeft: 10}}
                        />
                      ) : null}
                    </LinearGradient>
                  </NeomorphFlex>
                </Pressable>
              ) : null}
            </View>
          ) : null}

          <NeomorphFlex
            //   inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.blueBar}>
            <Text style={styles.employeeTxt}>Address</Text>

            {enterAddress == true ? (
              <>
                <Text
                  // onPress={() => setHideProfile(false)}
                  onPress={showHide}
                  style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                  + Add Address
                </Text>
              </>
            ) : null}
          </NeomorphFlex>

          {address?.length != 0 ? (
            <View style={styles.bottomView}>
              <FlatList
                data={address}
                key={'#'}
                keyExtractor={(item, index) => index}
                vertical={true}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        marginVertical: verticalScale(10),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={styles.addressTxt}>{item.mobile}</Text>
                        <Text style={styles.addressTxt}>
                          {item.other_address1},
                        </Text>
                        <Text style={styles.addressTxt}>
                          {item.other_address2},
                        </Text>

                        <Text style={styles.addressTxt}>
                          {item.other_postal}
                        </Text>
                      </View>
                      <Icon
                        name="delete"
                        type="AntDesign"
                        style={styles.delIcon}
                        onPress={() =>
                          deleteCustomerAddress(item.address_tableID)
                        }
                      />
                    </View>
                  );
                }}
              />

              {enterAddress == false ? (
                <>
                  <Text style={styles.numberTxt}>New Address</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphAddressInput}>
                    <TextInput
                      placeholder="Address Line 1"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      value={addCustomerAddress1}
                      onChangeText={val => setAddCustomerAddress1(val)}
                    />
                  </NeomorphFlex>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphAddressInput}>
                    <TextInput
                      placeholder="Address Line 2"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      value={addCustomerAddress2}
                      onChangeText={val => setAddCustomerAddress2(val)}
                    />
                  </NeomorphFlex>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphAddressInput}>
                    <TextInput
                      placeholder="Postal code"
                      maxLength={6}
                      keyboardType="numeric"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      value={addCustomerPin}
                      onChangeText={val => setAddCustomerPin(val)}
                    />
                  </NeomorphFlex>
                  <Pressable
                    // disabled={false}
                    onPress={addCustomerAddress}
                    disabled={loadingCustomerAddress ? true : false}
                    // onPress={() => Navigation.navigate('HomeUser')}
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
                        <Text style={styles.loginTxt}>Save Address</Text>

                        {loadingCustomerAddress ? (
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
          ) : null}
          {/* </ScrollView> */}
        </LinearGradient>
      </KeyboardAwareScrollView>
    );
  } else {
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
                <Text style={styles.settingsTxt}>Profile settings</Text>
              </View>
            </View>
            <NeomorphFlex
              //   inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.blueBar}>
              <Text style={styles.employeeTxt}>Profile</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  width: '15%',
                  justifyContent: 'space-between',
                }}>
                <Text
                  onPress={() => {
                    setTextInputEditable(!textInputEditable),
                      employeeNameRef.current.focus();
                  }}
                  style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                  EDIT
                </Text>

                {hideProfile == false ? (
                  <Icon
                    name="angle-down"
                    // onPress={() => setHideProfile(true)}
                    onPress={downArrowShowHide}
                    type="FontAwesome"
                    style={{fontSize: moderateScale(15)}}
                  />
                ) : null}
              </View>
            </NeomorphFlex>

            {hideProfile == true ? (
              <View style={styles.profileView}>
                <Text style={styles.numberTxt}>Name</Text>
                <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphInput}>
                  <TextInput
                    editable={textInputEditable ? true : false}
                    value={name}
                    ref={employeeNameRef}
                    // onFocus={}
                    // value={updateProfile ? updatedName : name}
                    onChangeText={val => setName(val)}
                    style={styles.input}
                  />
                </NeomorphFlex>
                <Text style={styles.numberTxt}>Recovery Mobile Number</Text>
                <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphInput}>
                  <TextInput
                    editable={textInputEditable ? true : false}
                    keyboardType="numeric"
                    value={mobile}
                    onChangeText={val => setMobile(val)}
                    style={styles.input}
                  />
                </NeomorphFlex>
                <Text style={styles.numberTxt}>E -mail address</Text>

                <NeomorphFlex
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphInput}>
                  <TextInput
                    keyboardType="email-address"
                    editable={false}
                    value={email}
                    onChangeText={val => setEmail(val)}
                    style={styles.input}
                  />
                </NeomorphFlex>

                <Text style={styles.numberTxt}>Change Currency</Text>
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
                      enabled={textInputEditable ? true : false}
                      placeholder="Select One"
                      placeholderStyle={({color: '#112F43'}, {fontSize: 3})}
                      style={styles.picker}
                      //   note={false}
                      selectedValue={selectedRupeesType}
                      onValueChange={setSelectedRupeesType}>
                      <Picker.Item label="Currency" />
                      {newBusinessCurrency.map((item, index) => {
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

                {textInputEditable ? (
                  <Pressable
                    disabled={loadingEmployeeDetails ? true : false}
                    onPress={updateProfile}
                    // onPress={() => Navigation.navigate('HomeUser')}
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
                        <Text style={styles.loginTxt}>Save</Text>
                        {loadingEmployeeDetails ? (
                          <ActivityIndicator
                            size="small"
                            color="#fff"
                            style={{marginLeft: 10}}
                          />
                        ) : null}
                      </LinearGradient>
                    </NeomorphFlex>
                  </Pressable>
                ) : null}
              </View>
            ) : null}

            <NeomorphFlex
              //   inner // <- enable shadow inside of neomorph
              swapShadows // <- change zIndex of each shadow color
              style={styles.blueBar}>
              <Text style={styles.employeeTxt}>Address</Text>

              {enterAddress == true ? (
                <>
                  <Text
                    // onPress={() => setHideProfile(false)}
                    onPress={showHide}
                    style={{fontFamily: 'Quicksand', color: COLORS.black}}>
                    + Add Address
                  </Text>
                </>
              ) : null}
            </NeomorphFlex>

            <View style={styles.bottomView}>
              {employeeAddress?.length != 0 ? (
                <FlatList
                  data={employeeAddress}
                  key={'#'}
                  keyExtractor={(item, index) => index}
                  vertical={true}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          marginVertical: verticalScale(10),
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text style={styles.addressTxt}>{item.mobile}</Text>
                          <Text style={styles.addressTxt}>
                            {item.other_address1},
                          </Text>
                          <Text style={styles.addressTxt}>
                            {item.other_address2},
                          </Text>
                          <Text style={styles.addressTxt}>
                            {item.other_postal}
                          </Text>
                        </View>
                        <Icon
                          name="delete"
                          type="AntDesign"
                          style={styles.delIcon}
                          onPress={() =>
                            deleteEmployeeAddress(item.address_tableID)
                          }
                        />
                      </View>
                    );
                  }}
                />
              ) : null}

              {enterAddress == false ? (
                <>
                  <Text style={styles.numberTxt}>New Address</Text>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphAddressInput}>
                    <TextInput
                      placeholder="Address Line 1"
                      value={addBusinessAddress1}
                      onChangeText={val => setAddBusinessAddress1(val)}
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                    />
                  </NeomorphFlex>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphAddressInput}>
                    <TextInput
                      placeholder="Address Line 2"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      value={addBusinessAddress2}
                      onChangeText={val => setaddBusinessAddress2(val)}
                    />
                  </NeomorphFlex>
                  <NeomorphFlex
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorphAddressInput}>
                    <TextInput
                      placeholder="Postal code"
                      maxLength={6}
                      keyboardType="numeric"
                      placeholderTextColor={COLORS.placeholderTextColor}
                      style={styles.input}
                      value={addBusinessPin}
                      onChangeText={val => setAddBusinessPin(val)}
                    />
                  </NeomorphFlex>
                  <Pressable
                    onPress={addEmployeeAddress}
                    disabled={loadingEmployeeAddress ? true : false}
                    // onPress={() => Navigation.navigate('HomeUser')}
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
                        <Text style={styles.loginTxt}>Save Address</Text>
                        {loadingEmployeeAddress ? (
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
      </KeyboardAwareScrollView>
    );
  }
};

export default ProfileSettings;

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
  profileView: {
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(20),
  },
  numberTxt: {
    fontFamily: 'Quicksand',
    fontWeight: '700',
    color: COLORS.valentineBlue,
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
  neomorphAddressInput: {
    shadowRadius: moderateScale(2),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.textInputViolet,
    // width: width - 70,
    // width: '100%',
    height: verticalScale(40),
    marginVertical: verticalScale(10),
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Playfair-Display',
    paddingHorizontal: moderateScale(20),
    color: COLORS.placeholderTextColor,
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  bottomView: {
    paddingHorizontal: moderateScale(30),
    marginVertical: verticalScale(20),
    marginBottom: verticalScale(40),
  },
  addressTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
  delIcon: {
    fontSize: moderateScale(15),
  },
  loginBtn: {
    // width: '80%',
    paddingHorizontal: moderateScale(30),
    height: verticalScale(50),
    marginTop: verticalScale(30),
  },
  btnGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    flexDirection: 'row',
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
    color: COLORS.black,
  },
});
