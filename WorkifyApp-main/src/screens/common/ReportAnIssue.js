import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Pressable,
  Modal,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';

import SettingsHeader from '../../components/Header/SettingsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {ScrollView} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');
const ReportAnIssue = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = (value, params) => {
    props.navigation.navigate(value, params);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.rootView}>
        <SettingsHeader headerTxt="Report an Issue" navigation={navigation} />

        <ScrollView>
          <View style={styles.bodyView}>
            <Text style={styles.reportingTxt}>
              You are reporting{' '}
              <Text style={styles.beanWorldTxt}>BeanWorld Inc.</Text>
            </Text>

            <Text style={styles.selectedTxt}>YOU SELECTED</Text>

            <Text style={styles.selectedIssueTxt}>
              The abuse is verbal in nature (including sexual harassment)
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: '#979797',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.bottomView}>
            <Text style={styles.optionsTxt}>
              Please select from the following options:
            </Text>
            <Text style={styles.issuesTxt}>
              I am facing unsafe work conditions.
            </Text>
            <Text style={styles.issuesTxt}>
              I am facing abuse by the business requester
            </Text>
          </View>
        </ScrollView>
        <View style={styles.confirmView}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.confirmBtn}>
            <Text style={styles.confirmTxt}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <Pressable
              style={{flex: 1}}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.modalView}>
              <View style={styles.modalInnerView}>
                <Image
                  source={require('../../../assets/success.png')}
                  style={styles.successImg}
                />
                <Text style={styles.reportedTxt}>
                  BeanWorld Inc has been reported
                </Text>
                <Text style={styles.sorryTxt}>
                  We are sorry for the inconvenience caused and thank you for
                  your understanding.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.confirmBtn, {alignSelf: 'center'}]}>
                <Text style={styles.confirmTxt}>Complete Incident Report</Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.confirmTxt,
                  {textAlign: 'center', paddingTop: verticalScale(20)},
                ]}>
                Skip for Now
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ReportAnIssue;

const styles = StyleSheet.create({
  rootView: {
    flex:1,
    // height: height,
    //  backgroundColor:'red'
  },

  bodyView: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(36),
    paddingBottom: verticalScale(16),
  },
  reportingTxt: {
    color: '#393939',
    fontSize: moderateScale(18),
  },
  selectedTxt: {
    color: '#545454',
    marginTop: verticalScale(26),
  },
  selectedIssueTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(13),
    marginTop: verticalScale(10),
  },
  beanWorldTxt: {
    fontWeight: 'bold',
  },
  optionsTxt: {
    color: '#393939',
    marginTop: verticalScale(22),
    fontSize: moderateScale(14),
  },
  issuesTxt: {
    color: '#002E6D',
    marginTop: verticalScale(20),
    fontWeight: 'bold',
  },
  bottomView: {
    paddingHorizontal: moderateScale(20),
  },
  confirmView: {
    position:'absolute',
    bottom:0,
    borderTopWidth: 1,
    borderTopColor: ' 0px 0px 5px rgba(0, 0, 0, 0.12)',
    width: width,
    height: verticalScale(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    borderRadius: moderateScale(5),
  },
  confirmTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
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
});
