import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import Info from '../../../assets/info.png';
import Logo from '../../../assets/Logo.png';
import {Icon} from 'native-base';
import defaultStyle from '../../common/Typography';
import Weapons from '../../../assets/weapons.png';
import {verticalScale, moderateScale} from '../../Constants/PixelRatio';

export default class CriminalRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criminalRecordModalOpen: false,
    };
  }

  criminalRecordModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.criminalRecordModalOpen}
        onRequestClose={() => this.setState({criminalRecordModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({criminalRecordModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              {/* <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    criminalRecordModalOpen: false,
                  })
                }
              />
              <Text style={style.preferenceTxt}>Additional Info!</Text> */}

              <View style={style.topView}>
                <Text style={style.preferenceTxt}>Additional Info!</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      criminalRecordModalOpen: false,
                    })
                  }
                />
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This criminal record check costs $28.00 and the records will
                  be yours to keep. After 40 hours of working using the
                  platform, we will refund the cost in full.
                </Text>
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  After payment, you'll be prompted to start the background
                  check powered by our partner, Certn. You will also receive an
                  email from Certn with a link to proceed with the background
                  check if you wish to do this another time.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  The benefits of completing your background check include being
                  shown as a Recommended Worker when a business creates a gig
                  and being able to see gigs where businesses require
                  background-checked workers.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Disclaimer: Failure to pass the criminal background check due
                  to a conviction may lead to inability to access the platform
                  and the deletion of your account.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.criminalRecordModal()}
        <ScrollView>
          <View style={{marginBottom: 80}}>
            {console.log('Modal------>>>', this.state.criminalRecordModalOpen)}
            <View style={style.bodyContainer}>
              {!this.props.settingScreen && (
                <Text
                  style={[
                    defaultStyle.Title_One,
                    {
                      color: '#393939',
                      textAlign: 'left',
                      fontSize: 24,
                      fontWeight: '700',
                      marginBottom: 0,
                      lineHeight: 28,
                      marginBottom: 28,
                    },
                  ]}>
                  Start earning money with WorkBriefly
                </Text>
              )}

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    lineHeight: 23,
                    color: '#323232',
                    marginTop: 24,
                  }}>
                  Initiate Criminal Record Check&nbsp;
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({criminalRecordModalOpen: true})}
                  style={{marginTop: 28}}>
                  <Image source={Info} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[style.cardView]}>
              <View style={{alignItems: 'center'}}>
                <Image source={Weapons} />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 24,
                    fontWeight: '700',
                    color: '#272727',
                  }}>
                  You’re all clear!
                </Text>
                <Text
                  style={{
                    width: '85%',
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#808080',
                    marginTop: 16,
                  }}>
                  Congratulations on completing the background-check
                  successfully! You will now have this trusted badge on your
                  profile and be shown as a Recommended Worker when a business
                  creates a gig.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(450),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bodyView: {
    // backgroundColor:'red',
    paddingVertical: verticalScale(18),
    marginHorizontal: moderateScale(16),
  },
  crossIcon: {
    alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
  preferenceTxt: {
    color: '#272727',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    paddingLeft: moderateScale(10),
  },
  descriptionView: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
    maxWidth: '90%',
    // alignItems: 'center',
  },
  dotIcon: {
    color: '#414141',
  },
  descTxt: {
    color: '#5E5E5E',
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(15),
  },
});
