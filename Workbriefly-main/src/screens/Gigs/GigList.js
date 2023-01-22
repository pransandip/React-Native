import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {Icon, Fab} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import Axios from '../../api/Axios';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import GigsHeader from '../../components/headers/GigsHeader';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Snackbar from 'react-native-snackbar';

const {height, width} = Dimensions.get('window');

const GigList = (props) => {
  const [toggle, setToggle] = useState(false);
  const [toggleDay, setToggleDay] = useState('single');
  const [gigListData, setGigListData] = useState([]);

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  const [multipleDayGigs, setMultipleDayGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gigList, setGigList] = useState([]);
  const [completedGigs, setCompletedGigs] = useState([]);

  const [modalColors, setModalColors] = useState(false);

  const [status, setStatus] = useState('active');
  const [complete, setComplete] = useState('complete');

  const [dayType, setDayType] = useState('single');

  const handleModal = () => {
    setModalColors(true);
  };

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const renderSingleItem = (data) => {
    // console.log(`data----->>`, data);

    let myDate = new Date(data.item.startdate);
    let endDate = new Date(data.item.enddate);
    let starttime = new Date(data.item.starttime);
    let entime = new Date(data.item.endtime);

    // console.log(`dayType--------->>`, dayType);

    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('GigDetails', {id: data.item.id})
        }
        style={styles.cardView}>
        <View style={{width: '60%'}}>
          <View style={styles.topView}>
            <Image
              source={
                data.item.status == 'confirmed'
                  ? require('./../../../assets/greenOval.png')
                  : data.item.status == 'waiting'
                  ? require('./../../../assets/yellowOval.png')
                  : require('./../../../assets/redOval.png')
              }
            />
            <Text style={styles.topTxt}>
              &nbsp;&nbsp;{data.item.confirm_count}/3
            </Text>
            <Text style={styles.topTxt}>
              &nbsp;&nbsp;({data.item.applied_count} Applicants)
            </Text>
          </View>
          <Text style={styles.giNameTxt} numberOfLines={2}>
            {data.item.position}
          </Text>
          {/* <Text style={styles.timeTxt}>{data.item.starttime}</Text> */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.timeTxt}>
              {myDate.toDateString()}{' '}
              {data.item.day_type === 'multiple'
                ? '- ' + endDate.toDateString()
                : ''}
              {' ' + formatAMPM(starttime)} - {formatAMPM(entime)}
            </Text>
          </View>
        </View>

        <View style={{width: '40%', alignItems: 'flex-end'}}>
          <Text style={styles.amountTxt}>$ {data.item.total_amount.toFixed(2)}</Text>
          <Text style={styles.rateTxt}>(${data.item.hourly_pay}/hr)</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          props.navigation.navigate('EditGig', {
            id: data.item.id,
          });
        }}>
        {/* <Text style={styles.backTextWhite}>Edit</Text> */}
        <Image source={require('../../../assets/edit.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          cloneGigs(data.item.id);
        }}>
        {/* <Text style={styles.backTextWhite}>Copy</Text> */}
        <Image source={require('../../../assets/copy.png')} />
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      getGigList();
      getCompletedList();
    });

    let fo = props.navigation.addListener('focus', (e) => {
      setStatus('active');
      setToggleDay('single');
      setDayType('single');
      getGigList();
    });
    return fo;
  }, [token]);

  const getGigList = () => {
    setLoading(true);
    Axios({
      method: 'GET',
      url:
        'api/gig/getall? status=' +
        status +
        '&day_type=' +
        toggleDay +
        '&page=' +
        1,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          // console.log('response---------->>', response.data);
          setLoading(false);
          setGigListData(response.data.data);
          // dataUpdate(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCompletedList = () => {
    setLoading(true);
    Axios({
      method: 'GET',
      url: 'api/gig/getall?status=' + complete,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          // console.log(`response----------->>>>`, response.data.data);
          setLoading(false);
          setCompletedGigs(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGigList();
  }, [toggleDay]);

  const showSingle = () => {
    // setLoading(true);
    setGigListData([]);
    setToggleDay('single');

    // setDayType('multiple');
  };

  const showMultiple = () => {
    // setLoading(true);
    setGigListData([]);
    setToggleDay('multiple');

    // setDayType('multiple');
  };

  const showCompleted = () => {
    setLoading(true);
    setGigListData([]);
    setToggle(true);
    setStatus('completed');
    getGigList();
  };

  const cloneGigs = (id) => {
    Axios({
      method: 'GET',
      url: 'api/gig/clonegig/' + id,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: 'Gig Data successfully cloned',
            duration: Snackbar.LENGTH_LONG,
          });
          getGigList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log('gigListData------------>>', gigListData);

  return (
    <SafeAreaView style={styles.rootView}>
      <GigsHeader handleModal={handleModal} headerTxt="Gigs" />

      <View style={styles.checkInvoiceView}>
        <TouchableOpacity
          onPress={() => setToggle(false)}
          style={styles.tabBtns}>
          <Text
            style={[
              styles.tabTxt,
              {color: toggle == false ? '#002E6D' : '#545454'},
            ]}>
            Active
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
          // onPress={() => setToggle(true)}
          onPress={showCompleted}
          style={styles.tabBtns}>
          <Text
            style={[
              styles.tabTxt,
              {color: toggle == false ? '#545454' : '#002E6D'},
            ]}>
            Completed
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

      <ScrollView style={{marginBottom: verticalScale(60)}}>
        {toggle == false ? (
          <View style={styles.bodyView}>
            <View style={styles.daysBtnsView}>
              <Pressable
                // onPress={() => setToggleDay(false)}
                onPress={showSingle}
                style={[
                  styles.dayBtn,
                  {
                    backgroundColor:
                      toggleDay == 'single' ? '#FFCC41' : 'white',
                    marginStart: moderateScale(10),
                  },
                ]}>
                <Text
                  style={[
                    styles.dayTxt,
                    {
                      color: toggleDay == 'single' ? '#13327C' : '#393939',
                    },
                  ]}>
                  Single Day
                </Text>
              </Pressable>

              <Pressable
                // onPress={() => setToggleDay(true)}
                onPress={showMultiple}
                style={[
                  styles.dayBtn,
                  {
                    backgroundColor:
                      toggleDay == 'multiple' ? '#FFCC41' : 'white',
                    marginEnd: moderateScale(10),
                  },
                ]}>
                <Text
                  style={[
                    styles.dayTxt,
                    {color: toggleDay == 'multiple' ? '#13327C' : '#393939'},
                  ]}>
                  Multiple Day
                </Text>
              </Pressable>
            </View>

            {gigListData.length != 0 ? (
              <SwipeListView
                data={gigListData}
                // onPress={() => props.navigation.navigate('GigDetails')}

                renderItem={renderSingleItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />
            ) : loading == false ? (
              <>
                <View
                  style={[
                    styles.cardView2,
                    {
                      alignItems: 'center',
                      // justifyContent: 'center',
                      // paddingTop: 10,
                      // height: 120,
                      height: verticalScale(350),
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                      width: '100%',
                    },
                  ]}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/noRecords.png')}
                    style={styles.noRecordsImg}
                  />
                </View>
              </>
            ) : null}
          </View>
        ) : (
          <View style={styles.bodyView}>
            {completedGigs.length != 0 ? (
              <>
                {completedGigs.map((item, index) => {
                  let myDate = new Date(item.starttime);
                  let mytime = new Date(item.endtime);
                  console.log(`status--->>`, item.status);
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('GigDetails', {id: item.id})
                      }
                      style={styles.cardView}>
                      <View style={{flex: 2}}>
                        <View style={styles.topView}>
                          <Image
                            source={
                              item.status == 'confirmed'
                                ? require('./../../../assets/greenOval.png')
                                : item.status == 'waiting'
                                ? require('./../../../assets/yellowOval.png')
                                : require('./../../../assets/redOval.png')
                            }
                          />
                          <Text style={styles.topTxt}>
                            &nbsp;&nbsp;{item.accept_count} /
                            <Text style={styles.topTxt}>
                              {item.applied_count}
                            </Text>
                          </Text>
                          <Text style={styles.topTxt}>
                            &nbsp;&nbsp;({item.confirm_count} Applicants)
                          </Text>
                        </View>
                        <Text style={styles.giNameTxt}>{item.position}</Text>
                        {/* <Text style={styles.timeTxt}>{item.time}</Text> */}

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={styles.timeTxt}>
                            {myDate.toDateString()}{' '}
                          </Text>
                          <Text style={styles.timeTxt}>
                            {myDate.toLocaleTimeString()} -{' '}
                          </Text>
                          <Text style={styles.timeTxt}>
                            {mytime.toLocaleTimeString()} &nbsp;
                          </Text>
                          {item.status == 'cancel' ? (
                            <>
                              <Image
                                source={require('../../../assets/blackDot.png')}
                              />

                              <Text
                                style={{
                                  color: '#D72F2F',
                                  fontSize: moderateScale(11),
                                }}>
                                &nbsp;Cancelled
                              </Text>
                            </>
                          ) : null}
                        </View>
                      </View>

                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={styles.amountTxt}>
                          $ {item.total_amount}
                        </Text>
                        <Text style={styles.rateTxt}>
                          (${item.hourly_pay}/hr)
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : loading == false ? (
              <>
                <View
                  style={[
                    styles.cardView2,
                    {
                      alignItems: 'center',
                      // justifyContent: 'center',
                      // paddingTop: 10,
                      // height: 120,
                      height: verticalScale(350),
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                      width: '100%',
                    },
                  ]}>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/noRecords.png')}
                    style={styles.noRecordsImg}
                  />
                </View>
              </>
            ) : null}
          </View>
        )}
      </ScrollView>

      <View style={{flex: 1}}>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#FFCC41', marginBottom: verticalScale(70)}}
          position="bottomRight"
          onPress={() => props.navigation.navigate('CreateAGig')}>
          <Icon
            name="plus"
            type="Entypo"
            style={{color: '#002E6D', fontSize: moderateScale(25)}}
          />
        </Fab>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalColors}
        onRequestClose={() => {
          setModalColors(false);
        }}>
        <View style={styles.centeredColorView}>
          <Pressable style={{flex: 1}} onPress={() => setModalColors(false)} />
          <View style={styles.modalColorview}>
            <View style={styles.bodyView}>
              <Text style={styles.colorTxt}>
                What do differnt colors represent?
              </Text>

              <ScrollView>
                <View style={styles.greenView}>
                  <Image
                    source={require('../../../assets/greenOval.png')}
                    style={{
                      marginTop: verticalScale(3),
                    }}
                  />
                  <Text style={[styles.greenTxt, {color: '#74B711'}]}>
                    Green
                  </Text>
                </View>

                <View style={styles.descTxtView}>
                  <Text style={styles.descTxt}>
                    Indicates that all vacancies for the gigs have been filled.
                  </Text>
                </View>

                <View style={styles.greenView}>
                  <Image
                    source={require('../../../assets/yellowOval.png')}
                    style={{
                      marginTop: verticalScale(2),
                    }}
                  />
                  <Text style={[styles.greenTxt, {color: '#FFC628'}]}>
                    Yellow
                  </Text>
                </View>

                <View style={styles.descTxtView}>
                  <Text style={styles.descTxt}>
                    Indicates that there are still vacancies to be filled.
                  </Text>
                </View>

                <View style={styles.greenView}>
                  <Image
                    source={require('../../../assets/redOval.png')}
                    style={{
                      marginTop: verticalScale(3),
                    }}
                  />
                  <Text style={[styles.greenTxt, {color: '#D72F2F'}]}>Red</Text>
                </View>

                <View
                  style={[
                    styles.descTxtView,
                    {marginBottom: verticalScale(10)},
                  ]}>
                  <Text style={styles.descTxt}>
                    Indicates that no vacancies have been filled.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GigList;

const styles = StyleSheet.create({
  rootView: {
    height: height,
    backgroundColor: '#F9F9F9',
  },

  checkInvoiceView: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    // marginTop: verticalScale(22),
    backgroundColor: 'white',
    height: verticalScale(56),
    alignItems: 'flex-end',
  },
  tabBtns: {
    width: '50%',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  cardView2: {
    marginHorizontal: 15,
    backgroundColor: '#FFFF',
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 4,
  },
  noRecordsImg: {
    height: '70%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  tabTxt: {
    fontWeight: 'bold',
  },
  bodyView: {
    paddingHorizontal: moderateScale(20),
  },
  daysBtnsView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: verticalScale(50),
    marginVertical: verticalScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  dayBtn: {
    width: '45%',
    height: verticalScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  dayTxt: {
    fontWeight: 'bold',
  },
  cardView: {
    backgroundColor: 'white',
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(5),
    // elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: moderateScale(20),
    // height:verticalScale(86),
    paddingHorizontal: moderateScale(16),
    borderRadius: 10,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom:verticalScale(10)
  },
  topTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  giNameTxt: {
    color: '#393939',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
  },
  timeTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  amountTxt: {
    color: '#393939',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },

  rateTxt: {
    color: '#545454',
    fontSize: moderateScale(11),
  },
  centeredColorView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalColorview: {
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
  },

  bodyView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(24),
  },
  colorTxt: {
    color: '#272727',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },

  greenView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  greenTxt: {
    paddingStart: moderateScale(12),

    fontWeight: 'bold',
  },
  descTxtView: {
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(10),
  },
  descTxt: {
    color: '#5E5E5E',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingVertical: verticalScale(15),
    marginVertical: verticalScale(5),
  },
  backRightBtnLeft: {
    backgroundColor: '#ECECEC',
    right: 80,
  },
  backRightBtnRight: {
    backgroundColor: '#ECECEC',
    right: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
