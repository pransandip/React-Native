import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import HomeHeader from '../../components/Header/HomeHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import Success from '../../../assets/success.png';
import Union from '../../../assets/Union.png';
import JJ from '../../../assets/jj.png';
import Calender from '../../../assets/calender.png';
import Location from '../../../assets/location.png';
// import axios from 'axios';
import Axios from '../../api/Axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      token: '',
      accountDetails: {},
      upcomingGigs: [],
      amount: '',
      loading: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user')
      .then((value) => {
        this.setState({userData: JSON.parse(value)});
      })
      .catch((e) => {
        console.log(e);
      });

    AsyncStorage.getItem('token')
      .then((value) => {
        this.setState({token: value}, () => {
          this.fetchAccountDetails();
          this.getAllUpcomingGigs();
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  fetchAccountDetails = () => {
    const {token} = this.state;
    Axios({
      method: 'GET',
      url: 'api/check-user-setup',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(response.data.data);
          this.setState({
            accountDetails: response.data.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  getAllUpcomingGigs = () => {
    const {token} = this.state;

    Axios({
      method: 'GET',
      url: 'api/gig/getall/upcoming',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(response.data.data);
          this.setState({
            upcomingGigs: response.data.data,
            amount: response.data.earned_amount,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  completeYourProfileView = () => {
    const {
      accountDetails,
      token,
      userData: {id},
    } = this.state;
    return (
      <>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Complete your Profile
        </Text>
        <View style={style.cardView}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileSetupNavigation', {
                screen: 'AddExprience',
                params: {
                  userId: id,
                  token: token,
                },
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
              paddingBottom: 15,
            }}>
            {accountDetails?.experienceCount ? (
              <Image source={Success} style={{height: 24, width: 24}} />
            ) : (
              <Image source={Union} style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                marginLeft: 16,
                fontSize: 16,
                fontWeight: '500',
                color: '#002E6D',
              }}>
              Add Experiences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileSetupNavigation', {
                screen: 'AddCertificate',
                params: {
                  userId: id,
                  token: token,
                },
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
              paddingBottom: 15,
              marginTop: 15,
            }}>
            {accountDetails?.certificateCount &&
            accountDetails?.licenceCount ? (
              <Image source={Success} style={{height: 24, width: 24}} />
            ) : (
              <Image source={Union} style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                marginLeft: 16,
                fontSize: 16,
                fontWeight: '500',
                color: '#002E6D',
              }}>
              Add Certificates/Licenses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileSetupNavigation', {
                screen: 'AddPreferences',
                params: {
                  userId: id,
                  token: token,
                },
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
              paddingBottom: 15,
              marginTop: 15,
            }}>
            {accountDetails?.preferencesCount ? (
              <Image source={Success} style={{height: 24, width: 24}} />
            ) : (
              <Image source={Union} style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                marginLeft: 16,
                fontSize: 16,
                fontWeight: '500',
                color: '#002E6D',
              }}>
              Add Preferences*
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileSetupNavigation', {
                screen: 'AddProfilePicture',
                params: {
                  userId: id,
                  token: token,
                },
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
              paddingBottom: 15,
              marginTop: 15,
            }}>
            {accountDetails?.profile_picture ? (
              <Image source={Success} style={{height: 24, width: 24}} />
            ) : (
              <Image source={Union} style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                marginLeft: 16,
                fontSize: 16,
                fontWeight: '500',
                color: '#002E6D',
              }}>
              Add Profile Picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileSetupNavigation', {
                screen: 'AddPhotoVerify',
                params: {
                  userId: id,
                  token: token,
                },
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#EFEFEF',
              paddingBottom: 15,
              marginTop: 15,
            }}>
            {accountDetails?.photoidesCount ? (
              <Image source={Success} style={{height: 24, width: 24}} />
            ) : (
              <Image source={Union} style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                marginLeft: 16,
                fontSize: 16,
                fontWeight: '500',
                color: '#002E6D',
              }}>
              Add Photo ID Verification
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('ProfileSetupNavigation', {
                screen: 'AddBackgroundVerification',
                params: {
                  userId: id,
                  token: token,
                },
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              marginTop: 15,
            }}>
            {accountDetails?.criminalRecord ? (
              <Image source={Success} style={{height: 24, width: 24}} />
            ) : (
              <Image source={Union} style={{height: 24, width: 24}} />
            )}
            <Text
              style={{
                marginLeft: 16,
                fontSize: 16,
                fontWeight: '500',
                color: '#002E6D',
              }}>
              Criminal Record Check
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  gigsView = () => {
    const {amount, upcomingGigs} = this.state;
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16}}>
          Earned
        </Text>
        <View
          style={[
            style.cardView,
            {
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}>
          <View>
            <Text style={{fontSize: 30, color: '#393939'}}>${amount}.00</Text>
            <Text style={{fontSize: 16, color: '#545454'}}>
              earned this week
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Text
                style={{fontSize: 14, fontWeight: 'bold', color: '#002E6D'}}>
                See More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 16}}>
          Upcoming Gigs
        </Text>
        {upcomingGigs?.length === 0 && (
          <View
            style={[
              style.cardView,
              {alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text
              style={{
                textAlign: 'center',
                width: 230,
                fontSize: 15,
                lineHeight: 25,
                color: '#545454',
              }}>
              You have no upcoming gigs.{' '}
              <Text style={{textDecorationLine: 'underline'}}>Browse Gigs</Text>{' '}
              to claim some now!
            </Text>
          </View>
        )}
        {upcomingGigs?.length > 0 && (
          <View
            style={[
              style.cardView,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  marginBottom: 11,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: '#D72F2F',
                    borderRadius: 12,
                  }}></View>
                <Text style={{marginLeft: 4}}>3/3</Text>
              </View>
              <Image source={JJ} style={{height: 40, width: 40}} />
            </View>
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#393939'}}>
                Warehouse Mover
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#393939',
                  lineHeight: 20,
                }}>
                Container World
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image source={Calender} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#8A8A8A',
                    lineHeight: 16,
                  }}>
                  {' '}
                  Apr 15, 1:00 PM - 10:00 PM
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Image source={Location} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#8A8A8A',
                    lineHeight: 16,
                  }}>
                  {' '}
                  2.5 km
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#393939'}}>
                $140
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#8A8A8A',
                  lineHeight: 16,
                }}>
                ($30/hr)
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {accountDetails} = this.state;
    return (
      <SafeAreaView style={style.rootView}>
        <HomeHeader headerTxt="Home" />
        <ScrollView
          style={{paddingHorizontal: 15, paddingTop: 26, marginBottom: 5}}>
          {(!accountDetails?.experienceCount ||
            !accountDetails?.certificateCount ||
            !accountDetails?.licenceCount ||
            !accountDetails?.preferencesCount ||
            !accountDetails?.profile_picture ||
            !accountDetails?.photoidesCount ||
            !accountDetails?.criminalRecord) &&
            this.completeYourProfileView()}
          {this.gigsView()}
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.loading}>
          <View style={style.centeredViewIndicator}>
            <ActivityIndicator size="large" color="#002E6D" />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  dashboardHeader: {
    backgroundColor: '#002E6D',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardView: {
    marginVertical: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 4,
  },
  rootView: {
    backgroundColor: 'white',
    flex: 1,
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
    marginBottom: verticalScale(100),
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
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
