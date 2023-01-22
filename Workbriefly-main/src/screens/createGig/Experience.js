import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon, CheckBox} from 'native-base';
// import axios from 'axios';
import Axios from '../../api/Axios';

const {height, width} = Dimensions.get('window');

const Experience = ({
  handleFormData,
  values,
  errors,
  handleCertificate,
  token,
  type,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const [addExperienceModal, setAddExperienceModal] = useState(false);
  const [exprienceListModal, setExperienceListModal] = useState(false);
  const [exprienceList, setExperienceList] = useState([]);
  const [removeMmodal, setRemoveMmodal] = useState(false);
  const [checkToggle, setCheckToggle] = useState(false);
  const [certificate, setCertificate] = useState({
    name: '',
    id: '',
    required: false,
  });
  const [error, setError] = useState({});
  const [pressedItem, setPressedItem] = useState({});
  const [certificateItem, setCertificateItem] = useState({});

  const addCertificateAndLicence = () => {
    if (validateLicence()) {
      handleCertificate(certificateItem);
      setCertificateItem({});
      setAddExperienceModal(false);
    }
  };

  const isObjectEmpty = (object) => {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  };

  const validateLicence = () => {
    let error = {};
    let isValidateForm = true;
    if (!certificateItem || isObjectEmpty(certificateItem)) {
      error['certificate'] = 'Please enter certificate';
      isValidateForm = false;
    }
    setError(error);
    setTimeout(() => {
      setError({});
    }, 2000);
    return isValidateForm;
  };

  const removeExprienceItem = () => {
    let arr = values.certificate_and_licence;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === pressedItem.id) {
        arr.splice(i, 1);
      }
    }
    setCertificate(arr);
    setRemoveMmodal(false);
  };

  useEffect(() => {
    console.log('mlfdf', values);
    getCertificateList();
  }, [token]);

  const getCertificateList = () => {
    Axios({
      method: 'GET',
      url: 'api/certificate_and_licence',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          setExperienceList(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const disableCheck = () => {
    let disable = false;
    return disable;
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
      // behavior={Platform.OS === 'android' ? 'height' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.bodyView}>
            <Text style={styles.stepNoTxt}>STEP 2 OF 6</Text>
            <Text style={styles.stepDescTxt}>
              Experience{' '}
              <Text style={{fontSize: moderateScale(12), fontWeight: 'normal'}}>
                (Optional)
              </Text>
            </Text>

            <View style={styles.descView}>
              <Text style={styles.fillTxt}>
                In order to match you with the best workers for the job, please
                indicate below if you have a preference for workers with certain
                certificates/licenses. Please make sure that you add each
                certificate/license to save it.
              </Text>

              <TouchableOpacity
                onPress={() => setAddExperienceModal(true)}
                style={styles.addExperienceBtn}>
                <Icon name="plus" type="Entypo" style={styles.plusIcon} />
                <Text style={styles.experienceTxt}>Add Experience</Text>
              </TouchableOpacity>

              {values?.certificate_and_licence?.length > 0 ? (
                <View
                  style={{
                    borderBottomColor: '#979797',
                    borderBottomWidth: 1,
                    marginBottom: verticalScale(16),
                  }}
                />
              ) : null}
              {values?.certificate_and_licence?.length > 0 &&
                values?.certificate_and_licence?.map((data) => {
                  console.log(data);
                  let result = exprienceList.filter((obj) => {
                    return obj.id === data.id;
                  });
                  return (
                    <View style={styles.certificateView}>
                      <Text style={styles.certificateNameTxt}>
                        {data.name ? data.name : result[0]?.name}
                        <Text
                          style={{
                            fontSize: moderateScale(12),
                            color: 'white',
                            fontWeight: 'normal',
                          }}>
                          &nbsp;{data.required === 1 ? '(required) ' : ''}
                        </Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setPressedItem(data);
                          setRemoveMmodal(true);
                        }}>
                        <Icon name="cross" type="Entypo" style={styles.cross} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              {errors.certificate_and_licence && (
                <Text>{errors.certificate_and_licence}</Text>
              )}
            </View>
            {/* <View style={styles.continueBtnView}>
            <TouchableOpacity style={styles.continueBtn}>
              <Text style={styles.continueTxt}>Continue</Text>
            </TouchableOpacity>
          </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.continueBtnViewNew]}>
        {step !== 1 && (
          <TouchableOpacity
            onPress={() => {
              prevStep();
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
          disabled={disableCheck() === true ? true : false}
          style={
            disableCheck() === true
              ? [
                  styles.continueBtnNew,
                  {
                    backgroundColor: '#F0E9D7',
                    width: step === 1 ? '100%' : '45%',
                  },
                ]
              : [
                  styles.continueBtnNew,
                  {
                    width: step === 1 ? '100%' : '45%',
                  },
                ]
          }
          onPress={() => (step === 8 ? createGig() : nextStep())}>
          <Text style={styles.continueTxtNew}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addExperienceModal}
        onRequestClose={() => {
          setAddExperienceModal(!addExperienceModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setAddExperienceModal(false)}
          />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.AddExperienceTxt}>Add Experience</Text>
              <TouchableOpacity>
                <Icon
                  onPress={() => setAddExperienceModal(false)}
                  name="cross"
                  type="Entypo"
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.cover}>Certificate/License</Text>
            <Pressable
              onPress={() => {
                setAddExperienceModal(false);
                setExperienceListModal(true);
              }}
              style={styles.startEndView}>
              <Text style={styles.timeTxt}>
                {!isObjectEmpty(certificateItem)
                  ? certificateItem?.name
                  : 'Please select certificate or license'}
              </Text>
              <Icon
                name="caretdown"
                type="AntDesign"
                style={styles.angleIcon}
              />
            </Pressable>
            {/* <TextInput
              placeholder="Please type name of certificate or license"
              placeholderTextColor="#969696"
              style={styles.input}
              value={certificate}
              onChangeText={(value) => {
                (certificate.name = value), (certificate.id = value);
                setCertificate({...certificate});
              }}
            /> */}
            {error.certificate && (
              <Text style={{color: 'red'}}>{error.certificate}</Text>
            )}
            <View style={styles.checkboxView}>
              <CheckBox
                color={certificateItem.required ? '#002E6D' : '#393939'}
                checked={certificateItem.required === 1 ? true : false}
                onPress={() => {
                  certificateItem.required === 1
                    ? (certificateItem.required = 0)
                    : (certificateItem.required = 1);
                  setCertificate({...certificate});
                }}
              />
              <Text style={styles.workerTxt}>
                The worker is required to have this certificate/license
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => addCertificateAndLicence()}>
              <Text style={styles.addTxt}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={exprienceListModal}
        onRequestClose={() => {
          setExperienceListModal(!exprienceListModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setExperienceListModal(false)}
          />
          <View style={styles.modalView}>
            <View style={[styles.topView, {marginBottom: 15}]}>
              <Text style={styles.AddExperienceTxt}>
                Experience/Certificate
              </Text>
              <TouchableOpacity>
                <Icon
                  onPress={() => setExperienceListModal(false)}
                  name="cross"
                  type="Entypo"
                  style={styles.crossIcon}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {exprienceList &&
                exprienceList?.length > 0 &&
                exprienceList.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        let data = {
                          id: item.id,
                          name: item.name,
                          required: 0,
                        };
                        console.log(data);
                        setCertificateItem(data);
                        setExperienceListModal(false);
                        setAddExperienceModal(true);
                      }}
                      style={{
                        marginBottom: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'black',
                      }}>
                      <Text style={{fontSize: 16, marginBottom: 5}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={removeMmodal}
        onRequestClose={() => {
          setRemoveMmodal(!removeMmodal);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setRemoveMmodal(false)} />
          <View style={styles.modalView}>
            <View style={styles.contentView}>
              <Image source={require('../../../assets/minus.png')} />
              <Text style={styles.removeTxt}>Remove Certificate/License</Text>
              <Text style={styles.sureTxt}>
                Are you sure you want to remove this Certificate/ License?
              </Text>
              <View style={styles.btnsView}>
                <TouchableOpacity
                  style={[styles.yesNoBtn, {backgroundColor: '#F1F1F1'}]}
                  onPress={() => removeExprienceItem()}>
                  <Text style={styles.yesNoTxt}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.yesNoBtn, {backgroundColor: '#FFCC41'}]}
                  onPress={() => setRemoveMmodal(!removeMmodal)}>
                  <Text style={styles.yesNoTxt}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Experience;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(32),
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
    marginBottom: verticalScale(16),
  },
  plusIcon: {
    color: '#002E6D',
    fontSize: moderateScale(13),
  },
  experienceTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  continueBtnView: {
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
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
    height: verticalScale(289),
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
  contentView: {
    alignItems: 'center',
  },
  crossIcon: {
    color: '#5E5E5E',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddExperienceTxt: {
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
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  workerTxt: {
    paddingStart: moderateScale(15),
    color: '#545454',
  },
  addBtn: {
    backgroundColor: '#002E6D',
    marginTop: verticalScale(24),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  addTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  certificateView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#002E6D',
    // backgroundColor: 'red',
    paddingVertical: verticalScale(11),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(4),
    marginBottom: verticalScale(10),
  },
  certificateNameTxt: {
    color: 'white',
    fontWeight: 'bold',

    width: '90%',
  },
  cross: {
    color: '#fff',
    fontSize: moderateScale(12),
  },
  removeTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginTop: verticalScale(20),
  },
  sureTxt: {
    color: '#545454',
    marginTop: verticalScale(12),
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  btnsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  yesNoBtn: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(4),
    marginVertical: verticalScale(24),
  },
  yesNoTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
  },
  inputCertificate: {
    color: '#969696',
    backgroundColor: '#EBF7F9',
    // height: verticalScale(40),
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(4),
    paddingVertical: verticalScale(14),
  },
  certificateListView: {
    marginVertical: verticalScale(15),
  },
  innerList: {
    paddingVertical: verticalScale(15),
  },
  // certificateNameTxt: {
  //   // color: '#979797',
  //   fontSize: moderateScale(15),
  // },
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
  continueBtnViewNew: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 25,
    position: 'absolute', //Here is the trick
    bottom: -25, //Here is the trick
  },
  continueBtnNew: {
    backgroundColor: '#FFCC41',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
  },
  continueTxtNew: {
    color: '#003862',
    fontWeight: 'bold',
  },
});
