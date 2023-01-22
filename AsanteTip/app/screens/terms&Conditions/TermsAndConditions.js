import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../Constants/Colors';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {Neomorph, NeomorphFlex} from 'react-native-neomorph-shadows';
import {Icon} from 'native-base';
import AuthService from '../../Service/AuthService';
import Navigation from '../../Navigation';

const {height, width} = Dimensions.get('window');

const TermsAndConditions = () => {
  const [conditions, setConditions] = useState('');

  useEffect(() => {
    termsAndConditions();
  }, []);

  const termsAndConditions = async () => {
    let result = await AuthService.termsAndConditions();
    setTerms(result.data);
  };

  const [terms, setTerms] = useState([]);

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
            <Text style={styles.settingsTxt}>Terms and conditions</Text>
          </View>
          <NeomorphFlex
            // inner // <- enable shadow inside of neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.centerCard}>
            <View style={styles.TermsAndConditionsView}>
              <FlatList
                data={terms}
                key={'#'}
                keyExtractor={(item, index) => index}
                vertical={true}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                renderItem={({item}) => {
                  return (
                    <View style={styles.TermsAndConditionsTxtView}>
                      <Icon name="dot-single" type="Entypo" />
                      <Text style={styles.TermsAndConditionsTxt}>
                        {item.condition}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </NeomorphFlex>

          <Image
            source={require('../../assets/downAngle.png')}
            style={styles.downAngle}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default TermsAndConditions;

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
    paddingStart: moderateScale(13),
  },
  centerCard: {
    shadowRadius: 3,
    borderRadius: 25,
    backgroundColor: COLORS.textInputViolet,
    //   width: 150,
    height: verticalScale(420),

    // marginTop: verticalScale(40),
  },
  list: {
    marginBottom: verticalScale(30),
    // paddingHorizontal: moderateScale(20),
  },
  TermsAndConditionsView: {
    paddingVertical: verticalScale(20),
    marginRight: moderateScale(40),
    marginLeft: moderateScale(5),
    // paddingHorizontal: 20,
    color: COLORS.tipBlue,
  },
  TermsAndConditionsTxtView: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },
  TermsAndConditionsTxt: {
    fontFamily: 'Quicksand',
    color: COLORS.tipBlue,
  },
  downAngle: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
});
