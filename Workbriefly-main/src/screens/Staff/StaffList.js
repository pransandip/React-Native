import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import StaffHeader from '../../components/headers/StaffHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
// import axios from 'axios';
import Axios from '../../api/Axios';
import Staff from './Staff';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width} = Dimensions.get('window');

export default class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffList: [],
      userData: {},
      token: '',
      deleteModalOpen: false,
      staffId: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userData').then((value) => {
      let objValue = JSON.parse(value);
      this.setState({
        userData: objValue,
      });
    });
    AsyncStorage.getItem('token').then((value) => {
      this.setState(
        {
          token: value,
        },
        () => {
          this.fetchStaffList();
        },
      );
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchStaffList();
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  navigation = (value, params) => {
    this.props.navigation.navigate(value, params);
  };

  fetchStaffList = () => {
    const {token} = this.state;
    console.log('enter');
    Axios({
      method: 'GET',
      url: 'api/staff',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          console.log('noo', response?.data);

          this.setState({
            staffList: response?.data?.data,
          });
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  deleteStaff = (id) => {
    const {token} = this.state;
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
          this.setState(
            {
              deleteModalOpen: false,
            },
            () => {
              this.fetchStaffList();
            },
          );
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  getStaffId = (id) => {
    this.setState({
      staffId: id,
      deleteModalOpen: true,
    });
  };

  deleteModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.deleteModalOpen}
        onRequestClose={() =>
          this.setState({
            deleteModalOpen: false,
          })
        }>
        <View style={styles.centeredView}>
          <Pressable style={{flex: 1}} onPress={() => setInviteModal(false)} />
          <View
            style={[
              styles.modalView,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Image
              source={require('../../../assets/Hold.png')}
              style={styles.successImg}
            />
            <Text style={styles.inviteTxt2}>Delete Staff</Text>
            <Text style={styles.invitePersonTxt}>
              Are you sure you want to delete this staff?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.deleteStaff(this.state.staffId);
                }}
                style={[
                  styles.continueBtn,
                  {marginRight: 10, backgroundColor: '#F1F1F1'},
                ]}>
                <Text style={[styles.continueTxt, {color: '#002E6D'}]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    deleteModalOpen: false,
                  });
                }}
                style={styles.continueBtn}>
                <Text style={styles.continueTxt}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  showDeletModal = () => {
    this.setState({
      deleteModalOpen: true,
    });
  };

  hideDeleteModal = () => {
    this.setState({
      deleteModalOpen: false,
    });
  };

  refetchData = () => {
    this.fetchStaffList();
  };

  navigateToAddPage = () => {
    this.props.navigation.navigate('AddStaff');
  };

  render() {
    const {staffList} = this.state;
    return (
      <SafeAreaView style={styles.rootView}>
        {this.deleteModal()}
        <StaffHeader
          headerTxt="Staff"
          navigateToAddPage={this.navigateToAddPage}
        />

        <>
          {staffList?.length <= 0 ? (
            <View style={styles.centerView}>
              <Image source={require('../../../assets/userBlue.png')} />
              <Text style={styles.StaffMemberTxt}>No Staff Member</Text>
              <Text style={styles.staffDescTxt}>
                Currently no staff member is added yet. You can add staff member
                by below button.
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddStaff')}
                style={styles.addStaffBtn}>
                <Text style={styles.addStafftxt}>Add Staff</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Staff
              staffList={staffList}
              getStaffId={this.getStaffId}
              navigation={this.navigation}
              fetchStaffList={this.refetchData}
            />
          )}
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor:'red'
  },
  StaffMemberTxt: {
    color: '#272727',
    fontSize: moderateScale(16),
    marginTop: verticalScale(26.87),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  staffDescTxt: {
    textAlign: 'center',
    color: '#545454',
    fontSize: moderateScale(12),
  },
  addStaffBtn: {
    backgroundColor: '#FFCC41',
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(40),
    marginTop: verticalScale(32),
    borderRadius: moderateScale(3),
  },
  addStafftxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    backgroundColor: 'white',

    height: verticalScale(299),
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
  rolesModalView: {
    marginTop: verticalScale(15),
    marginHorizontal: moderateScale(20),
  },
  rolesTxt: {
    color: '#393939',
    marginVertical: verticalScale(5),
  },
  inviteBtnView: {
    backgroundColor: 'white',

    height: verticalScale(68),
    justifyContent: 'center',
  },
  inviteBtn: {
    backgroundColor: '#FFCC41',
    height: verticalScale(40),
    marginHorizontal: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteTxt: {
    color: '#003862',
    fontWeight: 'bold',
  },
  successImg: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  inviteTxt2: {
    fontSize: moderateScale(20),
    color: '#393939',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
  },
  invitePersonTxt: {
    textAlign: 'center',
    color: '#545454',
  },
  continueBtn: {
    backgroundColor: '#002E6D',
    width: '50%',
    height: verticalScale(48),
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(24),
  },
  continueTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
