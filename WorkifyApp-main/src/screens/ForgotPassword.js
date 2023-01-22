import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
// import axios from 'axios';
import Axios from '../api/Axios';

import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };
  }

  //   form validation
  validateForm = () => {
    const {email} = this.state;
    let errors = {};
    let formIsValid = true;
    let emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email === '' || !emailRegex.test(email)) {
      errors['email'] = 'Enter valid email address';
      formIsValid = false;
    }
    this.setState({
      errors: errors,
    });
    setTimeout(() => {
      this.setState({
        errors: {},
      });
    }, 2000);
    return formIsValid;
  };

  //   reset password
  resetPassword = () => {
    const {email} = this.state;
    if (this.validateForm()) {
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
            Snackbar.show({
              backgroundColor: '#74B711',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
            this.props.navigation.navigate('EmailVerification', {email: email});
          }
        })
        .catch((error) => {
          console.log(error);
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
            Password Recovery
          </Text>
          <View style={style.loginCard}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 16,
                color: '#5E5E5E',
              }}>
              Don’t worry, it happens to the best of us.
            </Text>
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
            <TouchableOpacity
              style={style.signInBtn}
              onPress={() => this.resetPassword()}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 16,
                  color: '#003862',
                }}>
                Reset password
              </Text>
            </TouchableOpacity>
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
    height: 240,
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
    marginTop: 30,
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
