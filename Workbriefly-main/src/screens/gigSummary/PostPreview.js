import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {useEffect} from 'react';
import RenderHTML from 'react-native-render-html';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import axios from 'axios';
import Axios, {URL} from '../../api/Axios';
import {useState} from 'react';

const {height, width} = Dimensions.get('window');

const PostPreview = ({
  values,
  userData,
  token,
  type,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const [address, setAddress] = useState({});
  const [locationDetails, setLocationDetails] = useState('');
  const [licence, setLicence] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLocationDetails = () => {
    Axios({
      method: 'GET',
      url: `api/location/${values?.location_id}`,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(`locationrrt-------->>>`, response.data);
          setLocationDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCertificateAndLicence = () => {
    setLoading(true);
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  useEffect(() => {
    console.log('data new', values);
    getLocationDetails();
    getCertificateAndLicence();
  }, [values]);

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

  const disableCheck = () => {};

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.topView}>
            <Text style={styles.stepNoTxt}>STEP 1 OF 2</Text>
            <Text style={styles.stepDescTxt}>Post Preview</Text>
          </View>
          {type === 'create' ? (
            <Image
              source={
                values?.cover_image?.uri
                  ? {uri: values.cover_image.uri}
                  : require('../../../assets/warehouse.png')
              }
              style={styles.warehouseImg}
            />
          ) : (
            <Image
              source={
                values?.cover_image?.uri
                  ? {uri: values.cover_image.uri}
                  : values?.cover_image
                  ? {uri: `${URL} + values.cover_image`}
                  : require('../../../assets/warehouse.png')
              }
              style={styles.warehouseImg}
            />
          )}
          <View style={styles.workerView}>
            <Image
              source={
                values?.cover_image
                  ? {uri: `${URL} + values.cover_image`}
                  : require('../../../assets/jjSmall.png')
              }
              style={{height: 50, width: 50}}
            />
            <View style={styles.workerTxtView}>
              <Text style={styles.workerTxt}>{values?.position}</Text>

              <Text
                style={[
                  styles.rateTxt,
                  {fontSize: moderateScale(24), fontWeight: 'bold'},
                ]}>
                ${values?.total_amount.toFixed(2)}
                <Text
                  style={{fontSize: moderateScale(14), fontWeight: 'normal'}}>
                  {' '}
                  (${values?.hourly_pay}/hr)
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.bodyView}>
            <View style={styles.imageView}>
              <View style={styles.blockView}>
                <Image source={require('../../../assets/company.png')} />
                <Text style={styles.normalTxt}>COMPANY</Text>
                <Text style={styles.boldTxt} numberOfLines={2}>
                  {userData?.business_name}
                </Text>
              </View>

              <View style={[styles.blockView, {paddingEnd: moderateScale(9)}]}>
                <Image source={require('../../../assets/calendar2.png')} />
                <Text style={styles.normalTxt}>GIG TYPE</Text>
                <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
                  {values?.dayType === 'single' ? 'Single Day' : 'Multiple Day'}
                </Text>
              </View>
            </View>

            <View style={styles.imageView}>
              <View style={styles.blockView}>
                <Image source={require('../../../assets/notes.png')} />
                <Text style={styles.normalTxt}>PAY FREQUENCY</Text>
                <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
                  {values?.pay_frequency === 'daily' ? 'Daily' : 'Weekly'}
                </Text>
              </View>

              <View style={[styles.blockView, {paddingEnd: moderateScale(12)}]}>
                <Image source={require('../../../assets/handBag.png')} />
                <Text style={styles.normalTxt}>VACANCY</Text>
                <Text style={styles.boldTxt}>0/{values?.vacancies}</Text>
              </View>
            </View>

            <View style={styles.imageView}>
              <View style={styles.blockView}>
                <Image source={require('../../../assets/stopWatch.png')} />
                <Text style={styles.normalTxt}>UNPAID BREAK</Text>
                <Text style={styles.boldTxt}>{values?.unpaid_break} mins</Text>
              </View>

              <View style={styles.blockView}>
                <Image source={require('../../../assets/stopWatch.png')} />
                <Text style={styles.normalTxt}>PAID BREAK</Text>
                <Text style={styles.boldTxt}>{values?.paid_break} mins</Text>
              </View>
            </View>

            <View style={{marginStart: moderateScale(10)}}>
              <Image source={require('../../../assets/clock.png')} />

              <Text style={styles.normalTxt}>Date & TIME</Text>

              <Text style={styles.boldTxt}>
                {values?.dayType !== 'single'
                  ? `${new Date(values?.startDate).toDateString()} - ${new Date(
                      values?.endDate,
                    ).toDateString()}`
                  : `${new Date(values?.startDate).toDateString()}`}{' '}
                -{' '}
                {`${
                  formatAMPM(new Date(`${values?.starttime}`)) +
                  ` - ` +
                  formatAMPM(new Date(`${values?.endtime}`))
                }`}
                {/* Fri, Apr 15, 2022 at 1:00 PM - 5:00 PM */}
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

            {values?.criminal_record_required === 0 ? (
              <></>
            ) : (
              <View style={styles.backgroundView}>
                <Image source={require('../../../assets/shield.png')} />
                <Text style={styles.criminallyTxt}>
                  {' '}
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
            {/* <RenderHtml source={source} /> */}
            <RenderHTML source={{html: values?.description}} />

            {values?.certificate_and_licence?.length === 0 ? (
              <Text style={[styles.descTxt, {marginTop: verticalScale(30)}]}>
                Certificate/License
              </Text>
            ) : (
              <></>
            )}

            {values?.certificate_and_licence?.length > 0 &&
              values?.certificate_and_licence.map((item) => {
                return (
                  <Text style={styles.descriptionTxt}>
                    - {filterLicence(item.id)}
                    <Text style={{fontSize: moderateScale(10)}}>
                      {item?.required === 0 ? '' : '(required)'}
                    </Text>
                  </Text>
                );
              })}

            <Text
              style={[
                styles.descTxt,
                {marginTop: verticalScale(25), marginBottom: verticalScale(15)},
              ]}>
              Instructions
            </Text>

            <Text style={styles.attire}>Attire</Text>
            <RenderHTML source={{html: values?.attire}} />

            {values?.things_to_bring ? (
              <Text style={[styles.attire, {marginTop: verticalScale(20)}]}>
                Things to Bring
              </Text>
            ) : (
              <></>
            )}
            <RenderHTML source={{html: values?.things_to_bring}} />

            {values?.additional_info ? (
              <Text style={[styles.attire, {marginTop: verticalScale(20)}]}>
                Additional Information
              </Text>
            ) : (
              <></>
            )}
            <RenderHTML source={{html: values?.additional_info}} />

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
              {values?.transit?.length > 0 &&
                values?.transit.map((item) => {
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
                })}
              {/* {type === 'edit' &&
            values?.transit.split(',').map((item) => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../../assets/successChip.png')} />
                  <Text
                    style={{
                      color: '#545454',
                    }}>
                    {' ' + item}
                  </Text>
                </View>
              );
            })} */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.continueBtnView]}>
        {step !== 1 && (
          <TouchableOpacity
            onPress={() => {
              prevStep();
            }}
            style={{
              backgroundColor: '#002E6D',
              width: '45%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: verticalScale(12),
              borderRadius: moderateScale(4),
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Back
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={disableCheck() === true ? true : false}
          style={
            disableCheck() === true
              ? [
                  styles.continueBtn,
                  {
                    backgroundColor: '#F0E9D7',
                    width: step === 1 ? '100%' : '45%',
                  },
                ]
              : [
                  styles.continueBtn,
                  {
                    width: step === 1 ? '100%' : '45%',
                  },
                ]
          }
          onPress={() => (step === 8 ? createGig() : nextStep())}>
          <Text style={styles.continueTxt}>Continue</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PostPreview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
    paddingBottom: 80,
  },
  topView: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(20),
    // marginBottom: 100,
  },
  workerView: {
    // backgroundColor:'red',
    flexDirection: 'row',
    marginTop: verticalScale(17),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  workerTxt: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    marginBottom: verticalScale(2),
  },
  workerTxtView: {
    paddingHorizontal: moderateScale(10),
  },
  rateTxt: {
    color: '#393939',
  },
  stepNoTxt: {
    color: '#8A8A8A',
  },
  stepDescTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(32),
  },
  warehouseImg: {
    width: width,
    height: verticalScale(144),
  },
  mainBodyView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(17),
    // marginBottom: 100,
  },
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
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
  },
  continueTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
