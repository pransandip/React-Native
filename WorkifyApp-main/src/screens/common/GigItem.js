import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Axios, {URL} from '../../api/Axios';

import JJ from '../../../assets/jj.png';
import Calender from '../../../assets/calender.png';
import Location from '../../../assets/location.png';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';

export default class GigItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  convertKm = (distance) => {
    return distance / 1000;
  };

  componentDidMount() {
    console.log('hello data', this.props.item);
  }

  formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  render() {
    console.log(`image url------>>`, Axios.URL);
    const {
      item: {
        position,
        business_name,
        cover_image,
        subtotal,
        hourly_pay,
        vacancies,
        status,
        distance,
        id,
        startdate,
        enddate,
        starttime,
        endtime,
        total_amount,
        day_type,
      },
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation('GigDetails', {
            id: id,
          })
        }
        style={[
          style.cardView,
          {
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor:'blue'
          },
        ]}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginVertical: 2,
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            {status === 'active' ? (
              <View
                style={{
                  height: 12,
                  width: 12,
                  backgroundColor: '#74B711',
                  borderRadius: 12,
                }}></View>
            ) : (
              <View
                style={{
                  height: 12,
                  width: 12,
                  backgroundColor: '#D72F2F',
                  borderRadius: 12,
                }}></View>
            )}
            <Text style={{marginLeft: 4}}>3/{vacancies}</Text>
          </View>
          <Image
            source={cover_image ? {uri: `${URL}${cover_image}`} : JJ}
            style={{height: 40, width: 40, borderRadius: 20}}
          />
        </View>
        <View style={{width: '56%'}}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: '#393939'}}
            numberOfLines={1}>
            {position}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#393939',
              lineHeight: 20,
            }}>
            {business_name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image source={Calender} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#8A8A8A',
                lineHeight: 16,
              }}>
              {`${new Date(startdate).toDateString()} ${
                enddate && day_type === 'multiple'
                  ? `- ${new Date(enddate).toDateString()}`
                  : ''
              } `}
              {this.formatAMPM(new Date(starttime))} -{' '}
              {this.formatAMPM(new Date(endtime))}
              {/* myDate.toDateString()}{' '}
              {data.item.day_type === 'multiple'
                ? '- ' + endDate.toDateString()
                : ''} */}
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#8A8A8A',
                lineHeight: 16,
              }}>
              {' '}
              {`${new Date(startdate).toDateString()} ${
                enddate ? `- ${new Date(enddate).toDateString()}` : ''
              } `}
              {`${
                new Date(starttime).toString() === 'Invalid Date'
                  ? `${starttime + ` - ` + endtime}`
                  : new Date(`${starttime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    }) +
                    ` - ` +
                    new Date(`${endtime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })
              }`}
            </Text> */}
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image source={Location} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#8A8A8A',
                lineHeight: 16,
              }}>
              {' '}
              {this.convertKm(distance).toFixed(2)} km
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#393939'}}>
            ${total_amount}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#8A8A8A',
              lineHeight: 16,
            }}>
            (${hourly_pay}/hr)
          </Text>
        </View>
      </TouchableOpacity>
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

  cardView: {
    marginHorizontal: 15,
    backgroundColor: '#FFFF',
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 4,
  },
  rootView: {
    backgroundColor: 'white',
    flex: 1,
  },
  img: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
  },

  topView: {
    paddingHorizontal: moderateScale(20),
    // marginBottom:verticalScale(150)
  },

  imgView: {
    flexDirection: 'row',
    marginTop: verticalScale(35),
    alignItems: 'center',
    position: 'relative',
  },
  txtView: {
    marginStart: moderateScale(10),
  },
  welcomeTxt: {
    color: '#393939',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  staffMemberView: {
    marginTop: verticalScale(54),

    backgroundColor: '#C0E4EC',
    height: verticalScale(215),
    paddingHorizontal: moderateScale(16),
  },
  addTxt: {
    color: '#393939',
    fontSize: moderateScale(17),
    marginTop: verticalScale(24),
    fontWeight: `bold`,
  },
  descTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  addStaffView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:verticalScale(20)
  },
  addStaffBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(40),
    width: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    elevation: 5,
    borderRadius: moderateScale(3),
  },
  addStaffTxt: {
    color: '#13327C',
    fontWeight: `bold`,
  },
  gigView: {
    height: verticalScale(180),
    backgroundColor: '#002E6D',
    marginTop: verticalScale(20),
  },
  gigTxt: {
    color: 'white',
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    marginHorizontal: moderateScale(16),
    marginVertical: verticalScale(20),
  },
  gigTxtDesc: {
    color: 'white',
    fontSize: moderateScale(11),
    marginHorizontal: moderateScale(16),
  },
  addGigView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(16),
  },
  addGigBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(40),
    width: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    elevation: 5,
    borderRadius: moderateScale(2),
  },
  addGigTxt: {
    color: '#13327C',
    fontWeight: `bold`,
  },
  boardImg: {
    position: 'absolute',
    // marginStart:moderateScale(100),
    //  bottom:verticalScale(0),
    // top:verticalScale(0),
    right: 0,
    bottom: 0,
    //  backgroundColor:'red'
  },
  bgImg: {
    height: verticalScale(175),
    // backgroundColor: 'red',
    marginVertical: verticalScale(20),
    marginBottom: verticalScale(100),
    // marginTop: 50,
    paddingHorizontal: moderateScale(16),
  },
  workersView: {
    width: '50%',
  },
  bookedTxt: {
    color: '#393939',
    fontSize: moderateScale(17),
    marginTop: verticalScale(24),
    fontWeight: `bold`,
  },
  workersTxt: {
    marginTop: verticalScale(20),
    fontSize: moderateScale(11),
    color: '#545454',
  },
});
