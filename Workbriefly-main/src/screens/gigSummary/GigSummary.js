import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import DetailsHeader from '../../components/headers/DetailsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import PostPreview from './PostPreview';
import CostSummary from './CostSummary';
import Success from '../createGig/Success';

const {height, width} = Dimensions.get('window');

const GigSummary = (han) => {
  const [back, setBack] = useState(false);


  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <PostPreview /> */}
        {/* <CostSummary /> */}
        {/* <Success /> */}
      </ScrollView>

      <View style={styles.continueBtnView}>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueTxt}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GigSummary;

const styles = StyleSheet.create({
  root: {
    height: height,
    // flex: 1,
  },
  continueBtnView: {
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    width: '90%',
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
