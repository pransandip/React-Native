import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Logo from '../../assets/Logo.png';
import Success from '../../assets/success.png';

export default class SignupSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   continue to login
  continueBtn = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <Image source={Logo} />
        </View>
        <View style={style.bodyContainer}>
          <Text
            style={[
              {
                color: '#393939',
                textAlign: 'left',
                fontSize: 24,
                fontWeight: '700',
                marginBottom: 0,
                width: '70%',
              },
            ]}>
            Start filling shifts with WorkBriefly
          </Text>
          <Text style={{marginTop: 28}}>Step 3/3: Account Details</Text>
          <View style={style.loginCard}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              <Image source={Success} />
              <Text
                style={{
                  marginTop: 30,
                  color: '#272727',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Thank you for creating your account.
              </Text>
              <Text
                style={{
                  color: '#5E5E5E',
                  fontSize: 14,
                  fontWeight: '400',
                  textAlign: 'center',
                  marginTop: 12,
                }}>
                Our team will verify your account and will get back to you.
              </Text>
            </View>
            <TouchableOpacity
              style={style.signInBtn}
              onPress={() => this.continueBtn()}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 16,
                  color: '#003862',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 48,
    marginHorizontal: 16,
  },
  loginCard: {
    marginTop: 24,
    height: 353,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.625912,
    borderColor: '#979797',
    borderRadius: 2.5,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  signInBtn: {
    marginTop: 29,
    marginBottom: 20,
    paddingHorizontal: 79,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#FFCC41',
    borderRadius: 3,
  },
});
