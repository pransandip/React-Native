import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Icon} from 'native-base';
import HomeHeader from '../../components/Header/HomeHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Index = (props) => {
  return (
    <View style={style.rootView}>
      <HomeHeader headerTxt="Home" />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={style.topView}>
          <View style={style.imgView}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Johnny_Depp_%28July_2009%29_2_cropped.jpg?20210809165401',
              }}
              style={style.img}
            />
            <View style={style.txtView}>
              <Text style={style.welcomeTxt}>Welcome,</Text>
              <Text style={style.welcomeTxt}>Shanti Infotech LLP!</Text>
            </View>
          </View>

          <View style={style.staffMemberView}>
            <Text style={style.addTxt}>Add Staff Member</Text>
            <Text style={style.descTxt}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Text>
            <View style={style.addStaffView}>
              <Pressable style={style.addStaffBtn}>
                <Text style={style.addStaffTxt}>Add Staff</Text>
              </Pressable>
              <Image source={require('../../assets/MaskGroup.png')} />
            </View>
          </View>

          <View style={style.gigView}>
            <Text style={style.gigTxt}>Want to create a Gig?</Text>
            <Text style={style.gigTxtDesc}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            <Image
              source={require('../../assets/board.png')}
              style={style.boardImg}
            />
            <View style={style.addGigView}>
              <Pressable style={style.addGigBtn}>
                <Text style={style.addGigTxt}>Create a Gig</Text>
              </Pressable>
            </View>
          </View>

          <ImageBackground
            source={require('../../assets/BookedWorkersBG.png')}
            style={style.bgImg}>
            <View style={style.workersView}>
              <Text style={style.bookedTxt}>
                Booked Workers & View Invoices
              </Text>
            </View>
            <Text style={style.workersTxt}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const style = StyleSheet.create({
  rootView: {
    // flex: 1,
    height: windowHeight,
    backgroundColor: 'white',
  },
  img: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
  },

  topView: {
    paddingHorizontal: moderateScale(20),
    // marginBottom:verticalScale(150)
  },

  imgView: {
    flexDirection: 'row',
    marginTop: verticalScale(35),
    alignItems: 'center',
    position: 'relative',
  },
  txtView: {
    marginStart: moderateScale(10),
  },
  welcomeTxt: {
    color: '#393939',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  staffMemberView: {
    marginTop: verticalScale(54),

    backgroundColor: '#C0E4EC',
    height: verticalScale(215),
    paddingHorizontal: moderateScale(16),
  },
  addTxt: {
    color: '#393939',
    fontSize: moderateScale(17),
    marginTop: verticalScale(24),
    fontWeight: `bold`,
  },
  descTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  addStaffView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:verticalScale(20)
  },
  addStaffBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(40),
    width: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    elevation: 5,
    borderRadius: moderateScale(3),
  },
  addStaffTxt: {
    color: '#13327C',
    fontWeight: `bold`,
  },
  gigView: {
    height: verticalScale(180),
    backgroundColor: '#002E6D',
    marginTop: verticalScale(20),
  },
  gigTxt: {
    color: 'white',
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    marginHorizontal: moderateScale(16),
    marginVertical: verticalScale(20),
  },
  gigTxtDesc: {
    color: 'white',
    fontSize: moderateScale(11),
    marginHorizontal: moderateScale(16),
  },
  addGigView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(16),
  },
  addGigBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(40),
    width: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    elevation: 5,
    borderRadius: moderateScale(2),
  },
  addGigTxt: {
    color: '#13327C',
    fontWeight: `bold`,
  },
  boardImg: {
    position: 'absolute',
    // marginStart:moderateScale(100),
    //  bottom:verticalScale(0),
    // top:verticalScale(0),
    right: 0,
    bottom: 0,
    //  backgroundColor:'red'
  },
  bgImg: {
    height: verticalScale(175),
    // backgroundColor: 'red',
    marginVertical: verticalScale(20),
    // marginTop: 50,
    paddingHorizontal: moderateScale(16),
  },
  workersView: {
    width: '50%',
  },
  bookedTxt: {
    color: '#393939',
    fontSize: moderateScale(17),
    marginTop: verticalScale(24),
    fontWeight: `bold`,
  },
  workersTxt: {
    marginTop: verticalScale(20),
    fontSize: moderateScale(11),
    color: '#545454',
  },
});
