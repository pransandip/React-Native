// import axios from 'axios';
import Axios from '../api/Axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import Left from '../../assets/Left.png';
import MenuLogo from '../../assets/MenuLogo.png';

export default class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      email: props.route?.params?.email,
      errors: {},
      counter: 30,
    };
  }

  componentDidMount() {
    this.timer =
      this.state.counter > 0 &&
      setInterval(() => this.setState({counter: this.state.counter - 1}), 1000);
  }

  componentDidUpdate() {
    if (this.state.counter === 0) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //   validate form
  validateForm = () => {
    const {otp} = this.state;
    let errors = {};
    let formIsValid = true;

    if (otp === '') {
      errors['otp'] = 'OTP is required';
      formIsValid = false;
    }
    this.setState({
      errors: errors,
    });
    setTimeout(() => {
      this.setState({errors: {}});
    }, 2000);
    return formIsValid;
  };

  //   verify OTP

  verifyOTP = () => {
    const {email, otp} = this.state;
    if (this.validateForm()) {
      let postBody = {
        email: email,
        otp: otp,
      };
      Axios({
        method: 'POST',
        url: 'api/verify_otp',
        headers: {'Content-Type': 'application/json'},
        data: postBody,
        withCredentials: true,
      })
        .then((response) => {
          if (response.data.ack === 0) {
            Snackbar.show({
              backgroundColor: '#B22222',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
          }
          if (response.data.ack === 1) {
            Snackbar.show({
              backgroundColor: '#74B711',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
            this.props.navigation.navigate('ResetPassword', {
              userId: response.data.user_id,
            });
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  // resend verification
  resendOtp = () => {
    const {email} = this.state;
    let postBody = {
      email: email,
    };
    Axios({
      method: 'POST',
      url: 'api/forgot-password',
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
          this.setState({counter: 30}, () => {
            this.timer =
              this.state.counter > 0 &&
              setInterval(
                () => this.setState({counter: this.state.counter - 1}),
                1000,
              );
          });
          Snackbar.show({
            backgroundColor: '#74B711',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {errors, counter} = this.state;
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={{marginTop: 26, marginLeft: 20}}
          onPress={() => this.props.navigation.goBack()}>
          <Image source={Left} />
        </TouchableOpacity>
        <View style={style.logoContainer}>
          <Image source={MenuLogo} />
        </View>
        <View style={style.bodyContainer}>
          <Text style={{fontSize: 24, fontWeight: '700', color: '#272727'}}>
            Email Verification
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 14,
              fontWeight: '400',
              color: '#5E5E5E',
            }}>
            Enter the verification code that was sent to{' '}
            <Text style={{fontWeight: 'bold'}}>
              {this.props.route?.params?.email}
            </Text>
          </Text>
          <View style={style.fromcontrol}>
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
                    borderWidth: errors?.otp ? 1 : 0,
                    borderColor: errors?.otp ? '#D72F2F' : '',
                    width: '86%',
                  },
                ]}
                placeholder="Enter your one time verification code"
                onChangeText={(value) => this.setState({otp: value})}
              />
              <Text style={{color: '#002E6D'}}>
                {'00:' + this.state.counter}
              </Text>
            </View>
            {errors && errors.otp ? (
              <Text style={{color: 'rgb(215, 47, 47)'}}>{errors.otp}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={style.signInBtn}
            onPress={() => this.verifyOTP()}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 16,
                color: '#003862',
              }}>
              Verify
            </Text>
          </TouchableOpacity>
          {counter === 0 ? (
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => this.resendOtp()}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontWeight: '600',
                  color: '#002E6D',
                }}>
                Resend Verification Code
              </Text>
            </TouchableOpacity>
          ) : null}
          <Text
            style={{
              marginTop: 20,
              fontSize: 12,
              color: '#757575',
              fontStyle: 'italic',
            }}>
            *Message and data rates may apply
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  logoContainer: {alignItems: 'center', marginTop: 78},
  bodyContainer: {
    paddingHorizontal: 16,
    marginTop: 70,
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
    marginTop: 32,
  },
  input: {
    width: '100%',
    height: 48,
    // backgroundColor: 'rgba(58, 177, 202, 0.1)',
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
