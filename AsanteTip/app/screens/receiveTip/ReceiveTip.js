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
  TextInput,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-simple-toast';
import Navigation from '../../Navigation';
import Share from 'react-native-share';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const ReceiveTip = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [qrCodeBusiness, setqrCodeBusiness] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log('logedin----', result);
    fetchProfile(result.user_id);
    fetchBusinessProfile(result.bussiness_id);
    setType(result.type);

    setId(result.type == 'bussiness' ? result.bussiness_id : result.user_id);
  };

  console.log('type----', type);

  const fetchProfile = async val => {
    let data = {
      id: val,
    };

    let result = await AuthService.profileUser(data);

    console.log(`result----->>`, result);

    // console.log(`QR------->>`, result.data[0].path + result.data[0].qr_code);

    if (result != null && result.status) {
      setQrCode(result.data[0].path + result.data[0].qr_code);
      // setType(result.data[0].type);
      // setUserId(result.data[0].user_id);
    }

    // console.log(
    //   `result------->>`,
    //   result.data[0].path + result.data[0].qr_code,
    // );
  };

  const fetchBusinessProfile = async val => {
    let data = {
      bussiness_id: val,
    };

    // console.log(`data===========>>>`, data);

    let result = await AuthService.profileFetch(data);

    // console.log(`result---------->>>`, result);

    if (result != null && result.status) {
      setqrCodeBusiness(result.data[0].path + result.data[0].qr);
      // setUserId(result.data[0].user_id);
    }
  };

  console.log(`setType----------->>>`, type);

  // const sendWhatsapp = () => {
  //   const msg = qrCode;
  //   let url = 'whatsapp://send?text=' + msg + '\n' + id;

  //   Linking.openURL(url)
  //     .then(data => {
  //       console.log('WhatsApp Opened');
  //     })
  //     .catch(() => {
  //       Toast.show('Make sure Whatsapp installed on your device');
  //     });
  // };

  // const sendWhatsappBusiness = () => {
  //   const msg = qrCodeBusiness;
  //   let url = 'whatsapp://send?text=' + msg + '\n' + id;

  //   Linking.openURL(url)
  //     .then(data => {
  //       console.log('WhatsApp Opened');
  //     })
  //     .catch(() => {
  //       Toast.show('Make sure Whatsapp installed on your device');
  //     });
  // };

  const shareQR = async () => {
    const shareOptions = {
      // url: `https://shopygram.netlify.app/products/view/${sellerID}/${id}`,
      url: type == 'user' ? qrCode + '\n' + id : qrCodeBusiness + '\n' + id,
    };
    try {
      ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error=>', error);
    }
  };

  // console.log(`qr------------`, qrCode);

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
              <Text style={styles.settingsTxt}>Receive Tip</Text>
            </View>
            <View style={styles.qrView}>
              {console.log(`qr---------->>>`, qrCode, type)}
              <Image
                resizeMode="contain"
                // source={require('../../assets/qrCode.png')}

                source={{uri: type == 'user' ? qrCode : qrCodeBusiness}}
                style={styles.qrCode}
              />
              <Text style={styles.showTxt}>{id}</Text>
              <Text
                style={[
                  styles.showTxt,
                  {fontSize: moderateScale(8), marginTop: verticalScale(15)},
                ]}>
                Show this QR to receive tips
              </Text>
            </View>
            <Pressable
              // onPress={() => setModalVisible(true)}

              onPress={shareQR}
              style={styles.socialBtn}>
              <NeomorphFlex
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={styles.socialNeomorph}>
                <Text style={styles.shareQrTxt}>Share QR code</Text>
                <Image
                  source={require('../../assets/qrBlue.png')}
                  style={{
                    height: moderateScale(20),
                    width: moderateScale(20),
                  }}
                />
              </NeomorphFlex>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* <Modal
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

export default ReceiveTip;

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
  qrView: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  qrCode: {
    height: moderateScale(200),
    width: verticalScale(200),
    // backgroundColor: 'red',
  },
  showTxt: {
    textAlign: 'center',
    fontFamily: 'Playfair-Display',

    color: COLORS.black,
  },
  socialBtn: {
    // backgroundColor: 'red',
    width: '65%',
    alignSelf: 'center',
    marginVertical: verticalScale(50),
    borderRadius: moderateScale(30),
  },
  socialNeomorph: {
    shadowRadius: moderateScale(5),
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.socialBtnColor,
    // width: moderateScale(180),
    height: moderateScale(50),
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(35),
    alignItems: 'center',
  },
  shareQrTxt: {
    fontfamily: 'Playfair-Display',
    color: COLORS.valentineBlue,
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
