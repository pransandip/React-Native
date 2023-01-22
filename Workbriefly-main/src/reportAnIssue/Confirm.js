import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../Constants/PixelRatio';

const Confirm = (props) => {
  console.log(`valueConfirm---------->>>`, props.value);

  return (
    <View>
      <Text style={styles.optionsTxt}>
        What will happen if you{' '}
        <Text style={{fontWeight: 'bold'}}>Confirm,</Text>
      </Text>

      {props.value == '5' ? (
        <>
          <Text style={styles.cancelledTxt}>
            — Your message will be sent to a member of our team who will review
            it.
          </Text>
          <Text style={styles.cancelledTxt}>
            — The worker will be removed from this gig.
          </Text>
        </>
      ) : (
        <Text style={styles.cancelledTxt}>
          — Worker name will be cancelled from the gig and asked to leave your
          work site.
        </Text>
      )}

      <TouchableOpacity onPress={()=>props.handleModal(true)} style={styles.completeBtn}>
        <Text style={styles.completeTxt}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  optionsTxt: {
    color: '#393939',
    marginTop: verticalScale(20),
    fontSize: moderateScale(14),
  },
  cancelledTxt: {
    color: '#393939',
    marginTop: verticalScale(10),
  },
  completeBtn: {
    backgroundColor: '#FFCC41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
    marginTop:verticalScale(30)
  },
  completeTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
});
