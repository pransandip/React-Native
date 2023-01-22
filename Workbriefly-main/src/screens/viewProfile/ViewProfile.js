import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import DetailsHeader from '../../components/headers/DetailsHeader';

const {height, width} = Dimensions.get('window');

const ViewProfile = () => {
  const [back, setBack] = useState(false);

  const handleBack = (val) => {
    setBack(val);
  };

  const [completedGigs, setCompletedGigs] = useState([
    {
      img: require('../../../assets/jinya.png'),
      gig: 'Warehouse Mover',
      name: 'Jinya Ramen',
      date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
      rate: '$150.00',
    },
    {
      img: require('../../../assets/jinya.png'),
      gig: 'Warehouse Mover',
      name: 'Jinya Ramen',
      date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
      rate: '$150.00',
    },
    {
      img: require('../../../assets/jinya.png'),
      gig: 'Warehouse Mover',
      name: 'Jinya Ramen',
      date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
      rate: '$150.00',
    },
    {
      img: require('../../../assets/jinya.png'),
      gig: 'Warehouse Mover',
      name: 'Jinya Ramen',
      date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
      rate: '$150.00',
    },
  ]);

  return (
    <View style={styles.root}>
      <DetailsHeader
        handleBack={handleBack}
        headerTxt="View Profile"
        disable={true}
      />
      <ScrollView>
        <View style={styles.topView}>
          <Image
            source={{
              uri: 'https://images.hindustantimes.com/img/2022/06/18/550x309/4e045f52-e6fe-11ec-a635-885b646977d8_1655570778951_1655570807242.jpg',
            }}
            style={styles.img}
          />
          <Text style={styles.nameTxt}>Neeraj Chopra</Text>
        </View>

        <View style={styles.bodyView}>
          <Text style={styles.headingtxt}>Experience</Text>
          <View style={styles.cardView}>
            <View style={styles.experienceCard}>
              <Text style={{color: '#fff'}}>
                <Text style={{fontWeight: 'bold'}}>Javelin thrower</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>India</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>5 yrs</Text>
              </Text>
            </View>
            <View style={styles.experienceCard}>
              <Text style={{color: '#fff'}}>
                <Text style={{fontWeight: 'bold'}}>Gold medallist</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>India</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>1 yrs</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#EFEFEF',
              borderBottomWidth: 1,
              marginVertical: verticalScale(20),
            }}
          />
          <Text style={styles.headingtxt}>Certificates/Licenses</Text>
          <View style={styles.cardView}>
            <View style={styles.experienceCard}>
              <Text style={{color: '#fff'}}>
                <Text style={{fontWeight: 'bold'}}>Javelin thrower</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>India</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>5 yrs</Text>
              </Text>
            </View>
            <View style={styles.experienceCard}>
              <Text style={{color: '#fff'}}>
                <Text style={{fontWeight: 'bold'}}>Gold medallist</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>India</Text> for{' '}
                <Text style={{fontWeight: 'bold'}}>1 yrs</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#EFEFEF',
              borderBottomWidth: 1,
              marginVertical: verticalScale(20),
            }}
          />

          <Text style={styles.headingtxt}>
            Gigs Completed{' '}
            <Text style={{fontSize: moderateScale(10), fontWeight: 'normal'}}>
              (07)
            </Text>
          </Text>

          <View style={styles.listView}>
            {completedGigs.map((item, index) => {
              return (
                <View style={styles.listCardView}>
                  <Image source={item.img} />
                  <View style={styles.txtView}>
                    <Text style={styles.gigTxt}>{item.gig}</Text>
                    <Text style={styles.nameDateTxt}>{item.name}</Text>
                    <Text style={styles.nameDateTxt}>{item.date}</Text>
                  </View>
                  <Text style={styles.rateTxt}>{item.rate}</Text>
                </View>
              );
            })}
          </View>

          <Text style={styles.showTxt}>Show More</Text>
        </View>
      </ScrollView>

      <View style={styles.continueBtnView}>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueTxt}>Send Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  root: {
    height: height,
    // flex: 1,
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(28),
    // backgroundColor: 'red',
  },
  img: {
    height: moderateScale(80),
    width: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: 'green',
  },
  nameTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    marginTop: verticalScale(10),
    textAlign: 'center',
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(20),
  },
  headingtxt: {
    color: '#393939',
    fontWeight: 'bold',
  },
  cardView: {
    marginTop: verticalScale(4),
  },
  experienceCard: {
    backgroundColor: '#002E6D',
    paddingVertical: verticalScale(11),
    paddingStart: moderateScale(12),
    marginTop: verticalScale(8),
    borderRadius: moderateScale(4),
  },
  listView: {
    marginTop: verticalScale(12),
  },
  listCardView: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(14),
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginVertical: verticalScale(8),
  },
  txtView: {
    paddingStart: moderateScale(12),
  },
  gigTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  nameDateTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  rateTxt: {
    color: '#393939',
    fontSize: moderateScale(16),
  },
  showTxt: {
    color: '#002E6D',
    textAlign: 'center',
    marginTop: verticalScale(16),
  },
  continueBtnView: {
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
  },
  continueTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
});
