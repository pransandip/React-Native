import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
// import axios from 'axios';
import Axios from '../../api/Axios';
import Snackbar from 'react-native-snackbar';
import {verticalScale, moderateScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';
import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import CrossSmall from '../../../assets/cross-small.png';
import CrossWhite from '../../../assets/crosswhite.png';
import Info from '../../../assets/info.png';
import Left from '../../../assets/Left.png';

export default class Exprience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      token: '',
      isSelected: false,
      exprienceModalOpen: false,
      infoModalOpen: false,
      position: '',
      year: '',
      month: '',
      companyName: '',
      exprience: [],
    };
  }

  componentDidMount() {
    this.setState(
      {
        userId: this.props.userId,
        token: this.props.token,
      },
      () => {
        console.log('token', this.state.token);
        this.getAllExprience();
      },
    );
  }

  getAllExprience = () => {
    Axios({
      method: 'GET',
      url: 'api/users/experience/' + this.state.userId,
      headers: {
        Authorization: `${this.state.token}`,
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
          this.setState({
            exprience: response.data?.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addExprienceFun = () => {
    console.log('token', this.state.token);
    const {exprience, token, userId, position, year, month, companyName} =
      this.state;
    let postBody = {
      user_id: userId,
      position: position,
      year: year,
      month: month,
      company_name: companyName,
      status: 'active',
    };
    Axios({
      method: 'POST',
      url: 'api/experience',
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
          this.getAllExprience();
          this.setState(
            {
              exprienceModalOpen: false,
            },
            () => {
              Snackbar.show({
                backgroundColor: '#74B711',
                text: response.data.msg,
                duration: Snackbar.LENGTH_LONG,
              });
              this.props.navigation('ExprienceSuccess');
            },
          );
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  removeItem = (item) => {
    Axios({
      method: 'DELETE',
      url: 'api/experience/' + item.id,
      headers: {
        Authorization: `${this.state.token}`,
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
          this.getAllExprience();
          Snackbar.show({
            backgroundColor: '#EE8973',
            text: response.data.msg,
            duration: Snackbar.LENGTH_LONG,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  exprienceModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.exprienceModalOpen}
        onRequestClose={() => this.setState({exprienceModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({exprienceModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>Add Experience</Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      exprienceModalOpen: false,
                    })
                  }
                />
              </View>
              <ScrollView>
                <View style={style.bodyContainer}>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Position</Text>
                    <TextInput
                      style={[style.input]}
                      placeholder="Start typing a position name (e.g. Front Desk)"
                      onChangeText={(value) => this.setState({position: value})}
                      maxLength={10}
                    />
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Length of Time</Text>
                    {/* <View style={{flexDirection: 'row', width: '48%'}}>
                      <TextInput
                        style={[style.input, {marginRight: 15}]}
                        placeholder="1 Year"
                        onChangeText={(value) => this.setState({year: value})}
                        keyboardType="number-pad"
                      />
                      <TextInput
                        style={[style.input]}
                        placeholder="2 Month"
                        onChangeText={(value) => this.setState({month: value})}
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
                          onChangeText={(value) => this.setState({year: value})}
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
                            this.setState({month: value})
                          }
                          keyboardType="number-pad"
                        />
                        <Text style={{color: '#969696'}}>Months</Text>
                      </View>
                    </View>
                  </View>
                  <View style={style.fromcontrol}>
                    <Text style={style.gobleleble}>Company Name</Text>
                    <TextInput
                      style={[style.input]}
                      placeholder="Start typing a company name (e.g. Starbucks)"
                      onChangeText={(value) =>
                        this.setState({companyName: value})
                      }
                      maxLength={12}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 12,
                      backgroundColor: '#002E6D',
                      alignItems: 'center',
                      marginTop: 24,
                      borderRadius: 4,
                    }}
                    onPress={() => this.addExprienceFun()}>
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

  infoModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.infoModalOpen}
        onRequestClose={() => this.setState({infoModalOpen: false})}>
        <View style={style.centeredView}>
          <Pressable
            style={{flex: 1}}
            onPress={() => this.setState({infoModalOpen: false})}
          />

          <View style={style.modalView}>
            <View style={style.bodyView}>
              <View style={style.topView}>
                <Text style={style.preferenceTxt}>
                  Why enter your experiences?
                </Text>
                <Icon
                  name="cross"
                  type="Entypo"
                  style={style.crossIcon}
                  onPress={() =>
                    this.setState({
                      infoModalOpen: false,
                    })
                  }
                />
              </View>

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
                  Worked in a restaurant or fast food chain for a while? Put
                  that down!
                </Text>
              </View>

              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Worked at a warehouse before? Put that down!
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Worked at a manufacturing facility? Put that down!
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  Worked at a retail outlet before? Put that down!
                </Text>
              </View>
              <View style={style.descriptionView}>
                <Icon name="dot-single" type="Entypo" style={style.dotIcon} />
                <Text style={style.descTxt}>
                  We can honestly go all day but you get the gist by now… put
                  those experiences down!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    const {exprience} = this.state;
    return (
      <React.Fragment>
        {this.exprienceModal()}
        {this.infoModal()}
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
                  Experience{' '}
                </Text>
                <TouchableOpacity
                  style={{marginTop: 28}}
                  onPress={() => {
                    this.setState({
                      infoModalOpen: true,
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
                  I do not have any experiences to add
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 11,
                  borderWidth: 1,
                  borderColor: '#002E6D',
                  alignItems: 'center',
                  borderRadius: 4,
                  marginBottom: 33,
                }}
                onPress={() =>
                  this.setState({
                    exprienceModalOpen: true,
                  })
                }
                disabled={this.state.isSelected}>
                <Text style={{fontSize: 12, color: '#002E6D'}}>
                  + Add Experience{' '}
                </Text>
              </TouchableOpacity>
              <FlatList
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                style={{
                  height: Platform.OS === 'android' ? '98%' : '85%',
                  width: '100%',
                  marginTop: 6,
                }}
                // initialNumToRender={10}
                removeClippedSubviews={true}
                data={exprience}
                keyExtractor={(item) => item.companyName}
                renderItem={({item, index}) => (
                  <View style={{marginBottom: 8}}>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: '#002E6D',
                        paddingVertical: verticalScale(12),
                        paddingHorizontal: moderateScale(12),
                        borderRadius: 4,
                        justifyContent: 'space-between',
                        flexDirection: 'row',

                        position: 'relative',
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 12,
                          fontWeight: 'bold',

                          width: '80%',
                        }}>
                        {item.position}{' '}
                        <Text style={{fontWeight: '400'}}>at </Text>
                        {item.company_name + ' '}
                        <Text style={{fontWeight: '400'}}>for </Text>
                        {item.year} Year(s)
                        {' ' + item.month} Month(s)
                      </Text>
                      <TouchableOpacity
                        style={{position: 'absolute', right: 5}}
                        onPress={() => this.removeItem(item)}>
                        <Icon name="cross" type="Entypo" style={style.cross} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  bodyContainer: {
    marginTop: 16,
    marginHorizontal: 16,
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
  cross: {
    color: '#fff',
    fontSize: moderateScale(12),
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

    height: verticalScale(450),
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
