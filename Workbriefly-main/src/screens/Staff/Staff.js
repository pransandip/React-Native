import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import StaffHeader from '../../components/headers/StaffHeader';
import {Switch} from 'native-base';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {useEffect} from 'react';
// import axios from 'axios';
import Axios from '../../api/Axios';
import AsyncStorage from '@react-native-community/async-storage';
const {height, width} = Dimensions.get('window');

const Staff = (props) => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      setUserData(objValue);
    });
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      setStaffList(props.staffList);
      setLoading(false);
    });
  }, [props.staffList]);

  const deleteStaff = (id) => {
    Axios({
      method: 'DELETE',
      url: 'api/staff/' + id,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          setLoading(false);
          props.showDeletModal();
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const toggleSwitchData = (item) => {
    let postData = {
      status: item.status === 'inactive' ? 'active' : 'inactive',
    };
    Axios({
      method: 'PUT',
      url: 'api/staff/changestatus/' + item.id,
      headers: {
        Authorization: `${token}`,
      },
      data: postData,
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          setLoading(false);
          props.fetchStaffList();
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  const renderItem = (item) => {
    return (
      <View style={styles.cardView}>
        <View style={styles.leftView}>
          <Text style={styles.nameTxt}>{item?.item?.business_name}</Text>
          <Text style={styles.emailDesigTxt}>
            {item?.item?.email} ● {item?.item?.role}
          </Text>
        </View>
        <Switch
          onValueChange={() => toggleSwitchData(item?.item)}
          value={item?.item?.status === 'inactive' ? false : true}
        />
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          props.navigation('EditStaff', {
            id: data?.item?.id,
          })
        }>
        {/* <Text style={styles.backTextWhite}>Edit</Text> */}
        <Image source={require('../../../assets/edit.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          props.getStaffId(data?.item?.id);
        }}>
        {/* <Text style={styles.backTextWhite}>Copy</Text> */}
        <Image source={require('../../../assets/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  return (
    <>
      <ScrollView style={{marginTop: verticalScale(20)}}>
        <SwipeListView
          data={staffList}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-120}
          previewRowKey={'0'}
          previewOpenValue={-30}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={styles.centeredViewIndicator}>
          <ActivityIndicator size="large" color="#002E6D" />
        </View>
      </Modal>
    </>
  );
};

export default Staff;

const styles = StyleSheet.create({
  rootView: {
    height: height,
    backgroundColor: '#F9F9F9',
  },
  cardView: {
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(8),
    marginHorizontal: moderateScale(20),
    paddingHorizontal: moderateScale(12),
  },
  leftView: {
    paddingVertical: verticalScale(13),
  },
  nameTxt: {
    color: '#393939',
    fontSize: moderateScale(16),
  },
  emailDesigTxt: {
    color: '#545454',
  },
  rowBack: {
    alignItems: 'center',
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
    marginVertical: verticalScale(8),
  },
  backRightBtnLeft: {
    backgroundColor: '#ECECEC',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#ECECEC',
    right: 23,
  },
  centeredViewIndicator: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
