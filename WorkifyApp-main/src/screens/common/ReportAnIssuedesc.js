import { StyleSheet, Text, View,Modal,Pressable,Image,  Dimensions,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import SettingsHeader from '../../components/Header/SettingsHeader'
import { moderateScale,verticalScale } from '../../Constants/PixelRatio';
import { Textarea } from 'native-base';

const {height, width} = Dimensions.get('window');


const ReportAnIssuedesc = () => {

    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.rootView}>
     <SettingsHeader headerTxt='Report an Issue' />

     <View style={styles.bodyView}>
     <Text style={styles.reportingTxt}>
          You are reporting{' '}
          <Text style={styles.beanWorldTxt}>BeanWorld Inc.</Text>
        </Text>

        <Text style={styles.optionsTxt}>
        Please describe the incident as much detail as possible so that we may investigate this more thoroughly. 
        </Text>

        <Text style={styles.descTxt}>Description</Text>

        <Textarea  style={styles.textArea} rowSpan={5} bordered placeholder="Please enter the details of the incident here" 
            placeholderTextColor='#A0A0A0'
        />


     </View>
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
          <Pressable style={{flex: 1}} onPress={() => setModalVisible(false)} />
          <View style={styles.modalView}>
            <View style={styles.modalInnerView}>
              <Image source={require('../../../assets/success.png')} style={styles.successImg} />
              <Text style={styles.reportedTxt}>
              Incident Report Successfully Sent
              </Text>
              <Text style={styles.sorryTxt}>
              We are sorry for your negative experience with Bean World Inc. We will investigate this incident immediately and let you know the outcome once we arrive at a conclusion.
              </Text>
            </View>

            
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.confirmBtn, {alignSelf:'center'}]}>
          <Text style={styles.confirmTxt}>Continue</Text>
        </TouchableOpacity>
     
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ReportAnIssuedesc

const styles = StyleSheet.create({
    rootView: {
        // flex:1,
        height: height,
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

      beanWorldTxt: {
        fontWeight: 'bold',
      },


      optionsTxt: {
        color: '#393939',
        marginTop: verticalScale(22),
        fontSize: moderateScale(14),
      },descTxt:{
        marginTop: verticalScale(19),
        color:'#393939',
        fontSize:moderateScale(15),
        fontWeight:'bold'
      },
      textArea:{
        backgroundColor:'#EBF7F9',
        height: verticalScale(214)
      },
      confirmView: {
        bottom: 0,
        position: 'absolute',
        // backgroundColor:'red',
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
        borderTopRightRadius:moderateScale(16),
        height: verticalScale(320),
    borderTopLeftRadius:moderateScale(16),
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
      },successImg:{
        height: moderateScale(60),
        width:moderateScale(60)
      },
      reportedTxt: {
        fontSize: moderateScale(17),
        color: '#393939',
        fontWeight: 'bold',
        paddingTop: verticalScale(20),
      },
      sorryTxt: {
        textAlign: 'center',
        color: '#545454',
        paddingTop: verticalScale(12),
      },
})