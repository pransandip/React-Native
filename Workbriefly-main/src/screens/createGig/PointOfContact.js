import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';
import {useEffect} from 'react';

const {height, width} = Dimensions.get('window');

const PointOfContact = ({
  handleFormData,
  values,
  error,
  userData,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const [payFrequency, setPayFrequency] = useState('');

  const yesNo = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
  ];

  useEffect(() => {
    console.log('imran', userData);
  }, []);

  const disableCheck = () => {
    let disable = false;
    if (values?.type === '') {
      disable = true;
    }
    if (values?.name === '') {
      disable = true;
    }
    if (values?.contact_number === '') {
      disable = true;
    }
    return disable;
  };

  return (
    <View style={styles.root}>
      {/* <ScrollView> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.bodyView}>
            <Text style={styles.stepNoTxt}>STEP 6 OF 6</Text>
            <Text style={styles.stepDescTxt}>Point of Contact</Text>

            <View style={styles.descView}>
              <Text style={styles.fillTxt}>
                Point of Contact refers to the person who will be responding to
                worker inquiries, checking workers in and out, as well as
                briefing workers upon their arrival for the gig. This may be
                yourself or someone in the company e.g. a site manager or the
                shift manager.
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Are you the point of contact?</Text>
                <Icon
                  name="asterisk"
                  type="FontAwesome"
                  style={{
                    fontSize: moderateScale(5),
                    marginTop: verticalScale(10),
                    color: '#D72F2F',
                  }}
                />
              </View>
              <View style={styles.singleMultiple}>
                <RadioForm
                  formHorizontal={true}
                  buttonColor={'#979797'}
                  initial={0}>
                  {yesNo.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={values?.type === obj.value}
                        onPress={(val) => {
                          if (val === 'yes') {
                            handleFormData('type', val);
                            handleFormData(
                              'name',
                              userData?.first_name + ' ' + userData.last_name,
                            );
                            handleFormData('contact_number', userData?.mobile);
                            handleFormData('title', values?.position);
                          } else {
                            handleFormData('type', val);
                            handleFormData('name', '');
                            handleFormData('contact_number', '');
                            handleFormData('title', '');
                          }
                        }}
                        borderWidth={1}
                        buttonInnerColor={'#002E68'}
                        buttonOuterColor={
                          values?.type === obj.value ? '#002E68' : '#002E68'
                        }
                        buttonSize={8}
                        buttonOuterSize={16}
                        buttonStyle={{}}
                        // buttonWrapStyle={{marginLeft: 10}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(val) => {
                          if (val === 'yes') {
                            handleFormData('type', val);
                            handleFormData('name', userData?.business_name);
                            handleFormData('contact_number', userData?.mobile);
                            handleFormData('title', values?.position);
                          } else {
                            handleFormData('type', val);
                            handleFormData('name', '');
                            handleFormData('contact_number', '');
                            handleFormData('title', '');
                          }
                        }}
                        labelStyle={{
                          fontSize: 16,
                          color: '#393939',
                          marginRight: 40,
                          fontWeight: 'bold',
                        }}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Name</Text>
                <Icon
                  name="asterisk"
                  type="FontAwesome"
                  style={{
                    fontSize: moderateScale(5),
                    marginTop: verticalScale(10),
                    color: '#D72F2F',
                  }}
                />
              </View>
              <TextInput
                value={values.name}
                style={styles.input}
                onChangeText={(value) => {
                  handleFormData('name', value);
                }}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Title</Text>
                <Icon
                  name="asterisk"
                  type="FontAwesome"
                  style={{
                    fontSize: moderateScale(5),
                    marginTop: verticalScale(10),
                    color: '#D72F2F',
                  }}
                />
              </View>
              <TextInput
                value={values.title}
                style={styles.input}
                onChangeText={(value) => {
                  handleFormData('title', value);
                }}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Contact Number</Text>
                <Icon
                  name="asterisk"
                  type="FontAwesome"
                  style={{
                    fontSize: moderateScale(5),
                    marginTop: verticalScale(10),
                    color: '#D72F2F',
                  }}
                />
              </View>
              <TextInput
                value={values.contact_number}
                style={styles.input}
                onChangeText={(value) => {
                  handleFormData('contact_number', value);
                }}
              />
            </View>
            {/* <View style={styles.continueBtnView}>
            <TouchableOpacity style={styles.continueBtn}>
              <Text style={styles.continueTxt}>Continue</Text>
            </TouchableOpacity>
          </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.continueBtnView]}>
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
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default PointOfContact;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
    // backgroundColor: 'red',
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
    paddingBottom: verticalScale(50),
  },
  fillTxt: {
    color: '#545454',
  },
  cover: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(24),
  },
  singleMultiple: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: verticalScale(20),
  },
  input: {
    backgroundColor: '#EBF7F9',
    height: verticalScale(40),
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(4),
    color: '#000',
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 0,
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
