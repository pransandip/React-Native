import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-date-picker';
import {Icon} from 'native-base';
import moment from 'moment';

import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import DateComponent from './DateComponent';
import EndDateComponent from './EndDateCompoent';
const {height, width} = Dimensions.get('window');

const WorkDates = ({
  handleFormData,
  values,
  errors,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const [payFrequency, setPayFrequency] = useState('');
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState({});
  var days = [
    {label: 'Single Day', value: 'single'},
    {label: 'Multiple Day', value: 'multiple'},
  ];

  var dailyWeekly = [
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
  ];

  useEffect(() => {
    console.log('daytype', values);
    // calculateTotalWorkingHours(values?.unpaid_break, values?.starttime, values?.endtime)
  }, [values]);

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const getSubtotalValue = (worker, hourlyPay, time) => {
    console.log('data', worker, hourlyPay, time);
    let subTotalValue = worker * hourlyPay * parseFloat(time);
    handleFormData('subtotal', subTotalValue);
    getTotal(subTotalValue);
  };

  const getTotal = (subTotalValue) => {
    let fee = (subTotalValue / 100) * parseFloat(20);
    let tax = (subTotalValue / 100) * parseFloat(5);
    let Total_amount = subTotalValue + fee + tax;
    handleFormData('admin_fee_amount', fee);
    handleFormData('tax_amount', tax);
    handleFormData('total_amount', Total_amount);
  };

  const timeCalculation = (startTime, endTime) => {
    var start = moment(startTime);
    var end = moment(endTime);
    let workingTime = parseFloat(end.diff(start, 'hours', 'minutes', true));
    handleFormData(
      'total_hours_per_worker',
      parseFloat(end.diff(start, 'hours', 'minutes', true)),
    );
    handleFormData(
      'total_hours_per_worker',
      parseFloat(end.diff(start, 'hours', 'minutes', true)),
    );
    if (workingTime > 0) {
      getSubtotalValue(
        parseInt(values?.vacancies),
        parseFloat(values?.hourly_pay),
        parseFloat(workingTime),
      );
    }
  };

  const calculateTotalWorkingHours = (unPaid, startTime, endTime) => {
    var start = moment(startTime);
    var end = moment(endTime);
    let workingTime = parseFloat(end.diff(start, 'hours', 'minutes', true));
    let mins = Math.floor(workingTime * 60);

    let actualTime = mins - unPaid;
    let total_hours_per_worker = actualTime / 60;
    handleFormData('total_hours_per_worker', total_hours_per_worker);
    getSubtotalValue(
      parseInt(values?.vacancies),
      parseFloat(values?.hourly_pay),
      actualTime / 60,
    );
  };

  useEffect(() => {
    let error = {};
    if (values?.starttime.getTime() > values?.endtime.getTime()) {
      error['startdate'] = 'Start time always less then end time';
    }
    setError(error);
  }, [values]);

  const disableCheck = () => {
    let disable = false;
    console.log(
      'starttime',
      values?.starttime.getTime() - values?.endtime.getTime(),
    );
    console.log('endDate', values?.endtime.getTime());
    if (values?.paid_break === '') {
      disable = true;
    }
    if (values?.unpaid_break === '') {
      disable = true;
    }
    if (values?.hourly_pay === 0) {
      disable = true;
    }
    return disable;
  };

  return (
    <View style={styles.root}>
      {/* <ScrollView> */}
      <KeyboardAvoidingView
      // behavior={Platform.OS === 'android' ? 'height' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.bodyView}>
            <Text style={styles.stepNoTxt}>STEP 4 OF 6</Text>
            <Text style={styles.stepDescTxt}>Work Dates & Pay Frequency</Text>
            <View style={styles.descView}>
              <Text style={styles.fillTxt}>
                Please add each date and time that you require workers for this
                gig in addition to the hourly rate of pay.
              </Text>
              <View style={styles.singleMultiple}>
                <RadioForm
                  formHorizontal={true}
                  buttonColor={'#979797'}
                  initial={0}>
                  {days.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={values?.dayType === obj.value}
                        onPress={(val) => {
                          console.log(val);
                          handleFormData('dayType', val);
                        }}
                        borderWidth={1}
                        buttonInnerColor={'#002E68'}
                        buttonOuterColor={
                          payFrequency === i ? '#002E68' : '#002E68'
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
                        onPress={(val) => handleFormData('dayType', val)}
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
                <Text style={styles.cover}>
                  {values?.dayType === 'single' ? 'Date' : 'Start Date'}
                </Text>
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
              <DateComponent handleFormData={handleFormData} values={values} />

              {values?.dayType === 'multiple' && (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.cover}>End Date</Text>
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
                  <EndDateComponent
                    handleFormData={handleFormData}
                    values={values}
                  />
                </>
              )}
              {/* <TextInput
            placeholder="Enter gig position/title"
            placeholderTextColor="#969696"
            style={styles.input}
          /> */}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Start Time</Text>
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
              <TouchableOpacity
                onPress={() => setStartTimeModal(true)}
                style={styles.startEndView}>
                <Text style={styles.timeTxt}>
                  {' '}
                  {startTime ? formatAMPM(values?.starttime) : '0:00 AM'}
                </Text>
                <Icon
                  name="caretdown"
                  type="AntDesign"
                  style={styles.angleIcon}
                />
              </TouchableOpacity>
              {error.startdate && (
                <Text style={{color: 'red'}}>{error.startdate}</Text>
              )}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>End Time</Text>
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
              <TouchableOpacity
                onPress={() => {
                  setEndTimeModal(true);
                  calculateTotalWorkingHours(
                    values?.unpaid_break,
                    values?.starttime,
                    values?.endtime,
                  );
                }}
                style={styles.startEndView}>
                <Text style={styles.timeTxt}>
                  {endTime ? formatAMPM(values?.endtime) : '0:00 AM'}
                </Text>
                <Icon
                  name="caretdown"
                  type="AntDesign"
                  style={styles.angleIcon}
                />
              </TouchableOpacity>

              <Text style={styles.paidUnpaidTxt}>
                Please indicate how many minutes of unpaid and/or paid breaks
                there are for this gig.
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Unpaid Break</Text>
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
                value={values?.unpaid_break}
                placeholder="Enter mins of unpaid break"
                placeholderTextColor="#969696"
                style={styles.input}
                onChangeText={(value) => {
                  handleFormData('unpaid_break', value);
                  let unpaid = parseFloat(value === '' ? 0 : value);
                  let workingTime = parseFloat(
                    values?.total_hours_per_worker * 60,
                  );
                  if (workingTime > unpaid) {
                    calculateTotalWorkingHours(
                      value === '' ? 0 : value,
                      values?.starttime,
                      values?.endtime,
                    );
                  } else {
                    calculateTotalWorkingHours(
                      0,
                      values?.starttime,
                      values?.endTime,
                    );
                  }
                }}
              />
              {error?.unpaidbreak && (
                <Text style={{color: 'red'}}>{error.unpaidbreak}</Text>
              )}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Paid Break</Text>
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
                value={values?.paid_break}
                placeholder="Enter mins of paid break"
                placeholderTextColor="#969696"
                style={styles.input}
                onChangeText={(value) => {
                  handleFormData('paid_break', value);
                }}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Pay Frequency</Text>
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
                  {dailyWeekly.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={values.pay_frequency === obj.value}
                        onPress={(val) => handleFormData('pay_frequency', val)}
                        borderWidth={1}
                        buttonInnerColor={'#002E68'}
                        buttonOuterColor={
                          values.pay_frequency === obj.value
                            ? '#002E68'
                            : '#002E68'
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
                        onPress={(val) => handleFormData('pay_frequency', val)}
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
            </View>

            <View style={{...styles.descView}}>
              <Text style={styles.breakdownTxt}>Cost Breakdown</Text>
              <View style={styles.breakdownDeskInputView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.breakdownDeskTxt}>No. of workers</Text>
                  <Icon
                    name="asterisk"
                    type="FontAwesome"
                    style={{
                      fontSize: moderateScale(5),
                      marginBottom: verticalScale(12),
                      color: '#D72F2F',
                    }}
                  />
                </View>
                <TextInput
                  value={values?.vacancies}
                  placeholder="2"
                  placeholderTextColor="#393939"
                  style={styles.breakdownInput}
                  onChangeText={(value) => {
                    handleFormData('vacancies', value);
                    if (
                      values?.hourly_pay !== '' &&
                      values?.total_hours_per_worker &&
                      values?.total_hours_per_worker > 0
                    ) {
                      getSubtotalValue(
                        parseInt(value),
                        parseFloat(values?.hourly_pay),
                        values?.total_hours_per_worker,
                      );
                    }
                  }}
                />
              </View>
              <View style={styles.breakdownDeskInputView}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.breakdownDeskTxt}>Hourly Pay</Text>
                  <Icon
                    name="asterisk"
                    type="FontAwesome"
                    style={{
                      fontSize: moderateScale(5),
                      marginBottom: verticalScale(12),
                      color: '#D72F2F',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#EBF7F9',
                  }}>
                  <Text>$</Text>
                  <TextInput
                    value={values?.hourly_pay}
                    placeholder="$0.00"
                    placeholderTextColor="#393939"
                    style={styles.breakdownInput}
                    onChangeText={(value) => {
                      handleFormData('hourly_pay', value);
                      if (
                        values?.vacancies !== '' &&
                        values?.total_hours_per_worker &&
                        values?.total_hours_per_worker > 0
                      ) {
                        getSubtotalValue(
                          parseInt(values?.vacancies),
                          parseFloat(value),
                          values?.total_hours_per_worker,
                        );
                      }
                    }}
                  />
                </View>
              </View>
              <View style={styles.breakdownDeskInputView}>
                <Text style={styles.breakdownDeskTxt}>Total hour/worker</Text>

                <Text style={styles.breakdownDeskTxt}>
                  {values?.total_hours_per_worker
                    ? values.total_hours_per_worker.toFixed(2)
                    : '0'}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#979797',
                  borderBottomWidth: 1,
                  width: '45%',
                  marginTop: verticalScale(12),
                  marginStart: '60%',
                }}
              />
              <View style={styles.breakdownDeskInputView}>
                <Text style={styles.breakdownDeskTxt}>Subtotal</Text>

                <Text style={styles.breakdownDeskTxt}>
                  ${values?.subtotal.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#979797',
                  borderBottomWidth: 1,
                  marginTop: verticalScale(12),
                }}
              />
              <View
                style={[
                  styles.breakdownDeskInputView,
                  {marginTop: verticalScale(12)},
                ]}>
                <Text style={styles.breakdownDeskTxt}>Fee (20%)</Text>

                <Text style={styles.breakdownDeskTxt}>
                  $
                  {values?.admin_fee_amount
                    ? values.admin_fee_amount.toFixed(2)
                    : '0'}
                </Text>
              </View>
              <View
                style={[
                  styles.breakdownDeskInputView,
                  {marginTop: verticalScale(12)},
                ]}>
                <Text style={styles.breakdownDeskTxt}>Tax (5%)</Text>

                <Text style={styles.breakdownDeskTxt}>
                  ${values?.tax_amount ? values.tax_amount.toFixed(2) : '0'}
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: '#979797',
                  borderBottomWidth: 1,
                  marginTop: verticalScale(12),
                }}
              />
              <View
                style={[
                  styles.breakdownDeskInputView,
                  {marginBottom: verticalScale(32)},
                ]}>
                <Text style={[styles.breakdownDeskTxt, {fontWeight: '900'}]}>
                  Total Amount
                </Text>

                <Text style={[styles.breakdownDeskTxt, {fontWeight: 'bold'}]}>
                  ${values?.total_amount ? values.total_amount.toFixed(2) : '0'}
                </Text>
              </View>
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

      <Modal
        transparent={true}
        visible={startTimeModal}
        onRequestClose={() => {
          setStartTimeModal(!startTimeModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setStartTimeModal(false)}
          />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.startEndTime}>Start Time</Text>
              <Icon
                onPress={() => setStartTimeModal(false)}
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
              />
            </View>
            <Text style={styles.startEndTxt}>You can set start time.</Text>
            <View style={styles.timePicker}>
              <DatePicker
                mode="time"
                date={values?.starttime}
                onDateChange={(value) => {
                  handleFormData('starttime', value);
                  timeCalculation(value, values?.endtime);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setStartTimeModal(false)}>
              <Text style={styles.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={endTimeModal}
        onRequestClose={() => {
          setEndTimeModal(!endTimeModal);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setEndTimeModal(false)} />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.startEndTime}>End Time</Text>
              <Icon
                onPress={() => setEndTimeModal(false)}
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
              />
            </View>
            <Text style={styles.startEndTxt}>You can set end time.</Text>
            <View style={styles.timePicker}>
              <DatePicker
                mode="time"
                date={values?.endtime}
                onDateChange={(value) => {
                  handleFormData('endtime', value);
                  timeCalculation(values?.starttime, value);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => {
                setEndTimeModal(false);
                calculateTotalWorkingHours(
                  values?.unpaid_break,
                  values?.starttime,
                  values?.endtime,
                );
              }}>
              <Text style={styles.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WorkDates;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
    // backgroundColor: 'red',
    // marginBottom: verticalScale(700),
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
  singleMultiple: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: verticalScale(20),
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
    color: 'black',
  },
  angleIcon: {
    fontSize: moderateScale(12),
  },
  paidUnpaidTxt: {
    color: '#545454',
    marginTop: verticalScale(56),
    fontSize: moderateScale(11),
  },
  breakdownTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  breakdownDeskInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  breakdownDeskTxt: {
    color: '#393939',
  },
  breakdownInput: {
    backgroundColor: '#EBF7F9',
    height: verticalScale(32),
    width: moderateScale(80),
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
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
  startEndTime: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  crossIcon: {
    color: '#5E5E5E',
  },
  startEndTxt: {
    color: '#545454',
    marginTop: verticalScale(8),
    fontSize: moderateScale(12),
  },
  saveBtn: {
    backgroundColor: '#FFCC41',
    marginTop: verticalScale(24),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  saveTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  timePicker: {
    marginStart: moderateScale(50),
    height: verticalScale(150),
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: /* Platform.OS === 'ios' ? 0 : */ 0,
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
