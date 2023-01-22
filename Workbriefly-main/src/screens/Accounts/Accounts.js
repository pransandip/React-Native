import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
import jwt from 'jwt-decode';
import Axios from '../../api/Axios';
import Demo from '../../../assets/demo.png';
import Right from '../../../assets/right.png';
import CrossSmall from '../../../assets/cross-small.png';
import Logout from '../../../assets/Logout.png';
import {Icon} from 'native-base';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import AsyncStorage from '@react-native-community/async-storage';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutModalOpen: false,
      userData: {},
      token: '',
    };
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
        const user = jwt(token); // decode your token here
        AsyncStorage.setItem('userData', JSON.stringify(user));

        this.setState(
          {
            userData: user,
            token: token,
          },
          () => {
            console.log(this.state.userData);
          },
        );
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
      });
    });
    AsyncStorage.getItem('token').then((value) => {
      this.setState({
        token: value,
      });
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.refreshToken();
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  logoutModal = () => {
    const {userData, errors} = this.state;
    return (
      // <Modal
      //   visible={this.state.logoutModalOpen}
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
      //           height: 250,
      //           position: 'absolute',
      //           bottom: 0,
      //           alignSelf: 'center',
      //         }}>
      //         <View style={[style.linearGradientView2]}>
      //           <LinearGradient
      //             colors={['#154A5900', '#154A59CC', '#154A59']}
      //             style={style.linearGradient2}></LinearGradient>
      //         </View>
      //         <View style={[style.Modal_Categories_Container, {height: 250}]}>
      //           <View
      //             style={{
      //               alignItems: 'flex-end',
      //               width: '100%',
      //               paddingRight: 15,
      //             }}>
      //             <TouchableOpacity
      //               onPress={() =>
      //                 this.setState({
      //                   logoutModalOpen: false,
      //                 })
      //               }>
      //               <Image source={CrossSmall} />
      //             </TouchableOpacity>
      //           </View>
      //           <View style={{marginHorizontal: 16}}>
      //             <View
      //               style={{justifyContent: 'center', alignItems: 'center'}}>
      //               <Image source={Logout} />
      //               <Text
      //                 style={{
      //                   fontSize: 14,
      //                   fontWeight: '400',
      //                   color: '#6A6A69',
      //                   marginTop: 12,
      //                   marginBottom: 39,
      //                 }}>
      //                 Are you sure you want to logout?
      //               </Text>
      //             </View>
      //             <View
      //               style={{
      //                 flexDirection: 'row',
      //                 justifyContent: 'space-between',
      //               }}>
      //               <TouchableOpacity
      //                 style={{
      //                   paddingVertical: 12,
      //                   paddingHorizontal: 69,
      //                   backgroundColor: '#F1F1F1',
      //                   borderRadius: 4,
      //                 }}
      //                 onPress={() =>
      //                   this.setState(
      //                     {
      //                       logoutModalOpen: false,
      //                     },
      //                     () => {
      //                       AsyncStorage.removeItem('userData');
      //                       AsyncStorage.removeItem('token');
      //                       this.props.navigation.navigate('Login');
      //                     },
      //                   )
      //                 }>
      //                 <Text style={{fontSize: 16, color: '#393939'}}>Yes</Text>
      //               </TouchableOpacity>
      //               <TouchableOpacity
      //                 style={{
      //                   paddingVertical: 12,
      //                   paddingHorizontal: 69,
      //                   backgroundColor: '#FFCC41',
      //                   borderRadius: 4,
      //                 }}
      //                 onPress={() =>
      //                   this.setState({
      //                     logoutModalOpen: false,
      //                   })
      //                 }>
      //                 <Text style={{fontSize: 16, color: '#393939'}}>No</Text>
      //               </TouchableOpacity>
      //             </View>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.logoutModalOpen}
        onRequestClose={() =>
          this.setState({
            logoutModalOpen: true,
          })
        }>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() =>
              this.setState({
                logoutModalOpen: false,
              })
            }
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    logoutModalOpen: false,
                  })
                }
              />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={Logout} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#6A6A69',
                    marginTop: 12,
                    marginBottom: 39,
                  }}>
                  Are you sure you want to logout?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 69,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 4,
                  }}
                  onPress={() =>
                    this.setState(
                      {
                        logoutModalOpen: false,
                      },
                      () => {
                        AsyncStorage.removeItem('userData');
                        AsyncStorage.removeItem('token');
                        this.props.navigation.navigate('Login');
                      },
                    )
                  }>
                  <Text style={{fontSize: 16, color: '#393939'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 69,
                    backgroundColor: '#FFCC41',
                    borderRadius: 4,
                  }}
                  onPress={() =>
                    this.setState({
                      logoutModalOpen: false,
                    })
                  }>
                  <Text style={{fontSize: 16, color: '#393939'}}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {userData} = this.state;
    console.log(userData);
    return (
      <>
        {this.logoutModal()}
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <View style={style.dashboardHeader}>
            <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '500'}}>
              Account
            </Text>
          </View>
          <View style={style.subHeader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 18,
                paddingHorizontal: 21,
              }}>
              {userData.company_logo ? (
                <Image
                  source={{
                    uri: 'http://78.46.210.25:4243' + userData.company_logo,
                  }}
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 65,
                  }}
                />
              ) : (
                <Image source={Demo} />
              )}
              <Text
                style={{
                  paddingHorizontal: 16,
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#393939',
                  fontWeight: 'bold',
                }}>
                {userData.business_name}
              </Text>
            </View>
          </View>
          <View style={style.itemContainer}>
            <TouchableOpacity
              style={style.item}
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Text style={style.itemText}>View Profile</Text>
              <Image source={Right} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.item}
              onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Text style={style.itemText}>Change Password</Text>
              <Image source={Right} />
            </TouchableOpacity>
            <TouchableOpacity
              pnPress={() => this.props.navigation.navigate('HelpAndSupport')}
              style={style.item}>
              <Text style={style.itemText}>Help & Support</Text>
              <Image source={Right} />
            </TouchableOpacity>
            <TouchableOpacity style={style.item}>
              <Text style={style.itemText}>Give Feedback</Text>
              <Image source={Right} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.item}
              onPress={() =>
                this.setState({
                  logoutModalOpen: true,
                })
              }>
              <Text style={style.itemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const style = StyleSheet.create({
  dashboardHeader: {
    backgroundColor: '#002E6D',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    backgroundColor: '#EBF7F9',
    height: 100,
  },
  itemContainer: {
    paddingHorizontal: 21,
  },
  item: {
    height: 70,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    color: '#002E6D',
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
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
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
  crossIcon: {
    alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
});
