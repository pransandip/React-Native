import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'native-base';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import DetailsHeader from '../../components/headers/DetailsHeader';
import HelpSupportTopBar from './HelpSupportTopBar';
import FAQ from './FAQ';
import GettingStarted from './GettingStarted';

const {height, width} = Dimensions.get('window');

const HelpAndSupport = () => {
  const [back, setBack] = useState(false);
  const [render, setRender] = useState('faq');

  const handleBack = (val) => {
    setBack(val);
  };

  const handleTab = (val) => {
    if (val == 'faq') {
      setRender('faq');
    } else {
      setRender('gettingStarted');
    }
  };

  return (
    <View style={styles.root}>
      <DetailsHeader
        handleBack={handleBack}
        headerTxt="Business/Help & Support"
        disable={true}
      />

      <HelpSupportTopBar handleTab={handleTab} />
      <ScrollView>{render == 'faq' ? <FAQ /> : <GettingStarted />}</ScrollView>
    </View>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  root: {
    height: height,

    // flex: 1,
  },
});
