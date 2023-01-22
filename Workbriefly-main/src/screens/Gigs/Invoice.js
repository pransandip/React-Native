import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';
import DatePicker from 'react-native-datepicker';
// import axios from 'axios';
import Axios from '../../api/Axios';
import AsyncStorage from '@react-native-community/async-storage';

const Invoice = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState('');

  const [invoice, setInvoice] = useState([
    {
      name: 'Glenn Maxwell',
      img: 'https://s.ndtvimg.com/images/stories/maxwell_kumble_300.jpg',
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalPayment: '50.00',
    },
    {
      name: 'Glenn Maxwell',
      img: 'https://s.ndtvimg.com/images/stories/maxwell_kumble_300.jpg',
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalPayment: '50.00',
    },
    {
      name: 'Glenn Maxwell',
      img: 'https://s.ndtvimg.com/images/stories/maxwell_kumble_300.jpg',
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalPayment: '50.00',
    },
    {
      name: 'Glenn Maxwell',
      img: 'https://s.ndtvimg.com/images/stories/maxwell_kumble_300.jpg',
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalPayment: '50.00',
    },
  ]);

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [gigDetailsData, setGigDetailsData] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationDetails, setLocationDetails] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      getGigDetails();
      getLocationDetails();
    });
  }, [token]);

  const getGigDetails = () => {
    setLoading(true);
    Axios({
      method: 'GET',
      url: `api/gig/specific/${props.passId}`,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log('response---------->>', response);
        if (response?.data?.ack === 1) {
          // console.log('response---------->>', response.data.data[0]);
          setGigDetailsData(response.data.data[0]);
          setLocationId(response.data.data[0].location_id);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLocationDetails = () => {
    Axios({
      method: 'GET',
      url: `api/location/${locationId}`,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log(`location-------->>>`, response.data);
          setLocationDetails(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.root}>
      <View style={styles.bodyView}>
        <View style={styles.imageView}>
          <View style={styles.blockView}>
            <Image source={require('../../../assets/company.png')} />
            <Text style={styles.normalTxt}>COMPANY</Text>
            <Text numberOfLines={2} style={styles.boldTxt}>
              {gigDetailsData.business_name}
            </Text>
          </View>

          <View style={[styles.blockView, {paddingEnd: moderateScale(9)}]}>
            <Image source={require('../../../assets/calendar2.png')} />
            <Text style={styles.normalTxt}>GIG TYPE</Text>
            <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
              {gigDetailsData.day_type} Day
            </Text>
          </View>
        </View>

        <View style={styles.imageView}>
          <View style={styles.blockView}>
            <Image source={require('../../../assets/notes.png')} />
            <Text style={styles.normalTxt}>PAY FREQUENCY</Text>
            <Text style={[styles.boldTxt, {textTransform: 'capitalize'}]}>
              {gigDetailsData.pay_frequency}
            </Text>
          </View>

          <View style={[styles.blockView, {paddingEnd: moderateScale(12)}]}>
            <Image source={require('../../../assets/handBag.png')} />
            <Text style={styles.normalTxt}>VACANCY</Text>
            <Text style={styles.boldTxt}>{gigDetailsData.vacancies}/03</Text>
          </View>
        </View>

        <View style={styles.imageView}>
          <View style={styles.blockView}>
            <Image source={require('../../../assets/stopWatch.png')} />
            <Text style={styles.normalTxt}>UNPAID BREAK</Text>
            <Text style={styles.boldTxt}>
              {gigDetailsData.unpaid_break} mins
            </Text>
          </View>

          <View style={styles.blockView}>
            <Image source={require('../../../assets/stopWatch.png')} />
            <Text style={styles.normalTxt}>PAID BREAK</Text>
            <Text style={styles.boldTxt}>{gigDetailsData.paid_break} mins</Text>
          </View>
        </View>

        <View style={{marginStart: moderateScale(10)}}>
          <Image source={require('../../../assets/clock.png')} />

          <Text style={styles.normalTxt}>Date & TIME</Text>

          <Text style={styles.boldTxt}>{gigDetailsData.starttime}</Text>
        </View>

        <View
          style={{
            marginStart: moderateScale(10),
            marginTop: verticalScale(20),
          }}>
          <Image source={require('../../../assets/location.png')} />

          <Text style={styles.normalTxt}>Location</Text>

          <Text style={[styles.boldTxt, {textDecorationLine: 'underline'}]}>
            {locationDetails.address1}
          </Text>
        </View>

        <View style={styles.backgroundView}>
          <Image source={require('../../../assets/shield.png')} />
          <Text style={styles.criminallyTxt}>
            Criminally background checked required.
          </Text>
        </View>

        <View
          style={{
            borderBottomColor: '#C4C4C4',
            borderBottomWidth: 1,
            marginVertical: verticalScale(32),
          }}
        />
        <View style={styles.calenderView}>
          <Icon
            name="calendar"
            type="Feather"
            style={styles.calenderIcon}
            // onPress={showDatePicker}
          />
          <DatePicker
            style={{width: '90%', borderWidth: 0}}
            date={date}
            mode="date"
            placeholder="Mon, Apr 11, 2022 - Fri, Apr 15, 2022"
            placeholderTextColor="#393939"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            // iconSource={require('../../assets/calender4.png')}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
                borderWidth: 0,
              },
              dateInput: {
                marginLeft: moderateScale(10),
                height: verticalScale(30),
              },

              placeholderText: {
                color: '#393939',
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => setDate(date)}
          />
        </View>
        <View style={styles.searchView}>
          <Icon name="search" type="EvilIcons" style={styles.searchIcon} />
          <TextInput
            placeholder="Search by name and invoice no."
            placeholderTextColor="#969696"
          />
        </View>

        {invoice.map((item, index) => {
          return (
            <View style={styles.cardView2}>
              <View style={styles.topView2}>
                <View style={styles.topLeftView}>
                  <Image
                    source={{
                      uri: item.img,
                    }}
                    style={styles.img}
                  />
                  <View style={styles.nameIdView}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    <Text style={styles.idTxt}>{item.id}</Text>
                  </View>
                </View>

                <Icon
                  name="download"
                  type="AntDesign"
                  style={styles.downloadIcon}
                />
              </View>
              <View style={styles.gigLengthInvoiceView}>
                <View>
                  <Text style={styles.gigLengthTxt}>Gig Length</Text>
                  <Text style={styles.gigLengthValue}>{item.gigLength}</Text>
                </View>
                <View>
                  <Text style={styles.invoiceDateTxt}>Invoice Date</Text>
                  <Text style={styles.invoiceDateData}>{item.invoiceDate}</Text>
                </View>
              </View>
              <View style={styles.totalHoursEarningsView}>
                <View>
                  <Text style={styles.totalHoursTxt}>Total Hours</Text>

                  <Text style={styles.totalHoursValue}>{item.totalHrs}</Text>
                </View>
                <View>
                  <Text style={styles.totalEarningsTxt}>Total Payment</Text>
                  <Text style={styles.totalEarningsvalue}>
                    $ {item.totalPayment}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  root: {
    // marginBottom: verticalScale(150),
    flex: 1,
    // backgroundColor:'red'
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: moderateScale(10),
    justifyContent: 'space-between',
  },
  blockView: {
    marginVertical: verticalScale(20),

    width: '45%',
    justifyContent: 'center',
  },
  normalTxt: {
    color: '#8A8A8A',
    marginTop: verticalScale(6),
    fontSize: moderateScale(12),
  },
  boldTxt: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  backgroundView: {
    flexDirection: 'row',
    backgroundColor: '#E9F5FB',
    // backgroundColor:'red',
    height: verticalScale(48),
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(15),
    // marginHorizontal:moderateScale(50)
  },
  criminallyTxt: {
    color: '#393939',
    // paddingStart: moderateScale(5),
    fontSize: moderateScale(12.5),
    fontWeight: 'bold',
  },
  calenderView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(13.9),
    height: verticalScale(40),
    // alignSelf: 'center',
  },
  calenderIcon: {
    color: '#002E6D',
    fontSize: moderateScale(20),
  },
  calenderTxt: {
    color: '#393939',
    fontWeight: 'bold',
  },
  searchView: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(13.67),
    height: verticalScale(40),
  },
  searchIcon: {
    color: '#002E6D',
  },
  cardView2: {
    backgroundColor: 'white',
    elevation: 5,
    // marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(10),
    paddingVertical: verticalScale(21),
    paddingHorizontal: moderateScale(16),
  },
  topView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  nameIdView: {
    paddingStart: moderateScale(12),
  },
  nameTxt: {
    color: '#393939',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  idTxt: {
    color: '#002E6D',
    fontSize: moderateScale(11),
    backgroundColor: '#F1F1F1',
    padding: 3,
  },
  downloadIcon: {
    fontSize: moderateScale(20),
    color: '#002E6D',
  },
  gigLengthInvoiceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(10),
    // paddingHorizontal:moderateScale(20)
  },

  gigLengthTxt: {
    color: '#545454',
  },
  gigLengthValue: {
    color: '#393939',
    fontWeight: 'bold',
  },

  invoiceDateTxt: {
    color: '#545454',
  },
  invoiceDateData: {
    color: '#393939',
    fontWeight: 'bold',
  },
  totalHoursEarningsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  totalHoursTxt: {
    color: '#545454',
  },
  totalHoursValue: {
    color: '#393939',
    fontWeight: 'bold',
  },

  totalEarningsTxt: {
    color: '#545454',
  },
  totalEarningsvalue: {
    color: '#74B711',
    fontWeight: 'bold',
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
