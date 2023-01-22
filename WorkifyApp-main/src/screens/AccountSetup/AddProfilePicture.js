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
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import jwt from 'jwt-decode';
// import axios from 'axios';
import Axios from '../../api/Axios';
import Snackbar from 'react-native-snackbar';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import DemoUser from '../../../assets/demouser.png';
import Info from '../../../assets/info.png';
import Left from '../../../assets/Left.png';
import AsyncStorage from '@react-native-community/async-storage';
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
export default class AddProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route?.params?.userId,
      token: props.route?.params?.token,
      filepath: {
        data: '',
        uri: '',
      },
      fileData: {},
      fileUri: '',
      imageUri: '',
      user: {},
      profileInfoModalOpen: false,
    };
  }

  launchImageLibrary = async () => {
    const images = await ImagePicker.launchImageLibrary(options);
    let image = {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    };
    console.log('uri', image);
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

  componentDidMount() {
    this.refreshToken();
    const user = jwt(this.state.token);
    console.log('user', user);
    this.setState({
      user: user,
    });
  }

  getFormData = (object, data, type) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    if (type === 'image_update') {
      formData.append('profile_picture', data);
    }
    return formData;
  };

  onUpdate = (data, type) => {
    const {user} = this.state;
    let updatedObj = {};
    if (type === 'image_update') {
      updatedObj = {...user};
    } else {
      updatedObj = {...user, ...data};
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

  getUpdateData = (requestBody) => {
    console.log('enter', requestBody);
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
        console.log('error');
        console.log(err);
      });
  };

  removeImage = () => {
    const {fileData} = this.state;
    this.onUpdate(null, 'image_update');
  };

  refreshToken = () => {
    let configData = {
      headers: {
        Authorization: `${this.state.token}`,
      },
    };
    Axios.get('api/refresh_token', configData)
      .then((res) => {
        console.log(res.data);
        const user = jwt(res.data.data);
        console.log('user ho', user);
        this.setState({
          user: user,
        });
      })
      .catch((error) => console.log(error));
  };

  profileInfoModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.profileInfoModalOpen}
        onRequestClose={() => this.setState({profileInfoModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({profileInfoModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() => this.setState({profileInfoModalOpen: false})}
              />
              <Text style={style.preferenceTxt}>
                Why we need you to upload a profile picture?
              </Text>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This will help the businesses identify who you are when you
                  report for jobs and helps keep our WorkBriefly community safe.
                  Hence, the image you upload is expected to match your photo on
                  your ID.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Note: Keep it professional, something like your linkedin
                  profile picture would work well.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Here's are examples of what to do and what not to do:
                </Text>
              </View>
              <View style={style.imgView}>
                <View>
                  <Image source={require('../../../assets/face.png')} />
                  <View style={style.bottomView}>
                    <Icon
                      name="checkcircle"
                      type="AntDesign"
                      style={{color: '#74B711', fontSize: moderateScale(18)}}
                    />
                    <Text style={style.doDonttxt}>Do this</Text>
                  </View>
                </View>
                <View>
                  <Image source={require('../../../assets/mask.png')} />
                  <View style={style.bottomView}>
                    <Icon
                      name="circle-with-cross"
                      type="Entypo"
                      style={{color: '#D72F2F', fontSize: moderateScale(22)}}
                    />
                    <Text style={style.doDonttxt}>Don’t do this</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.profileInfoModal()}
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
                  Profile Picture{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      profileInfoModalOpen: true,
                    });
                  }}
                  style={{marginTop: 28}}>
                  <Image source={Info} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[style.cardView]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#808080',
                }}>
                Please upload a profile picture of yourself ensuring that your
                face is clear and identifiable (oh and it wouldn’t hurt to
                smile).{' '}
              </Text>
              <View style={{alignItems: 'center'}}>
                {this.state.user?.profile_picture ? (
                  <Image
                    source={{
                      uri:
                        'https://shantiinfosoft.co:4243/profile/profile_picture/' +
                        this.state.user?.profile_picture,
                    }}
                    style={{
                      backgroundColor: '#EBF7F9',
                      height: 150,
                      width: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      marginTop: 24,
                    }}
                  />
                ) : this.state.imageUri ? (
                  <Image
                    source={{uri: this.state.imageUri}}
                    style={{
                      backgroundColor: '#EBF7F9',
                      height: 150,
                      width: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      marginTop: 24,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: '#EBF7F9',
                      height: 150,
                      width: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      marginTop: 24,
                    }}>
                    <Image source={DemoUser} style={{width: 55, height: 60}} />
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={{
                  marginHorizontal: 36,
                  marginTop: 20,
                  alignItems: 'center',
                  paddingVertical: 12,
                  backgroundColor: '#002E6D',
                  borderRadius: 4,
                }}
                onPress={() => this.launchImageLibrary()}>
                <Text
                  style={{fontSize: 14, fontWeight: '600', color: '#FFFFFF'}}>
                  Upload Image
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{marginTop: 20, alignItems: 'center'}}
                onPress={() => this.removeImage()}>
                <Text style={{color: '#002E6D', opacity: 0.3, fontSize: 14}}>
                  Remove Image
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            marginHorizontal: 36,
            alignItems: 'center',
            paddingVertical: 12,
            backgroundColor: '#FFCC41',
            borderRadius: 4,
            marginVertical: 15,
          }}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={{color: '#003862', fontSize: 14, fontWeight: 'bold'}}>
            Save & Finish
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(490),
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
    marginHorizontal: moderateScale(16),
  },

  preferenceTxt: {
    color: '#272727',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    paddingLeft: moderateScale(10),
  },
  crossIcon: {
    alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
  descriptionView: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
    maxWidth: '90%',
    // alignItems: 'center',
  },
  dotIcon: {
    color: '#414141',
  },
  descTxt: {
    color: '#5E5E5E',
  },
  imgView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(13),
  },
  doDonttxt: {
    color: '#5E5E5E',
    paddingStart: moderateScale(8),
  },
});
