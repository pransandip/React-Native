import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
// import axios from 'axios';
import Axios from '../../api/Axios';
import AsyncStorage from '@react-native-community/async-storage';

const Applicants = (props) => {
  const [gigApplications, setGigApplications] = useState([
    {
      img: 'https://images.hindustantimes.com/img/2022/01/05/1600x900/PTI11-29-2021-000233B-0_1641402033211_1641402053738.jpg',
      name: 'Mimi Chakraborty',
      status: 'accepted',
    },
    {
      img: 'https://images.hindustantimes.com/img/2022/01/05/1600x900/PTI11-29-2021-000233B-0_1641402033211_1641402053738.jpg',
      name: 'Mimi Chakraborty',
      status: 'pending',
    },
    {
      img: 'https://images.hindustantimes.com/img/2022/01/05/1600x900/PTI11-29-2021-000233B-0_1641402033211_1641402053738.jpg',
      name: 'Mimi Chakraborty',
      status: 'rejected',
    },
  ]);

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [gigDetailsData, setGigDetailsData] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      getGigDetails();
    });
  }, [token]);

  const getGigDetails = () => {
    setLoading(true);
    Axios({
      method: 'GET',
      url: `api/gig/specific/${props.passId}`,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log('response---------->>', response);
        if (response?.data?.ack === 1) {
          // console.log('response---------->>', response.data.data[0]);
          setGigDetailsData(response.data.data[0]);
          getLocationDetails(response.data.data[0].location_id);
          setLocationId(response.data.data[0].location_id);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLocationDetails = (locationId) => {
    Axios({
      method: 'GET',
      url: `api/location/${locationId}`,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          // console.log(`location-------->>>`, response.data);
          setLocationDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.bodyView}>
          <View style={styles.imageView}>
            <View style={styles.blockView}>
              <Image source={require('../../../assets/company.png')} />
              <Text style={styles.normalTxt}>COMPANY</Text>
              <Text numberOfLines={2} style={styles.boldTxt}>
                {gigDetailsData.business_name}
              </Text>
            </View>

            <View style={[styles.blockView, {paddingEnd: moderateScale(9)}]}>
              <Image source={require('../../../assets/calendar2.png')} />
              <Text style={styles.normalTxt}>GIG TYPE</Text>
              <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
                {gigDetailsData.day_type} Day
              </Text>
            </View>
          </View>

          <View style={styles.imageView}>
            <View style={styles.blockView}>
              <Image source={require('../../../assets/notes.png')} />
              <Text style={styles.normalTxt}>PAY FREQUENCY</Text>
              <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
                {gigDetailsData.pay_frequency}
              </Text>
            </View>

            <View style={[styles.blockView, {paddingEnd: moderateScale(12)}]}>
              <Image source={require('../../../assets/handBag.png')} />
              <Text style={styles.normalTxt}>VACANCY</Text>
              <Text style={styles.boldTxt}>
                {gigDetailsData?.fill_vacancies}/{gigDetailsData?.vacancies}
              </Text>
            </View>
          </View>

          <View style={styles.imageView}>
            <View style={styles.blockView}>
              <Image source={require('../../../assets/stopWatch.png')} />
              <Text style={styles.normalTxt}>UNPAID BREAK</Text>
              <Text style={styles.boldTxt}>
                {gigDetailsData.unpaid_break} mins
              </Text>
            </View>

            <View style={styles.blockView}>
              <Image source={require('../../../assets/stopWatch.png')} />
              <Text style={styles.normalTxt}>PAID BREAK</Text>
              <Text style={styles.boldTxt}>
                {gigDetailsData.paid_break} mins
              </Text>
            </View>
          </View>

          <View style={{marginStart: moderateScale(10)}}>
            <Image source={require('../../../assets/clock.png')} />

            <Text style={styles.normalTxt}>Date & TIME</Text>

            <Text style={styles.boldTxt}>
              {`${new Date(gigDetailsData.startdate).toDateString()} ${
                gigDetailsData.enddate
                  ? `- ${new Date(gigDetailsData.enddate).toDateString()}`
                  : ''
              } `}

              {`${
                new Date(gigDetailsData.starttime).toString() === 'Invalid Date'
                  ? `${
                      gigDetailsData.starttime + ` - ` + gigDetailsData.endtime
                    }`
                  : new Date(`${gigDetailsData.starttime}`).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      },
                    ) +
                    ` - ` +
                    new Date(`${gigDetailsData.endtime}`).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      },
                    )
              }`}
            </Text>
          </View>

          <View
            style={{
              marginStart: moderateScale(10),
              marginTop: verticalScale(20),
            }}>
            <Image source={require('../../../assets/location.png')} />

            <Text style={styles.normalTxt}>Location</Text>

            <Text style={[styles.boldTxt, {textDecorationLine: 'underline'}]}>
              {locationDetails.address1}
            </Text>
          </View>

          <View style={styles.backgroundView}>
            <Image source={require('../../../assets/shield.png')} />
            <Text style={styles.criminallyTxt}>
              Criminally background checked required.
            </Text>
          </View>

          <View
            style={{
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 1,
              marginVertical: verticalScale(32),
            }}
          />
        </View>

        <Text style={styles.listTxt}>
          This is a list of all the workers who have applied for your gig.
        </Text>

        <View style={styles.mapView}>
          {gigApplications.map((item, index) => {
            return (
              <View style={styles.card}>
                <View style={styles.profileView}>
                  <Image
                    source={{
                      uri: item.img,
                    }}
                    style={styles.img}
                  />
                  <View style={styles.nameStatusView}>
                    <Text style={styles.nameTxt}>{item.name}</Text>

                    {item.status == 'accepted' ? (
                      <Text style={styles.statusTxt}>
                        Awaiting Confirmation
                      </Text>
                    ) : item.status == 'rejected' ? (
                      <Text style={styles.statusTxt}>Rejected</Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.btnsView}>
                  {item.status == 'accepted' ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.applicationBtn,
                          {backgroundColor: '#F1F1F1'},
                        ]}>
                        <Text style={styles.revokeTxt}>Revoke</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.applicationBtn,
                          {backgroundColor: '#002E6D'},
                        ]}>
                        <Text style={styles.acceptRejectChatTxt}>Chat</Text>
                      </TouchableOpacity>
                    </>
                  ) : item.status == 'pending' ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.applicationBtn,
                          {backgroundColor: '#D72F2F'},
                        ]}>
                        <Text style={styles.acceptRejectChatTxt}>
                          Reject Applicant
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.applicationBtn,
                          {backgroundColor: '#002E6D'},
                        ]}>
                        <Text style={styles.acceptRejectChatTxt}>
                          Accept Applicant
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : null}
                </View>
                <View
                  style={{
                    borderBottomColor: '#E3E3E3',
                    borderBottomWidth: 1,
                    marginTop:
                      item.status == 'pending' || item.status == 'accepted'
                        ? verticalScale(20)
                        : null,
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </View>
  );
};

export default Applicants;

const styles = StyleSheet.create({
  root: {
    // marginBottom: verticalScale(150),
    flex: 1,
    // backgroundColor:'red'
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: moderateScale(10),
    justifyContent: 'space-between',
  },
  blockView: {
    marginVertical: verticalScale(20),

    width: '45%',
    justifyContent: 'center',
  },
  normalTxt: {
    color: '#8A8A8A',
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
  },
  boldTxt: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  backgroundView: {
    flexDirection: 'row',
    backgroundColor: '#E9F5FB',
    height: verticalScale(48),
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(15),
  },
  criminallyTxt: {
    color: '#393939',
    // paddingStart: moderateScale(5),
    fontSize: moderateScale(12.5),
    fontWeight: 'bold',
  },

  listTxt: {
    textAlign: 'center',
    color: '#545454',
  },
  mapView: {
    marginVertical: verticalScale(20),
  },
  card: {
    paddingHorizontal: moderateScale(20),
    // backgroundColor: 'green',
    marginVertical: verticalScale(20),
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  img: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  nameTxt: {
    color: '#393939',
    fontWeight: 'bold',
    paddingStart: moderateScale(12),
  },
  btnsView: {
    marginTop: verticalScale(22),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applicationBtn: {
    height: verticalScale(40),
    width: moderateScale(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  acceptRejectChatTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  revokeTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  nameStatusView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
  statusTxt: {
    color: '#FF9900',
    fontWeight: 'bold',
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
