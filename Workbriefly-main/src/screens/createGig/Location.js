import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Icon, CheckBox} from 'native-base';
// import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Axios from '../../api/Axios';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
const {height, width} = Dimensions.get('window');
var location = [{label: 'Headquarters', value: 0}];
var location2 = [{label: 'Site 1', value: 0}];

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payFrequency: '',
      userData: {},
      token: '',
      checkToggle: [],
      options: [
        {name: 'Free parking nearby'},
        {name: 'Paid parking nearby'},
        {name: 'No parking nearby'},
        {name: 'Transit options nearby'},
        {name: 'Transit options a short walk away'},
        {name: 'No transit options nearby'},
      ],
      provinceModal: false,
      addressModalOpen: false,
      locationModal: false,
      locationName: '',
      provience: {},
      provienceData: [],
      businessAddressOne: '',
      businessAddressTwo: '',
      latitude: '',
      longitude: '',
      addressList: [],
      error: {},
      selectedLatitude: 22.58,
      selectedLongitude: 71.9,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
      });
    });
    AsyncStorage.getItem('token').then((value) => {
      this.setState(
        {
          token: value,
        },
        () => {
          this.fetchProvience();
          this.getAddressList();
        },
      );
    });
    console.log('transit', this.props.values?.transit);
  }

  locationOff = () => {
    this.setState({
      provinceModal: true,
      locationModal: false,
    });
  };

  addressModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.addressModalOpen}
        onRequestClose={() => {
          this.setState({
            addressModalOpen: false,
            locationModal: true,
          });
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => {
              this.setState({
                addressModalOpen: false,
                locationModal: true,
              });
            }}
          />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.AddLocationTxt}>Add Address</Text>
              <TouchableOpacity>
                <Icon
                  onPress={() => {
                    this.setState({
                      addressModalOpen: false,
                      locationModal: true,
                    });
                  }}
                  name="cross"
                  type="Entypo"
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bodyView}>
              <View
                style={{
                  width: '100%',
                  height: 500,
                  // marginTop: verticalScale(15),
                }}>
                <GooglePlacesAutocomplete
                  placeholder="Search for Location"
                  fetchDetails
                  keepResultsAfterBlur={true}
                  onPress={(data, details = null) => {
                    this.setState({
                      businessAddressOne: details?.formatted_address,
                      latitude: details?.geometry?.location?.lat,
                      longitude: details?.geometry?.location?.lng,
                      addressModalOpen: false,
                      locationModal: true,
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
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  isObjectEmpty(object) {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  }

  validateLocationForm = () => {
    const {locationName, provience, businessAddressOne} = this.state;
    let errors = {};
    let formIsValid = true;
    if (locationName === '') {
      errors['locationName'] = 'Please enter location name';
      formIsValid = false;
    }
    if (this.isObjectEmpty(provience)) {
      errors['provience'] = 'Please enter provience name';
      formIsValid = false;
    }
    if (businessAddressOne === '') {
      errors['businessAddressOne'] = 'Please enter business address';
      formIsValid = false;
    }
    this.setState({
      error: errors,
    });
    setTimeout(() => {
      this.setState({
        error: {},
      });
    }, 2000);
    return formIsValid;
  };

  fetchProvience = () => {
    Axios({
      method: 'GET',
      url: 'api/province',
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.setState({
            provienceData: response?.data?.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  provienceModalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.provinceModal}
        onRequestClose={() => {
          this.setState({
            provinceModal: false,
            locationModal: true,
          });
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() =>
              this.setState({
                provinceModal: false,
                locationModal: true,
              })
            }
          />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.AddLocationTxt}>Add Province</Text>
              <TouchableOpacity>
                <Icon
                  onPress={() =>
                    this.setState({
                      provinceModal: false,
                      locationModal: true,
                    })
                  }
                  name="cross"
                  type="Entypo"
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 15}}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{
                  height: Platform.OS === 'android' ? '98%' : '85%',
                  width: '100%',
                  marginTop: 6,
                }}
                // initialNumToRender={10}
                removeClippedSubviews={true}
                data={this.state.provienceData}
                keyExtractor={(item) => item.companyName}
                renderItem={({item, index}) => (
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
                    onPress={() => {
                      this.setState({
                        provience: item,
                        provinceModal: false,
                        locationModal: true,
                      });
                    }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  addAddressList = () => {
    if (this.validateLocationForm()) {
      const {
        locationName,
        provience,
        businessAddressOne,
        businessAddressTwo,
        longitude,
        latitude,
      } = this.state;
      let postData = {
        location_name: locationName,
        province: provience.id,
        address1: businessAddressOne,
        address2: businessAddressTwo,
        latitude: latitude,
        longitude: longitude,
      };

      Axios({
        method: 'POST',
        url: 'api/location',
        data: postData,
        headers: {
          Authorization: `${this.state.token}`,
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response?.data?.ack === 1) {
            this.setState(
              {
                locationModal: false,
              },
              () => {
                this.getAddressList();
              },
            );
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  getAddressList = () => {
    Axios({
      method: 'GET',
      url: 'api/users/location/' + this.state.userData?.id,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          let data = response?.data?.data;
          data.forEach((element) => {
            element.label = element.address1;
            element.value = element.address1;
          });
          this.setState({
            addressList: data,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  deleteAddress = (id) => {
    Axios({
      method: 'DELETE',
      url: 'api/location/' + id,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.getAddressList();
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  disableCheck = () => {
    let disable = false;
    if (this.props.values?.location_id === '') {
      disable = true;
    }
    return disable;
  };

  render() {
    const {error} = this.state;
    return (
      <SafeAreaView style={styles.root}>
        {this.addressModal()}
        {this.provienceModalView()}
        {/* <ScrollView> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            <View style={styles.bodyView}>
              <Text style={styles.stepNoTxt}>STEP 3 OF 6</Text>
              <Text style={styles.stepDescTxt}>Location</Text>
              <View style={styles.descView}>
                <Text style={styles.fillTxt}>
                  Please provide location and transit details so that workers
                  know where to report for the gig and are aware of the transit
                  options available.
                </Text>

                {this.state.addressList?.length > 0 &&
                  this.state.addressList.map((data) => {
                    return (
                      <View style={styles.radioView}>
                        <View style={styles.dailyWeekly}>
                          <RadioForm
                            formHorizontal={true}
                            buttonColor={'#979797'}
                            initial={0}>
                            <RadioButton labelHorizontal={true} key={data?.id}>
                              <RadioButtonInput
                                obj={data}
                                index={data?.id}
                                isSelected={
                                  this.props.values?.location_id === data?.id
                                }
                                onPress={(val) => {
                                  this.props.handleFormData(
                                    'location_id',
                                    data.id,
                                  );
                                  this.setState(
                                    {
                                      payFrequency: val,
                                      selectedLatitude: parseFloat(
                                        data?.latitude,
                                      ),
                                      selectedLongitude: parseFloat(
                                        data?.longitude,
                                      ),
                                    },
                                    () => {},
                                  );
                                }}
                                borderWidth={1}
                                buttonInnerColor={'#002E68'}
                                buttonOuterColor={
                                  this.props.values?.location_id === data?.id
                                    ? '#002E68'
                                    : '#002E68'
                                }
                                buttonSize={8}
                                buttonOuterSize={16}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}
                              />
                              <RadioButtonLabel
                                obj={data}
                                index={data?.id}
                                labelHorizontal={true}
                                onPress={(val) => {
                                  this.props.handleFormData(
                                    'location_id',
                                    data.id,
                                  );
                                  this.setState({
                                    payFrequency: val,
                                    selectedLatitude: parseFloat(
                                      data?.latitude,
                                    ),
                                    selectedLongitude: parseFloat(
                                      data?.longitude,
                                    ),
                                  });
                                }}
                                labelStyle={{
                                  fontSize: 16,
                                  color: '#393939',
                                  marginRight: 40,
                                  fontWeight: 'bold',
                                  width: '76%',
                                }}
                                labelWrapStyle={{}}
                              />
                            </RadioButton>
                          </RadioForm>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            this.deleteAddress(data?.id);
                          }}>
                          <Image
                            source={require('../../../assets/delete.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}

                <TouchableOpacity
                  onPress={() => {
                    this.setState(
                      {
                        locationModal: true,
                      },
                      () => {
                        this.fetchProvience();
                      },
                    );
                  }}
                  style={styles.addExperienceBtn}>
                  <Icon name="plus" type="Entypo" style={styles.plusIcon} />
                  <Text style={styles.experienceTxt}>Add New Address</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: '#E3E3E3',
                    borderBottomWidth: 1,
                    marginVertical: verticalScale(24),
                  }}
                />
                <View style={styles.mapcontainer}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    zoomEnabled={true}
                    region={{
                      latitude: this.state.selectedLatitude,
                      longitude: this.state.selectedLongitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    showUserLocation={true}>
                    <Marker
                      coordinate={{
                        latitude: this.state.selectedLatitude,
                        longitude: this.state.selectedLongitude,
                      }}
                    />
                  </MapView>
                </View>

                {/* <Image source={require('../../../assets/map.png')} /> */}
                <Text style={styles.travelTxt}>Travel Options</Text>
                <View style={styles.optionsView}>
                  {this.state.options.map((item, index) => {
                    return (
                      <View
                        style={{
                          //   backgroundColor: 'red',
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <CheckBox
                          color={
                            this.props.values?.transit?.includes(item.name) ===
                            true
                              ? '#002E6D'
                              : '#393939'
                          }
                          checked={
                            this.props.values?.transit?.includes(item.name) ===
                            true
                              ? true
                              : false
                          }
                          onPress={() => {
                            if (
                              this.props.values?.transit.includes(item.name) ===
                              true
                            ) {
                              let arr = this.props.values?.transit;
                              for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === item.name) {
                                  arr.splice(i, 1);
                                }
                              }
                              this.setState(
                                {
                                  checkToggle: arr,
                                },
                                () => {
                                  this.props.handleFormData(
                                    'transit',
                                    this.state.checkToggle,
                                  );
                                },
                              );
                            } else if (
                              (item.name === 'Free parking nearby' ||
                                item.name === 'Paid parking nearby') &&
                              this.props.values?.transit.includes(
                                'No parking nearby',
                              )
                            ) {
                              let arr = this.props.values?.transit;
                              let newarr = arr.filter(
                                (x) =>
                                  x !== 'Free parking nearby' &&
                                  x !== 'Paid parking nearby',
                              );
                              this.setState(
                                {
                                  checkToggle: newarr,
                                },
                                () => {
                                  console.log(this.state.checkToggle);
                                  this.props.handleFormData(
                                    'transit',
                                    this.state.checkToggle,
                                  );
                                },
                              );
                            } else if (
                              item.name === 'No parking nearby' &&
                              this.props.values?.transit.includes(
                                'Free parking nearby',
                                'Paid parking nearby',
                              )
                            ) {
                              let arr = this.props.values?.transit;
                              let newarr = arr.filter(
                                (x) => x !== 'No parking nearby',
                              );
                              this.setState(
                                {
                                  checkToggle: newarr,
                                },
                                () => {
                                  console.log(this.state.checkToggle);
                                  this.props.handleFormData(
                                    'transit',
                                    this.state.checkToggle,
                                  );
                                },
                              );
                            } else if (
                              item.name === 'No transit options nearby' &&
                              this.props.values?.transit.includes(
                                'Transit options nearby',
                                'Transit options a short walk away',
                              )
                            ) {
                              let arr = this.props.values?.transit;
                              let newarr = arr.filter(
                                (x) => x !== 'No transit options nearby',
                              );
                              this.setState(
                                {
                                  checkToggle: newarr,
                                },
                                () => {
                                  console.log(this.state.checkToggle);
                                  this.props.handleFormData(
                                    'transit',
                                    this.state.checkToggle,
                                  );
                                },
                              );
                            } else if (
                              (item.name === 'Transit options nearby' ||
                                item.name ===
                                  'Transit options a short walk away') &&
                              this.props.values?.transit.includes(
                                'No transit options nearby',
                              )
                            ) {
                              let arr = this.props.values?.transit;
                              let newarr = arr.filter(
                                (x) =>
                                  x !== 'Transit options nearby' &&
                                  x !== 'Transit options a short walk away',
                              );
                              this.setState(
                                {
                                  checkToggle: newarr,
                                },
                                () => {
                                  console.log(this.state.checkToggle);
                                  this.props.handleFormData(
                                    'transit',
                                    this.state.checkToggle,
                                  );
                                },
                              );
                            } else {
                              this.setState(
                                {
                                  checkToggle: this.state.checkToggle.concat(
                                    item.name,
                                  ),
                                },
                                () => {
                                  this.props.handleFormData(
                                    'transit',
                                    this.state.checkToggle,
                                  );
                                },
                              );
                            }
                          }}
                        />

                        <Text style={styles.nameTxt}>{item.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={[styles.continueBtnView]}>
          {this.props.step !== 1 && (
            <TouchableOpacity
              onPress={() => {
                this.props.prevStep();
              }}
              style={{
                backgroundColor: '#002E6D',
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: verticalScale(12),
                borderRadius: moderateScale(4),
              }}>
              <Text
                style={{
                  color: 'white',
                }}>
                Back
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={this.disableCheck() === true ? true : false}
            style={
              this.disableCheck() === true
                ? [
                    styles.continueBtn,
                    {
                      backgroundColor: '#F0E9D7',
                      width: this.props.step === 1 ? '100%' : '45%',
                    },
                  ]
                : [
                    styles.continueBtn,
                    {
                      width: this.props.step === 1 ? '100%' : '45%',
                    },
                  ]
            }
            onPress={() =>
              this.props.step === 8
                ? this.props.createGig()
                : this.props.nextStep()
            }>
            <Text style={styles.continueTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.locationModal}
          onRequestClose={() => {
            this.setState({
              locationModal: false,
            });
          }}>
          <View style={styles.centeredView}>
            <Pressable
              style={{flex: 1}}
              onPress={() =>
                this.setState({
                  locationModal: false,
                })
              }
            />

            <View style={styles.modalView}>
              <View style={styles.topView}>
                <Text style={styles.AddLocationTxt}>Add Location</Text>
                <TouchableOpacity>
                  <Icon
                    onPress={() =>
                      this.setState({
                        locationModal: false,
                      })
                    }
                    name="cross"
                    type="Entypo"
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
              </View>
              <KeyboardAvoidingView>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{marginBottom: verticalScale(35)}}>
                  <Text style={styles.cover}>Location Name</Text>
                  <TextInput
                    value={this.state.locationName}
                    placeholder="Please enter your location nickname"
                    placeholderTextColor="#969696"
                    style={styles.input}
                    onChangeText={(value) =>
                      this.setState({
                        locationName: value,
                      })
                    }
                  />
                  {error?.locationName && (
                    <Text style={{color: 'red', marginTop: 5}}>
                      {error.locationName}
                    </Text>
                  )}
                  <Text style={styles.cover}>Province</Text>
                  <Pressable
                    onPress={this.locationOff}
                    style={styles.startEndView}>
                    <Text style={styles.timeTxt}>
                      {this.state.provience?.name
                        ? this.state.provience.name
                        : 'Select a province'}
                    </Text>
                    <Icon
                      name="caretdown"
                      type="AntDesign"
                      style={styles.angleIcon}
                    />
                  </Pressable>
                  {error?.provience && (
                    <Text style={{color: 'red', marginTop: 5}}>
                      {error.provience}
                    </Text>
                  )}
                  <Text style={styles.cover}>Business Address 1</Text>
                  <Pressable
                    onPress={() => {
                      this.setState({
                        locationModal: false,
                        addressModalOpen: true,
                      });
                    }}
                    style={styles.startEndView}>
                    <Text style={styles.timeTxt}>
                      {this.state.businessAddressOne
                        ? this.state.businessAddressOne
                        : 'Enter your business street address'}
                    </Text>
                    <Icon
                      name="caretdown"
                      type="AntDesign"
                      style={styles.angleIcon}
                    />
                  </Pressable>
                  {error?.businessAddressOne && (
                    <Text style={{color: 'red', marginTop: 5}}>
                      {error.businessAddressOne}
                    </Text>
                  )}
                  {/* <TextInput
              placeholder="Enter your business street address"
              placeholderTextColor="#969696"
              style={styles.input}
            /> */}
                  <Text style={styles.cover}>Business Address 2</Text>
                  <TextInput
                    value={this.state.businessAddressTwo}
                    placeholder="Enter your apartment, suite, unit number etc"
                    placeholderTextColor="#969696"
                    style={styles.input}
                    onChangeText={(value) =>
                      this.setState({
                        businessAddressTwo: value,
                      })
                    }
                  />
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                      this.addAddressList();
                    }}>
                    <Text style={styles.addTxt}>Add</Text>
                  </TouchableOpacity>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
    // marginBottom: verticalScale(250),
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(20),
    // marginBottom: 100,
  },
  stepNoTxt: {
    color: '#8A8A8A',
  },
  stepDescTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(32),
  },
  descView: {
    borderWidth: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(20),
    borderColor: '#979797',
    marginTop: verticalScale(20),
  },
  fillTxt: {
    color: '#545454',
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dailyWeekly: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: verticalScale(10),
  },
  addressTxt: {
    color: '#545454',
    fontSize: moderateScale(10),
    paddingStart: moderateScale(30),
  },
  addExperienceBtn: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(24),
    // marginBottom: verticalScale(50),
    borderColor: '#002E6D',
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(4),
  },
  plusIcon: {
    color: '#002E6D',
    fontSize: moderateScale(13),
  },
  experienceTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  travelTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginTop: verticalScale(24),
  },
  nameTxt: {
    paddingStart: moderateScale(20),
    color: '#545454',
  },
  optionsView: {
    marginBottom: verticalScale(48),
  },
  btnView: {
    backgroundColor: 'green',
    // height: 80,
    // width: '100%',
  },
  continueBtn: {
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  continueTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(16),
    height: verticalScale(499),
    borderTopLeftRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(28),
  },
  crossIcon: {
    color: '#5E5E5E',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddLocationTxt: {
    color: '#272727',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  cover: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(24),
  },
  input: {
    backgroundColor: '#EBF7F9',
    height: verticalScale(40),
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(4),
  },
  startEndView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EBF7F9',
    height: moderateScale(40),
    paddingHorizontal: moderateScale(14),
    marginTop: verticalScale(4),
  },
  timeTxt: {
    color: '#969696',
  },
  angleIcon: {
    fontSize: moderateScale(12),
  },
  addBtn: {
    backgroundColor: '#002E6D',
    marginVertical: verticalScale(24),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    borderRadius: moderateScale(4),
    // marginBottom:verticalScale(30),
  },
  addTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapcontainer: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
  },
  continueTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
});
