import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, Textarea} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'react-native-image-picker';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import CrossRed from '../../../assets/crossred.png';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

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
const OverView = ({
  handleFormData,
  values,
  errors,
  nextStep,
  createGig,
  step,
  prevStep,
}) => {
  const [checkBoxOne, setCheckBoxOne] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [initalHtml, setInitialHtml] = useState(values?.description);

  const launchImageLibrary = async () => {
    const images = await ImagePicker.launchImageLibrary(options);
    let image = {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    };

    setImageUri(images.assets[0].uri);
    handleFormData('cover_image', image);
  };
  const richText = React.createRef() || useRef();
  // const fontSize = () => {
  //   const size = [1, 2, 3, 4, 5, 6, 7];
  //   richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
  // };
  const onCrossClick = () => {
    setImageUri('');
    handleFormData('cover_image', {});
  };

  const isObjectEmpty = (object) => {
    var isEmpty = true;
    for (keys in object) {
      isEmpty = false;
      break; // exiting since we found that the object is not empty
    }
    return isEmpty;
  };

  const editorInitializedCallback = () => {
    // richText.current?.registerToolbar(function (items) {
    //   // console.log('Toolbar click, selected items (insert end callback):', items);
    // });
    setInitialHtml(values?.description);
  };

  const disableCheck = () => {
    let disable = false;
    if (isObjectEmpty(values?.cover_image)) {
      disable = true;
    }
    if (values?.position === '') {
      disable = true;
    }
    if (values?.description === '') {
      disable = true;
    }
    return disable;
  };

  const initHTML = `${values.description}`;
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
      // behavior={Platform.OS === 'android' ? 'height' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.bodyView}>
            <Text style={styles.stepNoTxt}>STEP 1 OF 6</Text>
            <Text style={styles.stepDescTxt}>Overview</Text>

            <View style={styles.descView}>
              <Text style={styles.fillTxt}>
                Please fill out the details of your gig in as much detail as
                possible.
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Cover Image</Text>
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

              {imageUri ? (
                <View style={{position: 'relative'}}>
                  <Image
                    source={{
                      uri: imageUri,
                    }}
                    style={{
                      marginTop: 15,
                      height: 120,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#979797',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => onCrossClick()}
                    style={{position: 'absolute', right: 5, top: 20}}>
                    <Image source={CrossRed} />
                  </TouchableOpacity>
                </View>
              ) : values.cover_image && !isObjectEmpty(values?.cover_image) ? (
                <View style={{position: 'relative'}}>
                  <Image
                    source={{
                      uri: values?.cover_image?.uri
                        ? values.cover_image.uri
                        : 'http://78.46.210.25:4243/' + values?.cover_image,
                    }}
                    style={{
                      marginTop: 15,
                      height: 120,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#979797',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => onCrossClick()}
                    style={{position: 'absolute', right: 5, top: 20}}>
                    <Image source={CrossRed} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => launchImageLibrary()}>
                  <Icon
                    name="upload"
                    type="Feather"
                    style={styles.uploadIcon}
                  />
                  <Text style={styles.uploadTxt}>Upload cover image</Text>
                </TouchableOpacity>
              )}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Position/Title</Text>
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
                placeholder="Enter gig position/title"
                placeholderTextColor="#969696"
                style={styles.input}
                value={values.position}
                onChangeText={(value) => handleFormData('position', value)}
              />
              {errors.position ? (
                <Text style={styles.errors}>{errors.position}</Text>
              ) : null}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Vacancies</Text>
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
                placeholder="0"
                placeholderTextColor="#969696"
                keyboardType="numeric"
                style={styles.input}
                value={values.vacancies}
                onChangeText={(value) => handleFormData('vacancies', value)}
              />
              {errors.vacancies ? (
                <Text style={styles.errors}>{errors.vacancies}</Text>
              ) : null}

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.cover}>Job Description</Text>
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
                <Textarea
                  rowSpan={10}
                  placeholder="You will be working with other members in order to ensure the kitchen is as clean as reasonably possible at all times when not in use.
              You will be expected to:
              - must be able to lift 15kg
              - must be able to stand for extended periods of time"
                  placeholderTextColor="#969696"
                  style={styles.textArea}
                  value={values.description}
                  onChangeText={(value) => handleFormData('description', value)}
                />
                {/* <RichToolbar
                  style={[styles.richBar]}
                  flatContainerStyle={styles.flatStyle}
                  editor={richText}
                  disabled={false}
                  selectedIconTint={'#2095F2'}
                  disabledIconTint={'#bfbfbf'}
                />
                <RichEditor
                  initialContentHTML={initalHtml}
                  ref={richText}
                  editorStyle={{backgroundColor: '#EBF7F9'}}
                  pasteAsPlainText={true}
                  useContainer={true}
                  style={styles.rich}
                  initialHeight={300}
                  placeholder={'please write here ...'}
                  onChange={(value) => {
                    handleFormData('description', value);
                  }}
                /> */}
                {/* <Textarea
              rowSpan={10}
              placeholder="You will be working with other members in order to ensure the kitchen is as clean as reasonably possible at all times when not in use.
              You will be expected to:
              - must be able to lift 15kg
              - must be able to stand for extended periods of time"
              placeholderTextColor="#969696"
              style={styles.textArea}
              value={values.description}
              onChangeText={(value) => handleFormData('description', value)}
            /> */}
              </View>
              {/* <Textarea
            rowSpan={10}
            placeholder="You will be working with other members in order to ensure the kitchen is as clean as reasonably possible at all times when not in use.
              You will be expected to:
              - must be able to lift 15kg
              - must be able to stand for extended periods of time"
            placeholderTextColor="#969696"
            style={styles.textArea}
            value={values.description}
            onChangeText={(value) => handleFormData('description', value)}
          /> */}
              {/* 
          <RichEditor
            placeholder="Rich Text Editor"
            editorStyle={{
              backgroundColor: 'rgba(58, 177, 202, 0.1)',
            }}
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertImage,
              'customAction',
            ]}
            iconMap={{
              customAction: customIcon,
            }}
            customAction={this.handleCustomAction}
          /> */}
              {errors.description ? (
                <Text style={styles.errors}>{errors.description}</Text>
              ) : null}

              <View style={styles.checkboxContainer}>
                <CheckBox
                  boxType={'square'}
                  value={values?.criminal_record_required === 0 ? false : true}
                  onValueChange={() => {
                    handleFormData('criminal_record_required', 1);
                  }}
                  onFillColor={'#002E6D'}
                  onCheckColor={'#FFFFFF'}
                  style={styles.checkbox}
                />
                <Text style={styles.label}>
                  I required worker(s) who have been criminally background
                  checked &nbsp;
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/shield.png')}
                    style={styles.shield}
                  />
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

export default OverView;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // height: height,
    backgroundColor: '#FAFAFA',
    position: 'relative',
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
  cover: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(24),
  },
  uploadBtn: {
    backgroundColor: '#002E6D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(48),
    marginTop: verticalScale(4),
    borderRadius: moderateScale(4),
  },
  uploadIcon: {
    color: 'white',
  },
  uploadTxt: {
    color: 'white',
    paddingLeft: moderateScale(13),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#EBF7F9',
    height: verticalScale(40),
    paddingHorizontal: moderateScale(15),
    marginTop: verticalScale(4),
  },
  textArea: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    marginTop: verticalScale(4),
  },
  checkbox: {
    alignSelf: 'center',
    height: 18,
    width: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(48),
  },
  checkbox: {
    alignSelf: 'center',
    height: 18,
    width: 18,
  },
  label: {
    // marginLeft: 12,
    // marginVertical: 16,
    paddingStart: moderateScale(20),
    color: '#545454',
    // backgroundColor: 'red',
    // textAlign: 'center',
  },
  shield: {
    height: verticalScale(10),
    width: moderateScale(10),
  },
  btnView: {
    backgroundColor: 'green',
    // height: 80,
    // width: '100%',
  },
  continueBtn: {
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  continueTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  errors: {
    color: 'red',
    marginTop: 5,
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
  richBar: {
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  rich: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
    minHeight: 300,
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: /* Platform.OS === 'ios' ? -28 : */ 0,
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
