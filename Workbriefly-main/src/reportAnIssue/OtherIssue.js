import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Textarea} from 'native-base';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {verticalScale} from '../Constants/PixelRatio';

const OtherIssue = () => {
  const [checkBox, setCheckBox] = useState(false);
  const [frequency, setFrequency] = useState('');
  var yesNo = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  return (
    <View style={styles.root}>
      <Textarea
        rowSpan={5}
        bordered
        placeholder="Please provide as much detail as possible about the issue you are experiencing"
        placeholderTextColor="#969696"
        style={styles.textArea}
      />

      <Text style={styles.reportingTxt}>
        Would you like to cancel the worker?
      </Text>

      <View style={styles.yesNo}>
        <RadioForm formHorizontal={true} buttonColor={'#979797'} initial={0}>
          {yesNo.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={frequency === i}
                onPress={(val) => setFrequency(val)}
                borderWidth={1}
                buttonInnerColor={'#002E68'}
                buttonOuterColor={frequency === i ? '#002E68' : '#002E68'}
                buttonSize={8}
                buttonOuterSize={16}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={(val) => setFrequency(val)}
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
  );
};

export default OtherIssue;

const styles = StyleSheet.create({
  root: {
    marginVertical: verticalScale(20),
  },
  textArea: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
  },
  reportingTxt: {
    color: '#393939',
    marginTop: verticalScale(20),
    fontWeight: 'bold',
  },
  yesNo: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: verticalScale(10),
  },
});
