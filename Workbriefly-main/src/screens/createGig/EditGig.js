import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
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

const EditGig = (props) => {
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
    certificate_and_licence: [{id: 1, required: 0}],
    transit: 'Transit options are only a walk away',
    location_id: '',
    starttime: new Date(),
    endtime: new Date(),
    unpaid_break: 0,
    paid_break: 0,
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
    type: 'yes',
    name: '',
    contact_number: '',
  });
  const [press, setPress] = useState(false);
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [id, setId] = useState(props.route.params.id);

  const getSpecifcGig = () => {
    Axios({
      method: 'GET',
      url: 'api/gig/specific/' + id,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          let details = response.data.data[0];
          handleFormData('position', details?.position);
          handleFormData('vacancies', details?.vacancies);
          handleFormData('description', details?.description);
          handleFormData('dayType', details?.day_type);
          handleFormData('startDate', new Date(details?.startdate));
          handleFormData('endDate', new Date(details?.enddate));
          handleFormData('starttime', new Date(details?.starttime));
          handleFormData('endtime', new Date(details?.endtime));
          handleFormData('unpaid_break', details?.unpaid_break);
          handleFormData('paid_break', details?.paid_break);
          handleFormData('pay_frequency', details?.pay_frequency);
          handleFormData('hourly_pay', details?.hourly_pay.toString());
          handleFormData(
            'total_hours_per_worker',
            details?.total_hours_per_worker,
          );
          handleFormData(
            'certificate_and_licence',
            details.experience.map(
              ({
                certificate_and_licence_id: id,
                gig_id,
                id: exprience_id,
                required,
              }) => ({
                id,
                gig_id,
                exprience_id,
                required,
              }),
            ),
          );
          handleFormData('subtotal', details?.subtotal);
          handleFormData('admin_fee_amount', details?.admin_fee_amount);
          handleFormData('tax_amount', details?.tax_amount);
          handleFormData('total_amount', details?.total_amount);
          handleFormData('attire', details?.attire);
          handleFormData('additional_info', details?.additional_info);
          handleFormData('things_to_bring', details?.things_to_bring);
          handleFormData('type', details?.type);
          handleFormData('name', details?.name);
          handleFormData('title', details?.title);
          handleFormData('contact_number', details?.contact_number);
          handleFormData('cover_image', details?.cover_image);
          handleFormData('applicant', details?.applicant);
          handleFormData('bookedworkers', details?.bookedworkers);
          handleFormData('experience', details?.experience);
          handleFormData('createdAt', details?.createdAt);
          handleFormData('location_id', details?.location_id);
          handleFormData(
            'criminal_record_required',
            details?.criminal_record_required,
          );
          handleFormData(
            'transit',
            details?.transit.split(',').map((el) => `${el.trim()}`),
          );
        }
        console.log(response?.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const handleBack = (val) => {
    props.navigation.goBack();
  };

  const handleCertificate = (value) => {
    formData.certificate_and_licence.push(value);
    console.log(formData.certificate);
  };

  const isObjectEmpty = (object) => {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  };

  const disableCheck = () => {
    let disable = true;
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
    return disable;
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
      getSpecifcGig();
    });
  }, [token]);

  const getFormData = (object) => {
    let newObj = {
      ...object,
    };
    const formDataNew = new FormData();
    Object.keys(newObj).forEach((key) => formDataNew.append(key, object[key]));
    return formDataNew;
  };

  const createGig = () => {
    let postData = {
      cover_image: formData?.cover_image,
      description: formData?.description,
      id: props.route.params.id,
      user_id: userData?.id,
      position: formData?.position,
      vacancies: parseInt(formData?.vacancies),
      criminal_record_required: formData?.criminal_record_required,
      location_id: parseInt(formData?.location_id),
      transit: formData.transit ? formData.transit.join(',') : '',
      certificate_and_licence: JSON.stringify(formData.certificate_and_licence),
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
      // applicant: formData?.applicant,
      // bookedworkers: formData?.bookedworkers,
      // experience: formData?.experience,
      // createdAt: formData?.createdAt,
      // updatedAt: new Date(),
    };
    console.log(postData);

    let requestBody = getFormData({...postData});
    Axios({
      method: 'PUT',
      url: 'api/gig/edit/' + props.route.params.id,
      data: requestBody,
      headers: {
        Authorization: `${token}`,
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(response.data.msg);
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

  return (
    <SafeAreaView style={styles.root}>
      <DetailsHeader back={handleBack} headerTxt="Edit a Gig" disable={true} />
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
          type={'edit'}
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
          type={'edit'}
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
          type={'edit'}
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
    </SafeAreaView>
  );
};

export default EditGig;

const styles = StyleSheet.create({
  root: {
    height: height,
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
    bottom: Platform.OS === 'ios' ? 20 : 60,
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
