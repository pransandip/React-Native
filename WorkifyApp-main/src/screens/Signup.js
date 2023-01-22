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

import Logo from '../../assets/Logo.png';
import defaultStyle from '../common/Typography';
import Left from '../../assets/Left.png';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} style={{marginLeft: 120}} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                Start earning money with WorkBriefly
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
                Worker Service Agreement (Terms & Conditions)
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
                  I am legally permitted to work in Canada (I am either a:
                  Canadian Citizen, Permanent Resident, or valid work permit
                  holder).
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
                  I agree to use WorkBriefly as an independent contractor and
                  understand that I am responsible for filing my own taxes.
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
                The Worker Service Agreement (simplified)
              </Text>
              <Text
                style={{
                  marginVertical: 16,
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 16,
                }}>
                We understand that you probably won’t read the entire Worker
                Service Agreement in it’s legal form so we have simplified it
                for you. By agreeing to these terms of use, I understand and
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
                  businesses/requestors for a variety of types of tasks.
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
                  You are acting as an independent contractor and can agree to
                  perform or not perform tasks available through the WorkBriefly
                  App.
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
                  As an independent contractor, you are entirely able to decide
                  which requests to accept.
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
                  There is no minimum or maximum number of requests that you can
                  perform.
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
                  The terms of use include a provision requiring all disputes to
                  be resolved via individual arbitration.
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
                  You are responsible for all of your own insurance, including
                  unemployment, workers compensation, and medical.
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
                  As an independent contractor, you are responsible for filing
                  your own income taxes.
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
                  Neither WorkBriefly nor the requestors provide benefits to
                  you.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={style.footer}>
          <TouchableOpacity
            style={style.agreeBtn}
            onPress={() => this.props.navigation.navigate('SignupForm')}>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
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
