import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

import {Icon} from 'native-base';
import {moderateScale, verticalScale} from '../Constants/PixelRatio';
import DetailsHeader from '../components/headers/DetailsHeader';
import Issues from './Issues';
import OtherIssue from './OtherIssue';
import Confirm from './Confirm';

const {height, width} = Dimensions.get('window');

const ReportAnIssue = () => {
  const [submmit, setSubmmit] = useState(true);
  const [select, setSelect] = useState('');
  const [value, setValue] = useState('');
  const [dissapear, setDissapear] = useState(true);
  const [back, setBack] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (val) => {
    setSelect(val);
  };

  const handleValue = (val) => {
    setValue(val);
    setDissapear(false);
  };

  const handleBack = (val) => {
    setBack(val);
  };

  //   console.log('value------------->>>', value);

  const handleModal = (val) => {
    setModalVisible(val);
  };

  return (
    <View style={styles.root}>
      <DetailsHeader
        handleBack={handleBack}
        headerTxt="Report an issue"
        disable={true}
      />
      <ScrollView>
        <View style={styles.bodyView}>
          <Text style={styles.reportingTxt}>Reporting an issue on</Text>
          <Text style={styles.beanWorldTxt}>Richard Micicaels</Text>
          <Text style={styles.optionsTxt}>You selected</Text>
          <Text style={styles.optionsTxt}>
            Please select from the following options:
          </Text>

          {back == true ? (
            <Text style={styles.selectedIssue}>{select}</Text>
          ) : null}

          {dissapear || back == false ? (
            <Issues
              handleBack={handleBack}
              handleValue={handleValue}
              handleSelect={handleSelect}
            />
          ) : null}

          {value == '5' && back == true ? <OtherIssue /> : null}

          {back == true ? (
            <Confirm handleModal={handleModal} value={value} />
          ) : null}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setModalVisible(false)} />
          <View style={styles.modalView}>
            <View style={styles.modalInnerView}>
              <Image
                source={require('../../assets/success.png')}
                style={styles.successImg}
              />
              <Text style={styles.reportedTxt}>
                Richard successfully cancelled
              </Text>
              <Text style={styles.sorryTxt}>
                Richard has been cancelled for the gig. Sorry for the
                inconvenience and thank you for your understanding.
              </Text>
            </View>

            <TouchableOpacity style={styles.completeBtn}>
              <Text style={styles.completeTxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReportAnIssue;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    height: height,
    backgroundColor: '#FAFAFA',
  },
  bodyView: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(16),
  },
  reportingTxt: {
    color: '#393939',
    // fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  beanWorldTxt: {
    fontWeight: 'bold',
    color: '#393939',
    fontSize: moderateScale(32),
  },
  optionsTxt: {
    color: '#393939',
    marginTop: verticalScale(20),
    fontSize: moderateScale(14),
  },
  selectedIssue: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(28),
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: moderateScale(16),
    height: verticalScale(320),
    borderTopLeftRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInnerView: {
    alignItems: 'center',
    paddingVertical: verticalScale(30),
    paddingHorizontal: moderateScale(39),
  },
  successImg: {
    height: moderateScale(60),
    width: moderateScale(60),
  },
  reportedTxt: {
    fontSize: moderateScale(18),
    color: '#393939',
    fontWeight: 'bold',
    paddingTop: verticalScale(20),
  },
  sorryTxt: {
    textAlign: 'center',
    color: '#545454',
    paddingTop: verticalScale(12),
  },
  completeBtn: {
    backgroundColor: '#FFCC41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
    // marginTop: verticalScale(30),
    marginHorizontal: moderateScale(16),
    // marginBottom:verticalScale(50)
  },
  completeTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
});
