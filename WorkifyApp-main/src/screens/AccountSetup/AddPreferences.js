import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';
import Snackbar from 'react-native-snackbar';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
// import axios from 'axios';
import Axios from '../../api/Axios';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import CrossSmall from '../../../assets/cross-small.png';
import CrossWhite from '../../../assets/crosswhite.png';
import ArrowDown from '../../../assets/arrowDown.png';
import DropArrow from '../../../assets/DropArrow.png';
import Dot from '../../../assets/dot.png';
import Info from '../../../assets/info.png';
import Left from '../../../assets/Left.png';

export default class AddPreferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route?.params?.userId,
      token: props.route?.params?.token,
      locationModalOpen: false,
      infoModalOpen: false,
      googleLocation: {},
      address: '',
      range: 20,
      industryData: [],
      industryModalOpen: false,
      industry: [],
      update: false,
      latitude: 22.58,
      longitude: 71.9,
      preferenceId: '',
      errors: {},
    };
  }

  componentDidMount() {
    this.fetchIndustry();
    this.getPrefarenceById();
  }

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
              {/* <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    locationModalOpen: false,
                  })
                }
              /> */}

              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                {/* <Text style={{fontWeight: 'bold'}}>Search Location</Text> */}
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.setState({locationModalOpen: false})}
                  style={{alignItems: 'flex-end'}}>
                  <Image
                    source={CrossSmall}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity> */}

                <View style={style.topView}>
                  <Text style={style.preferenceTxt}>Search Location</Text>
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
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 500,
                    marginTop: verticalScale(40),
                    // backgroundColor: 'red',
                  }}>
                  <GooglePlacesAutocomplete
                    query={{
                      key: 'AIzaSyBu1jwLt88S1pSZW5H5wdGnsLe_voBQK50',
                      language: 'en',
                    }}
                    onPress={(data, details = null) => {
                      let pin = '';
                      console.log('details', details);
                      for (
                        var i = 0;
                        i < details?.address_components.length;
                        i++
                      ) {
                        if (
                          details.address_components[i].types == 'postal_code'
                        ) {
                          this.setState({
                            postalCode: details.address_components[i].long_name,
                          });
                        }
                      }
                      this.setState({
                        googleLocation: details,
                        locationModalOpen: false,
                        city: details?.address_components?.[0]?.long_name,
                        country: details?.address_components?.[2]?.long_name,
                        address: details?.formatted_address,
                        latitude: details?.geometry?.location?.lat,
                        longitude: details?.geometry?.location?.lng,
                      });
                    }}
                    fetchDetails
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
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  addIndustry = (item) => {
    let industryItems = this.state.industry.concat(item);
    this.setState({
      industry: industryItems,
      industryModalOpen: false,
    });
  };

  //   industry modal
  industryModal = () => {
    const {industryData} = this.state;
    return (
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
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                {/* <Text style={{fontWeight: 'bold'}}>Search Industry</Text> */}
                <View style={style.topView}>
                  <Text style={style.preferenceTxt}>Search Industry</Text>
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
                </View>
                <ScrollView>
                  {industryData.length > 0 &&
                    industryData.map((item) => {
                      return (
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                            borderBottomWidth: 0.4,
                            borderBottomColor: '#979797',
                          }}
                          onPress={() => this.addIndustry(item)}>
                          <Text style={{fontSize: 18, color: '#5E5E5E'}}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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

  savePreference = () => {
    const {userId, address, range, industry, latitude, longitude} = this.state;
    let result = industry.map((a) => a.id);

    if (this.validateAddress()) {
      let postBody = {
        user_id: userId,
        address: address,
        latitude: latitude,
        longitude: longitude,
        radius: range,
        industry: result.toString(),
      };
      console.log(postBody);
      Axios({
        method: 'POST',
        url: 'api/preferences',
        data: postBody,
        headers: {
          Authorization: `${this.state.token}`,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201 && response.data.ack === 1) {
            Snackbar.show({
              backgroundColor: '#74B711',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
            this.props.navigation.navigate('PreferenceSuccess');
          } else {
            if (response.data.ack === 0) {
              Snackbar.show({
                backgroundColor: '#B22222',
                text: response.data.msg,
                duration: Snackbar.LENGTH_LONG,
              });
            }
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  removeIndustry = (item) => {
    console.log(item);
    const newTaskArray = this.state.industry.filter(
      (task) => task.id !== item.id,
    );

    this.setState({
      industry: newTaskArray,
    });
  };

  getPrefarenceById = () => {
    console.log(this.state.token);
    Axios({
      method: 'GET',
      url: 'api/users/preferences/' + this.state.userId,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log('response', response?.data?.data);
          this.setState({
            address: response?.data?.data.address,
            range: response?.data?.data?.radius,
            latitude: parseInt(response?.data?.data?.latitude),
            longitude: parseInt(response?.data?.data?.longitude),
            industry: response?.data?.data?.industry,
            preferenceId: response?.data?.data?.id,
            update: response?.data?.data?.address ? true : false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validateAddress = () => {
    const {address} = this.state;
    let errors = {};
    let formIsValid = true;
    if (address === '') {
      errors['address'] = 'Please enter a address';
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

  updatePreference = () => {
    const {
      userId,
      address,
      range,
      industry,
      latitude,
      longitude,
      preferenceId,
    } = this.state;
    console.log(preferenceId);
    let result = industry.map((a) => a.id);
    if (this.validateAddress()) {
      let postBody = {
        user_id: userId,
        address: address,
        latitude: latitude,
        longitude: longitude,
        radius: range,
        industry: result.toString(),
      };
      Axios({
        method: 'PUT',
        url: 'api/preferences/' + preferenceId,
        data: postBody,
        headers: {
          Authorization: `${this.state.token}`,
        },
        withCredentials: true,
      })
        .then((response) => {
          console.log(response.data);
          if (response.status === 201 && response.data.ack === 1) {
            Snackbar.show({
              backgroundColor: '#74B711',
              text: response.data.msg,
              duration: Snackbar.LENGTH_LONG,
            });
            this.props.navigation.navigate('PreferenceSuccess');
          } else {
            if (response.data.ack === 0) {
              Snackbar.show({
                backgroundColor: '#B22222',
                text: response.data.msg,
                duration: Snackbar.LENGTH_LONG,
              });
            }
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  infoModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.infoModalOpen}
        onRequestClose={() => this.setState({infoModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({infoModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>
                  {' '}
                  Why enter your preferences?
                </Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      infoModalOpen: false,
                    })
                  }
                />
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Entering a home location and a preferred working radius helps
                  us identify and show you more gigs that are within your area.
                </Text>
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Here's aslo where you can input your preferences because you
                  may have experience in one industry but might just want to try
                  something new.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {industry, address, update, latitude, longitude, errors} = this.state;
    console.log(address);
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.locationModal()}
        {this.industryModal()}
        {this.infoModal()}
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} style={{marginLeft: '35%'}} />
        </View>
        <ScrollView>
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
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    lineHeight: 23,
                    color: '#323232',
                    marginTop: 24,
                  }}>
                  Preferences{' '}
                </Text>
                <TouchableOpacity
                  style={{marginTop: 28}}
                  onPress={() => {
                    this.setState({
                      infoModalOpen: true,
                    });
                  }}>
                  <Image source={Info} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[style.cardView]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#393939',
                  marginBottom: 15,
                }}>
                Set Home Address
              </Text>
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
                  marginBottom: errors?.address ? 5 : 20,
                }}
                onPress={() => this.setState({locationModalOpen: true})}>
                <Text
                  style={{
                    color: address ? '#272727' : '#969696',
                  }}
                  numberOfLines={1}>
                  {address ? address : 'Enter your business street address'}
                </Text>
                <Image source={DropArrow} />
              </TouchableOpacity>
              {errors && errors.address ? (
                <Text style={{color: 'rgb(215, 47, 47)'}}>
                  {errors.address}
                </Text>
              ) : null}
              <View>
                <View style={style.mapcontainer}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={style.map}
                    zoomEnabled={true}
                    region={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    showUserLocation={true}>
                    <Marker
                      coordinate={{latitude: latitude, longitude: longitude}}
                    />
                  </MapView>
                </View>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  color: '#393939',
                  marginVertical: 15,
                }}>
                Set Radius (km)
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Slider
                  style={{width: '100%', height: 40}}
                  thumbImage={Dot}
                  minimumValue={0}
                  maximumValue={300}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#002E6D"
                  value={this.state.range}
                  onValueChange={(value) => {
                    this.setState({
                      range: value,
                    });
                  }}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>0 km</Text>
                <Text>{this.state.range} km</Text>
                <Text>300+</Text>
              </View>
              <Text style={[style.gobleleble, {marginVertical: 15}]}>
                Industry *
              </Text>
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
                <Text style={{color: '#969696'}}>
                  {'Select which industry you are in'}
                </Text>
                <Image source={DropArrow} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  width: '100%',
                  flexWrap: 'wrap',
                }}>
                {industry &&
                  industry.map((data) => {
                    return (
                      <View
                        style={{
                          backgroundColor: '#002E6D',
                          borderRadius: 4,
                          paddingVertical: 10,
                          alignItems: 'center',
                          marginRight: 5,
                          justifyContent: 'center',
                          marginVertical: 3,
                          paddingHorizontal: 25,
                        }}>
                        <Text style={{color: '#FFFFFF'}}>{data.name}</Text>
                        <TouchableOpacity
                          style={{position: 'absolute', right: 5}}
                          onPress={() => this.removeIndustry(data)}>
                          <Image source={CrossWhite} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </ScrollView>
        {update ? (
          <TouchableOpacity
            style={{
              marginHorizontal: 36,
              alignItems: 'center',
              paddingVertical: 12,
              backgroundColor: '#FFCC41',
              borderRadius: 4,
              marginVertical: 15,
            }}
            onPress={() => this.updatePreference()}>
            <Text style={{color: '#003862', fontSize: 14, fontWeight: 'bold'}}>
              Save & Finish
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              marginHorizontal: 36,
              alignItems: 'center',
              paddingVertical: 12,
              backgroundColor: '#FFCC41',
              borderRadius: 4,
              marginVertical: 15,
            }}
            onPress={() => this.savePreference()}>
            <Text style={{color: '#003862', fontSize: 14, fontWeight: 'bold'}}>
              Save & Finish
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  mapcontainer: {
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
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
    paddingVertical: verticalScale(18),
    paddingHorizontal: moderateScale(16),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(15),
  },
  crossIcon: {
    alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
  preferenceTxt: {
    color: '#272727',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    paddingLeft: moderateScale(10),
  },
  descriptionView: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
    // alignItems: 'center',
  },
  dotIcon: {
    color: '#414141',
  },
  descTxt: {
    color: '#5E5E5E',
  },
});
