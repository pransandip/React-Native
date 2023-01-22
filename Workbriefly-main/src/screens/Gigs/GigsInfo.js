import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Axios from '../../api/Axios';
import RenderHtml from 'react-native-render-html';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const GigsInfo = (props) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [gigDetailsData, setGigDetailsData] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [licence, setLicence] = useState([]);
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

    // let fo = props.navigation.addListener('focus', (e) => {
    //   getLocationDetails();
    // });
    // return fo;
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
        if (
          response?.data?.ack === 1 &&
          response.data?.data?.[0]?.location_id
        ) {
          setGigDetailsData(response.data.data[0]);
          getLocationDetails(response.data.data[0]?.location_id);
          setLocationId(response.data.data[0]?.location_id);
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
          // console.log(`locationrrt-------->>>`, response.data);
          setLocationDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCertificateAndLicence = () => {
    Axios({
      method: 'GET',
      url: 'api/certificate_and_licence',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          setLicence(response.data.data);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  useEffect(() => {
    getCertificateAndLicence();
  }, []);

  const filterLicence = (id) => {
    let arr = licence;
    let data = licence.find((data) => {
      return data.id === id;
    });
    return data?.name;
  };

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.bodyView}>
          <View style={styles.imageView}>
            <View style={styles.blockView}>
              <Image source={require('../../../assets/company.png')} />
              <Text style={styles.normalTxt}>COMPANY</Text>
              <Text style={styles.boldTxt} numberOfLines={2}>
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
                gigDetailsData.enddate && gigDetailsData.day_type !== 'single'
                  ? `- ${new Date(gigDetailsData.enddate).toDateString()}`
                  : ''
              } `}

              {`${
                new Date(gigDetailsData.starttime).toString() === 'Invalid Date'
                  ? `${
                      gigDetailsData.starttime + ` - ` + gigDetailsData.endtime
                    }`
                  : formatAMPM(new Date(`${gigDetailsData.starttime}`)) +
                    ` - ` +
                    formatAMPM(new Date(`${gigDetailsData.endtime}`))
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
          {gigDetailsData?.criminal_record_required === 0 ? (
            <></>
          ) : (
            <View style={styles.backgroundView}>
              <Image source={require('../../../assets/shield.png')} />
              <Text style={styles.criminallyTxt}>
                Criminally background checked required.
              </Text>
            </View>
          )}
          <View
            style={{
              borderBottomColor: '#C4C4C4',
              borderBottomWidth: 1,
              marginVertical: verticalScale(32),
            }}
          />
          <Text style={styles.descTxt}>Description</Text>
          <Text
            style={[
              styles.descriptionTxt,
              {
                marginTop: verticalScale(25),
                marginBottom: verticalScale(20),
              },
            ]}>
            You will be responsible for:
          </Text>
          <RenderHtml source={{html: gigDetailsData?.description}} />
          <Text style={[styles.descTxt, {marginTop: verticalScale(30)}]}>
            Certificate/License
          </Text>
          {gigDetailsData?.experience?.length > 0 ? (
            gigDetailsData?.experience.map((item) => {
              return (
                <Text style={styles.descriptionTxt}>
                  - {filterLicence(item.certificate_and_licence_id)}
                  <Text style={{fontSize: moderateScale(10)}}>
                    {item?.required === 0 ? '' : '(required)'}
                  </Text>
                </Text>
              );
            })
          ) : (
            <></>
          )}
          <Text
            style={[
              styles.descTxt,
              {marginTop: verticalScale(25), marginBottom: verticalScale(15)},
            ]}>
            Instructions
          </Text>
          <Text style={styles.attire}>Attire</Text>
          <RenderHtml source={{html: gigDetailsData.attire}} />
          {gigDetailsData.things_to_bring !== '' ? (
            <Text style={[styles.attire, {marginTop: verticalScale(20)}]}>
              Things to Bring
            </Text>
          ) : (
            <></>
          )}
          <RenderHtml source={{html: gigDetailsData.things_to_bring}} />
          {gigDetailsData.additional_info !== '' ? (
            <Text style={[styles.attire, {marginTop: verticalScale(20)}]}>
              Additional Information
            </Text>
          ) : (
            <></>
          )}
          <RenderHtml source={{html: gigDetailsData.additional_info}} />
          <Text
            style={[
              styles.descTxt,
              {marginTop: verticalScale(25), marginBottom: verticalScale(15)},
            ]}>
            Location
          </Text>
          <View style={styles.mapcontainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              zoomEnabled={true}
              region={{
                latitude: parseFloat(locationDetails.latitude) || 22.58,
                longitude: parseFloat(locationDetails.longitude) || 71.9,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showUserLocation={true}>
              <Marker
                coordinate={{
                  latitude: parseFloat(locationDetails.latitude) || 22.58,
                  longitude: parseFloat(locationDetails.longitude) || 71.9,
                }}
              />
            </MapView>
          </View>
          <Text style={styles.address}>{locationDetails.address1}</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(0),
              marginVertical: verticalScale(15),
            }}>
            {gigDetailsData?.transit ? (
              gigDetailsData.transit.split(',').map((item) => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../../assets/successChip.png')}
                    />
                    <Text
                      style={{
                        color: '#545454',
                      }}>
                      {' ' + item}
                    </Text>
                  </View>
                );
              })
            ) : (
              <></>
            )}
          </View>
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

export default GigsInfo;

const styles = StyleSheet.create({
  root: {
    // marginBottom: verticalScale(150),
    flex: 1,
    // backgroundColor:'red'
  },
  // mapcontainer: {
  //   height: 200,
  //   width: '100%',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   borderRadius: 4,
  // },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },
  bodyView: {
    paddingHorizontal: moderateScale(16),
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: moderateScale(10),
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  blockView: {
    marginVertical: verticalScale(20),
    // backgroundColor: 'green',
    width: '45%',
    height: verticalScale(100),
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
  descTxt: {
    fontSize: moderateScale(20),
    color: '#393939',
    fontWeight: 'bold',
  },
  descriptionTxt: {
    color: '#545454',
    lineHeight: 20,
    marginTop: verticalScale(10),
  },
  attire: {
    color: '#393939',
    fontWeight: 'bold',
  },
  address: {
    color: '#525252',
    textDecorationLine: 'underline',
  },
  mapcontainer: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
