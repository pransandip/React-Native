// import axios from 'axios';
import Axios from '../api/Axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import Left from '../../assets/Left.png';
import MenuLogo from '../../assets/MenuLogo.png';

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
            Password Recovery
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 14,
              fontWeight: '400',
              color: '#5E5E5E',
            }}>
            Don’t worry, it happens to the best of us.
          </Text>
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
              Reset Password
            </Text>
          </TouchableOpacity>
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
