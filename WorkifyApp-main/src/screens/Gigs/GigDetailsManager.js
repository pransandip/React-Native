import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import GigManagerHeader from '../../components/Header/GigManagerHeader';
import {verticalScale, moderateScale} from '../../Constants/PixelRatio';
import DatePicker from 'react-native-datepicker';
import {Icon} from 'native-base';

const {height, width} = Dimensions.get('window');

const GigDetailsManager = () => {
  const [toggle, setToggle] = useState(false);
  const [checkin, setcheckin] = useState([
    {
      date: 'Mon, Apr 11, 2022',
      time: '10:00 AM - 07:00 PM',
      hours: '9 hrs',
    },

    {
      date: 'Mon, Apr 11, 2022',
      time: '10:00 AM - 07:00 PM',
      hours: '9 hrs',
    },
    {
      date: 'Mon, Apr 11, 2022',
      time: '10:00 AM - 07:00 PM',
      hours: '9 hrs',
    },
  ]);
  const [invoice, setInvoice] = useState([
    {
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalEarnings: '50.00',
    },
    {
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalEarnings: '50.00',
    },
    {
      id: '#6546446465',
      gigLength: 'Apr 11 - Apr 15',
      invoiceDate: 'Apr 15, 2022',
      totalHrs: '24 hrs',
      totalEarnings: '50.00',
    },
  ]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [checkInOutModal, setCheckInOutModal] = useState(false);
  const [date, setDate] = useState('');

  return (
    <View style={{height: height}}>
      {/* <GigManagerHeader headerTxt="Gig Detail" /> */}
      <ScrollView>
        {/* <Image
          source={require('../../assets/warehouse.png')}
          style={styles.warehouseImg}
        />

        <View style={styles.topView}>
          <Image source={require('../../assets/jj.png')} />

          <View>
            <Text style={styles.warehouseTxt}>Warehouse Worker</Text>
            <View style={styles.smallTxtView}>
              <Text style={styles.dollarsTxt}>$140</Text>
              <Text style={styles.hourTxt}>($30/hr)</Text>
              <Icon name="dot-single" type="Entypo" />
              <Text style={{color: '#393939'}}>2.5 km</Text>
              <Icon name="dot-single" type="Entypo" />
              <Text style={{color: '#002E6D', textDecorationLine: 'underline'}}>
                View Gig Details
              </Text>
            </View>
          </View>
        </View> */}

        <View style={styles.managerView}>
          <Text style={styles.questionsTxt}>
            If you have any questions, please contact:
          </Text>

          <View style={styles.nameBodyView}>
            <View>
              <Text style={styles.nameTxt}>Oliver Smith</Text>
              <Text style={styles.professionTxt}>Warehouse Manager</Text>
            </View>
            <TouchableOpacity style={styles.chatBtnColor}>
              <Text style={styles.chatTxt}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkInvoiceView}>
          <TouchableOpacity
            onPress={() => setToggle(!toggle)}
            style={styles.tabBtns}>
            <Text
              style={[
                styles.tabTxt,
                {color: toggle == false ? '#002E6D' : '#545454'},
              ]}>
              Check-in
            </Text>
            <View
              style={{
                borderBottomColor: toggle == false ? '#002E6D' : '#545454',
                borderBottomWidth: toggle == true ? null : 1,
                marginTop: verticalScale(10),
                width: '100%',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setToggle(!toggle)}
            style={styles.tabBtns}>
            <Text
              style={[
                styles.tabTxt,
                {color: toggle == false ? '#545454' : '#002E6D'},
              ]}>
              Invoice
            </Text>
            <View
              style={{
                borderBottomColor: toggle == false ? '#545454' : '#002E6D',
                borderBottomWidth: toggle == true ? 1 : null,
                marginTop: verticalScale(10),
                width: '100%',
              }}></View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#C4C4C4',
            borderBottomWidth: 1,
          }}
        />

        {toggle == false ? (
          <TouchableOpacity
            onPress={() => setCheckInOutModal(true)}
            style={styles.listView}>
            {checkin.map((item, index) => {
              return (
                <View style={styles.cardView}>
                  <Text style={styles.dateTxt}>{item.date}</Text>
                  <View style={styles.timeHoursView}>
                    <Text style={styles.timeTxt}>{item.time}</Text>
                    <Icon
                      name="dot-single"
                      type="Entypo"
                      style={{color: '#545454'}}
                    />
                    <Text style={styles.hoursTxt}>{item.hours}</Text>
                  </View>
                </View>
              );
            })}
          </TouchableOpacity>
        ) : (
          <View style={styles.container}>
            <View style={styles.calenderView}>
              <Icon
                name="calendar"
                type="Feather"
                style={styles.calenderIcon}
                // onPress={showDatePicker}
              />

              <DatePicker
                style={{width: '80%', borderWidth: 0}}
                date={date}
                mode="date"
                placeholder="Mon, Apr 11, 2022 - Fri, Apr 15, 2022"
                // placeholderTextColor='#393939'
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
                  },

                  placeholderText: {
                    color: '#393939',
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => setDate(date)}
              />

              {/*       
              <Text style={styles.calenderTxt}>
                &nbsp;&nbsp;Mon, Apr 11, 2022 - Fri, Apr 15, 2022
              </Text> */}
            </View>

            <View style={styles.listView2}>
              {invoice.map((item, index) => {
                return (
                  <View style={styles.cardView2}>
                    <View style={styles.topView2}>
                      <Text style={styles.idTxt}>{item.id}</Text>
                      <Icon
                        name="download"
                        type="AntDesign"
                        style={styles.downloadIcon}
                      />
                    </View>
                    <View style={styles.gigLengthInvoiceView}>
                      <View>
                        <Text style={styles.gigLengthTxt}>Gig Length</Text>
                        <Text style={styles.gigLengthValue}>
                          {item.gigLength}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.invoiceDateTxt}>Invoice Date</Text>
                        <Text style={styles.invoiceDateData}>
                          {item.invoiceDate}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.totalHoursEarningsView}>
                      <View>
                        <Text style={styles.totalHoursTxt}>Total Hours</Text>
                        <Text style={styles.totalHoursValue}>
                          {item.totalHrs}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.totalEarningsTxt}>
                          Total Earnings
                        </Text>
                        <Text style={styles.totalEarningsvalue}>
                          $ {item.totalEarnings}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={checkInOutModal}
        onRequestClose={() => {
          setCheckInOutModal(false);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setCheckInOutModal(false)}
          />

          <View style={styles.modalView}>
            <View style={styles.bodyView}>
              <View style={styles.topView}>
                <Text style={styles.preferenceTxt}>Mon, Apr 11, 2022</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={styles.crossIcon}
                  onPress={() => setCheckInOutModal(false)}
                />
              </View>
              <View style={styles.blockView}>
                <Text style={styles.checkinOutTxt}>Check-In Time</Text>
                <View style={styles.innerView}>
                  <View style={styles.innerblockView}>
                    <Text style={styles.originalAdjustedTxt}>ORIGINAL</Text>
                    <Text style={styles.timeTxt}>10:00 AM</Text>
                  </View>
                  <Icon
                    name="arrowright"
                    type="AntDesign"
                    style={styles.arrowIcon}
                  />
                  <View style={styles.innerblockView}>
                    <Text style={styles.originalAdjustedTxt}>ADJUSTED</Text>
                    <Text style={styles.timeTxt}>11:00 AM</Text>
                  </View>
                </View>
              </View>

              <View style={styles.blockView}>
                <Text style={styles.checkinOutTxt}>Check-Out Time</Text>
                <View style={styles.innerView}>
                  <View style={styles.innerblockView}>
                    <Text style={styles.originalAdjustedTxt}>ORIGINAL</Text>
                    <Text style={styles.timeTxt}>8:00 PM</Text>
                  </View>
                  <Icon
                    name="arrowright"
                    type="AntDesign"
                    style={styles.arrowIcon}
                  />
                  <View style={styles.innerblockView}>
                    <Text style={styles.originalAdjustedTxt}>ADJUSTED</Text>
                    <Text style={styles.timeTxt}>7:30 PM</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GigDetailsManager;

const styles = StyleSheet.create({
  warehouseImg: {
    width: width,
    height: verticalScale(150),
  },

  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(15),
    height: verticalScale(80),
    paddingHorizontal: moderateScale(10),
  },
  warehouseTxt: {
    color: '#393939',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  smallTxtView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarsTxt: {
    color: '#393939',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  hourTxt: {
    color: '#393939',
    fontSize: moderateScale(11),
    marginStart: moderateScale(5),
  },

  managerView: {
    backgroundColor: '#FBF5E7',
    // backgroundColor:'red',
    marginHorizontal: moderateScale(20),
  },
  questionsTxt: {
    color: '#8A8A8A',
    fontSize: moderateScale(10),
    marginTop: verticalScale(12),
    marginHorizontal: moderateScale(12),
  },
  nameBodyView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(12),
  },
  chatBtnColor: {
    backgroundColor: '#002E6D',
    height: verticalScale(36),
    width: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatTxt: {
    color: 'white',
  },
  nameTxt: {
    color: '#393939',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  professionTxt: {
    color: '#393939',
    fontSize: moderateScale(10),
  },
  checkInvoiceView: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(22),
  },
  tabBtns: {
    width: '50%',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  tabTxt: {
    fontWeight: 'bold',
  },
  listView: {
    marginVertical: moderateScale(15),
  },
  cardView: {
    backgroundColor: 'white',
    elevation: 3,
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(20),
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(16),
  },
  timeHoursView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTxt: {
    color: '#393939',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  timeTxt: {
    color: '#545454',
  },
  hoursTxt: {
    color: '#545454',
  },
  container: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(24),
  },
  calenderView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(13.9),
  },
  calenderIcon: {
    color: '#002E6D',
    fontSize: moderateScale(20),
  },
  calenderTxt: {
    color: '#393939',
    fontWeight: 'bold',
  },
  listView2: {
    marginVertical: verticalScale(16),
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

  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalView: {
    backgroundColor: 'white',

    height: verticalScale(350),
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
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(15),
  },
  crossIcon: {
    // alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
  preferenceTxt: {
    color: '#272727',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    // paddingLeft: moderateScale(10),
  },
  checkinOutTxt: {
    color: '#272727',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  blockView: {
    marginTop: verticalScale(24),
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerblockView: {
    marginTop: verticalScale(8),
  },
  originalAdjustedTxt: {
    color: '#737373',
  },
  timeTxt: {
    color: '#393939',
    fontSize: moderateScale(15),
    marginTop: verticalScale(8),
    fontWeight: 'bold',
  },
  arrowIcon: {
    color: '#414141',
  },
});
