import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  Dimensions,
  // ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon, Textarea} from 'native-base';
import DetailsHeader from '../../components/headers/DetailsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import GigsTopbar from './GigsTopBar';
import GigsInfo from './GigsInfo';
import Applicants from './Applicants';
import BookedWorkers from './BookedWorkers';
import Invoice from './Invoice';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Axios, {URL} from '../../api/Axios';

const {height, width} = Dimensions.get('window');

const GigDetails = (props) => {
  const {id} = props.route.params;

  // console.log('gigID----', id);
  // const [change, setChange] = useState('')

  const [render, setRender] = useState('gigInfo');
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [gigDetailsData, setGigDetailsData] = useState('');
  const [userData, setUserData] = useState({});
  // const [loading, setLoading] = useState(true);

  const handleChange = (val) => {
    if (val == 'gigInfo') {
      setRender('gigInfo');
    } else if (val == 'applicants') {
      setRender('applicants');
    } else if (val == 'bookedWorkers') {
      setRender('bookedWorkers');
    } else {
      setRender('invoice');
    }
  };
  const [token, setToken] = useState('');

  const handleModal = (val) => {
    setModalOpen(val);
  };
  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      getGigDetails();
    });
  }, [token]);

  const getGigDetails = () => {
    Axios({
      method: 'GET',
      url: `api/gig/specific/${id}`,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log('response---------->>', response);
        if (response?.data?.ack === 1) {
          console.log('response---------->>', response.data.data[0]);
          // setLoading(false);
          setGigDetailsData(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openClose = () => {
    setModalOpen(false);
    setSecondModal(true);
  };

  const back = () => {
    props.navigation.goBack();
  };

  const openCloseSecond = () => {
    setSecondModal(false);
    setCancelModal(true);
  };

  const openCloseThird = () => {
    setCancelModal(false);
    setSuccessModal(true);
  };

  return (
    <SafeAreaView style={styles.root}>
      <DetailsHeader
        back={back}
        handleModal={handleModal}
        headerTxt="Gig Detail"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {console.log(`${URL}${gigDetailsData?.cover_image}`)}
        <Image
          source={
            gigDetailsData?.cover_image
              ? {uri: `${URL}${gigDetailsData?.cover_image}`}
              : require('../../../assets/warehouse.png')
          }
          style={styles.wareHouseImg}
        />

        <View style={styles.workerView}>
          <Image
            source={
              gigDetailsData?.cover_image
                ? {
                    uri: `${URL}${gigDetailsData?.cover_image}`,
                  }
                : require('../../../assets/jjSmall.png')
            }
            style={{height: 50, width: 50}}
          />
          <View style={styles.workerTxtView}>
            <Text style={styles.workerTxt}>{gigDetailsData.position}</Text>

            <Text
              style={[
                styles.rateTxt,
                {fontSize: moderateScale(24), fontWeight: 'bold'},
              ]}>
              $
              {gigDetailsData?.total_amount
                ? gigDetailsData?.total_amount.toFixed(2)
                : 0}
              <Text style={{fontSize: moderateScale(14), fontWeight: 'normal'}}>
                {' '}
                (${gigDetailsData.hourly_pay}/hr)
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.topBarView}>
          <GigsTopbar handleChange={handleChange} />
        </View>

        {render == 'gigInfo' ? (
          <GigsInfo passId={id} />
        ) : render == 'applicants' ? (
          <Applicants passId={id} />
        ) : render == 'bookedWorkers' ? (
          <BookedWorkers passId={id} />
        ) : (
          <Invoice passId={id} />
        )}
      </ScrollView>

      {gigDetailsData.status == 'cancel' ? (
        <View style={styles.cancelledView}>
          <Pressable style={styles.cancelledBtn}>
            <Icon
              name="circle-with-cross"
              type="Entypo"
              style={styles.crossIcon}
            />
            <Text style={styles.cancelledTxt}>&nbsp;Cancelled</Text>
          </Pressable>
        </View>
      ) : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setModalOpen(false)} />
          <Pressable
            style={styles.modalView}
            onPress={() => {
              setModalOpen(false);
              props.navigation.navigate('EditGig', {
                id: gigDetailsData.id,
              });
            }}>
            <Text style={styles.modalTxt}>Edit</Text>
          </Pressable>
          <Pressable style={styles.modalView}>
            <Text style={styles.modalTxt}>Copy</Text>
          </Pressable>
          <Pressable onPress={openClose} style={styles.modalView}>
            <Text style={styles.modalTxt}>Cancel this Gig</Text>
          </Pressable>
          <Pressable
            style={[styles.modalView, {marginBottom: verticalScale(4)}]}>
            <Text style={styles.modalTxt}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModal}
        onRequestClose={() => {
          setSecondModal(!secondModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setSecondModal(false)} />
          <View style={styles.secondModalView}>
            <View style={styles.topView}>
              <Text style={styles.cancelTxt}>Remove Worker</Text>
              <Icon
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
                onPress={() => setSecondModal(!secondModal)}
              />
            </View>
            <Text style={styles.reasonTxt}>
              Please provide a reason you are removing
              <Text style={{fontWeight: 'bold'}}> David William </Text>from this
              gig.
            </Text>

            <Textarea
              rowSpan={5}
              placeholder="Your reason"
              placeholderTextColor="#969696"
              style={styles.textArea}
            />

            <TouchableOpacity onPress={openCloseSecond} style={styles.nextBtn}>
              <Text style={styles.nextTxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModal}
        onRequestClose={() => {
          setCancelModal(!cancelModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setCancelModal(false)} />
          <View style={styles.cancelModalView}>
            <View style={styles.topView}>
              <Text style={styles.cancelTxt}>Remove Worker</Text>
              <Icon
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
                onPress={() => setCancelModal(!cancelModal)}
              />
            </View>
            <Text style={styles.removeTxt}>
              Are you sure you want to remove this worker?
            </Text>
            <TouchableOpacity
              onPress={openCloseThird}
              style={styles.removalBtn}>
              <Text style={styles.removalTxt}>Confirm Removal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModal}
        onRequestClose={() => {
          setSuccessModal(!successModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setSuccessModal(false)} />
          <View style={styles.modalOuterView}>
            <View style={styles.modalInnerView}>
              <Image
                source={require('../../../assets/success.png')}
                style={styles.successImg}
              />
              <Text style={styles.reportedTxt}>
                Incident Report Successfully Sent
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSuccessModal(true)}
              style={styles.continueBtn}>
              <Text style={styles.removalTxt}>Confirm Removal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default GigDetails;

const styles = StyleSheet.create({
  root: {
    // height: height,
    flex: 1,
  },
  wareHouseImg: {
    width: width,
    height: verticalScale(144),
    // height: height,
  },
  workerView: {
    // backgroundColor:'red',
    flexDirection: 'row',
    marginTop: verticalScale(17),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
  },
  workerTxt: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    marginBottom: verticalScale(2),
  },
  workerTxtView: {
    paddingHorizontal: moderateScale(10),
  },
  rateTxt: {
    color: '#393939',
  },
  topBarView: {
    marginTop: verticalScale(32),
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: moderateScale(4),
    height: verticalScale(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(2),
    marginHorizontal: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  secondModalView: {
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(16),
    height: verticalScale(320),
    borderTopLeftRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(28),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  crossIcon: {
    color: '#5E5E5E',
  },
  cancelTxt: {
    color: '#272727',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  reasonTxt: {
    color: '#545454',
    marginTop: verticalScale(12),
  },
  textArea: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    paddingHorizontal: moderateScale(14),
    marginVertical: verticalScale(20),
  },
  nextBtn: {
    backgroundColor: '#002E6D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
    // marginTop: verticalScale(30),
    marginHorizontal: moderateScale(16),
    marginBottom: verticalScale(40),
  },
  nextTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelModalView: {
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(16),
    height: verticalScale(200),
    borderTopLeftRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(28),
  },
  removeTxt: {
    color: '#4B4B4B',
    marginTop: verticalScale(12),
  },
  removalBtn: {
    backgroundColor: '#FFCC41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
    marginTop: verticalScale(30),
    marginHorizontal: moderateScale(16),
    // marginBottom: verticalScale(40),
  },
  removalTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  modalOuterView: {
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(16),
    height: verticalScale(300),
    borderTopLeftRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(28),
  },
  modalInnerView: {
    alignItems: 'center',
    paddingVertical: verticalScale(30),
    paddingHorizontal: moderateScale(39),
  },
  successImg: {
    height: moderateScale(60),
    width: moderateScale(60),
  },
  reportedTxt: {
    fontSize: moderateScale(17),
    color: '#393939',
    fontWeight: 'bold',
    paddingTop: verticalScale(20),
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
    // marginTop: verticalScale(30),
    marginHorizontal: moderateScale(16),
    marginBottom: verticalScale(40),
  },
  cancelledView: {
    backgroundColor: '#fff',
    height: verticalScale(68),
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  cancelledBtn: {
    backgroundColor: '#F9E0E0',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelledTxt: {
    color: '#D72F2F',
    fontWeight: 'bold',
  },
  crossIcon: {
    color: '#D72F2F',
    fontSize: moderateScale(20),
  },
  // centeredViewIndicator: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(52, 52, 52, 0.8)',
  // },
});
