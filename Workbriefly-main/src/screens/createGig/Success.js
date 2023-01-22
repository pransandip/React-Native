import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';

const {height, width} = Dimensions.get('window');

const Success = ({nextStep, createGig, step, prevStep}) => {
  const [workers, setWorkers] = useState([
    {
      img: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/15/full/1647365891-7103.jpg',
      name: 'Rohit Sharma',
    },
    {
      img: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/15/full/1647365891-7103.jpg',
      name: 'Rohit Sharma',
    },
    {
      img: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/15/full/1647365891-7103.jpg',
      name: 'Rohit Sharma',
    },
    {
      img: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/15/full/1647365891-7103.jpg',
      name: 'Rohit Sharma',
    },
    {
      img: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/15/full/1647365891-7103.jpg',
      name: 'Rohit Sharma',
    },
  ]);

  //   console.log(`request------->>`, workers[0].request);
  const [request, setRequest] = useState(false);
  const disableCheck = () => {};
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.bodyView}>
            <View style={styles.successView}>
              <Image source={require('../../../assets/success.png')} />
              <Text style={styles.successTxt}>Gig succesfully created</Text>
            </View>
            <View style={styles.descView}>
              <Text style={styles.recommendedTxt}>Recommended Workers</Text>
              <Text style={styles.descTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>

              <View style={styles.listView}>
                {workers.map((item, index) => {
                  //   console.log('request------>>>', item.request);

                  return (
                    <View style={styles.cardView}>
                      <View style={styles.nameView}>
                        <Image
                          source={{
                            uri: item.img,
                          }}
                          style={styles.profileImg}
                        />
                        <Text style={styles.nameTxt}>{item.name}</Text>
                      </View>
                      <View style={styles.btnsView}>
                        <TouchableOpacity
                          style={[styles.btns, {backgroundColor: '#002E6D'}]}>
                          <Text style={[styles.btnsTxt, {color: '#fff'}]}>
                            View Profile
                          </Text>
                        </TouchableOpacity>

                        {request == false ? (
                          <TouchableOpacity
                            onPress={() => setRequest(true)}
                            // onPress={console.log(index)}
                            style={[styles.btns, {backgroundColor: '#FFCC41'}]}>
                            <Text style={[styles.btnsTxt, {color: '#002E6D'}]}>
                              Send Request
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[
                              styles.btns,
                              {
                                backgroundColor: '#EAF4DB',
                                alignItems: 'center',
                                flexDirection: 'row',
                              },
                            ]}>
                            <Icon
                              name="checkcircle"
                              type="AntDesign"
                              style={styles.checkIcon}
                            />
                            <Text style={[styles.btnsTxt, {color: '#74B711'}]}>
                              &nbsp;Request Sent
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      <View
                        style={{
                          borderBottomColor: '#F1F1F1',
                          borderBottomWidth: 1,
                          marginVertical: verticalScale(16),
                        }}
                      />
                    </View>
                  );
                })}
              </View>

              <Text style={styles.footerTxt}>
                Note: Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.continueBtnView]}>
        <TouchableOpacity
          disabled={disableCheck() === true ? true : false}
          style={
            disableCheck() === true
              ? [
                  styles.continueBtn,
                  {
                    backgroundColor: '#F0E9D7',
                    width: '100%',
                  },
                ]
              : [
                  styles.continueBtn,
                  {
                    width: '100%',
                  },
                ]
          }
          onPress={() => (step === 8 ? createGig() : nextStep())}>
          <Text style={styles.continueTxt}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  root: {
    // height: height,
    flex: 1,
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(32),
    // marginBottom: 100,
  },
  successView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    marginTop: verticalScale(12),
  },
  descView: {
    borderWidth: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(20),
    borderColor: '#979797',
    marginTop: verticalScale(20),
    paddingBottom: moderateScale(50),
  },
  recommendedTxt: {
    color: '#002E6D',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  descTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  listView: {
    marginTop: verticalScale(20),
  },
  cardView: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(15),
  },
  nameTxt: {
    color: '#393939',
    paddingStart: moderateScale(12),
    fontWeight: 'bold',
  },
  btnsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btns: {
    paddingVertical: verticalScale(9),
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(21),
    borderRadius: moderateScale(4),
  },
  btnsTxt: {
    fontWeight: 'bold',
  },
  checkIcon: {
    color: '#74B711',
    fontSize: moderateScale(14),
  },
  footerTxt: {
    color: '#767676',
    fontSize: moderateScale(11),
  },
  continueBtnView: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    height: verticalScale(75),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 0 : 60,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  continueBtn: {
    backgroundColor: '#FFCC41',
    width: '100%',
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
