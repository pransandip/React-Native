import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';

import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';
import {verticalScale, moderateScale} from '../Constants/PixelRatio';

export default class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" type="Ionicons" style={style.backIcon} />
          </TouchableOpacity>

          <Image source={Logo} />
          <Icon
            name="arrow-back"
            type="Ionicons"
            style={[style.backIcon, {color: 'transparent'}]}
          />
        </View>
        <ScrollView>
          <View style={{marginBottom: 80}}>
            <View style={style.bodyContainer}>
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
                Start filling shifts with WorkBriefly
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  lineHeight: 16,
                  color: '#323232',
                }}>
                Step 1/3: Service Agreement
              </Text>
            </View>
            <View style={style.cardView}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  width: 250,
                  lineHeight: 19,
                }}>
                Customer Agreement (Terms & Conditions)
              </Text>
              <Text
                style={{
                  marginVertical: 16,
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 16,
                }}>
                The WorkBriefly Mobile Application is an internet application
                (“WorkBriefly Mobile Application” or the “Application”) owned
                and operated by WorkBriefly (“WorkBriefly,” “we,” or “us”).
                WorkBriefly provides a service (the “Service”) that allows its
                customers (“Customers”) to access WorkBriefly’s network of
                contractors (“WorkBriefly workers” or “you” or “Contractor”) to
                identify local providers to meet intermittent needs for
                services. The WorkBriefly Workers have access to the Application
                to receive and review requests for services from Customers and
                to determine their interest in and availability to respond to
                such requests.
                <Text style={{fontWeight: 'bold'}}>
                  PLEASE READ THIS AGREEMENT CAREFULLY. THIS AGREEMENT CONTAINS
                  A MANDATORY INDIVIDUAL ARBITRATION AND CLASS ACTION WAIVER
                  PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN
                  INDIVIDUAL BASIS TO RESOLVE COVERED DISPUTES, RATHER THAN
                  JUDGE OR JURY TRIALS.
                </Text>
              </Text>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    paddingTop: 15,
                  }}>
                  I confirm that I have read and agree to these terms.
                </Text>
              </View>

              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  width: 250,
                  lineHeight: 19,
                  marginTop: 32,
                }}>
                Customer Agreement (simplified)
              </Text>
              <Text
                style={{
                  marginVertical: 16,
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 16,
                }}>
                We understand that you probably won’t read the entire Customer
                Agreement in it’s legal form so we have simplified it for you.
                By agreeing to these terms of use, you understand and
                acknowledge the following:
              </Text>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    paddingTop: 15,
                  }}>
                  WorkBriefly is a platform that allows you to connect with
                  workers who act as independent contractors for a variety of
                  types of tasks.
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    paddingTop: 15,
                  }}>
                  You agree to adhere to local labour laws such as human rights
                  at the workplace and minimum wage laws.
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    paddingTop: 15,
                  }}>
                  You agree to provide a safe working environment and safe
                  working conditions for workers.
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    paddingTop: 15,
                  }}>
                  The Service Fee for engaging a WorkBriefly Worker as an
                  independent contractor totals 20% of the payment amount and is
                  generally for creating, hosting, administering, maintaining
                  and providing the application.
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                <Text
                  style={{
                    flex: 1,
                    paddingLeft: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 16,
                    paddingTop: 15,
                  }}>
                  WorkBriefly Inc. is not liable for any loss of profits or any
                  indirect, consequential, special or punitive damage arising
                  from use of the WorkBriefly platform.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity
            style={style.agreeBtn}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 16,
                fontWeight: '500',
                color: '#003862',
              }}>
              Agree and Continue
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
  },
  bodyContainer: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 21,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 68,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
  },
  agreeBtn: {
    backgroundColor: '#FFCC41',
    width: 303,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 3,
  },
});
