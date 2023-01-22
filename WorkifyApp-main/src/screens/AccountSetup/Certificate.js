import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
// import axios from 'axios';
import Axios from '../../api/Axios';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import {Icon} from 'native-base';
import Logo from '../../../assets/Logo.png';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import defaultStyle from '../../common/Typography';
import CrossSmall from '../../../assets/cross-small.png';
import CrossWhite from '../../../assets/crosswhite.png';
import Left from '../../../assets/Left.png';
import DropArrow from '../../../assets/DropArrow.png';
import Info from '../../../assets/info.png';

export default class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props?.userId,
      token: props?.token,
      isSelected: false,
      isSelectedNew: false,
      certificateModalOpen: false,
      certificateDataModalOpen: false,
      licenceDataModalOpen: false,
      LicenceModalOpen: false,
      certificateInfoModalOpen: false,
      licenceInfoModalOpen: false,
      certificate: [],
      licenses: [],
      certificateName: '',
      certificateYear: '',
      certificateMonth: '',
      licenceName: '',
      licenceYear: '',
      licenceMonth: '',
      licenceId: '',
      certificateData: [],
      certificateId: '',
    };
  }

  componentDidMount() {
    this.getAllCertificate();
    this.getUserCertificate();
  }

  getAllCertificate = () => {
    const {token} = this.state;
    Axios({
      method: 'GET',
      url: 'api/certificate_and_licence',
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          this.setState({
            certificateData: response.data.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserCertificate = () => {
    const {token, userId} = this.state;
    Axios({
      method: 'GET',
      url: 'api/users/user_certificate_and_licence/' + userId,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data.data);
        if (response?.data?.ack === 0) {
          Snackbar.show({
            backgroundColor: '#B22222',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
        if (response?.data?.ack === 1) {
          this.setState({
            certificate: response.data?.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addCertificateFun = () => {
    const {
      certificate,
      certificateName,
      certificateYear,
      certificateMonth,
      token,
      userId,
      certificateId,
    } = this.state;
    console.log(userId);
    let postBody = {
      certificate_and_licence_id: certificateId,
      expiry_month: certificateMonth,
      expiry_year: certificateYear,
      userId: userId,
      type: 'certificate',
    };
    Axios({
      method: 'POST',
      url: 'api/user_certificate_and_licence',
      data: postBody,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 0) {
          Snackbar.show({
            backgroundColor: '#B22222',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
        if (response?.data?.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          this.getUserCertificate();
          setTimeout(() => {
            this.setState(
              {
                certificateModalOpen: false,
              },
              () => {},
            );
          }, 2000);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  addLicenceFun = () => {
    const {
      licenses,
      licenceName,
      licenceYear,
      licenceMonth,
      userId,
      token,
      licenceId,
    } = this.state;

    console.log(userId);
    let postBody = {
      certificate_and_licence_id: licenceId,
      expiry_month: licenceMonth,
      expiry_year: licenceYear,
      userId: userId,
      type: 'licence',
    };
    Axios({
      method: 'POST',
      url: 'api/user_certificate_and_licence',
      data: postBody,
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log('object', response.data);
        if (response?.data?.ack === 0) {
          Snackbar.show({
            backgroundColor: '#B22222',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
        if (response?.data?.ack === 1) {
          Snackbar.show({
            backgroundColor: '#74B711',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
          this.getUserCertificate();
          setTimeout(() => {
            this.setState(
              {
                LicenceModalOpen: false,
              },
              () => {},
            );
          }, 2000);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  getCertificateName = (item) => {
    const {certificateData} = this.state;
    for (let i = 0; i < certificateData.length; i++) {
      if (certificateData[i].id === item.certificate_and_licence_id) {
        return certificateData[i].name;
      }
    }
  };

  certificateDataModal = () => {
    const {industryData} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.certificateDataModalOpen}
        onRequestClose={() => this.setState({certificateDataModalOpen: false})}>
        <View style={[style.centeredView]}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({certificateDataModalOpen: false})}
          />
          <View style={[style.modalView, {height: verticalScale(500)}]}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>Certificate</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      certificateDataModalOpen: false,
                      certificateModalOpen: true,
                    })
                  }
                />
              </View>
              <ScrollView style={{marginBottom: verticalScale(30)}}>
                {this.state.certificateData &&
                  this.state.certificateData.map((item) => {
                    return (
                      item.type === 'certificate' && (
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                            borderBottomWidth: 0.4,
                            borderBottomColor: '#979797',
                          }}
                          onPress={() =>
                            this.setState({
                              certificateName: item.name,
                              certificateId: item.id,
                              certificateDataModalOpen: false,
                              certificateModalOpen: true,
                            })
                          }>
                          <Text style={{fontSize: 14, color: '#5E5E5E'}}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  licenceDataModal = () => {
    const {industryData} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.licenceDataModalOpen}
        onRequestClose={() => this.setState({licenceDataModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({licenceDataModalOpen: false})}
          />
          <View style={[style.modalView, {height: verticalScale(500)}]}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>License</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      licenceDataModalOpen: false,
                      LicenceModalOpen: true,
                    })
                  }
                />
              </View>

              <ScrollView>
                {this.state.certificateData &&
                  this.state.certificateData.map((item) => {
                    return (
                      item.type === 'licence' && (
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                            borderBottomWidth: 0.4,
                            borderBottomColor: '#979797',
                          }}
                          onPress={() =>
                            this.setState({
                              licenceName: item.name,
                              licenceId: item.id,
                              licenceDataModalOpen: false,
                              LicenceModalOpen: true,
                            })
                          }>
                          <Text style={{fontSize: 14, color: '#5E5E5E'}}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  addCertificate = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.certificateModalOpen}
        onRequestClose={() => this.setState({certificateModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({certificateModalOpen: false})}
          />
          <View style={style.modalView}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>Add Certificate</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      certificateModalOpen: false,
                    })
                  }
                />
              </View>
              <ScrollView>
                <View style={style.bodyContainer}>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Ceritificate Name</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'rgba(58, 177, 202, 0.1)',
                        padding: 10,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.setState({
                          certificateDataModalOpen: true,
                          certificateModalOpen: false,
                        })
                      }>
                      <Text
                        style={{
                          color: this.state.certificateName
                            ? '#272727'
                            : '#969696',
                        }}>
                        {this.state.certificateName
                          ? this.state.certificateName
                          : 'e.g. Serving It Right (BC)'}
                      </Text>
                      <Image source={DropArrow} />
                    </TouchableOpacity>
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>
                      Certificate Expiry Date
                    </Text>
                    {/* <View style={{flexDirection: 'row', width: '48%'}}>
                      <TextInput
                        style={[style.input, {marginRight: 15}]}
                        placeholder="1 Year"
                        onChangeText={(value) =>
                          this.setState({certificateYear: value})
                        }
                        keyboardType="number-pad"
                      />
                      <TextInput
                        style={[style.input]}
                        placeholder="2 Month"
                        onChangeText={(value) =>
                          this.setState({certificateMonth: value})
                        }
                        keyboardType="number-pad"
                      />
                    </View> */}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        justifyContent: 'space-between',
                        height: 40,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(58, 177, 202, 0.1)',
                          // backgroundColor: 'red',
                          paddingStart: moderateScale(20),
                          width: '48%',
                        }}>
                        <TextInput
                          placeholder="1"
                          onChangeText={(value) =>
                            this.setState({certificateYear: value})
                          }
                          keyboardType="number-pad"
                        />
                        <Text style={{color: '#969696'}}>Year</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(58, 177, 202, 0.1)',
                          // backgroundColor: 'green',
                          paddingStart: moderateScale(20),
                          width: '48%',
                        }}>
                        <TextInput
                          placeholder="2"
                          onChangeText={(value) =>
                            this.setState({certificateMonth: value})
                          }
                          keyboardType="number-pad"
                        />
                        <Text style={{color: '#969696'}}>Months</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      backgroundColor: '#002E6D',
                      alignItems: 'center',
                      marginTop: 24,
                      borderRadius: 4,
                    }}
                    onPress={() => this.addCertificateFun()}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  addLicence = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.LicenceModalOpen}
        onRequestClose={() => this.setState({LicenceModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({LicenceModalOpen: false})}
          />
          <View style={style.modalView}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>Add License</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      LicenceModalOpen: false,
                    })
                  }
                />
              </View>
              <ScrollView>
                <View style={style.bodyContainer}>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>License Name</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'rgba(58, 177, 202, 0.1)',
                        padding: 10,
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        this.setState({
                          licenceDataModalOpen: true,
                          LicenceModalOpen: false,
                        })
                      }>
                      <Text
                        style={{
                          color: this.state.licenceName ? '#272727' : '#969696',
                        }}>
                        {this.state.licenceName
                          ? this.state.licenceName
                          : 'e.g. Working License'}
                      </Text>
                      <Image source={DropArrow} />
                    </TouchableOpacity>
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>License Expiry Date</Text>
                    {/* <View style={{flexDirection: 'row', width: '48%'}}>
                      <TextInput
                        style={[style.input, {marginRight: 15}]}
                        placeholder="1 Year"
                        onChangeText={(value) =>
                          this.setState({licenceYear: value})
                        }
                        keyboardType="number-pad"
                      />
                      <TextInput
                        style={[style.input]}
                        placeholder="2 Month"
                        onChangeText={(value) =>
                          this.setState({licenceMonth: value})
                        }
                        keyboardType="number-pad"
                      />
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        justifyContent: 'space-between',
                        height: 40,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(58, 177, 202, 0.1)',
                          // backgroundColor: 'red',
                          paddingStart: moderateScale(20),
                          width: '48%',
                        }}>
                        <TextInput
                          placeholder="1"
                          onChangeText={(value) =>
                            this.setState({licenceYear: value})
                          }
                          keyboardType="number-pad"
                        />
                        <Text style={{color: '#969696'}}>Year</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: 'rgba(58, 177, 202, 0.1)',
                          // backgroundColor: 'green',
                          paddingStart: moderateScale(20),
                          width: '48%',
                        }}>
                        <TextInput
                          placeholder="2"
                          onChangeText={(value) =>
                            this.setState({licenceMonth: value})
                          }
                          keyboardType="number-pad"
                        />
                        <Text style={{color: '#969696'}}>Months</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      backgroundColor: '#002E6D',
                      alignItems: 'center',
                      marginTop: 24,
                      borderRadius: 4,
                    }}
                    onPress={() => this.addLicenceFun()}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  removeCertificate = (item) => {
    Axios({
      method: 'DELETE',
      url: 'api/user_certificate_and_licence/' + item.id,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          Snackbar.show(
            {
              backgroundColor: '#EE8973',
              text: 'certificate successfully deleted',
              duration: Snackbar.LENGTH_LONG,
            },
            () => {
              this.getUserCertificate();
            },
          );
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  removeLicense = (item) => {
    Axios({
      method: 'DELETE',
      url: 'api/user_certificate_and_licence/' + item.id,
      headers: {
        Authorization: `${this.state.token}`,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response?.data?.ack === 1) {
          Snackbar.show(
            {
              backgroundColor: '#EE8973',
              text: 'licence successfully deleted',
              duration: Snackbar.LENGTH_LONG,
            },
            () => {
              this.getUserCertificate();
            },
          );
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  certificateInfoModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.certificateInfoModalOpen}
        onRequestClose={() => this.setState({certificateInfoModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({certificateInfoModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    certificateInfoModalOpen: false,
                  })
                }
              />
              <Text style={style.preferenceTxt}>
                Why enter your certificates and licenses?
              </Text>

              <Text
                style={[
                  style.descTxt,
                  {
                    paddingLeft: moderateScale(10),
                    paddingTop: verticalScale(10),
                  },
                ]}>
                This will help inform business requestors of the experience you
                possess and what you are capable of doing. Make sure to list all
                of your relevant experience to increase the likelihood of
                getting hired:
              </Text>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This will help inform business requestors of what
                  certifications and licenses you might possess which may be
                  relevant to gigs that they post.
                </Text>
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This also increases your chances of securing a gig that may
                  require certain certificates and licenses.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Examples include: Class 4 Driver’s License, FOODSAFE Level 1,
                  Serving it right
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  licenceInfoModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.licenceInfoModalOpen}
        onRequestClose={() => this.setState({certificateInfoModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({licenceInfoModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <Icon
                name="cross"
                type="Entypo"
                style={style.crossIcon}
                onPress={() =>
                  this.setState({
                    licenceInfoModalOpen: false,
                  })
                }
              />
              <Text style={style.preferenceTxt}>
                Why enter your certificates and licenses?
              </Text>
              <Text
                style={[
                  style.descTxt,
                  {
                    paddingLeft: moderateScale(10),
                    paddingTop: verticalScale(10),
                  },
                ]}>
                This will help inform business requestors of the experience you
                possess and what you are capable of doing. Make sure to list all
                of your relevant experience to increase the likelihood of
                getting hired:
              </Text>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This will help inform business requestors of what
                  certifications and licenses you might possess which may be
                  relevant to gigs that they post.
                </Text>
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  This also increases your chances of securing a gig that may
                  require certain certificates and licenses.
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Examples include: Class 4 Driver’s License, FOODSAFE Level 1,
                  Serving it right
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {certificate, licenses, isSelected, isSelectedNew} = this.state;
    return (
      <View>
        {this.addCertificate()}
        {this.certificateDataModal()}
        {this.licenceDataModal()}
        {this.addLicence()}
        {this.certificateInfoModal()}
        {this.licenceInfoModal()}
        <ScrollView>
          <View style={{marginBottom: 80}}>
            <View style={style.bodyContainer}>
              {!this.props.settingScreen && (
                <Text
                  style={[
                    defaultStyle.Title_One,
                    {
                      color: '#393939',
                      textAlign: 'left',
                      fontSize: 24,
                      fontWeight: '700',
                      marginBottom: 0,
                      lineHeight: 28,
                      marginBottom: 28,
                    },
                  ]}>
                  Start earning money with WorkBriefly
                </Text>
              )}
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    lineHeight: 23,
                    color: '#323232',
                    marginTop: 24,
                  }}>
                  Certificates{' '}
                </Text>
                <TouchableOpacity
                  style={{marginTop: 28}}
                  onPress={() => {
                    this.setState({
                      certificateInfoModalOpen: true,
                    });
                  }}>
                  <Image source={Info} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[style.cardView]}>
              <View style={style.checkboxContainer}>
                <CheckBox
                  boxType={'square'}
                  value={this.state.isSelected}
                  onFillColor={'#002E6D'}
                  onCheckColor={'#FFFFFF'}
                  onValueChange={() =>
                    this.setState({
                      isSelected: !this.state.isSelected,
                    })
                  }
                  style={style.checkbox}
                />
                <Text style={style.label}>
                  {' '}
                  I do not have any certificate to add
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 11,
                  borderWidth: 1,
                  borderColor: '#002E6D',
                  alignItems: 'center',
                  borderRadius: 4,
                  marginBottom: 12,
                }}
                onPress={() =>
                  this.setState({
                    certificateModalOpen: true,
                  })
                }
                disabled={this.state.isSelected}>
                <Text style={{fontSize: 12, color: '#002E6D'}}>
                  + Add Certificate{' '}
                </Text>
              </TouchableOpacity>

              {certificate &&
                certificate.map((item) => {
                  return (
                    item.type === 'certificate' && (
                      <View style={{marginBottom: 8}}>
                        <TouchableOpacity
                          style={{
                            paddingVertical: verticalScale(12),
                            paddingHorizontal: moderateScale(12),
                            alignItems: 'center',
                            backgroundColor: '#002E6D',
                            borderRadius: 4,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            position: 'relative',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 12,
                              fontWeight: 'bold',
                              // backgroundColor: 'red',
                              width: '80%',
                            }}>
                            {this.getCertificateName(item)}{' '}
                            <Text style={{fontWeight: '400'}}>expires </Text>
                            {item.expiry_year + ' year(s)' + ', '}
                            {item.expiry_month} month(s)
                          </Text>
                          <TouchableOpacity
                            style={{position: 'absolute', right: 5}}
                            onPress={() => this.removeCertificate(item)}>
                            <Icon
                              name="cross"
                              type="Entypo"
                              style={style.cross}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </View>
                    )
                  );
                })}
            </View>
            <View style={[style.bodyContainer, {flexDirection: 'row'}]}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  lineHeight: 23,
                  color: '#323232',
                  marginTop: 24,
                }}>
                Licenses{' '}
              </Text>
              <TouchableOpacity
                style={{marginTop: 28}}
                onPress={() => {
                  this.setState({
                    licenceInfoModalOpen: true,
                  });
                }}>
                <Image source={Info} />
              </TouchableOpacity>
            </View>
            <View style={[style.cardView]}>
              <View style={style.checkboxContainer}>
                <CheckBox
                  boxType={'square'}
                  value={this.state.isSelectedNew}
                  onFillColor={'#002E6D'}
                  onCheckColor={'#FFFFFF'}
                  onValueChange={() =>
                    this.setState({
                      isSelectedNew: !this.state.isSelectedNew,
                    })
                  }
                  style={style.checkbox}
                />
                <Text style={style.label}>
                  {' '}
                  I do not have any license to add
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 11,
                  borderWidth: 1,
                  borderColor: '#002E6D',
                  alignItems: 'center',
                  borderRadius: 4,
                  marginBottom: 12,
                }}
                onPress={() =>
                  this.setState({
                    LicenceModalOpen: true,
                  })
                }
                disabled={this.state.isSelectedNew}>
                <Text style={{fontSize: 12, color: '#002E6D'}}>
                  + Add License{' '}
                </Text>
              </TouchableOpacity>
              {certificate &&
                certificate.map((item) => {
                  return (
                    item.type === 'licence' && (
                      <View style={{marginBottom: 8}}>
                        <TouchableOpacity
                          style={{
                            paddingVertical: verticalScale(12),
                            paddingHorizontal: moderateScale(12),
                            alignItems: 'center',
                            backgroundColor: '#002E6D',
                            borderRadius: 4,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            position: 'relative',
                          }}>
                          <Text
                            style={{
                              color: '#FFFFFF',
                              fontSize: 12,
                              fontWeight: 'bold',
                              // backgroundColor: 'red',
                              width: '80%',
                            }}>
                            {this.getCertificateName(item)}{' '}
                            <Text style={{fontWeight: '400'}}>expires </Text>
                            {item.expiry_year + ' year(s)' + ', '}
                            {item.expiry_month} month(s)
                          </Text>
                          <TouchableOpacity
                            style={{position: 'absolute', right: 5}}
                            onPress={() => this.removeLicense(item)}>
                            <Icon
                              name="cross"
                              type="Entypo"
                              style={style.cross}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </View>
                    )
                  );
                })}
            </View>
          </View>
        </ScrollView>
        {!this.props.settingScreen && (
          <TouchableOpacity
            style={{
              marginHorizontal: 36,
              alignItems: 'center',
              paddingVertical: 12,
              backgroundColor: '#FFCC41',
              borderRadius: 4,
              opacity:
                certificate.length > 0 ||
                (isSelectedNew === true && isSelected === true)
                  ? 1
                  : 0.2,
              marginBottom: 15,
            }}
            disabled={
              certificate.length > 0 ||
              (isSelectedNew === true && isSelected === true)
                ? false
                : true
            }
            onPress={() => this.props.navigation('CertificateSuccess')}>
            <Text style={{color: '#003862', fontSize: 14, fontWeight: 'bold'}}>
              Save & Finish
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  cross: {
    color: '#fff',
    fontSize: moderateScale(12),
  },
  cardView: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 0.62,
    borderColor: '#979797',
    borderRadius: 2.5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    height: 18,
    width: 18,
  },
  label: {
    margin: 8,
  },
  Modal_Categories_Container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFF',
    paddingVertical: 20,
    width: '100%',
  },
  linearGradientView2: {
    width: '100%',
    height: 250,
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
  },
  linearGradient2: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  gobleleble: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fromcontrol: {
    marginTop: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(58, 177, 202, 0.1)',
    padding: 11,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    width: '100%',
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
    alignSelf: 'flex-end',
    color: '#5E5E5E',
  },
  preferenceTxt: {
    color: '#272727',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    paddingLeft: moderateScale(10),
  },
  descriptionView: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
    maxWidth: '90%',
    // alignItems: 'center',
  },
  dotIcon: {
    color: '#414141',
  },
  descTxt: {
    color: '#5E5E5E',
  },
});
