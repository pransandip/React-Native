import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import DetailsHeader from '../../components/headers/DetailsHeader';
import OverView from './OverView';
import Experience from './Experience';
import Location from './Location';
import WorkDates from './WorkDates';
import Instructions from './Instructions';
import PointOfContact from './PointOfContact';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Axios from '../../api/Axios';
import Success from './Success';
import GigSummary from '../gigSummary/GigSummary';
import PostPreview from '../gigSummary/PostPreview';
import CostSummary from '../gigSummary/CostSummary';
import Snackbar from 'react-native-snackbar';

const {height, width} = Dimensions.get('window');

const CreateAGig = (props) => {
  const [back, setBack] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    vacancies: '',
    description: '',
    certificate: [],
    cover_image: {},
    dayType: 'single',
    date: new Date(1598051730000),
    startDate: new Date(),
    endDate: new Date(),
    criminal_record_required: 0,
    position: '',
    certificate_and_licence: [],
    transit: '',
    location_id: '',
    starttime: new Date(),
    endtime: new Date(),
    unpaid_break: '',
    paid_break: '',
    pay_frequency: 'daily',
    hourly_pay: 0,
    total_hours_per_worker: 0,
    subtotal: 0,
    admin_fee_percent: 0,
    admin_fee_amount: 0,
    tax_percent: 0,
    tax_amount: 0,
    total_amount: 0,
    attire: '',
    additional_info: '',
    things_to_bring: '',
    type: '',
    name: '',
    contact_number: '',
    selectedLatitude: 22.58,
    selectedLongitude: 71.9,
  });
  const [press, setPress] = useState(false);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);

  const handleBack = (val) => {
    props.navigation.goBack();
  };

  const handleCertificate = (value) => {
    console.log(value);
    formData.certificate_and_licence.push(value);
  };

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    console.log(step);
    if (step === 9) {
      props.navigation.navigate('BottomTab', {
        screen: 'GigList',
      });
    }
    if (validateFormOne()) {
      setStep(step + 1);
    } else return;
    if (step === 5 && validateFormFive()) {
      setStep(step + 1);
    } else return;
    if (step === 6) {
      createGig();
    } else return;
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFormData = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      console.log(value);
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
    });
  }, []);

  const getFormData = (object) => {
    let newObj = {
      ...object,
    };
    if (formData?.dayType === 'single') {
      delete newObj['enddate'];
    }
    const formDataNew = new FormData();
    Object.keys(newObj).forEach((key) => formDataNew.append(key, object[key]));
    return formDataNew;
  };

  const createGig = () => {
    console.log(
      formData?.certificate_and_licence.map(({name, ...rest}) => ({...rest})),
    );
    let postData = {
      cover_image: formData?.cover_image,
      description: formData?.description,
      position: formData?.position,
      vacancies: parseInt(formData?.vacancies),
      criminal_record_required: 0,
      location_id: parseInt(formData?.location_id),
      transit: formData?.transit ? formData?.transit.join(', ') : '',
      certificate_and_licence: JSON.stringify(
        formData?.certificate_and_licence.map(({name, ...rest}) => ({...rest})),
      ),
      day_type: formData?.dayType,
      startdate: formData?.startDate.toString(),
      enddate: formData?.endDate.toString(),
      starttime: formData?.starttime.toString(),
      endtime: formData?.endtime.toString(),
      unpaid_break: parseInt(formData?.unpaid_break),
      paid_break: parseInt(formData?.paid_break),
      pay_frequency: formData?.pay_frequency,
      hourly_pay: parseFloat(formData?.hourly_pay),
      total_hours_per_worker: formData?.total_hours_per_worker,
      subtotal: formData?.subtotal,
      admin_fee_percent: formData?.admin_fee_percent,
      admin_fee_amount: formData?.admin_fee_amount,
      tax_percent: formData?.tax_percent,
      tax_amount: formData?.tax_amount,
      total_amount: formData?.total_amount,
      attire: formData?.attire,
      additional_info: formData?.additional_info,
      things_to_bring: formData?.things_to_bring,
      type: formData?.type,
      name: formData?.name,
      title: formData?.title,
      contact_number: formData?.contact_number,
      status: 'active',
    };
    let requestBody = getFormData({...postData});
    console.log(requestBody, token);
    Axios({
      method: 'POST',
      url: 'api/gig/create',
      data: requestBody,
      headers: {
        Authorization: `${token}`,
        'content-type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          nextStep();
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // validate form - 1
  const validateFormOne = () => {
    const {position, vacancies, description} = formData;
    let errors = {};
    let isFormValid = true;
    if (!position || position === '') {
      errors['position'] = 'Please enter position';
      isFormValid = false;
    }
    if (!vacancies || vacancies === '') {
      errors['vacancies'] = 'Please enter vacancies';
      isFormValid = false;
    }
    if (vacancies === '0') {
      errors['vacancies'] = 'Please enter more then 0 vacancies';
      isFormValid = false;
    }
    if (!description || description === '') {
      errors['description'] = 'Please enter description';
      isFormValid = false;
    }
    setErrors(errors);
    setTimeout(() => {
      setErrors({});
    }, 2000);
    return isFormValid;
  };

  const validateFormFive = () => {
    let errors = {};
    let isFormvalid = true;

    if (formData?.attire === '') {
      errors['attire'] = 'Please enter attire';
      isFormvalid = false;
    }
    setErrors(errors);
    setTimeout(() => {
      setErrors({});
    }, 2000);
    return isFormvalid;
  };

  const isObjectEmpty = (object) => {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  };

  useEffect(() => {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this.disableCheck();
    // });
    disableCheck();
  }, [formData]);

  const disableCheck = () => {
    let disable = true;

    // Step 1:
    if (step === 1) {
      if (formData?.position === '') {
        disable = false;
      }
      if (isObjectEmpty(formData?.cover_image)) {
        disable = false;
      }
      if (formData?.description === '') {
        disable = false;
      }
    }

    // Step 2:
    // if (step === 2) {
    //   // console.log(`length-------->>`, formData?.certificate_and_licence.length);
    //   if (formData?.certificate_and_licence.length === 0) {
    //     disable = false;
    //   }
    // }

    // Step 3:
    // if (step === 3) {
    //   if (formData?.location_id === null) {
    //     disable = false;
    //   }
    //   if (formData?.transit === '') {
    //     disable = false;
    //   }
    //   if (formData?.selectedLongitude === 71.9) {
    //     disable = false;
    //   }
    //   if (formData?.selectedLatitude === 22.58) {
    //     disable = false;
    //   }
    // }

    // Step 4:
    if (step === 4) {
      if (formData?.dayType == '') {
        disable = false;
      }
      if (formData?.startDate === null) {
        disable = false;
      }
      if (formData?.starttime === null) {
        disable = false;
      }
      if (formData?.endtime === null) {
        disable = false;
      }
      if (formData?.unpaid_break === null) {
        disable = false;
      }
      if (formData?.paid_break === null) {
        disable = false;
      }
      if (formData?.pay_frequency === '') {
        disable = false;
      }
    }

    // Step 5:
    if (step === 5) {
      if (formData?.attire === '') {
        disable = false;
      }
    }

    // Step 6:
    if (step === 6) {
      if (formData?.name === '') {
        disable = false;
      }
      if (formData?.title === '') {
        disable = false;
      }
      if (formData?.contact_number === '') {
        disable = false;
      }
    }

    return disable;
  };

  return (
    <SafeAreaView style={styles.root}>
      <DetailsHeader
        back={handleBack}
        headerTxt="Create a Gig"
        disable={true}
      />
      {step === 1 ? (
        <OverView
          handleFormData={handleFormData}
          values={formData}
          errors={errors}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 2 ? (
        <Experience
          handleFormData={handleFormData}
          values={formData}
          errors={errors}
          handleCertificate={handleCertificate}
          token={token}
          type={'create'}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 3 ? (
        <Location
          handleFormData={handleFormData}
          values={formData}
          errors={errors}
          type={'create'}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 4 ? (
        <WorkDates
          handleFormData={handleFormData}
          values={formData}
          errors={errors}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 5 ? (
        <Instructions
          handleFormData={handleFormData}
          values={formData}
          errors={errors}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 6 ? (
        <PointOfContact
          handleFormData={handleFormData}
          values={formData}
          errors={errors}
          userData={userData}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 7 ? (
        <PostPreview
          values={formData}
          userData={userData}
          token={token}
          type={'create'}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : step === 8 ? (
        <CostSummary
          values={formData}
          userData={userData}
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      ) : (
        <Success
          nextStep={nextStep}
          createGig={createGig}
          step={step}
          prevStep={prevStep}
        />
      )}
      {/* <View style={[styles.continueBtnView]}>
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
            disabled={disableCheck() === false ? true : false}
            style={
              disableCheck() === false
                ? [
                    styles.continueBtn,
                    {
                      backgroundColor: '#F0E9D7',
                      width: step === 1 ? '100%' : '45%',
                    },
                  ]
                : [
                    styles.continueBtn,
                    {
                      width: step === 1 ? '100%' : '45%',
                    },
                  ]
            }
            onPress={() => (step === 8 ? createGig() : nextStep())}>
            <Text style={styles.continueTxt}>Continue</Text>
          </TouchableOpacity>
        </View> */}
    </SafeAreaView>
  );
};

export default CreateAGig;

const styles = StyleSheet.create({
  root: {
    // height: height,
    flex: 1,
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: /* Platform.OS === 'ios' ? 20 : 60, */ 0,
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
