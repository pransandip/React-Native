import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import HomeScreenEmpty from './HomeScreenEmpty';
import ProfilePic from '../../../assets/profile.png';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import HomeScreen from './HomeScreen';
import Axios, {URL} from '../../api/Axios';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
      });
    });
  }

  render() {
    const {userData} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F9F9F9'}}>
        <View style={style.dashboardHeader}>
          <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '500'}}>
            Home
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: verticalScale(22),
            paddingHorizontal: moderateScale(20),
          }}>
          <Image
            source={
              userData?.company_logo
                ? {uri: `${URL}` + userData?.company_logo}
                : ProfilePic
            }
            style={{height: 60, width: 60, borderRadius: 30}}
          />
          <View style={{paddingLeft: 15}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#393939'}}>
              Welcome,{' '}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#393939',
                width: '80%',
              }}>
              {userData.business_name}
            </Text>
          </View>
        </View>
        <View style={style.bodyContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <HomeScreenEmpty /> */}
            <HomeScreen />
            {/* <Text>Sayak</Text> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  dashboardHeader: {
    backgroundColor: '#002E6D',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginVertical: 18,
    // marginBottom: 10,
    // backgroundColor: 'red',
  },
});
