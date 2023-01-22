import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
// import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from '../api/Axios';
import jwt from 'jwt-decode';

import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/eye2.png';
export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      eye: true,
      accountDetails: {},
    };
  }

  fetchAccountDetails = (token, user) => {
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
          this.setState(
            {
              accountDetails: response.data.data,
            },
            () => {
              console.log(this.state.accountDetails);
              if (
                this.state.accountDetails?.certificateCount &&
                this.state.accountDetails?.criminalRecord &&
                this.state.accountDetails?.experienceCount &&
                this.state.accountDetails?.licenceCount &&
                this.state.accountDetails?.photoidesCount &&
                this.state.accountDetails?.preferencesCount &&
                this.state.accountDetails?.profile_picture
              ) {
                this.props.navigation.navigate('BottomTab', {
                  screen: 'Dashboard',
                });
              } else {
                this.props.navigation.navigate('ProfileSetupNavigation', {
                  screen: 'ProfileSetup',
                  params: {
                    username: user.first_name,
                    userId: user.id,
                    token: token,
                  },
                });
              }
            },
          );
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  validateLoginForm = () => {
    const {email, password} = this.state;
    let formIsValid = true;
    let errors = {};
    let emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email === '' || !emailRegex.test(email)) {
      errors['email'] = 'Enter valid email address';
      formIsValid = false;
    }
    if (password === '') {
      errors['password'] = 'Enter your password';
    }
    this.setState({
      errors: errors,
    });
    setTimeout(() => {
      this.setState({errors: {}});
    }, 1000);
    return formIsValid;
  };

  signIn = () => {
    const {email, password} = this.state;
    if (this.validateLoginForm()) {
      let postBody = {
        email: email,
        password: password,
        type: 'worker',
      };
      Axios({
        method: 'post',
        url: 'api/signin',
        headers: {'Content-Type': 'application/json'},
        data: postBody,
        withCredentials: true,
      })
        .then((response) => {
          if (response?.data?.ack === 0) {
            Snackbar.show({
              backgroundColor: '#B22222',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
          }
          if (response?.data?.ack === 1) {
            Snackbar.show({
              backgroundColor: '#74B711',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
            let token = response.data.token;
            const user = jwt(token);
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('user', JSON.stringify(user));
            this.fetchAccountDetails(token, user);
          }
        })
        .catch((errors) => {
          console.log('errors', errors);
        });
    }
  };

  render() {
    const {errors} = this.state;
    return (
      <SafeAreaView>
        <View style={style.headerConatiner}>
          <Image source={Logo} />
        </View>
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
              },
            ]}>
            Sign In to WorkBriefly
          </Text>
          <View style={style.loginCard}>
            <View style={style.fromcontrol}>
              <Text style={style.gobleleble}>E-mail</Text>
              <TextInput
                style={[
                  style.input,
                  {
                    borderWidth: errors?.email ? 1 : 0,
                    borderColor: errors?.email ? '#D72F2F' : '',
                  },
                ]}
                placeholder="Enter your e-mail"
                onChangeText={(value) => this.setState({email: value})}
              />
              {errors && errors.email ? (
                <Text style={{color: 'rgb(215, 47, 47)'}}>{errors.email}</Text>
              ) : null}
            </View>
            <View style={style.fromcontrol}>
              <Text style={style.gobleleble}>Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(58, 177, 202, 0.1)',
                  borderWidth: errors?.password ? 1 : 0,
                  borderColor: errors?.password ? '#D72F2F' : '',
                  borderRadius: 4,
                }}>
                <TextInput
                  style={[
                    style.input,
                    {
                      width: '93%',
                      backgroundColor: '',
                    },
                  ]}
                  placeholder="Enter your password"
                  onChangeText={(value) => this.setState({password: value})}
                  secureTextEntry={this.state.eye}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      eye: !this.state.eye,
                    })
                  }
                  style={{width: 25}}>
                  {this.state.eye ? (
                    <Image source={CloseEye} />
                  ) : (
                    <Image source={Eye} />
                  )}
                </TouchableOpacity>
              </View>
              {errors && errors.password ? (
                <Text style={{color: 'rgb(215, 47, 47)'}}>
                  {errors.password}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={style.signInBtn}
              onPress={() => this.signIn()}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 16,
                  color: '#003862',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 28,
                marginBottom: 24,
              }}
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#747474',
                }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#747474', fontSize: 14, fontWeight: '500'}}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text
                  style={{textDecorationLine: 'underline', fontWeight: '400'}}>
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  loginCard: {
    marginTop: 24,
    height: 380,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.625912,
    borderColor: '#979797',
    borderRadius: 2.5,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  gobleleble: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  fromcontrol: {
    marginBottom: 20,
  },
  input: {
    height: 36,
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    padding: 10,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
  signInBtn: {
    paddingHorizontal: 79,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#FFCC41',
    borderRadius: 3,
  },
});
