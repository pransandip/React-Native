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
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import Left from '../../assets/Left.png';
import MenuLogo from '../../assets/MenuLogo.png';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/eye2.png';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route?.params?.userId,
      password: '',
      confirmPassword: '',
      errors: {},
      eye: true,
      eye2: true,
    };
  }

  //   validate form
  validateForm = () => {
    const {password, confirmPassword} = this.state;
    let errors = {};
    let formIsValid = true;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*-]).{8,}$/;

    if (password === '') {
      errors['password'] = 'Enter valid password';
      formIsValid = false;
    }
    if (!passwordRegex.test(password) && password !== '') {
      errors['password'] =
        'Password must be at least 1 uppercase, 1 lowercase, 1 special character and 8 digit.';
      formIsValid = false;
    }
    if (confirmPassword === '') {
      errors['confirmPassword'] = 'Enter valid confirm password';
      formIsValid = false;
    }
    if (confirmPassword !== password) {
      errors['confirmPassword'] = 'Password not matched';
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

  //   update new password
  updatePassword = () => {
    const {password, userId} = this.state;
    if (this.validateForm()) {
      let postBody = {
        password: password,
        id: userId,
      };
      Axios({
        method: 'POST',
        url: 'api/set-password',
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
            this.props.navigation.navigate('Login');
          }
        })
        .catch((error) => {
          console.log('Error', error);
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
                Reset Password
              </Text>
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#5E5E5E',
                }}>
                Please enter your new password.
              </Text>
              <View style={[style.fromcontrol, {marginBottom: 0}]}>
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
                    secureTextEntry={this.state.eye}
                    placeholder="Enter your password"
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
              </View>
              <View style={[style.fromcontrol, {marginTop: 24}]}>
                <Text style={style.gobleleble}>Confirm Password</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(58, 177, 202, 0.1)',
                    borderWidth: errors?.confirmPassword ? 1 : 0,
                    borderColor: errors?.confirmPassword ? '#D72F2F' : '',
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
                    secureTextEntry={this.state.eye2}
                    placeholder="Re-Enter your password"
                    onChangeText={(value) =>
                      this.setState({confirmPassword: value})
                    }
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({eye2: !this.state.eye2})}
                    style={{width: 25}}>
                    {this.state.eye2 ? (
                      <Image source={CloseEye} />
                    ) : (
                      <Image source={Eye} />
                    )}
                  </TouchableOpacity>
                </View>
                {errors && errors.confirmPassword ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.confirmPassword}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={style.signInBtn}
                onPress={() => this.updatePassword()}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 16,
                    color: '#003862',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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
