import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
// import axios from 'axios';
import Axios from '../api/Axios';
import Snackbar from 'react-native-snackbar';
import {moderateScale, verticalScale} from './../Constants/PixelRatio';
import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';
import CloseEye from '../../assets/eye2.png';
import Eye from '../../assets/eye.png';
import Left from '../../assets/Left.png';
import {Icon} from 'native-base';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      date: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      eye: true,
      eye2: true,
    };
  }

  // signup form validation
  validateForm = () => {
    const {firstName, lastName, date, email, password, confirmPassword} =
      this.state;
    let errors = {};
    let formIsValid = true;
    let emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*]).{8,}$/;

    if (firstName === '') {
      errors['firstName'] = 'First name is required';
      formIsValid = false;
    }
    if (lastName === '') {
      errors['lastName'] = 'Last name is required';
      formIsValid = false;
    }
    if (date === '') {
      errors['date'] = 'Date of Birth is required';
      formIsValid = false;
    }
    if (email === '' || !emailRegex.test(email)) {
      errors['email'] = 'Valid email address is required';
      formIsValid = false;
    }
    if (password === '') {
      errors['password'] = 'Password is required';
      formIsValid = false;
    }
    if (!passwordRegex.test(password) && password !== '') {
      errors['password'] =
        'Password must be at least 1 uppercase, 1 lowercase, 1 special character and 8 digit.';
      formIsValid = false;
    }
    if (confirmPassword === '') {
      errors['confirmPassword'] = 'Confirm Password is required';
      formIsValid = false;
    }
    if (confirmPassword !== password) {
      errors['confirmPassword'] = 'Password is not matched ';
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

  // create account action
  createAccount = () => {
    if (this.validateForm()) {
      const {firstName, lastName, date, email, password, confirmPassword} =
        this.state;
      let postBody = {
        first_name: firstName,
        last_name: lastName,
        dob: date,
        email: email,
        password: password,
        role: 'worker',
      };
      Axios({
        method: 'POST',
        url: 'api/signup',
        headers: {'Content-Type': 'application/json'},
        data: postBody,
        withCredentials: true,
      })
        .then((response) => {
          console.log('signup', response?.data);
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
            this.props.navigation.navigate('SignupEmailVerification', {
              email: email,
              username: firstName,
            });
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
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} style={{marginLeft: 120}} />
        </View>
        <ScrollView>
          <KeyboardAvoidingView style={{flex: 1}}>
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
                    fontWeight: '700',
                    lineHeight: 16,
                    color: '#323232',
                  }}>
                  Step 2/3: Account Details
                </Text>
              </View>
              <View style={[style.cardView]}>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>First Name </Text>
                    <Icon
                      name="asterisk"
                      type="FontAwesome"
                      style={{
                        fontSize: moderateScale(5),
                        marginTop: verticalScale(2),
                        color: '#D72F2F',
                      }}
                    />
                  </View>
                  <TextInput
                    style={[
                      style.input,
                      {
                        borderWidth: errors?.password ? 1 : 0,
                        borderColor: errors?.password ? '#D72F2F' : '',
                      },
                    ]}
                    placeholder="Enter your first name"
                    onChangeText={(value) => this.setState({firstName: value})}
                  />
                  {errors && errors.firstName ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.firstName}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Last Name </Text>
                    <Icon
                      name="asterisk"
                      type="FontAwesome"
                      style={{
                        fontSize: moderateScale(5),
                        marginTop: verticalScale(2),
                        color: '#D72F2F',
                      }}
                    />
                  </View>
                  <TextInput
                    style={[
                      style.input,
                      {
                        borderWidth: errors?.password ? 1 : 0,
                        borderColor: errors?.password ? '#D72F2F' : '',
                      },
                    ]}
                    placeholder="Enter your last name"
                    onChangeText={(value) => this.setState({lastName: value})}
                  />
                  {errors && errors.lastName ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.lastName}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Date of Birth </Text>
                    <Icon
                      name="asterisk"
                      type="FontAwesome"
                      style={{
                        fontSize: moderateScale(5),
                        marginTop: verticalScale(2),
                        color: '#D72F2F',
                      }}
                    />
                  </View>
                  <DatePicker
                    style={{
                      width: '100%',
                      borderWidth: errors?.password ? 1 : 0,
                      borderColor: errors?.password ? '#D72F2F' : '',
                    }}
                    date={this.state.date}
                    mode="date"
                    placeholder="YYYY-MM-DD"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={(date) => {
                      this.setState({date: date});
                    }}
                    customStyles={{
                      dateInput: {
                        height: 36,
                        backgroundColor: 'rgba(58, 177, 202, 0.1)',
                        padding: 10,
                        borderRadius: 4,
                        fontSize: 14,
                        fontWeight: '400',
                        borderWidth: 0,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                      },
                      placeholderText: {
                        color: '#969696',
                      },
                    }}
                  />
                  {errors && errors.date ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.date}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>E-mail </Text>
                    <Icon
                      name="asterisk"
                      type="FontAwesome"
                      style={{
                        fontSize: moderateScale(5),
                        marginTop: verticalScale(2),
                        color: '#D72F2F',
                      }}
                    />
                  </View>
                  <TextInput
                    style={[
                      style.input,
                      {
                        borderWidth: errors?.password ? 1 : 0,
                        borderColor: errors?.password ? '#D72F2F' : '',
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
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Password </Text>
                    <Icon
                      name="asterisk"
                      type="FontAwesome"
                      style={{
                        fontSize: moderateScale(5),
                        marginTop: verticalScale(2),
                        color: '#D72F2F',
                      }}
                    />
                  </View>
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
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Confirm Password </Text>
                    <Icon
                      name="asterisk"
                      type="FontAwesome"
                      style={{
                        fontSize: moderateScale(5),
                        marginTop: verticalScale(2),
                        color: '#D72F2F',
                      }}
                    />
                  </View>

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
                      secureTextEntry={this.state.eye2}
                      style={[
                        style.input,
                        {
                          width: '93%',
                          backgroundColor: '',
                        },
                      ]}
                      placeholder="Re-enter your password"
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
                  onPress={() => this.createAccount()}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      lineHeight: 16,
                      color: '#003862',
                    }}>
                    Create My Account
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
  headerConatiner: {
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
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
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
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    padding: 10,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
  },
});
