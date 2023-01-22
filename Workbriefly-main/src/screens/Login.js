// import axios from 'axios';
import Axios from '../api/Axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import jwt from 'jwt-decode';

import MenuLogo from '../../assets/MenuLogo.png';
import {REACT_APP_userServiceURL} from '../../env.json';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/eye2.png';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      eye: true,
    };
  }

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
        type: 'business',
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
            AsyncStorage.setItem('userData', JSON.stringify(user));
            this.props.navigation.navigate('BottomTab', {
              screen: 'Dashboard',
            });
          }
        })
        .catch((errors) => {
          console.log('errors', errors);
        });
    }
  };

  setEye = () => {
    this.setState({eye: !this.state.eye});
  };

  render() {
    const {errors} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <View style={style.logoContainer}>
              <Image source={MenuLogo} />
            </View>
            <View style={style.bodyContainer}>
              <View style={style.fromcontrol}>
                <Text style={style.gobleleble}>Email</Text>
                <TextInput
                  style={[
                    style.input,
                    {
                      borderWidth: errors?.email ? 1 : 0,
                      borderColor: errors?.email ? '#D72F2F' : '',
                    },
                  ]}
                  placeholder="Enter your email"
                  onChangeText={(value) => this.setState({email: value})}
                />
                {errors && errors.email ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>
              <View style={style.fromcontrol}>
                <Text style={style.gobleleble}>Password</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(58, 177, 202, 0.1)',
                  }}>
                  <TextInput
                    style={[
                      style.input,
                      {
                        borderWidth: errors?.password ? 1 : 0,
                        borderColor: errors?.password ? '#D72F2F' : '',
                        width: '93%',
                        backgroundColor: '',
                      },
                    ]}
                    placeholder="Enter your password"
                    secureTextEntry={this.state.eye}
                    onChangeText={(value) => this.setState({password: value})}
                  />
                  <TouchableOpacity
                    onPress={() => this.setEye()}
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
                <TouchableOpacity
                  style={{alignItems: 'flex-end', marginTop: 16}}
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPassword')
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 24,
                      fontWeight: '600',
                      color: '#002E6D',
                    }}>
                    Forgot Password
                  </Text>
                </TouchableOpacity>
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 36,
                }}>
                <Text
                  style={{color: '#002E6D', fontSize: 14, fontWeight: '600'}}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Agreement')}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: '600',
                      color: '#002E6D',
                    }}>
                    {' '}
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 78,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    marginTop: 80,
  },
  gobleleble: {
    color: '#5E5E5E',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  fromcontrol: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    padding: 10,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
  signInBtn: {
    paddingHorizontal: 79,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFCC41',
    borderRadius: 3,
    marginTop: 15,
  },
});
