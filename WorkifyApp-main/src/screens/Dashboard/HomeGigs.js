import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import HomeHeader from '../../components/Header/HomeHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeGigs = () => {
  const [upcomingGigs, setUpcomingGigs] = useState([
    {
      applicant: '0/3 (0 Applicant)',
      gig: 'Warehouse Mover',
      dateTime: 'May 26, 1:00 PM - 5:00 PM',
      amount: '$140',
      rate: '($30/hr)',
    },
    {
      applicant: '0/3 (0 Applicant)',
      gig: 'Warehouse Mover',
      dateTime: 'May 26, 1:00 PM - 5:00 PM',
      amount: '$140',
      rate: '($30/hr)',
    },
    {
      applicant: '0/3 (0 Applicant)',
      gig: 'Warehouse Mover',
      dateTime: 'May 26, 1:00 PM - 5:00 PM',
      amount: '$140',
      rate: '($30/hr)',
    },
    {
      applicant: '0/3 (0 Applicant)',
      gig: 'Warehouse Mover',
      dateTime: 'May 26, 1:00 PM - 5:00 PM',
      amount: '$140',
      rate: '($30/hr)',
    },
  ]);

  return (
    <View style={styles.rootView}>
      <HomeHeader headerTxt="Home" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* <View style={styles.topView}> */}
        <View style={styles.imgView}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Johnny_Depp_%28July_2009%29_2_cropped.jpg?20210809165401',
            }}
            style={styles.img}
          />
          <View style={styles.txtView}>
            <Text style={styles.welcomeTxt}>Welcome,</Text>
            <Text style={styles.welcomeTxt}>Shanti Infotech LLP!</Text>
          </View>
        </View>
        <Text style={[styles.spentTxt, {marginTop: verticalScale(40)}]}>
          Spent
        </Text>

        <View style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.amount}>$1,000.00</Text>
            <Text style={styles.spentWeekTxt}>spent this week</Text>
          </View>
          <Text style={styles.seeMoreTxt}>See More</Text>
        </View>
        <Text style={[styles.spentTxt, {marginTop: verticalScale(20)}]}>
          Upcoming Gigs
        </Text>

        <View style={styles.gigsCards}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={upcomingGigs}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                // <View style={styles.cardView}>
                //   <View style={styles.topView}>
                //     <Icon
                //       name="dot-single"
                //       type="Entypo"
                //       style={{fontSize: 40, color:'green'}}
                //     />
                //     <Text>{item.applicant}</Text>
                //   </View>
                //   <View style={styles.middleView}>
                //     <View>
                //       <Text style={styles.gigTxt}>{item.gig}</Text>
                //       <Text style={styles.timeTxt}>{item.dateTime}</Text>
                //     </View>
                //     <View>
                //       <Text style={styles.amountTxt}>{item.amount}</Text>
                //       <Text style={styles.rateTxt}>{item.rate}</Text>
                //     </View>
                //   </View>
                // </View>

                <View style={styles.cardView}>
                  <View>
                    <View style={styles.topView}>
                      <View style={styles.topInnerView}>
                        {/* <Icon
                        name="dot-single"
                        type="Entypo"
                        style={{fontSize: 40, color: 'green',}}
                      /> */}
                        <Image source={require('../../assets/greenOval.png')} />
                        <Text style={styles.applicantTxt}>{item.applicant}</Text>
                      </View>
                      <Text style={styles.gigTxt}>{item.gig}</Text>
                      <Text style={styles.timeTxt}>{item.dateTime}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.amountTxt}>{item.amount}</Text>
                    <Text style={styles.rateTxt}>{item.rate}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default HomeGigs;

const styles = StyleSheet.create({
  rootView: {
    // flex: 1,
    height: windowHeight,
    backgroundColor: '#ECECEC',
  },
  // topView: {
  //   paddingHorizontal: moderateScale(20),
  //   flexDirection:'row'
  //   // marginBottom:verticalScale(150)
  // },
  imgView: {
    flexDirection: 'row',
    // marginTop: verticalScale(35),
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(20),
    height: verticalScale(84),
  },
  img: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  txtView: {
    marginStart: moderateScale(10),
  },
  welcomeTxt: {
    color: '#393939',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  spentTxt: {
    color: '#393939',
    fontWeight: 'bold',
    // marginTop: verticalScale(40),
    fontSize: moderateScale(15),
    paddingHorizontal: moderateScale(20),
  },
  card: {
    backgroundColor: 'white',
    marginTop: verticalScale(20),
    marginHorizontal: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
  },
  cardInner: {
    // flexDirection:'row',
  },
  amount: {
    fontSize: moderateScale(20),
    color: '#393939',
  },
  spentWeekTxt: {
    color: '#393939',
    fontWeight: `bold`,
  },

  seeMoreTxt: {
    color: '#002E6D',
    fontSize: moderateScale(11),
    fontWeight: `bold`,
  },
  gigsCards: {},
  cardView: {
    backgroundColor: 'white',
    marginHorizontal: moderateScale(20),
    marginVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
  },
  topView: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  topInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },applicantTxt:{
    marginStart:moderateScale(10)
  },
  middleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    paddingBottom: verticalScale(10),
  },
  gigTxt: {
    color: '#393939',
    fontSize: moderateScale(18),
  },
  timeTxt: {
    fontSize: moderateScale(11),
    color: '#545454',
  },
  amountTxt: {
    color: '#393939',
    fontSize: moderateScale(15),
  },
  rateTxt: {
    color: '#545454',
    fontSize: moderateScale(10),
  },
});
