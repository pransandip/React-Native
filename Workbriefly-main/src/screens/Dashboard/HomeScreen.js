import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
// import axios from 'axios';
import Axios from '../../api/Axios';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const [upcomingGigs, setupcomingGigs] = useState([]);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);

      upcomingGigsList();
    });
  }, [token]);

  const upcomingGigsList = () => {
    setLoading(true);
    Axios({
      method: 'Get',
      url: 'api/gig/getupcoming',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(`response--------------->>>`, response.data.data[0]);
          setLoading(false);
          setupcomingGigs(response.data.data);
        }
      })
      .catch((error) => {
        console.log(`error-------------->>`, error);
      });
  };

  return (
    <View>
      <Text style={styles.spentTxt}>Spent</Text>
      <View style={styles.amountCard}>
        <View>
          <Text style={styles.amountTxxt}>$1000.00</Text>
          <Text style={styles.weekTxt}>
            spent{' '}
            <Text style={{textDecorationLine: 'underline'}}>this week</Text>
          </Text>
        </View>
        <Text style={styles.seeMoreTxt}>See More</Text>
      </View>
      <Text style={styles.spentTxt}>Upcoming Gigs</Text>

      <View style={{marginBottom: verticalScale(200)}}>
        {upcomingGigs.map((item, index) => {
          let myDate = new Date(item.startdate);
          let mytime = new Date(item.endtime);
          return (
            <View style={styles.cardView}>
              <View style={{width: '60%'}}>
                <View style={styles.topView}>
                  <Image
                    source={
                      item.status == 'active'
                        ? require('./../../../assets/greenOval.png')
                        : item.status == 'waiting'
                        ? require('./../../../assets/yellowOval.png')
                        : require('./../../../assets/redOval.png')
                    }
                  />
                  <Text style={styles.topTxt}>
                    &nbsp;&nbsp;{item.confirm_count} /
                    <Text>{item.applied_count}</Text>
                  </Text>
                  <Text style={styles.topTxt}>
                    &nbsp;&nbsp;({item.applied_count} Applicants)
                  </Text>
                </View>
                <Text style={styles.giNameTxt} numberOfLines={2}>
                  {item.position}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.timeTxt}>{myDate.toDateString()} </Text>
                  <Text style={styles.timeTxt}>
                    {myDate.toLocaleTimeString()}
                  </Text>
                  <Text style={styles.timeTxt}>
                    {mytime.toLocaleTimeString()}
                  </Text>
                </View>
              </View>

              <View style={{width: '40%', alignItems: 'flex-end'}}>
                <Text style={styles.amountTxt}>$ {item.total_amount}</Text>
                <Text style={styles.rateTxt}>({item.hourly_pay}/hr)</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  spentTxt: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(28),
    marginStart: moderateScale(5),
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  // horizontal: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   padding: 10,
  // },
  amountCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
    paddingHorizontal: moderateScale(15.4),
    paddingVertical: verticalScale(7),
  },
  amountTxxt: {
    color: '#393939',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  weekTxt: {
    marginTop: verticalScale(1),
    color: '#545454',
  },
  seeMoreTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  cardView: {
    backgroundColor: 'white',
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(5),
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: moderateScale(20),
    // height:verticalScale(86),
    paddingHorizontal: moderateScale(16),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom:verticalScale(10)
  },
  topTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  giNameTxt: {
    color: '#393939',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
  },
  timeTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  amountTxt: {
    color: '#393939',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  rateTxt: {
    color: '#545454',
    fontSize: moderateScale(11),

    textAlign: 'right',
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
