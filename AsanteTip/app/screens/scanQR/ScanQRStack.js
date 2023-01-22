import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Pressable,
  ScrollView,
  Linking,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Navigation from '../../Navigation/index';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const ScanQRStack = props => {
  const {name} = props.route.params;

  console.log(`name----->>`, name);

  const [businessID, setBusinessID] = useState('');
  const [type, setType] = useState('');
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`id-------`, result);
    setBusinessID(result.bussiness_id);
    setType(result.type);
    setUserId(result.user_id);
  };

  const onSuccess = async e => {
    // console.log('e----', JSON.stringify(e.data));

    let data = {
      bussiness_id: businessID,
      user_id: e.data,
    };

    // console.log(`data-------`, data);

    let result = await AuthService.employeeRegister(data);
    // console.log(`updated------->>`, result);

    if (result != null && result.status == true) {
      // fetchEmployee(businessID);
      Navigation.back();
      Toast.show('Employee added successful');
    } else {
      Toast.show(result.error);
    }

    Toast.show('Details Updated');

    Linking.openURL(e).catch(err => console.error('An error occured', err));
  };

  const payTip = async e => {
    console.log('e----', JSON.stringify(e.data));
    // setId(e.data);

    let data = {
      bussiness_or_user: e.data,
    };
    console.log('data---', data);

    let result = await AuthService.searchTransaction(data);

    if (result != null && result.status) {
      console.log(`result---------->>>`, result.data);
      props.navigation.replace('SingleTipAmount', {userData: result.data});
    } else {
      Toast.show('Please provide valid id!!!');
    }
  };

  const multipleTip = async e => {
    console.log('e----', JSON.stringify(e.data));
    let data = {
      bussiness_or_user: e.data,
    };

    console.log(`ID------------>>>`, data);

    let result = await AuthService.searchTransaction(data);

    console.log(`result------------>>>>`, result);
    if (result != null && result.status && result.data.type == 'bussiness') {
      console.log(`result---------->>>`, result);
      props.navigation.replace('MultipleTipAmount', {userData: result});
    } else {
      Toast.show('Choose a Business ID QR Code');
    }
  };

  return (
    <View>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />

      <QRCodeScanner
        onRead={
          name == 'AddEmployee'
            ? onSuccess
            : name == 'SingleTip'
            ? payTip
            : multipleTip
        }
        // onRead={onSuccess}
        reactivate={true}
        permissionDialogMessage="Need Permission To Access Camera"
        reactivateTimeout={10}
        bottomContent={
          <Pressable>
            <Text>Scan QR Code</Text>
          </Pressable>
        }
      />

      {/* <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      /> */}
      {/* <LinearGradient
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
                  type="AntDesign"
                  onPress={() => Navigation.back()}
                  style={styles.arrowLeft}
                />
              </Neomorph>
              <Text style={styles.settingsTxt}>Scan QR</Text>
            </View>
            <QRCodeScanner
              cameraStyle={{
                width: '100%',
                // height: '100%',
              }}
              onRead={onSuccess}
              flashMode={RNCamera.Constants.FlashMode.auto}
            />
          </View>
        </ScrollView>
      </LinearGradient> */}
    </View>
  );
};

export default ScanQRStack;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(34),
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

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
