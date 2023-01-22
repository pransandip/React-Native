import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Row} from 'native-base';
import RenderHtml from 'react-native-render-html';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {useEffect} from 'react';
import {useState} from 'react';
// import axios from 'axios';
import Axios from '../../api/Axios';

const GigInfo = (props) => {
  const [token, setToken] = useState(props?.token);
  const [licence, setLicence] = useState([]);

  const source = {
    html: props.gigDetails?.description,
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
    console.log('jdkskd', props?.gigDetails);
    getCertificateAndLicence();
  }, []);

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

  const filterLicence = (id) => {
    let arr = licence;
    let data = licence.find((data) => {
      return data.id === id;
    });
    return data?.name;
  };

  return (
    <View style={styles.root}>
      {/* <ScrollView> */}
      <View style={styles.bodyView}>
        <View style={styles.imageView}>
          <View style={styles.blockView}>
            <Image source={require('../../assets/building.png')} />
            <Text style={styles.normalTxt}>COMPANY</Text>
            <Text style={styles.boldTxt}>
              {props.gigDetails?.business_name}
            </Text>
          </View>

          <View style={[styles.blockView, {paddingEnd: moderateScale(9)}]}>
            <Image source={require('../../assets/calender2.png')} />
            <Text style={styles.normalTxt}>GIG TYPE</Text>
            <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
              {props.gigDetails?.day_type} day
            </Text>
          </View>
        </View>

        <View style={styles.imageView}>
          <View style={styles.blockView}>
            <Image source={require('../../assets/frequency.png')} />
            <Text style={styles.normalTxt}>PAY FREQUENCY</Text>
            <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
              {props.gigDetails?.pay_frequency}
            </Text>
          </View>

          <View style={[styles.blockView, {paddingEnd: moderateScale(12)}]}>
            <Image source={require('../../assets/vacancy.png')} />
            <Text style={styles.normalTxt}>VACANCY</Text>
            <Text style={styles.boldTxt}>
              {props.gigDetails?.fill_vacancies_count}/
              {props.gigDetails?.vacancies}
            </Text>
          </View>
        </View>

        <View style={styles.imageView}>
          <View style={styles.blockView}>
            <Image source={require('../../assets/clock.png')} />
            <Text style={styles.normalTxt}>UNPAID BREAK</Text>
            <Text style={styles.boldTxt}>
              {props.gigDetails?.unpaid_break} mins
            </Text>
          </View>

          <View style={styles.blockView}>
            <Image source={require('../../assets/clock.png')} />
            <Text style={styles.normalTxt}>PAID BREAK</Text>
            <Text style={styles.boldTxt}>
              {props.gigDetails?.paid_break} mins
            </Text>
          </View>
        </View>

        <View style={{marginStart: moderateScale(10)}}>
          <Image source={require('../../assets/clockIcon.png')} />

          <Text style={styles.normalTxt}>Date & TIME</Text>
          <Text style={styles.boldTxt}>
            {`${new Date(props.gigDetails?.startdate).toDateString()} ${
              props.gigDetails?.enddate &&
              props.gigDetails?.day_type !== 'single'
                ? `- ${new Date(props.gigDetails?.enddate).toDateString()}`
                : ''
            } `}

            {`${
              new Date(props.gigDetails?.starttime).toString() ===
              'Invalid Date'
                ? `${
                    props.gigDetails?.starttime +
                    ` - ` +
                    props.gigDetails?.endtime
                  }`
                : formatAMPM(new Date(`${props.gigDetails?.starttime}`)) +
                  ` - ` +
                  formatAMPM(new Date(`${props.gigDetails?.endtime}`))
            }`}
          </Text>
        </View>

        <View
          style={{
            marginStart: moderateScale(10),
            marginTop: verticalScale(20),
          }}>
          <Image source={require('../../assets/locationicon.png')} />

          <Text style={styles.normalTxt}>Location</Text>

          <Text style={[styles.boldTxt, {textDecorationLine: 'underline'}]}>
            {props.gigDetails?.address1}
          </Text>
        </View>
        {props.gigDetails?.criminal_record_required === 1 ? (
          <View style={styles.backgroundView}>
            <Image source={require('../../assets/shield.png')} />
            <Text style={styles.criminallyTxt}>
              Criminally background checked required.
            </Text>
          </View>
        ) : null}                                                

        {props.gigDetails?.invite_status === 'accept' && (
          <View
            style={{
              backgroundColor: '#F0EBE3',
              paddingHorizontal: 12,
              paddingVertical: 12,
              marginTop: 28,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: '#8A8A8A',
                lineHeight: 14,
                fontWeight: '500',
                marginBottom: 8,
              }}>
              If you have any questions, please contact:
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#393939',
                    marginBottom: 8,
                  }}>
                  Oliver Smith
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#393939',
                    marginBottom: 8,
                  }}>
                  Warehouse Manager
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 25,
                  backgroundColor: '#002E6D',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                }}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 14, fontWeight: 'bold'}}>
                  Chat
                </Text>
              </TouchableOpacity>
            </View>
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
        <RenderHtml source={source} />

        <Text style={[styles.descTxt, {marginTop: verticalScale(30)}]}>
          Certificate/License
        </Text>
        {props?.gigDetails?.experience?.length > 0 &&
          props?.gigDetails?.experience.map((item) => {
            return (
              <Text style={styles.descriptionTxt}>
                - {filterLicence(item.certificate_and_licence_id)}
                <Text style={{fontSize: moderateScale(10)}}>
                  {item?.required === 0 ? '' : '(required)'}
                </Text>
              </Text>
            );
          })}
        {/* <Text style={styles.descriptionTxt}>
          - Serving it Right &nbsp;
          <Text style={{fontSize: moderateScale(10)}}>(required)</Text>
        </Text>
        <Text style={styles.descriptionTxt}>- working License</Text> */}

        <Text
          style={[
            styles.descTxt,
            {marginTop: verticalScale(25), marginBottom: verticalScale(15)},
          ]}>
          Instructions
        </Text>

        <Text style={styles.attire}>Attire</Text>
        <RenderHtml source={{html: props.gigDetails?.attire}} />

        <Text style={[styles.attire, {marginTop: verticalScale(20)}]}>
          Things to Bring
        </Text>
        <RenderHtml source={{html: props.gigDetails?.things_to_bring}} />

        <Text style={[styles.attire, {marginTop: verticalScale(20)}]}>
          Additional Information
        </Text>
        <RenderHtml source={{html: props.gigDetails?.additional_info}} />

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
              latitude: parseFloat(props.gigDetails?.latitude) || 22.58,
              longitude: parseFloat(props.gigDetails?.longitude) || 71.9,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showUserLocation={true}>
            <Marker
              coordinate={{
                latitude: parseFloat(props.gigDetails?.latitude) || 22.58,
                longitude: parseFloat(props.gigDetails?.longitude) || 71.9,
              }}
            />
          </MapView>
        </View>

        <Text style={styles.address}>{props.gigDetails?.address1}</Text>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(0),
            marginTop: verticalScale(15),
          }}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../assets/success.png')} />
            <Text
              style={{
                color: '#545454',
              }}>
              {props.gigDetails?.transit}
            </Text>
          </View> */}
          {props.gigDetails?.transit &&
            props.gigDetails?.transit.split(',').map((item) => {
              return (
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Image
                    source={require('../../../assets/success.png')}
                    style={{height: 20, width: 20}}
                  />
                  <Text
                    style={{
                      color: '#545454',
                    }}>
                    {' ' + item}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default GigInfo;

const styles = StyleSheet.create({
  root: {
    marginBottom: verticalScale(150),
    flex: 1,
    // backgroundColor:'red'
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
  bodyView: {
    paddingHorizontal: moderateScale(16),
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
    // width: '80%',
    // paddingHorizontal: moderateScale(80),
    justifyContent: 'space-between',
    paddingStart: moderateScale(10),
    // backgroundColor: 'red',
  },
  blockView: {
    marginVertical: verticalScale(20),
    // backgroundColor: 'green',
    width: '40%',
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
});
