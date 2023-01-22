import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import Axios, {URL} from '../../api/Axios';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import Snackbar from 'react-native-snackbar';
import {Icon} from 'native-base';
import DetailsHeader from '../../components/Header/DetailsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import Topbar from './Topbar';
import GigInfo from './GigInfo';
import Applicants from './Applicants';
import BookedWorkers from './BookedWorkers';
import Invoice from './Invoice';
import CrossSmall from '../../../assets/cross-small.png';
import Warning from '../../../assets/Warning.png';
import Success from '../../../assets/success.png';
import GigDetailsManager from './GigDetailsManager';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GigDetails = (props) => {
  const [gigInfoState, setGigInfoState] = useState(true);
  const [applicantsState, setApplicantsState] = useState(false);
  const [workersState, setWorkersState] = useState(false);
  const [invoiceState, setInvoiceState] = useState(false);
  const [fabModalVisible, setFabModalVisible] = useState(false);
  const [menuModalVisible, setmenuModalVisible] = useState(false);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [acceptSuccessVisible, setAcceptSuccessVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [gigDetails, setGigDetails] = useState({});
  const [checkBoxOne, setCheckBoxOne] = useState(false);
  const [checkBoxTwo, setCheckBoxTwo] = useState(false);
  const [checkBoxThree, setCheckBoxThree] = useState(false);
  const [checkBoxFour, setCheckBoxFour] = useState(false);
  const [checkBoxFive, setCheckBoxFive] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const menuModal = (val) => {
    setmenuModalVisible(true);
  };

  const declineModal = () => {
    setDeclineModalVisible(true);
  };

  const navigation = (value, params) => {
    props.navigation.navigate(value, params);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        console.log(JSON.parse(value));
        setUserData(JSON.parse(value));
      })
      .catch((e) => {
        console.log(e);
      });

    AsyncStorage.getItem('token')
      .then((value) => {
        setToken(value);
        fetchGigDetails();
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  const fetchGigDetails = () => {
    setLoading(true);
    Axios({
      method: 'GET',
      url: 'api/gig/specific/' + props.route.params.id,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(
            'imran new ff',
            response.data.data,
            props.route.params.id,
          );
          setLoading(false);
          setGigDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const convertKm = (distance) => {
    return distance / 1000;
  };

  // on decline modal view
  const declineReuest = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={declineModalVisible}
        onRequestClose={() => {
          setDeclineModalVisible(false);
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{marginTop: 'auto'}}>
            <View
              style={{
                width: '100%',
                height: 300,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              <View style={[styles.linearGradientView2, {height: 400}]}>
                <LinearGradient
                  colors={['#154A5900', '#154A59CC', '#154A59']}
                  style={styles.linearGradient2}></LinearGradient>
              </View>
              <View style={[styles.Modal_Categories_Container, {height: 650}]}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    paddingRight: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() => setDeclineModalVisible(false)}>
                    <Image source={CrossSmall} />
                  </TouchableOpacity>
                </View>

                <View>
                  <View style={{alignItems: 'center'}}>
                    <Image source={Warning} />
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginTop: 20,
                        color: '#393939',
                      }}>
                      Decline Request
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 12,
                        color: '#545454',
                      }}>
                      Are you sure you want to decline the request?
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      paddingVertical: 28,
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 50,
                        paddingVertical: 15,
                        backgroundColor: '#F1F1F1',
                        borderRadius: 4,
                      }}
                      onPress={() => acceptRequest('decline')}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#002E6D',
                          fontWeight: 'bold',
                        }}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 50,
                        paddingVertical: 15,
                        backgroundColor: '#002E6D',
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#FFFFFF',
                          fontWeight: 'bold',
                        }}>
                        No
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

  // on accept modal view
  const acceptModalView = () => {
    return (
      // <Modal
      //   animationType="slide"
      //   transparent={true}
      //   visible={acceptModalVisible}
      //   onRequestClose={() => {
      //     setAcceptModalVisible(false);
      //   }}>
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
      //         <View style={[styles.linearGradientView2, {height: 600}]}>
      //           <LinearGradient
      //             colors={['#154A5900', '#154A59CC', '#154A59']}
      //             style={styles.linearGradient2}></LinearGradient>
      //         </View>
      //         <View style={[styles.Modal_Categories_Container, {height: 650}]}>
      //           <View
      //             style={{
      //               alignItems: 'flex-end',
      //               width: '100%',
      //               paddingRight: 15,
      //             }}>
      //             <TouchableOpacity
      //               onPress={() => setAcceptModalVisible(false)}>
      //               <Image source={CrossSmall} />
      //             </TouchableOpacity>
      //           </View>

      //           <View style={{marginHorizontal: 15}}>
      //             <Text
      //               style={{fontSize: 16, fontWeight: 'bold', width: '80%'}}>
      //               To accept this gig, please accept the following terms:
      //             </Text>
      //             <View>
      //               <View style={styles.checkboxContainer}>
      //                 <CheckBox
      //                   boxType={'square'}
      //                   value={checkBoxOne}
      //                   onValueChange={() => {
      //                     setCheckBoxOne(!checkBoxOne);
      //                   }}
      //                   onFillColor={'#002E6D'}
      //                   onCheckColor={'#FFFFFF'}
      //                   style={styles.checkbox}
      //                 />
      //                 <Text style={styles.label}>
      //                   {' '}
      //                   I will check in on time for the gig with the point of
      //                   contact.
      //                 </Text>
      //               </View>
      //               <View style={styles.checkboxContainer}>
      //                 <CheckBox
      //                   boxType={'square'}
      //                   value={checkBoxTwo}
      //                   onFillColor={'#002E6D'}
      //                   onCheckColor={'#FFFFFF'}
      //                   style={styles.checkbox}
      //                   onValueChange={() => {
      //                     setCheckBoxTwo(!checkBoxTwo);
      //                   }}
      //                 />
      //                 <Text style={styles.label}>
      //                   {' '}
      //                   I understand that WorkBriefly has zero tolerance for no
      //                   shows.
      //                 </Text>
      //               </View>
      //               <View style={styles.checkboxContainer}>
      //                 <CheckBox
      //                   boxType={'square'}
      //                   value={checkBoxThree}
      //                   onFillColor={'#002E6D'}
      //                   onCheckColor={'#FFFFFF'}
      //                   style={styles.checkbox}
      //                   onValueChange={() => {
      //                     setCheckBoxThree(!checkBoxThree);
      //                   }}
      //                 />
      //                 <Text style={styles.label}>
      //                   {' '}
      //                   I understand that I will need to provide evidence of
      //                   licenses and certifications if requested on day of the
      //                   gig.
      //                 </Text>
      //               </View>
      //               <View style={styles.checkboxContainer}>
      //                 <CheckBox
      //                   boxType={'square'}
      //                   value={checkBoxFour}
      //                   onFillColor={'#002E6D'}
      //                   onCheckColor={'#FFFFFF'}
      //                   style={styles.checkbox}
      //                   onValueChange={() => {
      //                     setCheckBoxFour(!checkBoxFour);
      //                   }}
      //                 />
      //                 <Text style={styles.label}>
      //                   {' '}
      //                   I understand and will abide by the instructions
      //                   provided.
      //                 </Text>
      //               </View>
      //               <View style={styles.checkboxContainer}>
      //                 <CheckBox
      //                   boxType={'square'}
      //                   value={checkBoxFive}
      //                   onFillColor={'#002E6D'}
      //                   onCheckColor={'#FFFFFF'}
      //                   style={styles.checkbox}
      //                   onValueChange={() => {
      //                     setCheckBoxFive(!checkBoxFive);
      //                   }}
      //                 />
      //                 <Text style={styles.label}>
      //                   {' '}
      //                   I have completed the COVID self-assessment check and
      //                   confirm that I do not present any symptoms
      //                 </Text>
      //               </View>
      //             </View>
      //             <TouchableOpacity
      //               style={{
      //                 paddingHorizontal: 146,
      //                 paddingVertical: 15,
      //                 backgroundColor: '#002E6D',
      //                 borderRadius: 4,
      //                 opacity:
      //                   !checkBoxOne ||
      //                   !checkBoxTwo ||
      //                   !checkBoxThree ||
      //                   !checkBoxFour ||
      //                   !checkBoxFive
      //                     ? 0.3
      //                     : 1,
      //               }}
      //               disabled={
      //                 !checkBoxOne ||
      //                 !checkBoxTwo ||
      //                 !checkBoxThree ||
      //                 !checkBoxFour ||
      //                 !checkBoxFive
      //               }
      //               onPress={() => {
      //                 acceptRequest(status);
      //               }}>
      //               <Text
      //                 style={{
      //                   fontSize: 14,
      //                   fontWeight: 'bold',
      //                   color: '#FFFFFF',
      //                 }}>
      //                 Accept
      //               </Text>
      //             </TouchableOpacity>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={acceptModalVisible}
        onRequestClose={() => setAcceptModalVisible(false)}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setAcceptModalVisible(false)}
          />
          <View style={styles.modalView}>
            <View style={styles.bodyView}>
              {/* <View style={styles.topView}> */}
              <Icon
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
                onPress={() => setAcceptModalVisible(false)}
              />
              <Text style={styles.preferenceTxt}>
                To accept this gig, please accept the following terms:
              </Text>
              {/* <Icon
                  name="cross"
                  type="Entypo"
                  style={styles.crossIcon}
                  onPress={() => setAcceptModalVisible(false)}
                /> */}
              {/* </View> */}

              <View style={{marginHorizontal: 15}}>
                {/* <Text style={{fontSize: 16, fontWeight: 'bold', width: '80%'}}>
                  To accept this gig, please accept the following terms:
                </Text> */}
                <View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      boxType={'square'}
                      value={checkBoxOne}
                      onValueChange={() => {
                        setCheckBoxOne(!checkBoxOne);
                      }}
                      onFillColor={'#002E6D'}
                      onCheckColor={'#FFFFFF'}
                      style={styles.checkbox}
                    />
                    <Text style={styles.label}>
                      {' '}
                      I will check in on time for the gig with the point of
                      contact.
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      boxType={'square'}
                      value={checkBoxTwo}
                      onFillColor={'#002E6D'}
                      onCheckColor={'#FFFFFF'}
                      style={styles.checkbox}
                      onValueChange={() => {
                        setCheckBoxTwo(!checkBoxTwo);
                      }}
                    />
                    <Text style={styles.label}>
                      {' '}
                      I understand that WorkBriefly has zero tolerance for no
                      shows.
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      boxType={'square'}
                      value={checkBoxThree}
                      onFillColor={'#002E6D'}
                      onCheckColor={'#FFFFFF'}
                      style={styles.checkbox}
                      onValueChange={() => {
                        setCheckBoxThree(!checkBoxThree);
                      }}
                    />
                    <Text style={styles.label}>
                      {' '}
                      I understand that I will need to provide evidence of
                      licenses and certifications if requested on day of the
                      gig.
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      boxType={'square'}
                      value={checkBoxFour}
                      onFillColor={'#002E6D'}
                      onCheckColor={'#FFFFFF'}
                      style={styles.checkbox}
                      onValueChange={() => {
                        setCheckBoxFour(!checkBoxFour);
                      }}
                    />
                    <Text style={styles.label}>
                      {' '}
                      I understand and will abide by the instructions provided.
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      boxType={'square'}
                      value={checkBoxFive}
                      onFillColor={'#002E6D'}
                      onCheckColor={'#FFFFFF'}
                      style={styles.checkbox}
                      onValueChange={() => {
                        setCheckBoxFive(!checkBoxFive);
                      }}
                    />
                    <Text style={styles.label}>
                      {' '}
                      I have completed the COVID self-assessment check and
                      confirm that I do not present any symptoms
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    // paddingHorizontal: 146,
                    paddingVertical: moderateScale(16),
                    alignItems: 'center',
                    backgroundColor: '#002E6D',
                    borderRadius: 4,
                    opacity:
                      !checkBoxOne ||
                      !checkBoxTwo ||
                      !checkBoxThree ||
                      !checkBoxFour ||
                      !checkBoxFive
                        ? 0.3
                        : 1,
                  }}
                  disabled={
                    !checkBoxOne ||
                    !checkBoxTwo ||
                    !checkBoxThree ||
                    !checkBoxFour ||
                    !checkBoxFive
                  }
                  onPress={() => {
                    acceptRequest(status);
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                    }}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const acceptRequest = (status) => {
    let postData = {
      gig_id: gigDetails?.id,
      worker_id: userData?.id,
      business_id: gigDetails?.user_id,
      status: status,
    };
    console.log('data', postData);
    Axios({
      method: 'POST',
      url: 'api/gig/invite_status',
      headers: {
        Authorization: `${token}`,
      },
      data: postData,
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        if (response?.data?.ack === 1) {
          gigDetails.invite_status = 'applied';
          setAcceptModalVisible(false);
          setAcceptSuccessVisible(true);
        }
        if (response?.data?.ack === 0) {
          Snackbar.show({
            backgroundColor: '#EE8973',
            text: response?.data?.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const acceptSuccessView = () => {
    return (
      // <Modal
      //   animationType="slide"
      //   transparent={true}
      //   // visible={acceptSuccessVisible}
      //   // onRequestClose={() => {
      //   //   setAcceptSuccessVisible(false);
      //   // }}
      // >
      //   <KeyboardAvoidingView
      //     style={{flex: 1}}
      //     behavior={Platform.OS === 'ios' ? 'padding' : null}>
      //     <View style={{marginTop: 'auto'}}>
      //       <View
      //         style={{
      //           width: '100%',
      //           height: 300,
      //           position: 'absolute',
      //           bottom: 0,
      //           alignSelf: 'center',
      //         }}>
      //         <View style={[styles.linearGradientView2, {height: 400}]}>
      //           <LinearGradient
      //             colors={['#154A5900', '#154A59CC', '#154A59']}
      //             style={styles.linearGradient2}></LinearGradient>
      //         </View>
      //         <View style={[styles.Modal_Categories_Container, {height: 650}]}>
      //           <View
      //             style={{
      //               alignItems: 'flex-end',
      //               width: '100%',
      //               paddingRight: 15,
      //             }}>
      //             <TouchableOpacity
      //               onPress={() => setAcceptSuccessVisible(false)}>
      //               <Image source={CrossSmall} />
      //             </TouchableOpacity>
      //           </View>

      //           <View style={{marginHorizontal: 20}}>
      //             <View style={{alignItems: 'center'}}>
      //               <Image source={Success} />
      //               <Text
      //                 style={{
      //                   fontSize: 20,
      //                   fontWeight: 'bold',
      //                   marginTop: 20,
      //                   color: '#393939',
      //                   textAlign: 'center',
      //                 }}>
      //                 {` You have successfully ${
      //                   gigDetails?.invite_status !== 'accept'
      //                     ? 'applied'
      //                     : 'accept'
      //                 }  the gig`}
      //               </Text>
      //               <Text
      //                 style={{
      //                   fontSize: 14,
      //                   fontWeight: '400',
      //                   marginTop: 12,
      //                   color: '#545454',
      //                   textAlign: 'center',
      //                   marginBottom: 15,
      //                 }}>
      //                 {`Thanks for ${
      //                   gigDetails?.invite_status !== 'accept'
      //                     ? 'applying'
      //                     : 'accepting'
      //                 } the gig. Your ${
      //                   gigDetails?.invite_status !== 'accept'
      //                     ? 'applying'
      //                     : 'accepting'
      //                 } gig has been moved to Confirmed.`}
      //               </Text>
      //             </View>
      //             <TouchableOpacity
      //               onPress={() => {
      //                 setAcceptSuccessVisible(false);
      //                 props.navigation.goBack();
      //               }}
      //               style={{
      //                 // paddingHorizontal: 123,
      //                 paddingVertical: verticalScale(15),
      //                 backgroundColor: '#FFCC41',
      //                 borderRadius: 4,
      //                 // justifyContent: 'center',
      //                 alignItems: 'center',
      //               }}>
      //               <Text
      //                 style={{
      //                   fontSize: 16,
      //                   color: '#FFFFFF',
      //                   fontWeight: 'bold',
      //                 }}>
      //                 Browse Gigs
      //               </Text>
      //             </TouchableOpacity>
      //           </View>
      //         </View>
      //       </View>
      //     </View>
      //   </KeyboardAvoidingView>
      // </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={acceptSuccessVisible}
        onRequestClose={() => {
          setAcceptSuccessVisible(false);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setAcceptSuccessVisible(false)}
          />
          <View style={[styles.modalView, {height: verticalScale(300)}]}>
            <View style={styles.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
                onPress={() => setAcceptSuccessVisible(false)}
              />
              <View style={{marginHorizontal: 20}}>
                <View style={{alignItems: 'center'}}>
                  <Image source={Success} />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: 20,
                      color: '#393939',
                      textAlign: 'center',
                    }}>
                    {`Successfully ${
                      gigDetails?.invite_status !== 'accept'
                        ? 'Applied'
                        : 'Accept'
                    }  Gig`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      marginTop: 12,
                      color: '#545454',
                      textAlign: 'center',
                      marginBottom: 15,
                    }}>
                    {gigDetails?.invite_status !== 'accept'
                      ? 'Thank you, you have successfully applied the gig'
                      : 'Thanks for accepting the gig. Your gig has been moved to Confirmed.'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setAcceptSuccessVisible(false);
                    props.navigation.goBack();
                  }}
                  style={{
                    // paddingHorizontal: 123,
                    paddingVertical: verticalScale(15),
                    backgroundColor: '#FFCC41',
                    borderRadius: 4,
                    // justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                    }}>
                    {gigDetails?.invite_status !== 'accept'
                      ? 'Continue'
                      : 'Browse gigs'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // three dot modal view
  const menuModalView = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={() => {
          setmenuModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setmenuModalVisible(false)}
          />
          <View style={styles.cardView}>
            <Text style={[styles.cardTxt, {color: '#002E6D'}]}>
              Share this Gig
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setmenuModalVisible(false);
              props.navigation.navigate('ReportAnIssue');
            }}
            style={styles.cardView}>
            <Text style={[styles.cardTxt, {color: '#D72F2F'}]}>
              Report an issue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardView}
            onPress={() => {
              setmenuModalVisible(false);
            }}>
            <Text style={[styles.cardTxt, {color: '#002E6D'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const saveGig = () => {
    console.log(props.route.params.id);
    Axios({
      method: 'GET',
      url: 'api/gig/favourite/' + props.route.params.id,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: 'Gig has been successfully saved',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeSaveGig = () => {
    console.log(props.route.params.id);
    Axios({
      method: 'DELETE',
      url: 'api/gig/favourite/' + props.route.params.id,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: 'Gig has been successfully removed',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {menuModalView()}
      {declineReuest()}
      {acceptModalView()}
      {acceptSuccessView()}
      <DetailsHeader
        menuModal={menuModal}
        headerTxt="Gig Detail"
        goBack={goBack}
        gigDetails={gigDetails}
        userData={userData}
        token={token}
        saveGig={saveGig}
        removeSaveGig={removeSaveGig}
      />
      {loading === true ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={
                gigDetails?.cover_image
                  ? {
                      uri: `${URL}${gigDetails?.cover_image}`,
                    }
                  : require('../../assets/warehouse.png')
              }
              style={styles.warehouseImg}
            />

            <View style={styles.topView}>
              <Image
                source={require('../../assets/jj.png')}
                style={{borderRadius: 30, marginRight: 17}}
              />

              <View style={{width: '80%'}}>
                {gigDetails?.position ? (
                  <Text style={styles.warehouseTxt} numberOfLines={2}>
                    {gigDetails.position}
                  </Text>
                ) : (
                  <></>
                )}
                <View style={styles.smallTxtView}>
                  <Text style={styles.dollarsTxt}>
                    ${gigDetails?.total_amount}
                  </Text>
                  <Text style={styles.hourTxt}>
                    (${gigDetails?.hourly_pay}/hr) •
                    {convertKm(gigDetails?.distance).toFixed(2)} km
                  </Text>
                </View>
              </View>
            </View>

            <View>
              {gigDetails?.invite_status === 'Completed' ? (
                <GigDetailsManager />
              ) : (
                <GigInfo gigDetails={gigDetails} token={token} />
              )}
            </View>
          </ScrollView>
          {gigDetails?.invite_status === 'accept' ? (
            <View
              style={[
                styles.applyBtnView,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.applyBtn,
                  {paddingHorizontal: 23, backgroundColor: '#FFFFFF'},
                ]}
                onPress={() => {
                  declineModal();
                }}>
                <Text style={[styles.applyTxt, {color: '#D72F2F'}]}>
                  Decline Request
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.applyBtn, {paddingHorizontal: 23}]}
                onPress={() => {
                  setStatus('confirm');
                  setAcceptModalVisible(true);
                }}>
                <Text style={styles.applyTxt}>Accept Request</Text>
              </TouchableOpacity>
            </View>
          ) : gigDetails?.invite_status === 'applied' ? (
            <View style={[styles.applyBtnView]}>
              <TouchableOpacity
                style={[
                  styles.applyBtn,
                  {
                    backgroundColor: '#BEEE91',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 120,
                    paddingVertical: 15,
                  },
                ]}
                onPress={() => {
                  setStatus('applied');
                }}>
                <Image source={Success} style={{height: 20, width: 20}} />
                <Text style={[styles.applyTxt, {color: '#74B711'}]}>
                  {'  '}Applied
                </Text>
              </TouchableOpacity>
            </View>
          ) : gigDetails?.invite_status === 'Completed' ? (
            <View style={styles.applyBtnView}>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => {
                  props.navigation.navigate('Survey');
                }}>
                <Text style={styles.applyTxt}>Survey</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.applyBtnView}>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => {
                  setStatus('applied');
                  setAcceptModalVisible(true);
                }}>
                <Text style={styles.applyTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GigDetails;

const styles = StyleSheet.create({
  warehouseImg: {
    width: windowWidth,
    height: verticalScale(150),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(15),
    // height: verticalScale(80),
    paddingHorizontal: moderateScale(10),
  },
  warehouseTxt: {
    color: '#393939',
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    width: '90%',
  },
  smallTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarsTxt: {
    color: '#393939',
    fontSize: moderateScale(24),
    fontWeight: '500',
  },
  hourTxt: {
    color: '#393939',
    fontSize: moderateScale(14),
    marginStart: moderateScale(5),
  },

  applyBtnView: {
    backgroundColor: '#FFFFFF',
    height: verticalScale(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtn: {
    backgroundColor: '#FFCC41',
    paddingHorizontal: 148,
    paddingVertical: 15,
    borderRadius: 4,
  },
  applyTxt: {
    fontSize: 16,
    color: '#002E6D',
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
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

  cardView: {
    backgroundColor: 'white',
    height: verticalScale(56),
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
    borderRadius: moderateScale(5),
  },
  cardTxt: {
    fontWeight: 'bold',
  },
  gigTxt: {
    color: 'white',
    backgroundColor: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    height: 18,
    width: 18,
  },
  label: {
    marginLeft: 12,
    marginVertical: 16,
  },

  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // backgroundColor: '#fff',
  },

  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',
    // backgroundColor: 'red',
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
  // topView: {
  //   // flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingTop: verticalScale(15),
  // },
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
});
