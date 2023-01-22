import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

const GigsTopbar = (props) => {
  const toggle = props.handleChange;
  const [pressGigInfo, setPressGigInfo] = useState(true);
  const [pressApplicants, setPressApplicants] = useState(false);
  const [pressBookedworkers, setPressBookedworkers] = useState(false);
  const [pressInvoice, setPressInvoice] = useState(false);

  return (
    <View>
      <View style={styles.topbar}>
        <TouchableOpacity
          onPress={() =>
            toggle(
              'gigInfo',
              setPressGigInfo(true),
              setPressApplicants(false),
              setPressBookedworkers(false),
              setPressInvoice(false),
            )
          }>
          <Text
            style={[
              styles.barTxt,
              {color: pressGigInfo == true ? '#002E6D' : '#393939'},
            ]}>
            Gig info
          </Text>
          <View
            style={{
              borderBottomColor:
                pressGigInfo == true ? '#002E6D' : 'transparent',
              borderBottomWidth: 2,
              marginTop: verticalScale(15),
              //   width: '120%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            toggle(
              'applicants',
              setPressApplicants(true),
              setPressGigInfo(false),
              setPressBookedworkers(false),
              setPressInvoice(false),
            )
          }>
          <Text
            style={[
              styles.barTxt,
              {color: pressApplicants == true ? '#002E6D' : '#393939'},
            ]}>
            Applicants
          </Text>
          <View
            style={{
              borderBottomColor:
                pressApplicants == true ? '#002E6D' : 'transparent',
              borderBottomWidth: 2,
              marginTop: verticalScale(15),
              //   width: '120%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            toggle(
              'bookedWorkers',
              setPressBookedworkers(true),
              setPressGigInfo(false),
              setPressApplicants(false),
              setPressInvoice(false),
            )
          }>
          <Text
            style={[
              styles.barTxt,
              {color: pressBookedworkers == true ? '#002E6D' : '#393939'},
            ]}>
            Booked Workers
          </Text>
          <View
            style={{
              borderBottomColor:
                pressBookedworkers == true ? '#002E6D' : 'transparent',
              borderBottomWidth: 2,
              marginTop: verticalScale(15),
              //   width: '100%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            toggle(
              'invoice',
              setPressInvoice(true),
              setPressBookedworkers(true),
              setPressGigInfo(false),
              setPressBookedworkers(false),
            )
          }>
          <Text
            style={[
              styles.barTxt,
              {color: pressInvoice == true ? '#002E6D' : '#393939'},
            ]}>
            invoice
          </Text>
          <View
            style={{
              borderBottomColor:
                pressInvoice == true ? '#002E6D' : 'transparent',
              borderBottomWidth: 2,
              marginTop: verticalScale(15),
              //   width: '120%',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: '#C4C4C4',
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

export default GigsTopbar;

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  barTxt: {
    fontWeight: 'bold',
  },
});
