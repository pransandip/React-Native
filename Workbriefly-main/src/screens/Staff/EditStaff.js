import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import BackHeader from '../../components/headers/BackHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';
// import axios from 'axios';
import Axios from '../../api/Axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class EditStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route.params.id,
      userData: {},
      token: '',
      roleModalOpen: false,
      inviteModal: false,
      name: '',
      email: '',
      phone: '',
      role: '',
      errors: {},
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
          this.getSpecificStaff();
        },
      );
    });
  }

  getSpecificStaff = () => {
    Axios({
      method: 'GET',
      url: 'api/staff/' + this.state.id,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.setState({
            name: response?.data?.data?.business_name,
            email: response?.data?.data?.email,
            phone: response?.data?.data?.mobile,
            role: response?.data?.data?.role,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validateInviteForm = () => {
    const {name, email, role, phone} = this.state;
    let errors = {};
    let formIsValid = true;
    let emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (name === '') {
      errors['name'] = 'Please enter name';
      formIsValid = false;
    }
    if (email === '' || !emailRegex.test(email)) {
      errors['email'] = 'Enter valid email address';
      formIsValid = false;
    }
    if (phone === '' || phone === null) {
      errors['phone'] = 'Enter a valid phone number';
      formIsValid = false;
    }
    if (role === '' || role === null) {
      errors['role'] = 'Please select a role';
      formIsValid = false;
    }
    this.setState({
      errors: errors,
    });
    setTimeout(() => {
      this.setState({
        errors: {},
      });
    }, 2000);
    return formIsValid;
  };

  // formatted phone number
  formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  };

  submitForm = () => {
    let postBody = {
      business_name: this.state.name,
      email: this.state.email,
      country_code: '+1',
      mobile: this.state.phone,
      access: 'admin',
    };
    if (this.validateInviteForm()) {
      Axios({
        method: 'PUT',
        url: 'api/staff/' + this.state.id,
        data: postBody,
        headers: {
          Authorization: `${this.state.token}`,
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response?.data?.ack === 1) {
            this.setState({
              inviteModal: true,
            });
          }
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {errors} = this.state;
    return (
      <SafeAreaView style={styles.rootView}>
        <BackHeader headerTxt="Edit Staff" goBack={this.goBack} />
        <ScrollView>
          <View style={styles.bodyView}>
            <Text style={styles.labelTxt}>Name</Text>
            <TextInput
              value={this.state.name}
              placeholder="Enter name"
              placeholderTextColor="#969696"
              style={styles.input}
              onChangeText={(value) => {
                this.setState({
                  name: value,
                });
              }}
            />
            {errors?.name ? (
              <Text style={{color: 'red', marginTop: 5}}>{errors.name}</Text>
            ) : null}

            <Text style={styles.labelTxt}>Email</Text>
            <TextInput
              value={this.state.email}
              placeholder="Enter email"
              placeholderTextColor="#969696"
              style={styles.input}
              onChangeText={(value) => {
                this.setState({
                  email: value,
                });
              }}
            />
            {errors?.email ? (
              <Text style={{color: 'red', marginTop: 5}}>{errors.email}</Text>
            ) : null}

            <Text style={styles.labelTxt}>Phone Number</Text>
            <View style={styles.phoneNumberView}>
              <View style={styles.innerView}>
                <TextInput placeholder="+1" placeholderTextColor="#393939" />
                <Icon
                  name="sort-down"
                  type="FontAwesome5"
                  style={[styles.downIcon, {marginTop: verticalScale(2)}]}
                />
              </View>
              <TextInput
                value={this.formatPhoneNumber(this.state.phone)}
                placeholder="Enter phone number"
                placeholderTextColor="#969696"
                style={styles.input2}
                onChangeText={(value) => {
                  this.setState({
                    phone: value,
                  });
                }}
                maxLength={14}
              />
            </View>
            {errors?.phone ? (
              <Text style={{color: 'red', marginTop: 5}}>{errors.phone}</Text>
            ) : null}

            <Text style={styles.labelTxt}>Role</Text>
            <Pressable
              onPress={() => setRoleModalOpen(true)}
              style={styles.roleView}>
              <Text style={styles.roleTxt}>
                {this.state.role ? this.state.role : 'Select a role'}
              </Text>
              <Icon
                name={
                  this.state.roleModalOpen == false ? 'sort-down' : 'sort-up'
                }
                type="FontAwesome5"
                style={[styles.downIcon, {marginBottom: verticalScale(10)}]}
              />
            </Pressable>
            {errors?.role ? (
              <Text style={{color: 'red', marginTop: 5}}>{errors.role}</Text>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.inviteBtnView}>
          <TouchableOpacity
            onPress={() => this.submitForm()}
            style={styles.inviteBtn}>
            <Text style={styles.inviteTxt}>Send Invite</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.roleModalOpen}
          onRequestClose={() =>
            this.setState({
              roleModalOpen: false,
            })
          }>
          <View style={styles.centeredView}>
            <Pressable
              style={{flex: 1}}
              onPress={() =>
                this.setState({
                  roleModalOpen: false,
                })
              }
            />
            <View style={styles.modalView}>
              <View style={styles.rolesModalView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      role: 'Admin',
                      roleModalOpen: false,
                    });
                  }}>
                  <Text style={styles.rolesTxt}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      role: 'Manager',
                      roleModalOpen: false,
                    });
                  }}>
                  <Text style={styles.rolesTxt}>Manager</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      role: 'Supervisor',
                      roleModalOpen: false,
                    });
                  }}>
                  <Text style={styles.rolesTxt}>Supervisor</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.inviteModal}
          onRequestClose={() =>
            this.setState({
              inviteModal: false,
            })
          }>
          <View style={styles.centeredView}>
            <Pressable
              style={{flex: 1}}
              onPress={() =>
                this.setState({
                  inviteModal: false,
                })
              }
            />
            <View
              style={[
                styles.modalView,
                {justifyContent: 'center', alignItems: 'center'},
              ]}>
              <Image
                source={require('../../../assets/success.png')}
                style={styles.successImg}
              />
              <Text style={styles.inviteTxt2}>Invite Sent Successfully</Text>
              <Text style={styles.invitePersonTxt}>
                You have invited Kevin Hashimoto (kevin@workbriefly.com) to
                WorkBriefly as an Admin.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      inviteModal: false,
                    },
                    () => {
                      this.props.navigation.navigate('BottomTab', {
                        screen: 'StaffList',
                      });
                    },
                  );
                }}
                style={styles.continueBtn}>
                <Text style={styles.continueTxt}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  bodyView: {
    paddingHorizontal: moderateScale(20),
  },
  labelTxt: {
    color: '#393939',
    marginTop: verticalScale(28),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    marginTop: verticalScale(4),
    paddingStart: moderateScale(12),
    height: verticalScale(40),
  },
  phoneNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(4),
  },
  innerView: {
    flexDirection: 'row',
    // alignItems:'center',
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    width: '25%',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
    height: verticalScale(40),
  },
  downIcon: {
    // marginTop: verticalScale(5),
    color: '#393939',
    fontSize: moderateScale(20),
  },
  input2: {
    width: '70%',
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    paddingHorizontal: moderateScale(12),
    height: verticalScale(40),
  },
  roleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(40),
    marginTop: verticalScale(4),
    backgroundColor: ' rgba(58, 177, 202, 0.1)',
    paddingHorizontal: moderateScale(12),
  },
  roleTxt: {
    color: '#969696',
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
    width: '90%',
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
