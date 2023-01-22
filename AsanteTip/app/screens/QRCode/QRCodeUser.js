import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Pressable,
  Linking,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import Swiper from 'react-native-swiper';
import Share from 'react-native-share';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const QRCodeUser = () => {
  const [type, setType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`result------>>>`, result);
    setType(result.type);
    // profileData(result.type == 'user' ? result.user_id : result.bussiness_id);
    setId(result.type == 'user' ? result.user_id : result.bussiness_id);

    let request;

    if (result.type == 'user') {
      let data = {
        id: result.user_id,
      };

      console.log(`data----->>>`, data);
      request = await AuthService.profileUser(data);

      if (request != null && request.status) {
        console.log(`request--------->>>`, request);
        setQrCode(request.data[0].path + request.data[0].qr_code);
      }
    } else {
      let data = {
        bussiness_id: result.bussiness_id,
      };
      // console.log(`data----->>>`, data);

      request = await AuthService.profileFetch(data);

      if (request != null && request.status) {
        console.log(`request--------->>>`, request);
        setQrCode(request.data[0].path + request.data[0].qr);
        // console.log(
        //   `result--------->>>`,
        //   result.data[0].path + result.data[0].qr,
        // );
      }
    }
  };

  // const profileData = async val => {
  //   let result;

  //   if (type == 'user') {
  //     let data = {
  //       id: val,
  //     };

  //     // console.log(`data----->>>`, data);
  //     result = await AuthService.profileUser(data);

  //     if (result != null && result.status) {
  //       console.log(`result--------->>>`, result);
  //       setQrCode(result.data[0].path + result.data[0].qr_code);
  //     }
  //   } else {
  //     let data = {
  //       bussiness_id: val,
  //     };
  //     // console.log(`data----->>>`, data);

  //     result = await AuthService.profileFetch(data);

  //     if (result != null && result.status) {
  //       setQrCode(result.data[0].path + result.data[0].qr);
  //       // console.log(
  //       //   `result--------->>>`,
  //       //   result.data[0].path + result.data[0].qr,
  //       // );
  //     }
  //   }
  // };

  const sendWhatsappBusiness = () => {
    const msg = qrCode;
    let url = 'whatsapp://send?text=' + msg + '\n' + id;

    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Toast.show('Make sure Whatsapp installed on your device');
      });
  };

  const sendWhatsapp = () => {
    const msg = qrCode;
    let url = 'whatsapp://send?text=' + msg + '\n' + id;

    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Toast.show('Make sure Whatsapp installed on your device');
      });
  };

  const shareQR = async () => {
    const shareOptions = {
      // url: `https://shopygram.netlify.app/products/view/${sellerID}/${id}`,
      url: qrCode + '\n' + id,
    };
    try {
      ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error=>', error);
    }
  };

  // console.log(`qrCode------------>>`, qrCode);

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
            <View style={styles.logoView}>
              <View style={styles.neomorphImgView}>
                <Neomorph
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphImg}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/cardLogo.png')}
                    style={styles.logo}
                  />
                </Neomorph>
              </View>
            </View>
            <Text style={styles.uniqueTxt}>This is your UNIQUE QR code</Text>
            <View style={styles.qrView}>
              <Image
                resizeMode="contain"
                // source={require('../../assets/qrCode.png')}
                source={{uri: qrCode}}
                style={styles.qrCode}
              />
              <Text style={styles.showTxt}>{id}</Text>
              <Text
                style={[
                  styles.showTxt,
                  {marginTop: verticalScale(15), fontSize: moderateScale(8)},
                ]}>
                Show this QR to receive tips
              </Text>
            </View>
            <Pressable
              // onPress={() => setModalVisible(true)}
              onPress={shareQR}
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
                  <Text style={styles.loginTxt}>Share QR code</Text>
                </LinearGradient>
              </NeomorphFlex>
            </Pressable>
            {/* <Pressable
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
                  <Text style={styles.loginTxt}>Next</Text>
                </LinearGradient>
              </NeomorphFlex>
            </Pressable> */}
          </View>
        </ScrollView>
      </LinearGradient>
      {/* 
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
            <View style={{backgroundColor: COLORS.socialBtnColor}}>
              <Text style={styles.shareQR}>Share you QR code</Text>
              <View
                style={{
                  borderBottomColor: COLORS.whiteAsh,
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <Swiper style={styles.swiper_view} loop={false}>
              <View>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.centerCard}>
                 

                  <View style={styles.innerCardView}>
                    <View style={styles.shadowBtnView}>
                      <Pressable
                        onPress={
                          type == 'user' ? sendWhatsapp : sendWhatsappBusiness
                        }
                        style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/whatsapp.png')}
                            // style={{
                            //   height: moderateScale(30),
                            //   width: moderateScale(30),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Whatsapp</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/gmail.png')}
                            // style={{
                            //   height: moderateScale(35),
                            //   width: moderateScale(35),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Gmail</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/bluetooth.png')}
                            // style={{
                            //   height: moderateScale(40),
                            //   width: moderateScale(40),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Bluetooth</Text>
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.innerCardView}>
                    <View style={styles.shadowBtnView}>
                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/comment.png')}
                            // style={{
                            //   height: moderateScale(30),
                            //   width: moderateScale(30),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>SMS</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/snapchat.png')}
                            // style={{
                            //   height: moderateScale(35),
                            //   width: moderateScale(35),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Snapchat</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/skype.png')}
                            // style={{
                            //   height: moderateScale(40),
                            //   width: moderateScale(40),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Skype</Text>
                      </Pressable>
                    </View>
                  </View>
                </NeomorphFlex>
              </View>

              <View>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.centerCard}>
                  <View style={styles.innerCardView}>
                    <View style={styles.shadowBtnView}>
                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/whatsapp.png')}
                            // style={{
                            //   height: moderateScale(30),
                            //   width: moderateScale(30),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Whatsapp</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/gmail.png')}
                            // style={{
                            //   height: moderateScale(35),
                            //   width: moderateScale(35),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Gmail</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/bluetooth.png')}
                            // style={{
                            //   height: moderateScale(40),
                            //   width: moderateScale(40),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Bluetooth</Text>
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.innerCardView}>
                    <View style={styles.shadowBtnView}>
                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/comment.png')}
                            // style={{
                            //   height: moderateScale(30),
                            //   width: moderateScale(30),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>SMS</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/snapchat.png')}
                            // style={{
                            //   height: moderateScale(35),
                            //   width: moderateScale(35),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Snapchat</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/skype.png')}
                            // style={{
                            //   height: moderateScale(40),
                            //   width: moderateScale(40),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Skype</Text>
                      </Pressable>
                    </View>
                  </View>
                </NeomorphFlex>
              </View>

              <View>
                <NeomorphFlex
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.centerCard}>
                  <View style={styles.innerCardView}>
                    <View style={styles.shadowBtnView}>
                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/whatsapp.png')}
                            // style={{
                            //   height: moderateScale(30),
                            //   width: moderateScale(30),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Whatsapp</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/gmail.png')}
                            // style={{
                            //   height: moderateScale(35),
                            //   width: moderateScale(35),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Gmail</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/bluetooth.png')}
                            // style={{
                            //   height: moderateScale(40),
                            //   width: moderateScale(40),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Bluetooth</Text>
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.innerCardView}>
                    <View style={styles.shadowBtnView}>
                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/comment.png')}
                            // style={{
                            //   height: moderateScale(30),
                            //   width: moderateScale(30),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>SMS</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/snapchat.png')}
                            // style={{
                            //   height: moderateScale(35),
                            //   width: moderateScale(35),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Snapchat</Text>
                      </Pressable>

                      <Pressable style={styles.btnView}>
                        <NeomorphFlex
                          // inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.shadowBtn}>
                          <Image
                            source={require('../../assets/ShareQR/skype.png')}
                            // style={{
                            //   height: moderateScale(40),
                            //   width: moderateScale(40),
                            // }}
                          />
                        </NeomorphFlex>
                        <Text style={styles.tipBoxTxt}>Skype</Text>
                      </Pressable>
                    </View>
                  </View>
                </NeomorphFlex>
              </View>
            </Swiper>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default QRCodeUser;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginVertical: verticalScale(40),
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
  uniqueTxt: {
    textAlign: 'center',
    fontFamily: 'Playfair-Display',
    // fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: '600',
    color: COLORS.lovePurple,
    fontSize: moderateScale(18),
    marginTop: verticalScale(20),
  },
  qrView: {
    alignSelf: 'center',
    marginTop: verticalScale(60),
  },
  qrCode: {
    height: verticalScale(200),
    width: moderateScale(200),
  },
  showTxt: {
    textAlign: 'center',
    fontFamily: 'Playfair-Display',

    color: COLORS.black,
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
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(320),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  shareQR: {
    fontFamily: 'Quicksand',
    paddingHorizontal: moderateScale(30),
    marginVertical: verticalScale(20),
    color: COLORS.lovePurple,
  },
  swiper_view: {
    backgroundColor: COLORS.socialBtnColor,
  },
  centerCard: {
    shadowRadius: 3,
    // borderRadius: 25,
    height: '100%',
    width: '100%',

    backgroundColor: COLORS.socialBtnColor,
    // backgroundColor: 'red',
  },

  innerCardView: {
    paddingHorizontal: moderateScale(50),
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  shadowBtnView: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',

    // marginVertical: verticalScale(20),
  },
  btnView: {
    alignItems: 'center',
    width: moderateScale(70),
    height: verticalScale(90),
  },
  shadowBtn: {
    shadowRadius: 10,
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipBoxTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.tipBlue,
    textAlign: 'center',
    fontSize: moderateScale(10),
    marginTop: verticalScale(5),
  },
});
