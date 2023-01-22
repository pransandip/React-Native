import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import {verticalScale, moderateScale} from '../Constants/PixelRatio';
import {Icon} from 'native-base';
import Axios from '../api/Axios';
import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';
// import axios from 'axios';
import Eye from '../../assets/eye.png';
import CloseEye from '../../assets/eye2.png';
import Cross from '../../assets/Cross.png';
import CrossRed from '../../assets/crossred.png';
import ArrowDown from '../../assets/arrowDown.png';

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
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: {},
      fileUri: '',
      businessName: '',
      firstName: '',
      lastName: '',
      email: '',
      addressOne: '',
      addressTwo: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      phoneNumber: '',
      industry: '',
      password: '',
      confirmPassword: '',
      errors: {},
      locationModalOpen: false,
      provienceModalOpen: false,
      googleLocation: {},
      industryModalOpen: false,
      provinceData: [],
      industryData: [],
      provinceId: '',
      industryId: '',
      imageUri: '',
      errors: {},
      eye: true,
      eye2: true,
    };
  }

  componentDidMount() {
    this.fetchProvience();
    this.fetchIndustry();
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
    console.log('uri', images.assets[0]);
    this.setState({
      fileData: image,
      imageUri: images.assets[0].uri,
    });
  };

  //   location modal

  locationModal = () => {
    return (
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
              <KeyboardAvoidingView
              // style={{flex: 1}}
              // behavior={Platform.OS === 'ios' ? 'padding' : null}
              >
                {/* <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: moderateScale(16),
                    marginTop: verticalScale(15),
                  }}>
                  <Text
                    style={
                      {
                        // fontSize: 18,
                        // // marginLeft: 10,
                        // fontWeight: '600',
                        // color: '#272727',
                      }
                    }>
                    Search Location
                  </Text>
                  <Icon
                    name="cross"
                    type="Entypo"
                    style={style.crossIcon}
                    onPress={() =>
                      this.setState({
                        locationModalOpen: false,
                      })
                    }
                  />
                </View> */}
                <View style={style.topView}>
                  <Text style={style.locationTxt}>Location</Text>
                  <TouchableOpacity>
                    <Icon
                      onPress={() => this.setState({locationModalOpen: false})}
                      name="cross"
                      type="Entypo"
                      style={style.crossIcon}
                    />
                  </TouchableOpacity>
                </View>
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
                        borderBottomWidth: 1,
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
  // locationModal = () => {
  //   return (
  //     <Modal
  //       visible={this.state.locationModalOpen}
  //       transparent
  //       animationType="slide"
  //       supportedOrientations={['portrait', 'landscape']}>
  //       <KeyboardAvoidingView
  //         style={{flex: 1}}
  //         behavior={Platform.OS === 'ios' ? 'padding' : null}>
  //         <View style={{marginTop: 'auto'}}>
  //           <View
  //             style={{
  //               width: '100%',
  //               height: 500,
  //               position: 'absolute',
  //               bottom: 0,
  //               alignSelf: 'center',
  //             }}>
  //             <View style={[style.linearGradientView2]}>
  //               <LinearGradient
  //                 colors={['#154A5900', '#154A59CC', '#154A59']}
  //                 style={style.linearGradient2}></LinearGradient>
  //             </View>
  //             <View style={[style.Modal_Categories_Container, {height: 500}]}>
  //               <View
  //                 style={{
  //                   paddingVertical: 10,
  //                   width: '90%',
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                 }}>
  //                 <Text>Search Location</Text>
  //                 <TouchableOpacity
  //                   activeOpacity={0.7}
  //                   onPress={() => this.setState({locationModalOpen: false})}
  //                   style={{alignItems: 'flex-end'}}>
  //                   <Image source={Cross} style={{width: 30, height: 30}} />
  //                 </TouchableOpacity>
  //               </View>
  //               <View style={{width: '100%', height: 500}}>
  //                 <GooglePlacesAutocomplete
  //                   placeholder="Search for Location"
  //                   fetchDetails
  //                   onPress={(data, details = null) => {
  //                     let pin = '';
  //                     console.log('details', details);
  //                     for (
  //                       var i = 0;
  //                       i < details?.address_components.length;
  //                       i++
  //                     ) {
  //                       if (
  //                         details.address_components[i].types == 'postal_code'
  //                       ) {
  //                         this.setState({
  //                           postalCode: details.address_components[i].long_name,
  //                         });
  //                       }
  //                     }
  //                     this.setState({
  //                       googleLocation: details,
  //                       locationModalOpen: false,
  //                       city: details?.address_components?.[0]?.long_name,
  //                       country: details?.address_components?.[2]?.long_name,
  //                       addressOne: details?.formatted_address,
  //                     });
  //                   }}
  //                   // suppressDefaultStyles
  //                   styles={{
  //                     textInputContainer: {
  //                       color: '#1faadb',
  //                     },
  //                     description: {
  //                       fontSize: 14,
  //                     },
  //                     separator: {
  //                       backgroundColor: '#fff',
  //                     },
  //                     textInput: {
  //                       height: 38,
  //                       color: '#5d5d5d',
  //                       fontSize: 16,
  //                       borderBottomWidth: 0.5,
  //                     },
  //                     predefinedPlacesDescription: {
  //                       color: '#1faadb',
  //                     },
  //                   }}
  //                   query={{
  //                     key: 'AIzaSyBu1jwLt88S1pSZW5H5wdGnsLe_voBQK50',
  //                     language: 'en',
  //                   }}
  //                 />
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //       </KeyboardAvoidingView>
  //     </Modal>
  //   );
  // };

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
          this.setState({provinceData: response.data.data});
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
      // <Modal
      //   visible={this.state.provienceModalOpen}
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
      //         <View style={[style.Modal_Categories_Container, {height: 600}]}>
      //           <View
      //             style={{
      //               paddingVertical: 10,
      //               width: '90%',
      //               flexDirection: 'row',
      //               justifyContent: 'space-between',
      //             }}>
      //             <Text>Province</Text>
      //             <TouchableOpacity
      //               activeOpacity={0.7}
      //               onPress={() => this.setState({provienceModalOpen: false})}
      //               style={{alignItems: 'flex-end'}}>
      //               <Image source={Cross} style={{width: 30, height: 30}} />
      //             </TouchableOpacity>
      //           </View>
      //           <View style={{width: '100%', height: 500, paddingBottom: 120}}>
      //             <ScrollView>
      //               {provinceData &&
      //                 provinceData.map((item) => {
      //                   return (
      //                     <TouchableOpacity
      //                       style={{
      //                         paddingHorizontal: 15,
      //                         paddingVertical: 12,
      //                         borderBottomWidth: 0.4,
      //                         borderBottomColor: '#979797',
      //                       }}
      //                       onPress={() =>
      //                         this.setState({
      //                           province: item.name,
      //                           provinceId: item.id,
      //                           provienceModalOpen: false,
      //                         })
      //                       }>
      //                       <Text style={{fontSize: 18, color: '#5E5E5E'}}>
      //                         {item.name}
      //                       </Text>
      //                     </TouchableOpacity>
      //                   );
      //                 })}
      //             </ScrollView>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.provienceModalOpen}
        onRequestClose={() => this.setState({provienceModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({provienceModalOpen: false})}
          />
          <View style={[style.modalView, {height: verticalScale(550)}]}>
            <View style={style.bodyView}>
              <KeyboardAvoidingView>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15,
                    paddingTop: 12,
                  }}>
                  <Text>Province</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setState({provienceModalOpen: false})}
                    style={{alignItems: 'flex-end'}}>
                    <Icon
                      name="cross"
                      type="Entypo"
                      style={style.crossIcon}
                      onPress={() =>
                        this.setState({
                          provienceModalOpen: false,
                        })
                      }
                    />
                  </TouchableOpacity>
                </View> */}
                <View style={style.topView}>
                  <Text style={style.locationTxt}>Province</Text>
                  <TouchableOpacity>
                    <Icon
                      onPress={() => this.setState({provienceModalOpen: false})}
                      name="cross"
                      type="Entypo"
                      style={style.crossIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: 500}}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{paddingBottom: verticalScale(100)}}>
                    {provinceData &&
                      provinceData.map((item) => {
                        return (
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 15,
                              paddingVertical: 15,
                              //borderBottomWidth: 0.4,
                              // borderBottomColor: '#979797',

                              backgroundColor: '#fff',
                              borderColor: '#979797',
                              borderBottomWidth: 1,
                            }}
                            onPress={() =>
                              this.setState({
                                province: item.name,
                                provinceId: item.id,
                                provienceModalOpen: false,
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
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  //   industry modal
  industryModal = () => {
    const {industryData} = this.state;
    return (
      // <Modal
      //   visible={this.state.industryModalOpen}
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
      //             <Text>Industry</Text>
      //             <TouchableOpacity
      //               activeOpacity={0.7}
      //               onPress={() => this.setState({industryModalOpen: false})}
      //               style={{alignItems: 'flex-end'}}>
      //               <Image source={Cross} style={{width: 30, height: 30}} />
      //             </TouchableOpacity>
      //           </View>
      //           <View style={{width: '100%', height: 500}}>
      //             <ScrollView>
      //               {industryData &&
      //                 industryData.map((item) => {
      //                   return (
      //                     <TouchableOpacity
      //                       style={{
      //                         paddingHorizontal: 15,
      //                         paddingVertical: 12,
      //                         borderBottomWidth: 0.4,
      //                         borderBottomColor: '#979797',
      //                       }}
      //                       onPress={() =>
      //                         this.setState({
      //                           industry: item.name,
      //                           industryId: item.id,
      //                           industryModalOpen: false,
      //                         })
      //                       }>
      //                       <Text style={{fontSize: 18, color: '#5E5E5E'}}>
      //                         {item.name}
      //                       </Text>
      //                     </TouchableOpacity>
      //                   );
      //                 })}
      //             </ScrollView>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.industryModalOpen}
        onRequestClose={() => this.setState({industryModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({industryModalOpen: false})}
          />
          <View style={[style.modalView, {height: verticalScale(550)}]}>
            <View style={style.bodyView}>
              <KeyboardAvoidingView>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: moderateScale(15),
                    marginTop: verticalScale(15),
                  }}>
                  <Text>Industry</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setState({industryModalOpen: false})}
                    style={{alignItems: 'flex-end'}}>
                    <Icon
                      name="cross"
                      type="Entypo"
                      style={style.crossIcon}
                      onPress={() =>
                        this.setState({
                          industryModalOpen: false,
                        })
                      }
                    />
                  </TouchableOpacity>
                </View> */}

                <View style={style.topView}>
                  <Text style={style.locationTxt}>Industry</Text>
                  <TouchableOpacity>
                    <Icon
                      onPress={() => this.setState({industryModalOpen: false})}
                      name="cross"
                      type="Entypo"
                      style={style.crossIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: 500}}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{marginBottom: verticalScale(50)}}>
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
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // signup form validation
  validateForm = () => {
    const {
      fileUri,
      provinceId,
      businessName,
      firstName,
      lastName,
      email,
      googleLocation,
      addressOne,
      postalCode,
      phoneNumber,
      industry,
      password,
      imageUri,
      city,
      country,
      province,
      confirmPassword,
    } = this.state;
    let errors = {};
    let formIsValid = true;
    let emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*-]).{8,}$/;

    if (imageUri === '') {
      errors['image'] = 'Company logo is required';
      formIsValid = false;
    }
    if (businessName === '') {
      errors['businessName'] = 'Business Name is required';
      formIsValid = false;
    }
    if (firstName === '') {
      errors['firstName'] = 'First Name is required';
      formIsValid = false;
    }
    if (lastName === '') {
      errors['lastName'] = 'Last Name is required';
      formIsValid = false;
    }
    if (email === '' || !emailRegex.test(email)) {
      errors['email'] = 'Enter valid email address';
      formIsValid = false;
    }
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
    if (phoneNumber === '' || phoneNumber === null) {
      errors['phoneNumber'] = 'Enter a valid phone number';
      formIsValid = false;
    }
    if (industry === '') {
      errors['industry'] = 'Industry is required';
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
      this.setState({
        errors: {},
      });
    }, 5000);
    return formIsValid;
  };

  //   signup submit
  signupSubmit = () => {
    const {
      fileUri,
      provinceId,
      businessName,
      firstName,
      lastName,
      email,
      googleLocation,
      addressTwo,
      postalCode,
      phoneNumber,
      industry,
      password,
      imageUri,
      fileData,
      city,
      country,
    } = this.state;
    console.log('object1', fileData);
    if (this.validateForm()) {
      var bodyData = new FormData();
      bodyData.append('business_name', businessName);
      bodyData.append('first_name', firstName);
      bodyData.append('last_name', lastName);
      bodyData.append('email', email);
      bodyData.append('address1', googleLocation?.formatted_address);
      bodyData.append('address2', addressTwo);
      bodyData.append('city', city);
      bodyData.append('country', country);
      bodyData.append('postal_code', postalCode);
      bodyData.append('mobile', phoneNumber);
      bodyData.append('password', password);
      bodyData.append('role', 'business');
      bodyData.append('latitude', 45621564654);
      bodyData.append('longitude', 65656555326);
      bodyData.append('province', provinceId);
      bodyData.append('industry', industry);
      bodyData.append('company_logo', fileData);
      bodyData.append('owner_name', businessName);
      Axios({
        method: 'POST',
        url: 'api/signup',
        headers: {'Content-Type': 'multipart/form-data'},
        data: bodyData,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res?.data);
          if (res.data.ack === 1) {
            Snackbar.show({
              backgroundColor: '#74B711',
              text: res.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
            this.props.navigation.navigate('SignupEmailVerification', {
              email: email,
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

  setEye = () => {
    this.setState({eye: !this.state.eye});
  };

  onCrossClick = () => {
    this.setState({
      filepath: {
        data: '',
        uri: '',
      },
      fileData: {},
      fileUri: '',
      imageUri: '',
    });
  };

  render() {
    const {errors, googleLocation, province, industry} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.locationModal()}
        {this.provienceModal()}
        {this.industryModal()}
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" type="Ionicons" style={style.backIcon} />
          </TouchableOpacity>

          <Image source={Logo} />
          <Icon
            name="arrow-back"
            type="Ionicons"
            style={[style.backIcon, {color: 'transparent'}]}
          />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
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
                      width: '70%',
                    },
                  ]}>
                  Start filling shifts with WorkBriefly
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
                    <Text style={style.gobleleble}>Company Logo</Text>
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
                  {this.state.imageUri ? (
                    <TouchableOpacity
                      onPress={() => this.launchImageLibrary()}
                      style={{position: 'relative'}}>
                      <Image
                        source={{uri: this.state.imageUri}}
                        style={style.images}
                      />
                      <TouchableOpacity
                        style={{position: 'absolute', left: 120, top: 12}}
                        onPress={() => this.onCrossClick()}>
                        <Image source={CrossRed} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => this.launchImageLibrary()}>
                      <Image
                        source={require('../../assets/dummy.png')}
                        style={style.images}
                      />
                    </TouchableOpacity>
                  )}
                  {errors && errors.image ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.image}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Business Name</Text>
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
                        borderWidth: errors?.businessName ? 1 : 0,
                        borderColor: errors?.businessName ? '#D72F2F' : '',
                      },
                    ]}
                    placeholder="Enter the name of your business"
                    onChangeText={(value) =>
                      this.setState({businessName: value})
                    }
                  />
                  {errors && errors.businessName ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.businessName}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>First Name</Text>
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
                        borderWidth: errors?.firstName ? 1 : 0,
                        borderColor: errors?.firstName ? '#D72F2F' : '',
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
                    <Text style={style.gobleleble}>Last Name</Text>
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
                        borderWidth: errors?.lastName ? 1 : 0,
                        borderColor: errors?.lastName ? '#D72F2F' : '',
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
                        borderWidth: errors?.email ? 1 : 0,
                        borderColor: errors?.email ? '#D72F2F' : '',
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
                    <Text style={style.gobleleble}>Business Address 1 </Text>
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
                    onPress={() => this.setState({locationModalOpen: true})}>
                    <Text
                      style={{
                        color: googleLocation?.formatted_address
                          ? '#272727'
                          : '#969696',
                        width: '80%',
                      }}
                      numberOfLines={1}>
                      {googleLocation?.formatted_address
                        ? googleLocation?.formatted_address
                        : 'Enter your business street address'}
                    </Text>
                    <Image source={ArrowDown} style={{height: 15, width: 15}} />
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
                    style={[
                      style.input,
                      // {
                      //   borderWidth: errors?.email ? 1 : 0,
                      //   borderColor: errors?.email ? '#D72F2F' : '',
                      // },
                    ]}
                    placeholder="Enter apartment, suite, unit no. etc"
                    onChangeText={(value) => this.setState({addressTwo: value})}
                  />
                  {/* {errors && errors.email ? (
                  <Text style={{color: 'rgb(215, 47, 47)'}}>
                    {errors.email}
                  </Text>
                ) : null} */}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>City </Text>
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
                        borderWidth: errors?.city ? 1 : 0,
                        borderColor: errors?.city ? '#D72F2F' : '',
                      },
                    ]}
                    value={this.state.city}
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
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Province </Text>
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
                    onPress={() => this.setState({provienceModalOpen: true})}>
                    <Text style={{color: province ? '#272727' : '#969696'}}>
                      {province ? province : 'Select your province'}
                    </Text>
                    <Image source={ArrowDown} style={{height: 15, width: 15}} />
                  </TouchableOpacity>
                  {errors && errors.province ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.province}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Country </Text>
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
                        borderWidth: errors?.country ? 1 : 0,
                        borderColor: errors?.country ? '#D72F2F' : '',
                      },
                    ]}
                    value={this.state.country}
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
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Postal Code </Text>
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
                    value={this.state.postalCode}
                    style={[
                      style.input,
                      {
                        borderWidth: errors?.postalCode ? 1 : 0,
                        borderColor: errors?.postalCode ? '#D72F2F' : '',
                      },
                    ]}
                    placeholder="Enter your postal code"
                    onChangeText={(value) => this.setState({postalCode: value})}
                  />
                  {errors && errors.postalCode ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.postalCode}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>
                      Business Telephone Number
                    </Text>
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
                      width: '100%',
                      backgroundColor: 'rgba(58, 177, 202, 0.1)',
                      borderWidth: errors?.phoneNumber ? 1 : 0,
                      borderColor: errors?.phoneNumber ? '#D72F2F' : '',
                      borderRadius: 4,
                    }}>
                    <Text style={{paddingTop: 10, paddingLeft: 10}}>
                      +1{'  '}
                    </Text>
                    <TextInput
                      style={[
                        style.input,
                        {
                          width: '94%',
                          backgroundColor: '',
                        },
                      ]}
                      value={this.state.phoneNumber}
                      keyboardType="phone-pad"
                      placeholder="Enter business telephone number"
                      onChangeText={(value) =>
                        this.setState({
                          phoneNumber: this.formatPhoneNumber(value),
                        })
                      }
                      maxLength={14}
                    />
                  </View>
                  {errors && errors.phoneNumber ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.phoneNumber}
                    </Text>
                  ) : null}
                </View>
                <View style={style.fromcontrol}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={style.gobleleble}>Industry </Text>
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
                  {errors && errors.industry ? (
                    <Text style={{color: 'rgb(215, 47, 47)'}}>
                      {errors.industry}
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
                      secureTextEntry={this.state.eye2}
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
                  onPress={() => this.signupSubmit()}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      lineHeight: 16,
                      color: '#003862',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  backIcon: {
    color: '#272727',
  },
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
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
    width: '100%',
  },
  images: {
    width: 148,
    height: 148,
    borderRadius: 4,
  },
  Modal_Categories_Container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  linearGradientView2: {
    width: '100%',
    height: 400,
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
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
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
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(15),
  },
  locationTxt: {
    color: '#272727',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  crossIcon: {
    // alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
});
