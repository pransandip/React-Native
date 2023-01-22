import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Textarea} from 'native-base';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import {useRef} from 'react';
import {useState} from 'react';
import {Icon} from 'native-base';

const {height, width} = Dimensions.get('window');

const Instructions = ({
  handleFormData,
  values,
  errors,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const richText = React.createRef();
  const richText1 = React.createRef();
  const richText2 = React.createRef();
  const {height, width} = Dimensions.get('window');
  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const fontSize = () => {
    const size = [1, 2, 3, 4, 5, 6, 7];
    richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
  };

  const editorInitializedCallback = () => {
    richText.current?.registerToolbar(function (items) {
      // console.log('Toolbar click, selected items (insert end callback):', items);
    });
  };

  const disableCheck = () => {
    let disable = false;
    if (values?.attire === '') {
      disable = true;
    }
    return disable;
  };

  return (
    <View style={styles.root}>
      {/* <ScrollView> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ScrollView
          keyboardShouldPersistTaps={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: verticalScale(100),
            // height: height,
            // flex: 1,
          }}>
          <View style={styles.bodyView}>
            <Text style={styles.stepNoTxt}>STEP 5 OF 6</Text>
            <Text style={styles.stepDescTxt}>Instructions</Text>
            <View style={styles.descView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Attire</Text>
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
              <View>
                <RichToolbar
                  style={[styles.richBar]}
                  flatContainerStyle={styles.flatStyle}
                  editor={richText}
                  disabled={false}
                  selectedIconTint={'#2095F2'}
                  disabledIconTint={'#bfbfbf'}
                />
                <RichEditor
                  initialContentHTML={values?.attire || ''}
                  ref={richText}
                  editorStyle={{backgroundColor: '#EBF7F9'}}
                  pasteAsPlainText={true}
                  useContainer={true}
                  style={styles.rich}
                  initialHeight={200}
                  placeholder={'- Black pants - Non-slip shoes - Apron'}
                  onChange={(value) => {
                    handleFormData('attire', value);
                  }}
                  androidHardwareAccelerationDisabled={true}
                  editorInitializedCallback={() => editorInitializedCallback()}
                />
                {errors?.attire && <Text>{errors?.attire}</Text>}
              </View>

              <Text style={styles.cover}>
                Additional lnfo{' '}
                <Text style={{fontSize: moderateScale(11)}}>(optional)</Text>
              </Text>
              <View>
                <RichToolbar
                  style={[styles.richBar]}
                  flatContainerStyle={styles.flatStyle}
                  editor={richText1}
                  disabled={false}
                  selectedIconTint={'#2095F2'}
                  disabledIconTint={'#bfbfbf'}
                />
                <RichEditor
                  initialContentHTML={values?.additional_info || ''}
                  ref={richText1}
                  editorStyle={{backgroundColor: '#EBF7F9'}}
                  pasteAsPlainText={true}
                  useContainer={true}
                  style={styles.rich}
                  initialHeight={200}
                  placeholder={
                    '- Please use rear entrance and report to point of contact - Lunch will be provided - Please come wearing a mask'
                  }
                  onChange={(value) => {
                    handleFormData('additional_info', value);
                  }}
                  androidHardwareAccelerationDisabled={true}
                  editorInitializedCallback={() => editorInitializedCallback()}
                />
              </View>

              <Text style={styles.cover}>
                Things to Bring{' '}
                <Text style={{fontSize: moderateScale(11)}}>(optional)</Text>
              </Text>
              <View>
                <RichToolbar
                  style={[styles.richBar]}
                  flatContainerStyle={styles.flatStyle}
                  editor={richText2}
                  disabled={false}
                  selectedIconTint={'#2095F2'}
                  disabledIconTint={'#bfbfbf'}
                />
                <RichEditor
                  initialContentHTML={values?.things_to_bring || ''}
                  ref={richText2}
                  editorStyle={{backgroundColor: '#EBF7F9'}}
                  pasteAsPlainText={true}
                  useContainer={true}
                  style={styles.rich}
                  initialHeight={200}
                  placeholder={
                    '- Please use rear entrance and report to point of contact - Lunch will be provided - Please come wearing a mask'
                  }
                  onChange={(value) => {
                    handleFormData('things_to_bring', value);
                  }}
                  androidHardwareAccelerationDisabled={true}
                  editorInitializedCallback={() => editorInitializedCallback()}
                />
              </View>
            </View>
            {/* <View style={styles.continueBtnView}>
            <TouchableOpacity style={styles.continueBtn}>
              <Text style={styles.continueTxt}>Continue</Text>
            </TouchableOpacity>
          </View> */}
          </View>
        </ScrollView>

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
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
    // backgroundColor: 'red',
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(5),
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
  cover: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(20),
    fontSize: moderateScale(16),
  },
  textArea: {
    backgroundColor: '#EBF7F9',
    marginTop: verticalScale(4),
  },
  // continueBtnView: {
  //   backgroundColor: '#fff',
  //   elevation: 5,
  //   height: verticalScale(68),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // continueBtn: {
  //   backgroundColor: '#FFCC41',
  //   width: '90%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingVertical: verticalScale(12),
  //   borderRadius: moderateScale(4),
  // },
  // continueTxt: {
  //   color: '#003862',
  //   fontWeight: 'bold',
  // },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rich: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
    minHeight: 200,
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: /*  Platform.OS === 'ios' ? 0 : */ 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
    // marginBottom: Platform.OS === 'ios' ? 100 : 100,
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
