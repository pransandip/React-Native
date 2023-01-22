import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import SettingsHeader from '../../components/Header/SettingsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const {height, width} = Dimensions.get('window');

const Survey = (props) => {
  const [yesNOFrequency, setYesNOFrequency] = useState('');
  const [endSurveyModal, setEndSurveyModal] = useState(false);
  var yesNo = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  return (
    <View view={styles.rootView}>
      <SettingsHeader headerTxt="survey" />

      <ScrollView>
        <View style={styles.bodyView}>
          <Text style={styles.questionTxt}>
            Was the location of the gig a safe place to work?
          </Text>

          <View style={styles.yesNo}>
            <RadioForm
              formHorizontal={true}
              buttonColor={'#979797'}
              initial={0}>
              {yesNo.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={yesNOFrequency === i}
                    onPress={(val) => setYesNOFrequency(val)}
                    borderWidth={1}
                    buttonInnerColor={'#002E68'}
                    buttonOuterColor={
                      yesNOFrequency === i ? '#002E68' : '#002E68'
                    }
                    buttonSize={8}
                    buttonOuterSize={16}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(val) => setYesNOFrequency(val)}
                    labelStyle={{
                      fontSize: 16,
                      color: '#393939',
                      marginRight: 40,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>

          <Text style={styles.questionTxt}>
            Was there a positive work culture at the gig?
          </Text>
          <View style={styles.yesNo}>
            <RadioForm
              formHorizontal={true}
              buttonColor={'#979797'}
              initial={0}>
              {yesNo.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={yesNOFrequency === i}
                    onPress={(val) => setYesNOFrequency(val)}
                    borderWidth={1}
                    buttonInnerColor={'#002E68'}
                    buttonOuterColor={
                      yesNOFrequency === i ? '#002E68' : '#002E68'
                    }
                    buttonSize={8}
                    buttonOuterSize={16}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(val) => setYesNOFrequency(val)}
                    labelStyle={{
                      fontSize: 16,
                      color: '#393939',
                      marginRight: 40,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>

          <Text style={styles.questionTxt}>
            Was the pay fair for the work done?
          </Text>
          <View style={styles.yesNo}>
            <RadioForm
              formHorizontal={true}
              buttonColor={'#979797'}
              initial={0}>
              {yesNo.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={yesNOFrequency === i}
                    onPress={(val) => setYesNOFrequency(val)}
                    borderWidth={1}
                    buttonInnerColor={'#002E68'}
                    buttonOuterColor={
                      yesNOFrequency === i ? '#002E68' : '#002E68'
                    }
                    buttonSize={8}
                    buttonOuterSize={16}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(val) => setYesNOFrequency(val)}
                    labelStyle={{
                      fontSize: 16,
                      color: '#393939',
                      marginRight: 40,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <Text style={styles.questionTxt}>
            Were there positive perks at the gig?
          </Text>
          <View style={styles.yesNo}>
            <RadioForm
              formHorizontal={true}
              buttonColor={'#979797'}
              initial={0}>
              {yesNo.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={yesNOFrequency === i}
                    onPress={(val) => setYesNOFrequency(val)}
                    borderWidth={1}
                    buttonInnerColor={'#002E68'}
                    buttonOuterColor={
                      yesNOFrequency === i ? '#002E68' : '#002E68'
                    }
                    buttonSize={8}
                    buttonOuterSize={16}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(val) => setYesNOFrequency(val)}
                    labelStyle={{
                      fontSize: 16,
                      color: '#393939',
                      marginRight: 40,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <Text style={styles.questionTxt}>
            Was there adequate training for the gig?
          </Text>
          <View style={styles.yesNo}>
            <RadioForm
              formHorizontal={true}
              buttonColor={'#979797'}
              initial={0}>
              {yesNo.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={yesNOFrequency === i}
                    onPress={(val) => setYesNOFrequency(val)}
                    borderWidth={1}
                    buttonInnerColor={'#002E68'}
                    buttonOuterColor={
                      yesNOFrequency === i ? '#002E68' : '#002E68'
                    }
                    buttonSize={8}
                    buttonOuterSize={16}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(val) => setYesNOFrequency(val)}
                    labelStyle={{
                      fontSize: 16,
                      color: '#393939',
                      marginRight: 40,
                    }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
        </View>
      </ScrollView>

      <View style={styles.btnsView}>
        <TouchableOpacity
          onPress={() => setEndSurveyModal(true)}
          style={styles.applyBtns}>
          <Text style={styles.applyTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={endSurveyModal}
        onRequestClose={() => {
          setEndSurveyModal(false);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setEndSurveyModal(false)}
          />
          <View style={styles.modalView}>
            <View style={styles.bodyModalView}>
              <View style={styles.upperView}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/success.png')}
                  style={styles.successImg}
                />
                <Text style={styles.endTxt}>End of Gig Survey Completed</Text>
                <Text style={styles.thanksTxt}>
                  Thanks for completing the end of gig survey!{' '}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => {
                  props.navigation.navigate('GigList');
                }}>
                <Text style={styles.applyTxt}>Survey</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Survey;

const styles = StyleSheet.create({
  rootView: {
    // height: height,
    // backgroundColor:'green',
    flex: 1,
  },

  bodyView: {
    paddingHorizontal: moderateScale(20),
    // paddingTop: verticalScale(36)
  },
  questionTxt: {
    color: '#393939',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    paddingTop: verticalScale(36),
  },
  yesNo: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: verticalScale(10),
  },

  btnsView: {
    backgroundColor: '#fff',
    height: verticalScale(68),
    // position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:verticalScale(20),
    // bottom: 0,
    paddingHorizontal: moderateScale(20),
  },
  applyBtns: {
    backgroundColor: '#FFCC41',
    height: verticalScale(48),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    // borderRadius: 4,
  },
  applyTxt: {
    fontWeight: 'bold',
    color: '#002E6D',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(300),
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
  bodyModalView: {
    // backgroundColor:'red',
    paddingVertical: verticalScale(18),
    marginHorizontal: moderateScale(16),
  },
  successImg: {
    height: moderateScale(60),
    width: moderateScale(60),
  },
  upperView: {
    alignItems: 'center',
    marginVertical: verticalScale(30),
  },
  endTxt: {
    color: '#393939',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    marginTop: verticalScale(20),
  },
  thanksTxt: {
    color: '#545454',
    fontSize: moderateScale(12),
    marginTop: verticalScale(12),
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
});
