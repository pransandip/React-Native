import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import * as ImagePicker from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import jwt from 'jwt-decode';
import DatePicker from 'react-native-datepicker';
import LeftWhite from '../../../assets/leftwhite.png';
import JJ from '../../../assets/jj.png';
import Camera from '../../../assets/camera.png';
import CrossSmall from '../../../assets/cross-small.png';
import ArrowDown from '../../../assets/arrowDown.png';
// import axios from 'axios';
import Axios from '../../api/Axios';

import {RefreshToken} from '../../common/RefreshToken';
import Logo from '../../../assets/Logo.png';
import {Icon} from 'native-base';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      otp: '',
      emailModalOpen: false,
      otpModalOpen: false,
      counter: 30,
      errors: {},
      email: '',
      token: '',
      filepath: {
        data: '',
        uri: '',
      },
      fileData: {},
      fileUri: '',
      imageUri: '',
      first_name: '',
      last_name: '',
      date: '',
      oldEmail: '',
      errors: {},
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
        first_name: objValue.first_name,
        last_name: objValue.last_name,
        date: objValue.dob,
        oldEmail: objValue.email,
        email: objValue.email,
      });
    });
    AsyncStorage.getItem('token').then((value) => {
      this.setState({
        token: value,
      });
    });
  }

  componentDidUpdate() {
    if (this.state.counter === 0) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  imageToUri = (url, callback) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    var base_image = new Image();
    base_image.src = url;
    base_image.onload = function () {
      canvas.width = base_image.width;
      canvas.height = base_image.height;
      ctx.drawImage(base_image, 0, 0);
      callback(canvas.toDataURL('image/png'));
      canvas.remove();
    };
  };

  launchImageLibrary = async () => {
    const images = await ImagePicker.launchImageLibrary(options);
    let image = {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    };
    this.setState(
      {
        fileData: image,
        imageUri: images.assets[0].uri,
      },
      () => {
        this.handleUpload();
      },
    );
  };

  emailModal = () => {
    const {userData, errors} = this.state;
    return (
      <Modal
        visible={this.state.emailModalOpen}
        transparent
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{marginTop: 'auto'}}>
            <View
              style={{
                width: '100%',
                height: 250,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              <View style={[style.linearGradientView2]}>
                <LinearGradient
                  colors={['#154A5900', '#154A59CC', '#154A59']}
                  style={style.linearGradient2}></LinearGradient>
              </View>
              <View style={[style.Modal_Categories_Container, {height: 250}]}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    paddingRight: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        emailModalOpen: false,
                      })
                    }>
                    <Image source={CrossSmall} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginLeft: 16,
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#272727',
                  }}>
                  Change Email
                </Text>
                <View style={{marginHorizontal: 16}}>
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
                      placeholder="Enter new email"
                      onChangeText={(value) => this.setState({email: value})}
                    />
                    {errors && errors.email ? (
                      <Text style={{color: 'rgb(215, 47, 47)'}}>
                        {errors.email}
                      </Text>
                    ) : null}
                    <TouchableOpacity
                      style={{
                        paddingVertical: 12,
                        backgroundColor: '#002E6D',
                        alignItems: 'center',
                        marginTop: 24,
                        borderRadius: 4,
                      }}
                      onPress={() => this.changeEmail()}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: '#FFFFFF',
                        }}>
                        Continue
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  otpModal = () => {
    const {userData, counter, email, errors} = this.state;
    return (
      <Modal
        visible={this.state.otpModalOpen}
        transparent
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{marginTop: 'auto'}}>
            <View
              style={{
                width: '100%',
                height: 250,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              <View style={[style.linearGradientView2]}>
                <LinearGradient
                  colors={['#154A5900', '#154A59CC', '#154A59']}
                  style={style.linearGradient2}></LinearGradient>
              </View>
              <View style={[style.Modal_Categories_Container, {height: 250}]}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    paddingRight: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        otpModalOpen: false,
                      })
                    }>
                    <Image source={CrossSmall} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginLeft: 16,
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#6A6A69',
                  }}>
                  Enter the verification code that was sent to
                  <Text style={{fontWeight: 'bold'}}> {email}</Text>.
                </Text>
                <View style={{marginHorizontal: 16}}>
                  <View>
                    <View style={style.fromcontrol}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(58, 177, 202, 0.1)',
                          borderWidth: errors?.otp ? 1 : 0,
                          borderColor: errors?.otp ? '#D72F2F' : '',
                        }}>
                        <TextInput
                          style={[
                            style.input,
                            {
                              width: '86%',
                              backgroundColor: '',
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
                        <Text style={{color: 'rgb(215, 47, 47)'}}>
                          {errors.otp}
                        </Text>
                      ) : null}
                    </View>
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
                    <TouchableOpacity
                      style={{
                        paddingVertical: 12,
                        backgroundColor: '#002E6D',
                        alignItems: 'center',
                        marginTop: 24,
                        borderRadius: 4,
                      }}
                      onPress={() => this.verifyEmail()}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: '#FFFFFF',
                        }}>
                        Verify
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  // change email id
  validateEmail = () => {
    const {email} = this.state;
    let errors = {};
    let formIsValid = true;
    let emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email === '' || !emailRegex.test(email)) {
      errors['email'] = 'Enter valid email address.';
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

  changeEmail = () => {
    const {email} = this.state;
    let config = {
      headers: {
        Authorization: `${this.state.token}`,
      },
    };
    if (this.validateEmail()) {
      let postBody = {
        email: email,
        type: 'change_email',
      };
      Axios({
        method: 'api/POST',
        url: 'sent-otp-for-change-email',
        headers: {
          Authorization: `${this.state.token}`,
        },
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
            this.setState(
              {
                otpModalOpen: true,
                emailModalOpen: false,
              },
              () => {
                this.timer =
                  this.state.counter > 0 &&
                  setInterval(
                    () =>
                      this.setState({
                        counter: this.state.counter - 1,
                      }),
                    1000,
                  );
              },
            );
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  validateOtp = () => {
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
      this.setState({
        errors: {},
      });
    }, 2000);
    return formIsValid;
  };

  verifyEmail = () => {
    const {oldEmail, otp, email} = this.state;
    if (this.validateOtp()) {
      let postBody = {
        email: oldEmail,
        otp: otp,
      };
      Axios({
        method: 'POST',
        url: 'api/verify_otp',
        headers: {
          Authorization: `${this.state.token}`,
        },
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
            this.updateEmailData();
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  updateEmailData = () => {
    const {email} = this.state;
    let postBody = {
      email: email,
    };

    Axios({
      method: 'POST',
      url: 'api/change-email',
      headers: {
        Authorization: `${this.state.token}`,
      },
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
          this.setState(
            {
              otpModalOpen: false,
            },
            () => {
              this.refreshToken();
            },
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getFormData = (object, data, type) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    if (type === 'image_update') {
      formData.append('profile_picture', data);
    }
    return formData;
  };

  onUpdate = (data, type) => {
    const {userData} = this.state;
    let updatedObj = {};
    if (type === 'image_update') {
      updatedObj = {...userData};
    } else {
      updatedObj = {...userData, ...data};
    }

    let form_data = this.getFormData(updatedObj, data, type);

    if (form_data) {
      this.getUpdateData(form_data);
    }
  };

  handleUpload = () => {
    const {fileData} = this.state;
    this.onUpdate(fileData, 'image_update');
  };

  validateUserData = () => {
    const {first_name, last_name, date} = this.state;
    let errors = {};
    let formIsValid = true;

    if (first_name === '') {
      errors['first_name'] = 'Please enter firstname';
      formIsValid = false;
    }
    if (last_name === '') {
      errors['last_name'] = 'Please enter lastname';
      formIsValid = false;
    }
    if (date === '') {
      errors['date'] = 'Please enter DOB';
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

  updateUserData = () => {
    if (this.validateUserData()) {
      const userData = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        dob: this.state.date,
      };
      this.onUpdate(userData);
    }
  };

  getUpdateData = (requestBody) => {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${this.state.token}`,
      },
    };
    Axios.post('api/worker-profile-update', requestBody, config)
      .then((res) => {
        if (res.status === 201 && res.data.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: res.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          this.refreshToken();
        } else {
          if (res.data.ack === 0) {
            Snackbar.show({
              backgroundColor: '#B22222',
              text: res.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  refreshToken = () => {
    let configData = {
      headers: {
        Authorization: `${this.state.token}`,
      },
    };
    Axios.get('api/refresh_token', configData)
      .then((res) => {
        AsyncStorage.setItem('token', res.data.data);
        let token = res.data.data;
        console.log(token);
        const user = jwt(token); // decode your token here
        AsyncStorage.setItem('user', JSON.stringify(user));
        this.setState({
          userData: user,
          first_name: user.first_name,
          last_name: user.last_name,
          date: user.dob,
        });
      })
      .catch((error) => console.log(error));
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
    const {userData, imageUri, first_name, last_name, email, errors} =
      this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        {this.emailModal()}
        {this.otpModal()}
        <View style={style.headerConatiner}>
          <Icon
            onPress={() => {
              this.props.navigation.goBack();
            }}
            name="arrow-back-sharp"
            type="Ionicons"
            style={style.arrow}
          />
          <Image source={Logo} />
          <Icon
            name="arrow-back-sharp"
            type="Ionicons"
            style={[style.arrow, {color: 'transparent'}]}
          />
        </View>
        <ScrollView>
          <View style={style.cardView}>
            <View
              style={{
                marginTop: 36,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              {imageUri ? (
                <>
                  <Image
                    source={{
                      uri: imageUri,
                    }}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 64,
                      borderWidth: 1,
                      borderColor: '#979797',
                    }}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 0, right: 110}}
                    onPress={() => this.launchImageLibrary()}>
                    <Image source={Camera} />
                  </TouchableOpacity>
                </>
              ) : userData.profile_picture ? (
                <>
                  <Image
                    source={{
                      uri:
                        'http://78.46.210.25:4243/profile/profile_picture/' +
                        userData.profile_picture,
                    }}
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 64,
                      borderWidth: 1,
                      borderColor: '#979797',
                    }}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 0, right: 110}}
                    onPress={() => this.launchImageLibrary()}>
                    <Image source={Camera} />
                  </TouchableOpacity>
                </>
              ) : (
                <View>
                  <Image source={JJ} />
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 0, right: 10}}
                    onPress={() => this.launchImageLibrary()}>
                    <Image source={Camera} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={style.bodyContainer}>
              <View style={style.fromcontrol}>
                <Text style={style.gobleleble}>First Name*</Text>
                <TextInput
                  value={first_name}
                  style={[style.input]}
                  placeholder="Enter your business name"
                  onChangeText={(value) => this.setState({first_name: value})}
                  editable={false}
                />
                {errors && errors.first_name ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.first_name}
                  </Text>
                ) : null}
              </View>
              <View style={style.fromcontrol}>
                <Text style={style.gobleleble}>Last Name*</Text>
                <TextInput
                  value={last_name}
                  style={[style.input]}
                  placeholder="Enter your business name"
                  onChangeText={(value) => this.setState({last_name: value})}
                  editable={false}
                />
                {errors && errors.last_name ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.last_name}
                  </Text>
                ) : null}
              </View>
              <View style={style.fromcontrol}>
                <Text style={style.gobleleble}>Date of Birth*</Text>
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  date={this.state.date}
                  mode="date"
                  placeholder="YYYY-MM-DD"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  disabled="true"
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
                {/* <TextInput
                  editable={false}
                  value={moment(userData.dob).utc().format('YYYY/MM/DD')}
                  style={[
                    style.input,
                    {
                      backgroundColor: '#F1F1F1',
                    },
                  ]}
                  placeholder="Enter your business name"
                  onChangeText={(value) => this.setState({postalCode: value})}
                /> */}
                {errors && errors.date ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>{errors.date}</Text>
                ) : null}
              </View>
              <View style={style.fromcontrol}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={style.gobleleble}>Email</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        emailModalOpen: true,
                      })
                    }>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#13327C',
                        fontWeight: '400',
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  editable={false}
                  value={userData.email}
                  style={[
                    style.input,
                    // {
                    //   borderWidth: errors?.postalCode ? 1 : 0,
                    //   borderColor: errors?.postalCode ? '#D72F2F' : '',
                    // },
                  ]}
                  placeholder="Enter your email"
                  onChangeText={(value) => this.setState({postalCode: value})}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity
            style={style.agreeBtn}
            onPress={() => this.updateUserData()}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                fontWeight: '500',
                color: '#003862',
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  dashboardHeader: {
    backgroundColor: '#002E6D',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  bodyContainer: {
    marginBottom: 150,
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
  arrow: {
    fontSize: moderateScale(30),
  },
  gobleleble: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fromcontrol: {
    marginTop: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    padding: 11,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    width: '100%',
  },
  Modal_Categories_Container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFF',
    paddingVertical: 20,
    width: '100%',
  },
  linearGradientView2: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
  },
  linearGradient2: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
  },
  agreeBtn: {
    backgroundColor: '#FFCC41',
    width: 303,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 3,
  },
  headerConatiner: {
    height: verticalScale(116),
    width: '100%',
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
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
});
