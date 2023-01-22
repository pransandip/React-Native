import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import DetailsHeader from '../../components/headers/DetailsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Textarea} from 'native-base';

const {width, height} = Dimensions.get('window');

const GiveFeedback = () => {
  const [back, setBack] = useState(false);
  const handleBack = (val) => {
    setBack(val);
  };
  return (
    <View style={styles.root}>
      <DetailsHeader
        handleBack={handleBack}
        headerTxt="Give Feedback"
        disable={true}
      />
      <View style={styles.bodyView}>
        <Text style={styles.feedBackTxt}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </Text>
        <Text style={styles.questionTxt}>
          Any question or remarks? Just write us a message.{' '}
        </Text>
        <Text style={styles.cover}>Cover Image</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <Text style={styles.cover}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
        />
        <Text style={styles.cover}>Message</Text>
        <Textarea
          rowSpan={5}
          placeholder="Write here"
          placeholderTextColor="#969696"
          style={styles.textArea}
        />
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GiveFeedback;

const styles = StyleSheet.create({
  root: {
    height: height,
  },
  bodyView: {
    marginTop: verticalScale(36),
    paddingHorizontal: moderateScale(20),
  },
  feedBackTxt: {
    color: '#6A6A69',
  },
  questionTxt: {
    marginTop: verticalScale(20),
    color: '#393939',
    fontWeight: 'bold',
  },
  cover: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(20),
  },
  input: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    height: verticalScale(40),
    marginTop: verticalScale(8),
    paddingHorizontal: moderateScale(12),
  },
  textArea: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    marginTop: verticalScale(8),
  },
  submitBtn: {
    backgroundColor: '#FFCC41',
    marginTop: verticalScale(36),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    borderRadius: 4,
  },
  submitTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
});
