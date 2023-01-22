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
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from 'native-base';
// import axios from 'axios';
import Axios from '../../api/Axios';
import Snackbar from 'react-native-snackbar';
import cloneDeep from 'lodash/cloneDeep';
import {verticalScale, moderateScale} from '../../Constants/PixelRatio';
import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import Info from '../../../assets/info.png';
import Left from '../../../assets/Left.png';
import CrossRed from '../../../assets/crossred.png';

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
export default class PhotoIds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props?.userId,
      token: props?.token,
      progressInfos: [],
      imageList: [],
      attachments: [],
      photoIdes: [],
      filepath: {
        data: '',
        uri: '',
      },
      fileData: {},
      fileUri: '',
      imageUri: '',
      photoIdVerificationModalOpen: false,
    };
  }

  componentDidMount() {
    this.getPhotoIdes();
  }

  openPicker = () => {
    ImagePicker.openPicker({
      width: 217,
      height: 217,
      mediaType: 'photo',
      multiple: true,
    })
      .then((results) => {
        for (const res of results) {
          var fileName = res.path.split('-').pop(); // Name of the file
          var filePath = res.path; // Path of the file
          const file = {uri: filePath, name: fileName, type: res.mime};
          this.uploadImageAttachment(file);
        }
      })
      .catch((err) => console.log('image picker error : ', err));
  };

  uploadImageAttachment = (fileupload) => {
    this.setState({
      isLoading: true,
      isSecondry: false,
    });
    const formData = new FormData();
    formData.append('user_id', this.state.userId);
    formData.append('photo', fileupload);
    formData.append('status', 'active');
    Axios({
      method: 'POST',
      url: 'api/photoides',
      data: formData,
      withCredentials: true,
      headers: {
        Authorization: `${this.state.token}`,
        'content-type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('reponse', response?.data?.msg);
        if (response.status === 201 && response.data.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          this.getPhotoIdes();
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
      .catch((e) => {
        console.log('reponse', e.response);
        this.setState({
          isLoading: false,
        });
      });
  };

  getPhotoIdes = () => {
    const {userId} = this.state;
    Axios({
      method: 'GET',
      url: 'api/users/photoides/' + userId,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        if (response?.data?.ack === 1) {
          this.setState({
            photoIdes: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.log('Error');
      });
  };

  removePhotoIdes = (item) => {
    Axios({
      method: 'DELETE',
      url: 'api/photoides/' + item.id,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.getPhotoIdes();
          Snackbar.show({
            backgroundColor: '#EE8973',
            text: 'Uploaded file should be deleted successfully',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  photoIdVerificationModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.photoIdVerificationModalOpen}
        onRequestClose={() =>
          this.setState({photoIdVerificationModalOpen: false})
        }>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({photoIdVerificationModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              {/* <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    photoIdVerificationModalOpen: false,
                  })
                }
              /> */}
              {/* <Text style={style.preferenceTxt}>
                Why we require this?
              </Text> */}

              <View style={style.topView}>
                <Text style={style.preferenceTxt}> Why we require this?</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      photoIdVerificationModalOpen: false,
                    })
                  }
                />
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  At WorkBriefly, we’re always working on making our community
                  as secure as possible for everyone. That’s why, before booking
                  a we require this level of identity verification.
                </Text>
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This information helps us keep WorkBriefly secure, fight
                  fraud, and more—and it’s something you’ll only have to do
                  once.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Note: Your ID needs to be an official government-issued ID
                  (not an ID for a school, library, gym, etc.) that includes a
                  photo of you such as your driver’s license.
                </Text>
              </View>

              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.state.photoIdes &&
                  this.state.photoIdes.map((item) => {
                    return (
                      <View
                        style={{
                          marginTop: verticalScale(10),
                          alignItems: 'center',
                          //  backgroundColor:'red',
                          width: '100%',
                        }}>
                        <Image
                          source={{
                            uri: 'http://78.46.210.25:4243' + item.photo,
                          }}
                          style={{
                            height: verticalScale(200),
                            width: moderateScale(200),
                          }}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.photoIdVerificationModal()}
        <ScrollView>
          <View style={{marginBottom: 80}}>
            <View style={style.bodyContainer}>
              {!this.props?.settingScreen && (
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
              )}
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    lineHeight: 23,
                    color: '#323232',
                    marginTop: 24,
                  }}>
                  Photo ID Verification{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({photoIdVerificationModalOpen: true})
                  }
                  style={{marginTop: 28}}>
                  <Image source={Info} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[style.cardView]}>
              <Text
                style={{
                  width: '85%',
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#808080',
                }}>
                Please upload max upto 3 picture of a piece of government issued
                photo ID ensuring that it is clear.
              </Text>
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  backgroundColor: '#002E6D',
                  borderRadius: 4,
                  alignItems: 'center',
                  marginTop: 30,
                }}
                onPress={() => this.openPicker()}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: '#FFFFFF'}}>
                  Upload File
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.state.photoIdes &&
                  this.state.photoIdes.map((item) => {
                    return (
                      <View
                        style={{
                          height: 100,
                          width: 150,
                          marginTop: 20,
                          position: 'relative',
                          marginRight: 2,
                        }}>
                        <Image
                          source={{
                            uri: 'http://78.46.210.25:4243' + item.photo,
                          }}
                          style={{height: 100, width: 150}}
                        />
                        <TouchableOpacity
                          style={{position: 'absolute', top: 2, right: 2}}
                          onPress={() => this.removePhotoIdes(item)}>
                          <Image source={CrossRed} />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </ScrollView>
      </>
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
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(550),
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
    maxWidth: '90%',
    // alignItems: 'center',
  },
  dotIcon: {
    color: '#414141',
  },
  descTxt: {
    color: '#5E5E5E',
  },
});
