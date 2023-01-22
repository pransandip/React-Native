import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../Constants/PixelRatio';

const Issues = (props) => {
  return (
    <View>
      <Text
        onPress={() =>
          props.handleSelect(
            'The worker is not here for the job and I have attempted to contact theworker via the contact number provided.',
            props.handleValue('1'),
            props.handleBack(true),
          )
        }
        style={styles.issuesTxt}>
        The worker is not here for the job and I have attempted to contact the
        worker via the contact number provided.
      </Text>
      <Text
        onPress={() =>
          props.handleSelect(
            'The worker does not possess the relevant certificate/licence stated on their profile that is required to perform this job.',
            props.handleValue('2'),
            props.handleBack(true),
          )
        }
        style={styles.issuesTxt}>
        The worker does not possess the relevant certificate/licence stated on
        their profile that is required to perform this job.
      </Text>
      <Text
        onPress={() =>
          props.handleSelect(
            ' The worker is not following instructions provided and is causing a disruption that is detrimental to my business.',
            props.handleValue('3'),
            props.handleBack(true),
          )
        }
        style={styles.issuesTxt}>
        The worker is not following instructions provided and is causing a
        disruption that is detrimental to my business.
      </Text>
      <Text
        onPress={() =>
          props.handleSelect(
            ' The worker is not following instructions provided and is causing a disruption that is detrimental to my business.',
            props.handleValue('4'),
            props.handleBack(true),
          )
        }
        style={styles.issuesTxt}>
        The worker is not following instructions provided and is causing a
        disruption that is detrimental to my business.
      </Text>
      <Text
        onPress={() =>
          props.handleSelect(
            'I am experiencing another type of issue',
            props.handleValue('5'),
            props.handleBack(true),
          )
        }
        style={styles.issuesTxt}>
        I am experiencing another type of issue
      </Text>
    </View>
  );
};

export default Issues;

const styles = StyleSheet.create({
  issuesTxt: {
    color: '#002E6D',
    marginTop: verticalScale(20),
    fontWeight: 'bold',
  },
});
