import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import DetailsHeader from '../../components/headers/DetailsHeader';
import {Icon, Item} from 'native-base';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import DatePicker from 'react-native-date-picker';
const {height, width} = Dimensions.get('window');

const ConfirmCheckIn = () => {
  const [completed, setCompleted] = useState(false);
  const [submmit, setSubmmit] = useState(true);
  const [checkIn, setCheckIn] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [checkinOut, setCheckinOut] = useState([
    {
      date: 'Wed, Apr 20, 2022',
      time: '10:00 AM - 8:00 PM',
      status: 'Checked In',
    },

    {
      date: 'Wed, Apr 20, 2022',
      time: '10:00 AM - 8:00 PM',
      status: 'Checked In',
    },
  ]);

  return (
    <View style={styles.root}>
      <DetailsHeader
        disable={true}
        headerTxt={submmit == true ? 'Confirm Check In' : 'Check In'}
      />

      <ScrollView>
        <View style={styles.profileView}>
          <Image
            source={{
              uri: 'https://static.wikia.nocookie.net/jamesbond/images/d/dc/James_Bond_%28Pierce_Brosnan%29_-_Profile.jpg/revision/latest?cb=20220207082851',
            }}
            style={styles.img}
          />

          <View style={styles.nameTxtView}>
            <Text style={styles.nameTxt}>James Bond 007</Text>
            <View style={styles.chatRemoveReportView}>
              <Text style={[styles.chatRemoveReportTxt, {color: '#002E6D'}]}>
                Chat
              </Text>
              <Icon name="dot-single" type="Entypo" style={styles.dot} />
              <Text
                style={[
                  styles.chatRemoveReportTxt,
                  {color: submmit == true ? '#002E6D' : '#BBBBBB'},
                ]}>
                Remove Worker
              </Text>
              <Icon name="dot-single" type="Entypo" style={styles.dot} />
              <Text
                style={[
                  styles.chatRemoveReportTxt,
                  {color: submmit == true ? '#D72F2F' : '#BBBBBB'},
                ]}>
                Report Issue
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyView}>
          {/* <View style={styles.checkInView}>
            <View>
              <Text style={styles.dateTxt}>Wed, Apr 20, 2022</Text>
              <Text style={styles.timeTxt}>10:00 AM - 8:00 PM</Text>
            </View>
            <View style={styles.rightView}>
              <Text style={styles.checkedInTxt}>Checked in</Text>
              <Icon name="remove-outline" type="Ionicons" style={styles.dash} />
            </View>
          </View> */}

          {checkinOut.map((item, index) => {
            return (
              <View style={styles.checkInView}>
                <View>
                  <Text style={styles.dateTxt}>{item.date}</Text>
                  <Text style={styles.timeTxt}>{item.time}</Text>
                </View>
                <View style={styles.rightView}>
                  <Text style={styles.checkedInTxt}>{item.status}</Text>
                  <Icon name="plus" type="Entypo" style={styles.dash} />
                </View>
              </View>
            );
          })}

          <View style={styles.checkinView}>
            <Text style={styles.checkinTxt}>Check-In Time</Text>
            <TouchableOpacity onPress={() => setCheckIn(true)}>
              <Text style={styles.updateCheckinTxt}>Update Check-In Time</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkInOutView}>
            <View>
              <Text style={styles.oriadjustTxt}>ORIGINAL</Text>
              <Text style={styles.timeTxxt}>10:00 AM</Text>
            </View>
            <Icon name="arrowright" type="AntDesign" style={styles.arrow} />
            <View>
              <Text style={styles.oriadjustTxt}>ADJUSTED</Text>
              <Text style={styles.timeTxxt}>11:00 AM</Text>
            </View>
          </View>

          <View style={styles.checkinView}>
            <Text style={styles.checkinTxt}>Check-Out Time</Text>
            <TouchableOpacity onPress={() => setCheckout(true)}>
              <Text style={styles.updateCheckinTxt}>Update Check-Out Time</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkInOutView}>
            <View>
              <Text style={styles.oriadjustTxt}>ORIGINAL</Text>
              <Text style={styles.timeTxxt}>8:00 PM</Text>
            </View>
            <Icon name="arrowright" type="AntDesign" style={styles.arrow} />
            <View>
              <Text style={styles.oriadjustTxt}>ADJUSTED</Text>
              <Text style={styles.timeTxxt}>7:30 PM</Text>
            </View>
          </View>

          {submmit == true ? (
            <TouchableOpacity
              onPress={() => setSubmmit(false)}
              style={styles.submmitBtn}>
              <Text style={styles.submmitTxt}>Submit</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.completeView}>
        {completed == false ? (
          <TouchableOpacity
            onPress={() => setCompleted(true)}
            style={styles.completeBtn}>
            <Text style={styles.completeTxt}>Complete Gig</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.completedBtn}>
            <Icon
              name="checkcircle"
              type="AntDesign"
              style={styles.checkIcon}
            />
            <Text style={styles.completedTxt}>&nbsp;&nbsp;Gig Completed</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        transparent={true}
        visible={checkIn}
        onRequestClose={() => {
          setCheckIn(!checkIn);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setCheckIn(false)} />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.startEndTime}>Check In Time</Text>
              <Icon
                onPress={() => setCheckIn(false)}
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
              />
            </View>
            <Text style={styles.startEndTxt}>
              You can update worker check-in time.
            </Text>
            <View style={styles.timePicker}>
              <DatePicker
                mode="time"
                date={checkinDate}
                onDateChange={setCheckinDate}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={checkout}
        onRequestClose={() => {
          setCheckout(!checkout);
        }}>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setCheckout(false)} />
          <View style={styles.modalView}>
            <View style={styles.topView}>
              <Text style={styles.startEndTime}>Check Out Time</Text>
              <Icon
                onPress={() => setCheckout(false)}
                name="cross"
                type="Entypo"
                style={styles.crossIcon}
              />
            </View>
            <Text style={styles.startEndTxt}>
              You can update worker check-out time.
            </Text>
            <View style={styles.timePicker}>
              <DatePicker
                mode="time"
                date={checkoutDate}
                onDateChange={setCheckoutDate}
              />
            </View>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmCheckIn;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    height: height,
    backgroundColor: '#FAFAFA',
  },
  profileView: {
    height: verticalScale(92),
    backgroundColor: '#EBF7F9',
    // justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  img: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  nameTxtView: {
    paddingStart: moderateScale(12),
  },
  nameTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },

  chatRemoveReportView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatRemoveReportTxt: {
    textDecorationLine: 'underline',
  },
  dot: {
    color: '#393939',
  },
  bodyView: {
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(28),
    // backgroundColor:'#F1F1F1',
    // height:200
  },
  checkInView: {
    backgroundColor: '#F1F1F1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(12),
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  timeTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
    marginTop: verticalScale(5),
  },
  checkedInTxt: {
    backgroundColor: '#DEE8CF',
    color: '#74B711',
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(8),
  },
  dash: {
    color: '#545454',
  },
  checkinView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(24),
  },
  checkinTxt: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  updateCheckinTxt: {
    color: '#002E6D',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  checkInOutView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(11),
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(16),
  },
  oriadjustTxt: {
    color: '#737373',
  },
  timeTxxt: {
    color: '#393939',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  arrow: {
    color: '#414141',
  },
  submmitBtn: {
    backgroundColor: '#002E6D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(4),
    marginTop: verticalScale(30),
  },
  submmitTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  completeView: {
    backgroundColor: 'white',
    height: verticalScale(68),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16),

    // alignItems:'center'
  },
  completeBtn: {
    backgroundColor: '#FFCC41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
  },
  completeTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  completedBtn: {
    backgroundColor: '#EAF4DB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: moderateScale(15),
    color: '#74B711',
  },
  completedTxt: {
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
    borderTopRightRadius: moderateScale(16),
    height: verticalScale(320),
    borderTopLeftRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(28),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startEndTime: {
    color: '#393939',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  crossIcon: {
    color: '#5E5E5E',
  },
  startEndTxt: {
    color: '#545454',
    marginTop: verticalScale(8),
    fontSize: moderateScale(12),
  },
  saveBtn: {
    backgroundColor: '#FFCC41',
    marginTop: verticalScale(24),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  saveTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  timePicker: {
    marginStart: moderateScale(50),
    height: verticalScale(150),
  },
});
