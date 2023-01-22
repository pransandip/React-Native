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
// import axios from 'axios';
import Axios from '../api/Axios';

import Left from '../../assets/Left.png';
import MenuLogo from '../../assets/MenuLogo.png';
import Logo from '../../assets/Logo.png';

export default class SignupEmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.route?.params?.email,
      userName: props.route?.params?.username,
      counter: 30,
      otp: '',
      errors: {},
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

  // validate form
  validateForm = () => {
    const {otp} = this.state;
    let errors = {};
    let formIsValid = true;
    if (otp === '') {
      errors['otp'] = 'OTP is required';
      formIsValid = false;
    }
    this.setState({errors: errors});
    setTimeout(() => {
      this.setState({errors: {}});
    }, 2000);
    return formIsValid;
  };

  // verify otp
  verifyOtp = () => {
    const {email, otp, userName} = this.state;
    if (this.validateForm()) {
      let postBody = {
        email: email,
        otp: otp,
      };
      Axios({
        method: 'post',
        url: 'api/verify_otp',
        headers: {'Content-Type': 'application/json'},
        data: postBody,
        withCredentials: true,
      })
        .then((response) => {
          console.log('Otp', response?.data);
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
            this.props.navigation.navigate('SignupSuccess', {
              userId: response.data.user_id,
              userName: userName,
              token: response?.data?.data,
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
    const {email, counter, errors} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <Image source={Logo} />
        </View>
        <View style={style.bodyContainer}>
          <Text
            style={[
              {
                color: '#393939',
                textAlign: 'left',
                fontSize: 24,
                fontWeight: '700',
                marginBottom: 0,
                width: '70%',
              },
            ]}>
            Start earning money with WorkBriefly
          </Text>
          <Text style={{marginTop: 28}}>Step 3/3: Email Verification</Text>
          <View style={style.loginCard}>
            <Text
              style={{
                marginVertical: 16,
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 16,
                color: '#6A6A69',
              }}>
              Enter the verification code that was sent to{' '}
              <Text style={{fontWeight: 'bold'}}>{this.state.email}</Text>.
            </Text>
            <View style={style.fromcontrol}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(58, 177, 202, 0.1)',
                  justifyContent: 'space-between',
                  borderWidth: errors?.otp ? 1 : 0,
                  borderColor: errors?.otp ? '#D72F2F' : '',
                }}>
                <TextInput
                  style={[style.input]}
                  placeholder="Enter your one time verification code"
                  onChangeText={(value) => this.setState({otp: value})}
                />
                <Text style={{color: '#002E6D', marginRight: 10}}>
                  {'00:' + this.state.counter}
                </Text>
              </View>
              {errors && errors.otp ? (
                <Text style={{color: 'rgb(215, 47, 47)'}}>{errors.otp}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={style.signInBtn}
              onPress={() => this.verifyOtp()}>
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
              <View
                style={{width: '100%', alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity onPress={() => this.resendOtp()}>
                  <Text
                    style={{color: '#747474', textDecorationLine: 'underline'}}>
                    Resend Verification Code
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
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
    height: 262,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.625912,
    borderColor: '#979797',
    borderRadius: 2.5,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  gobleleble: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  fromcontrol: {
    marginTop: 20,
  },
  input: {
    height: 36,
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
    marginTop: 20,
  },
});
