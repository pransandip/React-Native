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
import {Icon} from 'native-base';
import Navigation from '../../Navigation';

import AuthService from '../../Service/AuthService';

const {height, width} = Dimensions.get('window');

const BusinessStatement = props => {
  useEffect(() => {
    getAccount();

    let fo = props.navigation.addListener('focus', e => {
      getAccount();
    });
    return fo;
  }, []);

  const getAccount = async () => {
    let result = await AuthService.getAccount();
    console.log(`result------>>>`, result.bussiness_id);
    transactionHistory(result.bussiness_id);
  };

  const transactionHistory = async val => {
    let data = {
      bussiness_id: val,
    };
    let result = await AuthService.businessTransactionHistory(data);
    console.log(`result------>`, result.data);

    if (result != null && result.status) {
      setEmployee(result.data);
    }
  };

  const [employee, setEmployee] = useState([]);

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
            <Text style={styles.settingsTxt}>Business Statement</Text>
          </View>

          <FlatList
            data={employee == null ? employee : employee.reverse()}
            key={'#'}
            keyExtractor={(item, index) => index}
            vertical={true}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            // numColumn={1}
            renderItem={({item}) => {
              console.log(`statements--------->>>>`, employee);

              return (
                <NeomorphFlex
                  //   inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorphList}>
                  <View style={styles.cardView}>
                    <View style={styles.listTopView}>
                      <Text style={styles.listTxt}>
                        {item.type == 'user'
                          ? 'Employee'
                          : item.type == 'bussiness'
                          ? 'Business'
                          : 'Bank/Card'}
                      </Text>
                      <Text style={styles.listTxt}>
                        {item.money_status == 'credit'
                          ? 'Tip Received'
                          : 'Tip Send'}
                      </Text>
                    </View>
                    <View style={styles.listTopView}>
                      <Text style={styles.listTxt}>
                        {item.sender_reciver_name != null
                          ? item.sender_reciver_name
                          : 'Bank/Card'}
                      </Text>
                      <Text
                        style={[
                          styles.listTxt,
                          {
                            // paddingHorizontal: moderateScale(20),
                            fontSize: moderateScale(15),
                          },
                        ]}>
                        {item.ammount} $
                      </Text>
                    </View>
                    <Text style={styles.listTxt}>Date: {item.date}</Text>
                  </View>
                </NeomorphFlex>
              );
            }}
          />
        </View>
        {/* </ScrollView> */}
      </LinearGradient>
    </View>
  );
};

export default BusinessStatement;

const styles = StyleSheet.create({
  bgGradient: {
    // flex: 1,
    height: height + StatusBar.currentHeight,
    width: width,
  },
  topView: {
    marginTop: verticalScale(40),
    // paddingHorizontal: moderateScale(30),

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
    marginLeft: moderateScale(30),
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
  list: {
    marginBottom: verticalScale(60),
    // paddingHorizontal: moderateScale(20),
  },
  neomorphList: {
    shadowRadius: 2,
    borderRadius: 25,
    backgroundColor: COLORS.textInputViolet,
    // paddingVertical: moderateScale(5),
    // backgroundColor: 'red',
    width: '85%',
    alignSelf: 'center',
    // height: verticalScale(70),
    // justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  cardView: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
  },
  listTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(20),
  },
  listTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.black,
    fontWeight: '600',
  },
});
