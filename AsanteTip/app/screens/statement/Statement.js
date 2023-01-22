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
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import Swiper from 'react-native-swiper';
import Navigation from '../../Navigation';
import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const Statement = props => {
  useEffect(() => {
    getAccount();

    let fo = props.navigation.addListener('focus', e => {
      getAccount();
    });
    return fo;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`loginID-------->>>`, result);
    transactionHistory(result.user_id);
  };

  const transactionHistory = async val => {
    let data = {
      user_id: val,
    };

    let result = await AuthService.userTransactionHistory(data);
    console.log(`result----------->>>`, result.data);

    if (result != null && result.status) {
      setStatements(result.data);
    }
  };

  const [statements, setStatements] = useState([]);

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
              <Text style={styles.settingsTxt}> Statement</Text>
            </View>
            <FlatList
              data={statements.reverse()}
              key={'#'}
              keyExtractor={(item, index) => index}
              vertical={true}
              showsVerticalScrollIndicator={false}
              style={{marginTop: verticalScale(15)}}
              renderItem={({item}) => {
                console.log(`statements--------------->>>`, statements);

                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // marginTop: verticalScale(15),
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/hotel.png')} />
                        <View style={{paddingStart: moderateScale(10)}}>
                          <Text style={styles.hotelNames}>{item.name}</Text>
                          <Text style={[styles.priceTxt, {fontSize: 10}]}>
                            {item.date}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.priceTxt}>{item.money_status}</Text>
                      <Text style={styles.priceTxt}>$ {item.ammount}</Text>
                    </View>
                    <View
                      style={{
                        borderBottomColor: COLORS.whiteAsh,
                        borderBottomWidth: 1,
                        width: '90%',
                        marginVertical: verticalScale(15),
                        alignSelf: 'flex-end',
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Statement;

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
  hotelNames: {
    fontFamily: 'Quicksand',
    fontSize: moderateScale(15),
    // paddingStart: moderateScale(10),
    color: COLORS.valentineBlue,
  },
  priceTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
});
