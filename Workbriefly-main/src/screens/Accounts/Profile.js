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
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Snackbar from 'react-native-snackbar';
import jwt from 'jwt-decode';
import Axios from '../../api/Axios';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import LeftWhite from '../../../assets/leftwhite.png';
import JJ from '../../../assets/jj.png';
import Camera from '../../../assets/camera.png';
import CrossSmall from '../../../assets/cross-small.png';
import ArrowDown from '../../../assets/arrowDown.png';
// import axios from 'axios';
import {RefreshToken} from '../../common/RefreshToken';
import {Icon} from 'native-base';
import Cross from '../../../assets/Cross.png';

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
      addressModalOpen: false,
      locationModalOpen: false,
      provienceModalOpen: false,
      industryModalOpen: false,
      nameModalOpen: false,
      googleLocation: {},
      counter: 30,
      errors: {},
      addressOne: '',
      addressTwo: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      email: '',
      token: '',
      filepath: {
        data: '',
        uri: '',
      },
      fileData: {},
      fileUri: '',
      imageUri: '',
      provinceId: '',
      phoneNumber: '',
      industryData: [],
      provinceData: [],
      industryId: '',
      oldEmail: '',
      first_name: '',
      last_name: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
        addressOne: objValue.address1,
        addressTwo: objValue.address2,
        city: objValue.city,
        country: objValue.country,
        postalCode: objValue.postal_code,
        phoneNumber: objValue.mobile,
        industry: objValue.industry,
        province: objValue.province,
        oldEmail: objValue.email,
        first_name: objValue.first_name,
        last_name: objValue.last_name,
      });
    });
    AsyncStorage.getItem('token').then((value) => {
      this.setState(
        {
          token: value,
        },
        () => {
          this.fetchIndustry();
        },
      );
    });
    this.fetchProvience();
  }

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
        AsyncStorage.setItem('userData', JSON.stringify(user));
        this.setState({
          userData: user,
          addressTwo: user.address2,
          city: user.city,
          country: user.country,
          postalCode: user.postal_code,
          phoneNumber: user.mobile,
          industry: user.industry,
          province: user.province,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidUpdate() {
    if (this.state.counter === 0) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // validate firstname and last name
  validateName = () => {
    const {first_name, last_name} = this.state;
    let errors = {};
    let formIsValid = true;

    if (first_name === '') {
      errors['first_name'] = 'First Name is required';
      formIsValid = false;
    }
    if (last_name === '') {
      errors['last_name'] = 'Last Name is required';
      formIsValid = false;
    }
    this.setState({
      errors: errors,
    });
    setTimeout(() => {
      this.setState({
        errors: {},
      });
    }, 5000);
    return formIsValid;
  };

  // signup form validation
  validateAddressForm = () => {
    const {addressOne, postalCode, city, country, province} = this.state;
    let errors = {};
    let formIsValid = true;

    if (addressOne === '') {
      errors['addressOne'] = 'Business Address1 is required';
      formIsValid = false;
    }
    if (city === '') {
      errors['city'] = 'City is required';
      formIsValid = false;
    }
    if (province === '') {
      errors['province'] = 'Province is required';
      formIsValid = false;
    }
    if (country === '') {
      errors['country'] = 'Country is required';
      formIsValid = false;
    }
    if (postalCode === '') {
      errors['postalCode'] = 'Enter a valid postal code';
      formIsValid = false;
    }
    this.setState({
      errors: errors,
    });
    setTimeout(() => {
      this.setState({
        errors: {},
      });
    }, 5000);
    return formIsValid;
  };

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
    console.log('uri', images.assets[0]);
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
    const {userData, counter, email} = this.state;
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
                    </View>
                    {counter === 0 ? (
                      <TouchableOpacity style={{marginTop: 20}}>
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

  //   location modal
  locationModal = () => {
    return (
      // <Modal
      //   visible={this.state.locationModalOpen}
      //   transparent
      //   onRequestClose={() => this.setState({locationModalOpen: false})}
      //   animationType="slide"
      //   supportedOrientations={['portrait', 'landscape']}>
      //   <KeyboardAvoidingView
      //     style={{flex: 1}}
      //     behavior={Platform.OS === 'ios' ? 'padding' : null}>
      //     <View style={{marginTop: 'auto'}}>
      //       <View
      //         style={{
      //           width: '100%',
      //           height: 500,
      //           position: 'absolute',
      //           bottom: 0,
      //           alignSelf: 'center',
      //         }}>
      //         <View style={[style.linearGradientView2]}>
      //           <LinearGradient
      //             colors={['#154A5900', '#154A59CC', '#154A59']}
      //             style={style.linearGradient2}></LinearGradient>
      //         </View>
      //         <View style={[style.Modal_Categories_Container, {height: 500}]}>
      //           <View
      //             style={{
      //               paddingVertical: 10,
      //               width: '90%',
      //               flexDirection: 'row',
      //               justifyContent: 'space-between',
      //             }}>
      //             <Text style={{marginLeft: 15}}>Search Location</Text>
      //             <TouchableOpacity
      //               activeOpacity={0.7}
      //               onPress={() =>
      //                 this.setState({
      //                   locationModalOpen: false,
      //                   addressModalOpen: true,
      //                 })
      //               }
      //               style={{alignItems: 'flex-end'}}>
      //               <Image source={CrossSmall} />
      //             </TouchableOpacity>
      //           </View>
      //           <View style={{width: '100%', height: 500}}>
      //             <GooglePlacesAutocomplete
      //               placeholder="Search for Location"
      //               fetchDetails
      //               onPress={(data, details = null) => {
      //                 for (
      //                   var i = 0;
      //                   i < details?.address_components.length;
      //                   i++
      //                 ) {
      //                   if (
      //                     details.address_components[i].types == 'postal_code'
      //                   ) {
      //                     this.setState({
      //                       postalCode: details.address_components[i].long_name,
      //                     });
      //                   }
      //                 }
      //                 this.setState({
      //                   googleLocation: details,
      //                   locationModalOpen: false,
      //                   addressModalOpen: true,
      //                   city: details?.address_components?.[0]?.long_name,
      //                   country: details?.address_components?.[2]?.long_name,
      //                   addressOne: details?.formatted_address,
      //                 });
      //               }}
      //               // suppressDefaultStyles
      //               styles={{
      //                 textInputContainer: {
      //                   color: '#1faadb',
      //                 },
      //                 description: {
      //                   fontSize: 14,
      //                 },
      //                 separator: {
      //                   backgroundColor: '#fff',
      //                 },
      //                 textInput: {
      //                   height: 38,
      //                   color: '#5d5d5d',
      //                   fontSize: 16,
      //                   borderBottomWidth: 0.5,
      //                 },
      //                 predefinedPlacesDescription: {
      //                   color: '#1faadb',
      //                 },
      //               }}
      //               query={{
      //                 key: 'AIzaSyBu1jwLt88S1pSZW5H5wdGnsLe_voBQK50',
      //                 language: 'en',
      //               }}
      //             />
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.locationModalOpen}
        onRequestClose={() => this.setState({locationModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({locationModalOpen: false})}
          />
          <View style={[style.modalView, {height: verticalScale(550)}]}>
            <View style={style.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    locationModalOpen: false,
                    addressModalOpen: true,
                  })
                }
              />
              <KeyboardAvoidingView
              // style={{flex: 1}}
              // behavior={Platform.OS === 'ios' ? 'padding' : null}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    fontWeight: '600',
                    color: '#272727',
                  }}>
                  Search Location
                </Text>

                <View
                  style={{
                    width: '100%',
                    height: 500,
                    marginTop: verticalScale(15),
                  }}>
                  <GooglePlacesAutocomplete
                    placeholder="Search for Location"
                    fetchDetails
                    onPress={(data, details = null) => {
                      for (
                        var i = 0;
                        i < details.address_components.length;
                        i++
                      ) {
                        for (
                          var b = 0;
                          b < details.address_components[i].types.length;
                          b++
                        ) {
                          if (
                            details.address_components[i].types[b] == 'locality'
                          ) {
                            this.setState({
                              city: details.address_components[i].long_name,
                            });
                          }
                          if (
                            details.address_components[i].types[b] == 'country'
                          ) {
                            this.setState({
                              country: details.address_components[i].long_name,
                            });
                          }
                          if (
                            details.address_components[i].types[b] ==
                            'postal_code'
                          ) {
                            this.setState({
                              postalCode:
                                details.address_components[i].long_name,
                            });
                          }
                        }
                      }
                      this.setState({
                        googleLocation: details,
                        locationModalOpen: false,
                        addressModalOpen: true,
                        addressOne: details?.formatted_address,
                      });
                    }}
                    // suppressDefaultStyles
                    styles={{
                      textInputContainer: {
                        color: '#1faadb',
                      },
                      description: {
                        fontSize: 14,
                      },
                      separator: {
                        backgroundColor: '#fff',
                      },
                      textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                        borderBottomWidth: 0.5,
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                    query={{
                      key: 'AIzaSyBu1jwLt88S1pSZW5H5wdGnsLe_voBQK50',
                      language: 'en',
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  convertIdToName = (id) => {
    let item = this.state.provinceData.filter((item) => item.id === id);
    console.log(item[0]);
    return item[0]?.name;
  };

  //   fetch provience
  fetchProvience = () => {
    Axios({
      method: 'GET',
      url: 'api/province',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.setState({provinceData: response.data.data}, () => {});
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  //   fetch industry
  fetchIndustry = () => {
    Axios({
      method: 'GET',
      url: 'api/industry',
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.setState({industryData: response.data.data});
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  //   provience modal
  provienceModal = () => {
    const {provinceData} = this.state;
    return (
      <Modal
        visible={this.state.provienceModalOpen}
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
                height: 500,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              <View style={[style.linearGradientView2]}>
                <LinearGradient
                  colors={['#154A5900', '#154A59CC', '#154A59']}
                  style={style.linearGradient2}></LinearGradient>
              </View>
              <View style={[style.Modal_Categories_Container, {height: 600}]}>
                <View
                  style={{
                    paddingVertical: 10,
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 16,
                      fontWeight: '600',
                      color: '#272727',
                    }}>
                    Province
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      this.setState({
                        provienceModalOpen: false,
                        addressModalOpen: true,
                      })
                    }
                    style={{alignItems: 'flex-end'}}>
                    {/* <Image source={CrossSmall} /> */}
                    <Icon name="cross" type="Entypo" style={style.crossIcon} />
                  </TouchableOpacity>
                </View>
                <View style={{width: '100%', height: 500, paddingBottom: 120}}>
                  <ScrollView>
                    {provinceData &&
                      provinceData.map((item) => {
                        return (
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 15,
                              paddingVertical: 12,
                              borderBottomWidth: 0.4,
                              borderBottomColor: '#979797',
                            }}
                            onPress={() =>
                              this.setState({
                                province: item.id,
                                provinceId: item.id,
                                provienceModalOpen: false,
                                addressModalOpen: true,
                              })
                            }>
                            <Text style={{fontSize: 18, color: '#5E5E5E'}}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  addressModal = () => {
    const {
      userData,
      counter,
      errors,
      googleLocation,
      province,
      addressTwo,
      city,
      country,
      postalCode,
    } = this.state;
    return (
      // <Modal
      //   visible={this.state.addressModalOpen}
      //   transparent
      //   animationType="slide"
      //   supportedOrientations={['portrait', 'landscape']}>
      //   <KeyboardAvoidingView
      //     style={{flex: 1}}
      //     behavior={Platform.OS === 'ios' ? 'padding' : null}>
      //     <View style={{marginTop: 'auto'}}>
      //       <View
      //         style={{
      //           width: '100%',
      //           height: 650,
      //           position: 'absolute',
      //           bottom: 0,
      //           alignSelf: 'center',
      //         }}>
      //         <View style={[style.linearGradientView2, {height: 650}]}>
      //           <LinearGradient
      //             colors={['#154A5900', '#154A59CC', '#154A59']}
      //             style={style.linearGradient2}></LinearGradient>
      //         </View>
      //         <View style={[style.Modal_Categories_Container, {height: 650}]}>
      //           <View
      //             style={{
      //               alignItems: 'flex-end',
      //               width: '100%',
      //               paddingRight: 15,
      //             }}>
      //             <TouchableOpacity
      //               onPress={() =>
      //                 this.setState({
      //                   addressModalOpen: false,
      //                 })
      //               }>
      //               <Image source={CrossSmall} />
      //             </TouchableOpacity>
      //           </View>
      //           <Text
      //             style={{
      //               marginLeft: 16,
      //               fontSize: 18,
      //               fontWeight: '600',
      //               color: '#272727',
      //             }}>
      //             Change Address
      //           </Text>

      //           <View style={{marginHorizontal: 16}}>
      //             <ScrollView>
      //               <View style={style.fromcontrol}>
      //                 <Text style={style.gobleleble}>Business Address 1 *</Text>
      //                 <TouchableOpacity
      //                   style={{
      //                     height: 36,
      //                     backgroundColor: 'rgba(58, 177, 202, 0.1)',
      //                     padding: 10,
      //                     borderRadius: 4,
      //                     display: 'flex',
      //                     flexDirection: 'row',
      //                     justifyContent: 'space-between',
      //                     alignItems: 'center',
      //                   }}
      //                   onPress={() =>
      //                     this.setState({
      //                       locationModalOpen: true,
      //                       addressModalOpen: false,
      //                     })
      //                   }>
      //                   <Text
      //                     style={{
      //                       color:
      //                         googleLocation?.formatted_address ||
      //                         userData.address1
      //                           ? '#272727'
      //                           : '#969696',
      //                     }}
      //                     numberOfLines={1}>
      //                     {googleLocation?.formatted_address
      //                       ? googleLocation?.formatted_address
      //                       : userData.address1
      //                       ? userData.address1
      //                       : 'Enter your business street address'}
      //                   </Text>
      //                   <Image
      //                     source={ArrowDown}
      //                     style={{height: 15, width: 15}}
      //                   />
      //                 </TouchableOpacity>
      //                 {errors && errors.addressOne ? (
      //                   <Text style={{color: 'rgb(215, 47, 47)'}}>
      //                     {errors.addressOne}
      //                   </Text>
      //                 ) : null}
      //               </View>
      //               <View style={style.fromcontrol}>
      //                 <Text style={style.gobleleble}>Business Address 2</Text>
      //                 <TextInput
      //                   value={addressTwo}
      //                   style={[
      //                     style.input,
      //                     // {
      //                     //   borderWidth: errors?.email ? 1 : 0,
      //                     //   borderColor: errors?.email ? '#D72F2F' : '',
      //                     // },
      //                   ]}
      //                   placeholder="Enter apartment, suite, unit no. etc"
      //                   onChangeText={(value) =>
      //                     this.setState({addressTwo: value})
      //                   }
      //                 />
      //                 {/* {errors && errors.email ? (
      //             <Text style={{color: 'rgb(215, 47, 47)'}}>
      //               {errors.email}
      //             </Text>
      //           ) : null} */}
      //               </View>
      //               <View style={style.fromcontrol}>
      //                 <Text style={style.gobleleble}>City *</Text>
      //                 <TextInput
      //                   style={[
      //                     style.input,
      //                     {
      //                       borderWidth: errors?.city ? 1 : 0,
      //                       borderColor: errors?.city ? '#D72F2F' : '',
      //                     },
      //                   ]}
      //                   value={city}
      //                   placeholder="Select your city"
      //                   onChangeText={(value) => this.setState({city: value})}
      //                 />
      //                 {errors && errors.city ? (
      //                   <Text style={{color: 'rgb(215, 47, 47)'}}>
      //                     {errors.city}
      //                   </Text>
      //                 ) : null}
      //               </View>
      //               <View style={style.fromcontrol}>
      //                 <Text style={style.gobleleble}>Province *</Text>
      //                 <TouchableOpacity
      //                   style={{
      //                     height: 36,
      //                     backgroundColor: 'rgba(58, 177, 202, 0.1)',
      //                     padding: 10,
      //                     borderRadius: 4,
      //                     display: 'flex',
      //                     flexDirection: 'row',
      //                     justifyContent: 'space-between',
      //                     alignItems: 'center',
      //                   }}
      //                   onPress={() =>
      //                     this.setState({
      //                       provienceModalOpen: true,
      //                       addressModalOpen: false,
      //                     })
      //                   }>
      //                   <Text style={{color: province ? '#272727' : '#969696'}}>
      //                     {province ? province : 'Select your province'}
      //                   </Text>
      //                   <Image
      //                     source={ArrowDown}
      //                     style={{height: 15, width: 15}}
      //                   />
      //                 </TouchableOpacity>
      //                 {errors && errors.province ? (
      //                   <Text style={{color: 'rgb(215, 47, 47)'}}>
      //                     {errors.province}
      //                   </Text>
      //                 ) : null}
      //               </View>
      //               <View style={style.fromcontrol}>
      //                 <Text style={style.gobleleble}>Country *</Text>
      //                 <TextInput
      //                   style={[
      //                     style.input,
      //                     {
      //                       borderWidth: errors?.country ? 1 : 0,
      //                       borderColor: errors?.country ? '#D72F2F' : '',
      //                     },
      //                   ]}
      //                   value={country}
      //                   placeholder="Select your country"
      //                   onChangeText={(value) => this.setState({email: value})}
      //                 />
      //                 {errors && errors.country ? (
      //                   <Text style={{color: 'rgb(215, 47, 47)'}}>
      //                     {errors.country}
      //                   </Text>
      //                 ) : null}
      //               </View>
      //               <View style={style.fromcontrol}>
      //                 <Text style={style.gobleleble}>Postal Code *</Text>
      //                 <TextInput
      //                   value={postalCode}
      //                   style={[
      //                     style.input,
      //                     {
      //                       borderWidth: errors?.postalCode ? 1 : 0,
      //                       borderColor: errors?.postalCode ? '#D72F2F' : '',
      //                     },
      //                   ]}
      //                   placeholder="Enter your postal code"
      //                   onChangeText={(value) =>
      //                     this.setState({postalCode: value})
      //                   }
      //                 />
      //                 {errors && errors.postalCode ? (
      //                   <Text style={{color: 'rgb(215, 47, 47)'}}>
      //                     {errors.postalCode}
      //                   </Text>
      //                 ) : null}
      //               </View>
      //               <TouchableOpacity
      //                 style={{
      //                   paddingVertical: 12,
      //                   backgroundColor: '#002E6D',
      //                   alignItems: 'center',
      //                   marginTop: 24,
      //                   borderRadius: 4,
      //                 }}
      //                 onPress={() => this.handleUpdate()}>
      //                 <Text
      //                   style={{
      //                     fontSize: 14,
      //                     fontWeight: '400',
      //                     color: '#FFFFFF',
      //                   }}>
      //                   Update
      //                 </Text>
      //               </TouchableOpacity>
      //             </ScrollView>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      // New Modal

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.addressModalOpen}
        onRequestClose={() => this.setState({addressModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({addressModalOpen: false})}
          />
          <View style={[style.modalView, {height: verticalScale(550)}]}>
            <View style={style.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    addressModalOpen: false,
                  })
                }
              />
              <KeyboardAvoidingView style={{}}>
                <Text
                  style={{
                    // marginLeft: 16,
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#272727',
                  }}>
                  Change Address
                </Text>

                <ScrollView
                  contentContainerStyle={{paddingBottom: verticalScale(200)}}
                  showsVerticalScrollIndicator={false}
                  style={{marginBottom: verticalScale(150)}}>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>* Business Address 1</Text>
                    <TouchableOpacity
                      style={{
                        height: 36,
                        backgroundColor: 'rgba(58, 177, 202, 0.1)',
                        padding: 10,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.setState({
                          locationModalOpen: true,
                          addressModalOpen: false,
                        })
                      }>
                      <Text
                        style={{
                          color:
                            googleLocation?.formatted_address ||
                            userData.address1
                              ? '#272727'
                              : '#969696',
                          width: '80%',
                        }}
                        numberOfLines={1}>
                        {googleLocation?.formatted_address
                          ? googleLocation?.formatted_address
                          : userData.address1
                          ? userData.address1
                          : 'Enter your business street address'}
                      </Text>
                      <Image
                        source={ArrowDown}
                        style={{height: 15, width: 15}}
                      />
                    </TouchableOpacity>
                    {errors && errors.addressOne ? (
                      <Text style={{color: 'rgb(215, 47, 47)'}}>
                        {errors.addressOne}
                      </Text>
                    ) : null}
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Business Address 2</Text>
                    <TextInput
                      value={addressTwo}
                      style={[
                        style.input,
                        // {
                        //   borderWidth: errors?.email ? 1 : 0,
                        //   borderColor: errors?.email ? '#D72F2F' : '',
                        // },
                      ]}
                      placeholder="Enter apartment, suite, unit no. etc"
                      onChangeText={(value) =>
                        this.setState({addressTwo: value})
                      }
                    />
                    {/* {errors && errors.email ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.email}
                  </Text>
                ) : null} */}
                  </View>
                  <View
                    style={[
                      style.fromcontrol /*  {marginTop:verticalScale(90)} */,
                    ]}>
                    <Text style={style.gobleleble}>City *</Text>
                    <TextInput
                      style={[
                        style.input,
                        {
                          borderWidth: errors?.city ? 1 : 0,
                          borderColor: errors?.city ? '#D72F2F' : '',
                        },
                      ]}
                      value={city}
                      placeholder="Select your city"
                      onChangeText={(value) => this.setState({city: value})}
                    />
                    {errors && errors.city ? (
                      <Text style={{color: 'rgb(215, 47, 47)'}}>
                        {errors.city}
                      </Text>
                    ) : null}
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Province *</Text>
                    <TouchableOpacity
                      style={{
                        height: 36,
                        backgroundColor: 'rgba(58, 177, 202, 0.1)',
                        padding: 10,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.setState({
                          provienceModalOpen: true,
                          addressModalOpen: false,
                        })
                      }>
                      <Text style={{color: province ? '#272727' : '#969696'}}>
                        {province
                          ? this.convertIdToName(province)
                          : 'Select your province'}
                      </Text>
                      <Image
                        source={ArrowDown}
                        style={{height: 15, width: 15}}
                      />
                    </TouchableOpacity>
                    {errors && errors.province ? (
                      <Text style={{color: 'rgb(215, 47, 47)'}}>
                        {errors.province}
                      </Text>
                    ) : null}
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Country *</Text>
                    <TextInput
                      style={[
                        style.input,
                        {
                          borderWidth: errors?.country ? 1 : 0,
                          borderColor: errors?.country ? '#D72F2F' : '',
                        },
                      ]}
                      value={country}
                      placeholder="Select your country"
                      onChangeText={(value) => this.setState({country: value})}
                    />
                    {errors && errors.country ? (
                      <Text style={{color: 'rgb(215, 47, 47)'}}>
                        {errors.country}
                      </Text>
                    ) : null}
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Postal Code *</Text>
                    <TextInput
                      value={postalCode}
                      style={[
                        style.input,
                        {
                          borderWidth: errors?.postalCode ? 1 : 0,
                          borderColor: errors?.postalCode ? '#D72F2F' : '',
                        },
                      ]}
                      placeholder="Enter your postal code"
                      onChangeText={(value) =>
                        this.setState({postalCode: value})
                      }
                    />
                    {errors && errors.postalCode ? (
                      <Text style={{color: 'rgb(215, 47, 47)'}}>
                        {errors.postalCode}
                      </Text>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      backgroundColor: '#002E6D',
                      alignItems: 'center',
                      marginTop: 24,
                      borderRadius: 4,
                    }}
                    onPress={() => this.handleUpdate()}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#FFFFFF',
                      }}>
                      Update
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
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
    console.log('token', this.state.token);
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
        method: 'POST',
        url: 'api/sent-otp-for-change-email',
        headers: {
          Authorization: `${this.state.token}`,
        },
        data: postBody,
        withCredentials: true,
      })
        .then((response) => {
          console.log('response', response.data);
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
    const {email, otp, oldEmail} = this.state;
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
      formData.append('company_logo', data);
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
    console.log('Enter to image', fileData);

    this.onUpdate(fileData, 'image_update');
  };

  getUpdateData = (requestBody) => {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${this.state.token}`,
      },
    };
    console.log(requestBody);
    Axios.post('api/business-profile-update', requestBody, config)
      .then((res) => {
        console.log(res?.data);
        if (res.status === 201 && res.data.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: res.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          this.setState({addressModalOpen: false, nameModalOpen: false}, () => {
            this.refreshToken();
          });
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
        console.log('error');
        console.log(err.data);
      });
  };

  handleUpdate = () => {
    const {googleLocation, addressTwo, postalCode, city, country, province} =
      this.state;
    if (this.validateAddressForm()) {
      this.onUpdate({
        address1: googleLocation?.formatted_address,
        address2: addressTwo,
        city: city,
        country: country,
        province: province,
        postal_code: postalCode,
      });
    }
  };

  handleProfileUpdate = () => {
    const {phoneNumber, industry} = this.state;
    this.onUpdate({
      mobile: phoneNumber,
      industry: industry,
    });
  };

  handleUpdateName = () => {
    const {first_name, last_name} = this.state;
    if (this.validateName()) {
      this.onUpdate({
        first_name: first_name,
        last_name: last_name,
      });
    }
  };

  // formatted phone number
  formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  //   industry modal
  industryModal = () => {
    const {industryData} = this.state;
    return (
      <Modal
        visible={this.state.industryModalOpen}
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
                height: 500,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              <View style={[style.linearGradientView2]}>
                <LinearGradient
                  colors={['#154A5900', '#154A59CC', '#154A59']}
                  style={style.linearGradient2}></LinearGradient>
              </View>
              <View style={[style.Modal_Categories_Container, {height: 500}]}>
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    // width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Industry</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setState({industryModalOpen: false})}
                    style={{alignItems: 'flex-end'}}>
                    {/* <Image source={Cross} style={{width: 30, height: 30}} /> */}
                    <Icon name="cross" type="Entypo" style={style.crossIcon} />
                  </TouchableOpacity>
                </View>
                <View style={{width: '100%', height: 500}}>
                  <ScrollView contentContainerStyle={{paddingBottom: 130}}>
                    {industryData &&
                      industryData.map((item) => {
                        return (
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 15,
                              paddingVertical: 12,
                              borderBottomWidth: 0.4,
                              borderBottomColor: '#979797',
                            }}
                            onPress={() =>
                              this.setState({
                                industry: item.name,
                                industryId: item.id,
                                industryModalOpen: false,
                              })
                            }>
                            <Text style={{fontSize: 18, color: '#5E5E5E'}}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  nameModal = () => {
    const {errors} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.nameModalOpen}
        onRequestClose={() =>
          this.setState({
            nameModalOpen: true,
          })
        }>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() =>
              this.setState({
                nameModalOpen: false,
              })
            }
          />

          <View style={style.namemodalView}>
            <Icon
              name="cross"
              type="Entypo"
              style={[style.crossIcon, {padding: moderateScale(16)}]}
              onPress={() =>
                this.setState({
                  nameModalOpen: false,
                })
              }
            />
            <View
              style={{
                // backgroundColor:'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginTop:verticalScale(40),
                paddingHorizontal: moderateScale(16),
              }}>
              <View
                style={{
                  // backgroundColor:'green',
                  //  alignItems:'center',
                  width: '45%',
                }}>
                <Text style={style.gobleleble}>First name</Text>
                <TextInput
                  value={this.state.first_name}
                  placeholder="Enter your first name"
                  placeholderTextColor="#969696"
                  style={{
                    backgroundColor: 'rgba(58, 177, 202, 0.1)',
                    paddingStart: moderateScale(10),
                    height: verticalScale(40),
                  }}
                  onChangeText={(value) => {
                    this.setState({
                      first_name: value,
                    });
                  }}
                />
                {errors && errors.first_name ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.first_name}
                  </Text>
                ) : null}
              </View>

              <View
                style={{
                  // backgroundColor:'blue',
                  width: '45%',
                }}>
                <Text style={style.gobleleble}>Last name</Text>
                <TextInput
                  placeholder="Enter your Last name"
                  placeholderTextColor="#969696"
                  value={this.state.last_name}
                  style={{
                    backgroundColor: 'rgba(58, 177, 202, 0.1)',
                    height: verticalScale(40),
                    paddingStart: moderateScale(10),
                  }}
                  onChangeText={(value) => {
                    this.setState({
                      last_name: value,
                    });
                  }}
                />
                {errors && errors.last_name ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.last_name}
                  </Text>
                ) : null}
              </View>
            </View>
            <TouchableOpacity
              style={style.continueBtn}
              onPress={() => {
                this.handleUpdateName();
              }}>
              <Text style={style.continueTxt}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {userData, imageUri, phoneNumber, industry} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        {this.emailModal()}
        {this.otpModal()}
        {this.addressModal()}
        {this.locationModal()}
        {this.provienceModal()}
        {this.industryModal()}
        {this.nameModal()}
        <View style={style.dashboardHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={LeftWhite} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: '500',
              // marginLeft: 118,
            }}>
            Profile
          </Text>
          <Image style={{tintColor: 'transparent'}} source={LeftWhite} />
        </View>
        <ScrollView>
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
                  style={{position: 'absolute', bottom: 0, right: 150}}
                  onPress={() => this.launchImageLibrary()}>
                  <Image source={Camera} />
                </TouchableOpacity>
              </>
            ) : userData.company_logo ? (
              <>
                <Image
                  source={{
                    uri: 'http://78.46.210.25:4243' + userData.company_logo,
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
                  style={{position: 'absolute', bottom: 0, right: 150}}
                  onPress={() => this.launchImageLibrary()}>
                  <Image source={Camera} />
                </TouchableOpacity>
              </>
            ) : (
              <View>
                <Image source={JJ} />
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 0, right: 150}}
                  onPress={() => this.launchImageLibrary()}>
                  <Image source={Camera} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={style.bodyContainer}>
            <View style={style.fromcontrol}>
              <Text style={style.gobleleble}>Business Name</Text>
              <TextInput
                editable={false}
                value={userData.business_name}
                style={[
                  style.input,
                  {
                    backgroundColor: '#F1F1F1',
                  },
                ]}
                placeholder="Enter your business name"
                onChangeText={(value) => this.setState({postalCode: value})}
              />
            </View>
            <View style={style.fromcontrol}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={style.gobleleble}>Owner Name</Text>
                <TouchableOpacity
                  onPress={() => this.setState({nameModalOpen: true})}>
                  <Text
                    style={{fontSize: 12, color: '#13327C', fontWeight: '400'}}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                editable={false}
                value={
                  userData.first_name && userData.last_name
                    ? userData.first_name + ' ' + userData.last_name
                    : ''
                }
                style={[style.input]}
                placeholder="Enter your owner name"
                onChangeText={(value) => this.setState({postalCode: value})}
              />
            </View>

            <View style={style.fromcontrol}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={style.gobleleble}>Email</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      emailModalOpen: true,
                    })
                  }>
                  <Text
                    style={{fontSize: 12, color: '#13327C', fontWeight: '400'}}>
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
            <View style={style.fromcontrol}>
              <Text style={style.gobleleble}>Phone Number</Text>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  editable={false}
                  value={'+1'}
                  style={[
                    style.input,
                    {
                      width: '20%',
                      marginRight: 12,
                    },
                  ]}
                  placeholder="Enter your phone number"
                  onChangeText={(value) => this.setState({postalCode: value})}
                />
                <TextInput
                  value={phoneNumber}
                  style={[
                    style.input,
                    {
                      width: '76%',
                    },
                  ]}
                  placeholder="Enter your phone number"
                  onChangeText={(value) =>
                    this.setState({
                      phoneNumber: this.formatPhoneNumber(value),
                    })
                  }
                  maxLength={14}
                />
              </View>
            </View>
            <View style={style.fromcontrol}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={style.gobleleble}>Address</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      addressModalOpen: true,
                    })
                  }>
                  <Text
                    style={{fontSize: 12, color: '#13327C', fontWeight: '400'}}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    addressModalOpen: true,
                  })
                }>
                <TextInput
                  editable={false}
                  value={userData.address1}
                  style={[
                    style.input,
                    // {
                    //   borderWidth: errors?.postalCode ? 1 : 0,
                    //   borderColor: errors?.postalCode ? '#D72F2F' : '',
                    // },
                  ]}
                  placeholder="Enter your address"
                  onChangeText={(value) => this.setState({postalCode: value})}
                />
              </TouchableOpacity>
            </View>
            <View style={style.fromcontrol}>
              <Text style={style.gobleleble}>Industry *</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(58, 177, 202, 0.1)',
                  padding: 10,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => this.setState({industryModalOpen: true})}>
                <Text style={{color: industry ? '#272727' : '#969696'}}>
                  {industry ? industry : 'Select which industry you are in'}
                </Text>
                <Image source={ArrowDown} style={{height: 15, width: 15}} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity
            style={style.agreeBtn}
            onPress={() => this.handleProfileUpdate()}>
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
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    // paddingLeft: 20,
  },
  bodyContainer: {
    marginHorizontal: 15,
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
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  namemodalView: {
    backgroundColor: 'white',

    height: verticalScale(250),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(250),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bodyView: {
    // backgroundColor:'red',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16),
  },
  crossIcon: {
    alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(299),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  continueBtn: {
    backgroundColor: '#002E6D',
    width: '90%',
    height: verticalScale(48),
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(24),
    alignSelf: 'center',
  },
  continueTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
