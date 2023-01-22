import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
  StatusBar,
  Image,
  useWindowDimensions,
  Modal,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {Icon} from 'native-base';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import Axios from '../../api/Axios';
import GigsHeader from '../../components/Header/GigsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import GigsTopBar from '../common/GigsTopBar';
import GigItem from '../common/GigItem';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GigList = (props) => {
  // const [upcomingGigs, setUpcomingGigs] = useState([
  //   {
  //     applicant: '0/3',
  //     gig: 'Warehouse Mover',
  //     dateTime: 'May 26, 1:00 PM - 5:00 PM',
  //     amount: '$140',
  //     rate: '($30/hr)',
  //     name: 'Container World',
  //     distance: '2.5 Km',
  //   },
  //   {
  //     applicant: '0/3',
  //     gig: 'Warehouse Mover',
  //     dateTime: 'May 26, 1:00 PM - 5:00 PM',
  //     amount: '$140',
  //     rate: '($30/hr)',
  //     name: 'Container World',
  //     distance: '2.5 Km',
  //   },
  //   {
  //     applicant: '0/3',
  //     gig: 'Warehouse Mover',
  //     dateTime: 'May 26, 1:00 PM - 5:00 PM',
  //     amount: '$140',
  //     rate: '($30/hr)',
  //     name: 'Container World',
  //     distance: '2.5 Km',
  //   },
  // ]);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [gigData, setGigData] = useState([]);
  const [selected, setSelected] = useState('');
  const [timeSpan, setTimeSpan] = useState([
    {
      name: 'Any Time',
    },
    {
      name: 'Past Month',
    },
    {
      name: 'Past Week',
    },
    {
      name: 'Past 24 hours',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedBox, setSelectedBox] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDateVisible, setModalDateVisible] = useState(false);
  const [distance, setDistance] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [payFrequency, setPayFrequency] = useState('');
  const [modalColors, setModalColors] = useState(false);

  // console.log(`modal========>>`, )

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        setUserData(JSON.parse(value));
      })
      .catch((e) => {
        console.log(e);
      });

    AsyncStorage.getItem('token')
      .then((value) => {
        setToken(value);
        changeMenuItem({category: 'Request', select: true});
        getAllGigsByTab('Request');
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  useEffect(() => {
    getSearchData();
  }, [search]);

  const getSearchData = () => {
    setGigData([]);
    Axios({
      method: 'GET',
      url:
        'api/gig/getall?status=active&day_type=single&page=' +
        1 +
        '&limit=100&search=' +
        search +
        '&distance=' +
        distance +
        '&business_name=' +
        businessName +
        '&industry=' +
        industry +
        '&pay_frequency=' +
        payFrequency,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          setGigData(response.data.data);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const getAvailabelData = () => {
    Axios({
      method: 'GET',
      url: 'api/gig/getall',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          setGigData(response.data.data);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const handleLoadMore = () => {
    setPageNo(pageNo + 1);
    getAvailabelData();
  };

  const changeMenuItem = (item) => {
    console.log(item);

    setSelected(item.category);
    if (item.category === 'Available') {
      setGigData([]);
      setPageNo(1);
      getAvailabelData();
    } else {
      setGigData([]);
      setPageNo(1);
      getAllGigsByTab(item.category);
    }
  };

  const getAllGigsByTab = (selected) => {
    console.log('token', token);
    setLoading(true);
    Axios({
      method: 'GET',
      url: 'api/gig/getall/' + selected.toLowerCase(),
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log('tytyty', response.data.data);
        if (response?.data?.ack === 1) {
          setLoading(false);
          setGigData(response.data.data);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  var dailyWeekly = [
    {label: 'Daily', value: 0},
    {label: 'Weekly', value: 1},
  ];

  var transitAccessible = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  var gigPreviouslyDone = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

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

  const filterModal = () => {
    console.log(businessName);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.header_view}>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              StatusBarStyle="light-content"
            />

            <Pressable
              style={styles.dateDropDown}
              onPress={() => setModalVisible(false)}>
              <Image source={require('../../assets/x.png')} />
            </Pressable>

            <Text style={styles.headerTxt}>Filter</Text>
            <Image />
          </View>
          <ScrollView>
            <View style={styles.modalView}>
              <Text style={styles.dateTxt}>Date Posted</Text>
              <Pressable
                onPress={() => setModalDateVisible(true)}
                style={styles.dateView}>
                <Text style={styles.selectDateTxt}>
                  Select from the options
                </Text>
                <Icon
                  name={modalDateVisible ? 'caretup' : 'caretdown'}
                  type="AntDesign"
                  style={styles.downArrow}
                />
              </Pressable>
              <Text style={styles.dateTxt}>Distance</Text>
              <Slider
                style={{
                  width: '105%',
                  height: verticalScale(40),
                  alignSelf: 'center',
                  // backgroundColor:'red'
                }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#002E6D"
                maximumTrackTintColor="#002E6D"
                onValueChange={(value) => {
                  setDistance(value);
                }}
              />
              <View style={styles.industryView}>
                <Text
                  style={{
                    color: '#393939',
                    fontSize: moderateScale(10),
                  }}>
                  0 km
                </Text>
                <Text
                  style={{
                    color: '#393939',
                    fontSize: moderateScale(10),
                  }}>
                  300+ km
                </Text>
              </View>
              <Text style={styles.dateTxt}>Business Name</Text>
              <TextInput
                placeholder="Start typing a business name"
                placeholderTextColor="#969696"
                style={styles.input}
                onChangeText={(value) => {
                  setBusinessName(value);
                }}
                value={businessName}
              />
              <Text style={styles.dateTxt}>Industry</Text>
              <TextInput
                placeholder="Start typing an industry name"
                placeholderTextColor="#969696"
                style={styles.input}
                onChangeText={(value) => {
                  setIndustry(value);
                }}
                value={industry}
              />

              <View style={styles.industryView}>
                <Text style={styles.dateTxt}>Pay Rate</Text>
                <Text style={styles.hrsTxt}>$0/hr - $100+/hr</Text>
              </View>
              <View style={styles.fromToView}>
                <TextInput
                  placeholder="From"
                  placeholderTextColor="#969696"
                  style={[styles.input, {width: '45%'}]}
                />
                <TextInput
                  placeholder="To"
                  placeholderTextColor="#969696"
                  style={[styles.input, {width: '45%'}]}
                />
              </View>

              <View style={styles.industryView}>
                <Text style={styles.dateTxt}>Total pay</Text>
                <Text style={styles.hrsTxt}>$0 - $1000</Text>
              </View>
              <View style={styles.fromToView}>
                <TextInput
                  placeholder="From"
                  placeholderTextColor="#969696"
                  style={[styles.input, {width: '45%'}]}
                />
                <TextInput
                  placeholder="To"
                  placeholderTextColor="#969696"
                  style={[styles.input, {width: '45%'}]}
                />
              </View>

              <Text style={styles.dateTxt}>Pay Frequency</Text>

              <View style={styles.dailyWeekly}>
                <RadioForm
                  formHorizontal={true}
                  buttonColor={'#979797'}
                  initial={0}>
                  {dailyWeekly.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={payFrequency === i}
                        onPress={(val) => setPayFrequency(val)}
                        borderWidth={1}
                        buttonInnerColor={'#002E68'}
                        buttonOuterColor={
                          payFrequency === i ? '#002E68' : '#002E68'
                        }
                        buttonSize={8}
                        buttonOuterSize={16}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginLeft: 10}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(val) => setPayFrequency(val)}
                        labelStyle={{
                          fontSize: 16,
                          color: '#393939',
                          marginRight: 40,
                        }}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
              </View>

              <View style={styles.industryView}>
                <Text style={styles.dateTxt}>Entire Gig Length</Text>
                <Text style={styles.hrsTxt}>0 Days - 28 Days</Text>
              </View>
              <View style={styles.fromToView}>
                <TextInput
                  placeholder="From"
                  placeholderTextColor="#969696"
                  style={[styles.input, {width: '45%'}]}
                />
                <TextInput
                  placeholder="To"
                  placeholderTextColor="#969696"
                  style={[styles.input, {width: '45%'}]}
                />
              </View>

              <Text style={styles.dateTxt}>Transit Accessible Only</Text>

              <View style={styles.dailyWeekly}>
                <RadioForm
                  formHorizontal={true}
                  buttonColor={'#979797'}
                  initial={0}>
                  {transitAccessible.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={selectedBox === i}
                        onPress={(val) => setSelectedBox(val)}
                        borderWidth={1}
                        buttonInnerColor={'#002E68'}
                        buttonOuterColor={
                          selectedBox === i ? '#002E68' : '#002E68'
                        }
                        buttonSize={8}
                        buttonOuterSize={16}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginLeft: 10}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(val) => setSelectedBox(val)}
                        labelStyle={{
                          fontSize: 16,
                          color: '#393939',
                          marginRight: 40,
                        }}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
              </View>

              <Text style={styles.dateTxt}>Gig Previously Done</Text>

              <View style={styles.dailyWeekly}>
                <RadioForm
                  formHorizontal={true}
                  buttonColor={'#979797'}
                  initial={0}>
                  {gigPreviouslyDone.map((obj, i) => (
                    <RadioButton labelHorizontal={true} key={i}>
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={selectedBox === i}
                        onPress={(val) => setSelectedBox(val)}
                        borderWidth={1}
                        buttonInnerColor={'#002E68'}
                        buttonOuterColor={
                          selectedBox === i ? '#002E68' : '#002E68'
                        }
                        buttonSize={8}
                        buttonOuterSize={16}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginLeft: 10}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={(val) => setSelectedBox(val)}
                        labelStyle={{
                          fontSize: 16,
                          color: '#393939',
                          marginRight: 40,
                        }}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))}
                </RadioForm>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomBtnsView}>
            <TouchableOpacity
              onPress={() => {
                setLoading(false);
                setBusinessName('');
                setIndustry('');
                setPayFrequency('');
                setDistance('');
                getAvailabelData();
                setModalVisible(false);
              }}>
              <Text style={styles.resetFilterTxt}>Reset Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyBtns}
              onPress={() => {
                setLoading(false);
                setModalVisible(false);
                getAvailabelData();
              }}>
              <Text style={styles.applyTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const dateModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDateVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalDateVisible(!modalDateVisible);
        }}>
        <View style={styles.centeredDateView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setModalDateVisible(false)}
          />
          <View style={styles.modalDateView}>
            {timeSpan.map((item, index) => {
              return (
                <View>
                  <Pressable style={styles.namePressable}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                  </Pressable>
                  <View
                    style={{
                      borderBottomColor: '#F1F1F1',
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </Modal>
    );
  };

  const handleModal = (val) => {
    setModalColors(true);
  };

  const navigation = (value, params) => {
    props.navigation.navigate(value, params);
  };

  return (
    <SafeAreaView>
      {filterModal()}
      {dateModal()}
      <View style={styles.rootView}>
        <GigsHeader handleModal={handleModal} headerTxt="Gigs" />

        <GigsTopBar changeMenuItem={changeMenuItem} />

        {selected !== 'Request' &&
          selected !== 'Confirmed' &&
          selected !== 'Applied' &&
          selected !== 'Saved' &&
          selected !== 'Completed' && (
            <View style={styles.searchView}>
              <View style={styles.searchBar}>
                <View style={styles.leftView}>
                  <Icon name="search" type="EvilIcons" style={styles.icon} />
                  <TextInput
                    value={search.trim()}
                    placeholder="Search by position/title"
                    placeholderTextColor="#969696"
                    onChangeText={(value) => {
                      setSearch(value);
                    }}
                  />
                </View>
                <Pressable onPress={() => setSearch('')}>
                  <Icon name="cross" type="Entypo" style={styles.crossIcon} />
                </Pressable>
              </View>

              <Pressable onPress={() => setModalVisible(true)}>
                <Image source={require('../../assets/filter.png')} />
              </Pressable>
            </View>
          )}

        {gigData?.length === 0 && (
          <View
            style={[
              styles.cardView,
              {
                alignItems: 'center',
                // justifyContent: 'center',
                // paddingTop: 10,
                // height: 120,
                height: '50%',
                backgroundColor: '#ECECEC',
                alignSelf: 'center',
                width: '100%',
              },
            ]}>
            {selected === 'Request' && loading == false ? (
              <Image
                resizeMode="contain"
                source={require('../../../assets/noRecords.png')}
                style={styles.noRecordsImg}
              />
            ) : selected === 'Confirmed' && loading == false ? (
              <Image
                resizeMode="contain"
                source={require('../../../assets/noRecords.png')}
                style={styles.noRecordsImg}
              />
            ) : selected === 'Available' && loading == false ? (
              <Image
                resizeMode="contain"
                source={require('../../../assets/noRecords.png')}
                style={styles.noRecordsImg}
              />
            ) : selected === 'Applied' && loading == false ? (
              <Image
                resizeMode="contain"
                source={require('../../../assets/noRecords.png')}
                style={styles.noRecordsImg}
              />
            ) : selected === 'Saved' && loading == false ? (
              <Image
                resizeMode="contain"
                source={require('../../../assets/noRecords.png')}
                style={styles.noRecordsImg}
              />
            ) : selected === 'Completed' && loading == false ? (
              <Image
                resizeMode="contain"
                source={require('../../../assets/noRecords.png')}
                style={styles.noRecordsImg}
              />
            ) : null}
          </View>
        )}

        {gigData?.length > 0 && (
          <View style={styles.gigsCards}>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
              data={gigData}
              // onEndReached={handleLoadMore}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <GigItem navigation={navigation} item={item} key={index} />
                );
              }}
            />
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalColors}
          onRequestClose={() => {
            setModalColors(false);
          }}>
          <View style={styles.centeredColorView}>
            <Pressable
              style={{flex: 1}}
              onPress={() => setModalColors(false)}
            />
            <View style={styles.modalColorview}>
              <View style={styles.bodyView}>
                <Text style={styles.colorTxt}>
                  What do differnt colors represent?
                </Text>

                <ScrollView>
                  <View style={styles.greenView}>
                    <Image
                      source={require('../../assets/greenOval.png')}
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
                      Green circle indicates that all vacancies for the gigs
                      have been filled & A green border around a gig means that
                      you are confirmed for this gig.
                    </Text>
                  </View>

                  <View style={styles.greenView}>
                    <Image
                      source={require('../../assets/yellowOval.png')}
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
                      Yellow circle indicates that there are still vacancies to
                      be filled & A yellow border around a gig means that your
                      application for the gig is still waiting to be approved.
                    </Text>
                  </View>

                  <View style={styles.greenView}>
                    <Image
                      source={require('../../assets/redOval.png')}
                      style={{
                        marginTop: verticalScale(3),
                      }}
                    />
                    <Text style={[styles.greenTxt, {color: '#D72F2F'}]}>
                      Red
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.descTxtView,
                      {marginBottom: verticalScale(10)},
                    ]}>
                    <Text style={styles.descTxt}>
                      Red color indicates that no vacancies have been filled & A
                      red border around a gig means that your application for
                      the gig has been rejected.
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
    // flex: 1,
    height: windowHeight,
    backgroundColor: '#ECECEC',
  },
  noRecordsImg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    // height: verticalScale(50),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    // backgroundColor:'red'
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    justifyContent: 'space-between',
    height: verticalScale(36),
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    paddingHorizontal: moderateScale(10),
    borderRadius: 4,
  },
  leftView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    color: '#002E6D',
  },
  gigsCards: {
    marginBottom: verticalScale(270),
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
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossIcon: {
    fontSize: moderateScale(15),
    color: '#5E5E5E',
  },
  topInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    width: '100%',
    justifyContent: 'space-between',
  },
  applicantTxt: {
    marginStart: moderateScale(10),
  },
  middleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    paddingBottom: verticalScale(10),
  },
  gigTxt: {
    color: '#393939',
    fontSize: moderateScale(20),
  },
  timeTxt: {
    fontSize: moderateScale(11),
    color: '#545454',
  },
  amountTxt: {
    color: '#393939',
    fontSize: moderateScale(15),
  },
  rateTxt: {
    color: '#545454',
    fontSize: moderateScale(10),
  },
  bottomView: {
    flexDirection: 'row',
  },
  txtView: {
    marginStart: moderateScale(20),
  },
  calender: {
    fontSize: moderateScale(13),
  },
  dateTimeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTxt: {
    color: '#393939',
  },
  dateTimeTxt: {
    color: '#8A8A8A',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  modalView: {
    paddingHorizontal: moderateScale(15),
    paddingTop: verticalScale(20),
  },

  dateTxt: {
    color: '#393939',
    fontWeight: 'bold',
    marginTop: verticalScale(15),
  },
  header_view: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#002E6D',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  headerTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(58, 177, 202, 0.1);',
    paddingStart: moderateScale(15),
    marginTop: verticalScale(5),
    height: 48,
    borderRadius: 4,
  },
  industryView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hrsTxt: {
    marginTop: verticalScale(15),
    color: '#8A8A8A',
    fontSize: moderateScale(11),
  },
  fromToView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: moderateScale(-10),
    // marginTop:moderateScale(5)
    // backgroundColor:'red'
  },
  dailyWeekly: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red',
    marginTop: verticalScale(10),
  },
  bottomBtnsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: verticalScale(60),
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  resetFilterTxt: {
    color: '#D72F2F',
    fontWeight: 'bold',
  },

  applyBtns: {
    backgroundColor: '#FFCC41',
    height: verticalScale(38),
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(160),
    borderRadius: 4,
  },
  applyTxt: {
    fontWeight: 'bold',
    color: '#002E6D',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ' rgba(58, 177, 202, 0.1)',
    height: verticalScale(48),
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    borderRadius: 4,
  },
  centeredDateView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalDateView: {
    backgroundColor: 'white',

    height: verticalScale(200),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  downArrow: {
    fontSize: moderateScale(15),
    color: '#393939',
  },
  selectDateTxt: {
    color: '#969696',
  },
  nameTxt: {
    color: '#393939',
  },
  namePressable: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: verticalScale(10),
  },

  centeredColorView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  modalColorview: {
    backgroundColor: 'white',

    height: verticalScale(320),

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
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
