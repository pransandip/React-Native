import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import BackHeader from '../../components/headers/BackHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon, Textarea, CheckBox, ListItem, Body} from 'native-base';

const {height, width} = Dimensions.get('window');

const CreateAGig = () => {
  const [checkToggle, setCheckToggle] = useState(false);

  const back = () => {
    this.props.navigation.goBack();
  };

  return (
    <View style={styles.rootView}>
      <BackHeader back={back} headerTxt="Create a Gig" />

      <ScrollView>
        <View style={styles.bodyView}>
          <Text style={styles.stepTxt}>STEP 1 OF 6</Text>
          <Text style={styles.overViewTxt}>Overview</Text>

          <View style={styles.boxView}>
            <Text style={styles.fillOutTxt}>
              Please fill out the details of your gig in as much detail as
              possible.
            </Text>
            <Text style={styles.coverImageTxt}>Cover Image</Text>
            <TouchableOpacity style={styles.uploadBtn}>
              <Icon name="upload" type="Feather" style={styles.uploadIcon} />
              <Text style={styles.uploadTxt}>Upload cover image</Text>
            </TouchableOpacity>
            <Text style={styles.coverImageTxt}>Position/Title</Text>
            <TextInput
              placeholder="Enter gig position/title"
              placeholderTextColor={'#969696'}
              style={styles.gigPosition}
            />
            <Text style={styles.coverImageTxt}>Vacancies</Text>
            <TextInput
              placeholder="0"
              placeholderTextColor={'#969696'}
              style={styles.gigPosition}
            />
            <Text style={styles.coverImageTxt}>Job Description</Text>
            <Textarea
              // rowSpan={5}
              style={styles.textArea}
              bordered
              placeholder="You will be working with other members in order to ensure the kitchen is as clean as reasonably possible at all times when not in use.
               You will be expected to:
                - must be able to lift 15kg
              - must be able to stand for extended periods of time"
              placeholderTextColor={'#A0A0A0'}
            />

            <View style={styles.checkBoxView}>
              <CheckBox
                color={'#002E6D'}
                checked={checkToggle}
                onPress={() => setCheckToggle(!checkToggle)}
              />
              <Body style={styles.textBody}>
                <Text style={styles.checkBoxTxt}>
                  I required worker(s) who have been criminally background
                  checked&nbsp;&nbsp;&nbsp;
                  <Image
                    source={require('../../../assets/shield.png')}
                    style={styles.shield}
                  />
                </Text>
              </Body>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAGig;

const styles = StyleSheet.create({
  rootView: {
    height: height,
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(32),
  },
  stepTxt: {
    color: '#8A8A8A',
    fontSize: moderateScale(11),
    paddingStart: moderateScale(5),
  },
  overViewTxt: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: '#393939',
  },
  boxView: {
    borderWidth: 0.6,
    borderColor: '#979797',
    paddingVertical: verticalScale(20),
    paddingHorizontal: moderateScale(16),
  },
  fillOutTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  coverImageTxt: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(24),
  },
  uploadBtn: {
    flexDirection: 'row',
    backgroundColor: '#002E6D',
    justifyContent: 'space-evenly',
    height: verticalScale(48),
    alignItems: 'center',
    paddingHorizontal: moderateScale(55),
    marginTop: verticalScale(4),
  },
  uploadIcon: {
    color: 'white',
  },
  uploadTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  gigPosition: {
    backgroundColor: '#EBF7F9',
    paddingHorizontal: moderateScale(14),
    marginTop: verticalScale(4),
  },
  textArea: {
    height: verticalScale(240),
    backgroundColor: '#EBF7F9',
    borderColor: 'transparent',
    fontSize: moderateScale(11),
  },
  checkBoxView: {
    // backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(16),
  },
  textBody: {
    paddingStart: moderateScale(15),
  },
  checkBoxTxt: {
    color: '#545454',
  },
  shield: {
    height: moderateScale(15),
    backgroundColor: 'red',
    width: moderateScale(15),
    marginBottom: verticalScale(10),
  },
});
