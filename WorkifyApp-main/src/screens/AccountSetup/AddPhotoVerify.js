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
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import cloneDeep from 'lodash/cloneDeep';
import Axios from '../../api/Axios';
import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import Info from '../../../assets/info.png';
import Left from '../../../assets/Left.png';
import CrossRed from '../../../assets/crossred.png';
import PhotoIds from './PhotoIds';

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
export default class AddPhotoVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.route?.params?.userId,
      token: props.route?.params?.token,
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
      method: 'api/POST',
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

  // launchImageLibrary = async () => {
  //   const images = await ImagePicker.launchImageLibrary(options);
  //   let image = {
  //     uri: images.assets[0].uri,
  //     type: images.assets[0].type,
  //     name: images.assets[0].fileName,
  //   };
  //   console.log('uri', image);
  //   this.setState(
  //     {
  //       fileData: image,
  //       imageUri: images.assets[0].uri,
  //     },
  //     () => {
  //       this.uploadImageAttachment(this.state.fileData);
  //     },
  //   );
  // };

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
            text: 'photoide successfully deleted',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} style={{marginLeft: '35%'}} />
        </View>
        <PhotoIds
          userId={this.props.route?.params?.userId}
          token={this.props.route?.params?.token}
        />
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
});
