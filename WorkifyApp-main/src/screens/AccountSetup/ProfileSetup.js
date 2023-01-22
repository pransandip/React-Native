// import axios from 'axios';
import Axios from '../../api/Axios';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import jwt from 'jwt-decode';

import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import Success from '../../../assets/success.png';
import Edit from '../../../assets/Edit.png';
import AsyncStorage from '@react-native-community/async-storage';
import {moderateScale} from '../../Constants/PixelRatio';

export default class ProfileSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.route?.params?.username,
      userId: props.route?.params?.userId,
      token: props.route?.params?.token,
      accountDetails: {},
    };
  }

  componentDidMount() {
    this.fetchAccountDetails();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchAccountDetails();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
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
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  goToDashboard = () => {
    let token = this.state.token;
    const user = jwt(token);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('user', JSON.stringify(user));
    this.props.navigation.navigate('BottomTab', {
      screen: 'Dashboard',
    });
  };

  render() {
    const {userId, token, accountDetails} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <Image source={Logo} />
        </View>
        <ScrollView>
          <View style={{marginBottom: 80}}>
            <View style={style.bodyContainer}>
              <Text
                style={[
                  defaultStyle.Title_One,
                  {
                    color: '#393939',
                    textAlign: 'left',
                    fontSize: 24,
                    fontWeight: '700',
                    marginBottom: 0,
                    lineHeight: 28,
                    marginBottom: 28,
                  },
                ]}>
                Start earning money with WorkBriefly
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#696969',
                }}>
                You’re almost ready to go! Before you can view and get booked
                for gigs you will need to complete the following setup steps.
                You can always sign out and sign back in to complete this at a
                later time.{' '}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  lineHeight: 23,
                  color: '#323232',
                  marginTop: 24,
                }}>
                Complete your setup
              </Text>
            </View>
            <View style={[style.cardView]}>
              {this.state.accountDetails?.experienceCount ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#D0F19E',
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddExprience', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Image source={Success} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#74B711',
                      opacity: 1,
                    }}>
                    Add Experiences{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                  <Image source={Edit} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    backgroundColor: '#13327C',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddExprience', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      paddingHorizontal: 10,
                    }}>
                    Add Experiences{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                </TouchableOpacity>
              )}

              {this.state.accountDetails?.certificateCount === true &&
              this.state.accountDetails?.licenceCount === true ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#D0F19E',
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddCertificate', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Image source={Success} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#74B711',
                      opacity: 1,
                    }}>
                    Add Certificates & Licenses
                  </Text>
                  <Image source={Edit} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    backgroundColor: '#13327C',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddCertificate', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Add Certificates & Licenses
                  </Text>
                </TouchableOpacity>
              )}

              {this.state.accountDetails?.preferencesCount ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#D0F19E',
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddPreferences', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Image source={Success} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#74B711',
                      opacity: 1,
                    }}>
                    Add Preferences{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                  <Image source={Edit} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    backgroundColor: '#13327C',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddPreferences', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Add Preferences{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                </TouchableOpacity>
              )}

              {this.state.accountDetails?.profile_picture === true ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#D0F19E',
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddProfilePicture', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Image source={Success} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#74B711',
                      opacity: 1,
                    }}>
                    Add Profile Picture{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                  <Image source={Edit} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    backgroundColor: '#13327C',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddProfilePicture', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Add Profile Picture{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                </TouchableOpacity>
              )}

              {this.state.accountDetails?.photoidesCount ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#D0F19E',
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddPhotoVerify', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Image source={Success} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#74B711',
                      opacity: 1,
                    }}>
                    Add Photo ID Verification{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                  <Image source={Edit} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    backgroundColor: '#13327C',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddPhotoVerify', {
                      userId: userId,
                      token: token,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Add Photo ID Verification{' '}
                    <Text style={{fontSize: moderateScale(6)}}>(required)</Text>
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.accountDetails?.criminalRecord ? (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#D0F19E',
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'AddBackgroundVerification',
                      {
                        userId: userId,
                        token: token,
                      },
                    )
                  }>
                  <Image source={Success} style={{height: 20, width: 20}} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#74B711',
                      opacity: 1,
                    }}>
                    Initiate Criminal Record Check
                  </Text>
                  <Image source={Edit} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    paddingVertical: 16,
                    backgroundColor: '#13327C',
                    alignItems: 'center',
                    borderRadius: 5,
                    marginBottom: 12,
                    paddingHorizontal: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('AddBackgroundVerification')
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Initiate Criminal Record Check
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            marginHorizontal: 36,
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 4,
            marginVertical: 15,
            backgroundColor:
              accountDetails?.preferencesCount &&
              accountDetails.experienceCount &&
              accountDetails.profile_picture &&
              accountDetails.photoidesCount
                ? '#FFCC41'
                : '#F1F1F1',
          }}
          disabled={
            accountDetails?.preferencesCount &&
            accountDetails.experienceCount &&
            accountDetails.profile_picture &&
            accountDetails.photoidesCount
              ? false
              : true
          }
          onPress={() => this.goToDashboard()}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#13327C',
            }}>
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
  },
});
