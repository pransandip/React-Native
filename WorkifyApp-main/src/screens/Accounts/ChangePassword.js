import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Axios from '../../api/Axios';

import {Icon} from 'native-base';
import LeftWhite from '../../../assets/leftwhite.png';
import Eye from '../../../assets/eye.png';
import CloseEye from '../../../assets/eye2.png';
import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      oldpassword: '',
      password: '',
      confirmPassword: '',
      errors: {},
      eye: true,
      eye2: true,
      token: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
      });
    });
    AsyncStorage.getItem('token').then((value) => {
      this.setState({
        token: value,
      });
    });
  }

  //   validate form
  validateForm = () => {
    const {password, confirmPassword, oldpassword} = this.state;
    let errors = {};
    let formIsValid = true;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*]).{8,}$/;

    if (oldpassword === '') {
      errors['oldpassword'] = 'Enter valid old password';
      formIsValid = false;
    }
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

  setEye = () => {
    this.setState({eye: !this.state.eye});
  };

  updatePassword = () => {
    const {oldpassword, password, confirmPassword, userData} = this.state;
    if (this.validateForm()) {
      let postBody = {
        old_password: oldpassword,
        password: password,
        id: userData.id,
      };
      Axios({
        method: 'POST',
        url: 'api/change-password',
        headers: {
          Authorization: `${this.state.token}`,
        },
        data: postBody,
        withCredentials: true,
      })
        .then((response) => {
          console.log('success');
          console.log(response);
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
          }
        })
        .catch((err) => {
          console.log('error');
          console.log(err);
        });
    }
  };

  render() {
    const {errors} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={style.headerConatiner}>
          <Icon
            name="arrow-back"
            onPress={() => this.props.navigation.goBack()}
            type="Ionicons"
            style={style.backIcon}
          />
          <Image source={Logo} />
          <Icon
            name="arrow-back"
            type="Ionicons"
            style={[style.backIcon, {color: 'transparent'}]}
          />
        </View>
        <ScrollView>
          <KeyboardAvoidingView style={{flex: 1}}>
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
                Change your password
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 16,
                  color: '#323232',
                  width: '70%',
                }}>
                Please change your password in order to be more secure
              </Text>
            </View>
            <View style={style.cardView}>
              <View style={[style.fromcontrol, {marginBottom: 0}]}>
                <Text style={style.gobleleble}>Old Password*</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'rgba(58, 177, 202, 0.1)',
                    borderWidth: errors?.oldpassword ? 1 : 0,
                    borderColor: errors?.oldpassword ? '#D72F2F' : '',
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
                    placeholder="Enter your old password"
                    onChangeText={(value) =>
                      this.setState({oldpassword: value})
                    }
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
                {errors && errors.oldpassword ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              <View style={[style.fromcontrol, {marginTop: 24}]}>
                <Text style={style.gobleleble}>New Password*</Text>
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
                    placeholder="Enter your new password"
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
                <Text style={style.gobleleble}>Confirm Password*</Text>
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
  dashboardHeader: {
    backgroundColor: '#F9F9F9',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  input: {
    backgroundColor: 'rgba(58, 177, 202, 0.1);',
    paddingStart: moderateScale(15),
    marginTop: verticalScale(5),
    height: 48,
    borderRadius: 4,
  },
  bodyContainer: {
    marginHorizontal: 15,
    marginTop: 36,
  },
  gobleleble: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  signInBtn: {
    marginTop: 29,
    marginBottom: 20,
    paddingHorizontal: 79,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#FFCC41',
    borderRadius: 3,
  },
  headerConatiner: {
    height: verticalScale(116),
    width: '100%',
    // backgroundColor: '#FFFFFF',
    // backgroundColor:'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 21,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
  },
  backIcon: {
    // color: 'white',
  },
});
