import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import DetailsHeader from '../../components/headers/DetailsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const {width, height} = Dimensions.get('window');

const CostSummary = ({
  values,
  userData,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const disableCheck = () => {};
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.bodyView}>
            <Text style={styles.stepNoTxt}>STEP 2 OF 2</Text>
            <Text style={styles.stepDescTxt}>Cost Summary</Text>
            <View style={styles.breakdownView}>
              <Text style={styles.breakdownTxt}>Cost Breakdown</Text>
              <View style={styles.breakdownDeskInputView}>
                <Text style={styles.breakdownDeskTxt}>No. of workers</Text>

                <Text style={styles.breakdownDeskTxt}>{values?.vacancies}</Text>
              </View>
              <View style={styles.breakdownDeskInputView}>
                <Text style={styles.breakdownDeskTxt}>Hourly pay</Text>

                <Text style={styles.breakdownDeskTxt}>
                  ${values?.hourly_pay}
                </Text>
              </View>
              <View style={styles.breakdownDeskInputView}>
                <Text style={styles.breakdownDeskTxt}>Total hour/worker</Text>

                <Text style={styles.breakdownDeskTxt}>
                  {values?.total_hours_per_worker.toFixed(2)}
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
                <Text style={styles.breakdownDeskTxt}>Tax (20%)</Text>

                <Text style={styles.breakdownDeskTxt}>
                  ${values?.admin_fee_amount.toFixed(2)}
                </Text>
              </View>
              <View
                style={[
                  styles.breakdownDeskInputView,
                  {marginTop: verticalScale(12)},
                ]}>
                <Text style={styles.breakdownDeskTxt}>Fee (5%)</Text>

                <Text style={styles.breakdownDeskTxt}>
                  ${values?.tax_amount.toFixed(2)}
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
                  ${values?.total_amount.toFixed(2)}
                </Text>
              </View>
            </View>
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
    </View>
  );
};

export default CostSummary;

const styles = StyleSheet.create({
  root: {
    height: height,
    flex: 1,
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
  breakdownView: {
    borderWidth: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(20),
    borderColor: '#979797',
    marginTop: verticalScale(20),
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
