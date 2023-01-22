import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
// import axios from 'axios';
import Axios from '../api/Axios';
import Left from '../../assets/Left.png';
import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';

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
    axios({
      method: 'POST',
      url: 'forgot-password',
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
      <SafeAreaView style={{flex: 1}}>
        {/* <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} />
        </View> */}
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} style={{marginLeft: 120}} />
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
            Email Verification
          </Text>
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
                <Text style={{color: '#002E6D', paddingRight: 8}}>
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
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 14,
                fontStyle: 'italic',
                color: '#757575',
                marginTop: 16,
              }}>
              *Message and data rates may apply
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    // height: 72,
    // width: '100%',
    // backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
    // alignItems: 'center',

    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  bodyContainer: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  loginCard: {
    marginTop: 24,
    height: 275,
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
    // backgroundColor: 'rgba(58, 177, 202, 0.1)',
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
