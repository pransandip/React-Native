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
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import CrossSmall from '../../../assets/cross-small.png';
import CrossWhite from '../../../assets/crosswhite.png';
import Info from '../../../assets/info.png';
import Left from '../../../assets/Left.png';
import Success from '../../../assets/success.png';

export default class ExprienceSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoModalOpen: false,
    };
  }

  infoModal = () => {
    return (
      <Modal
        visible={this.state.infoModalOpen}
        transparent
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{marginTop: 'auto'}}>
            <View
              style={{
                width: '100%',
                height: 450,
                position: 'absolute',
                bottom: 0,
                alignSelf: 'center',
              }}>
              <View style={[style.linearGradientView2, {height: 450}]}>
                <LinearGradient
                  colors={['#154A5900', '#154A59CC', '#154A59']}
                  style={style.linearGradient2}></LinearGradient>
              </View>
              <View style={[style.Modal_Categories_Container, {height: 450}]}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '100%',
                    paddingRight: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        infoModalOpen: false,
                      })
                    }>
                    <Image source={CrossSmall} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginLeft: 16,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#272727',
                  }}>
                  Why enter your experiences?
                </Text>

                <View>
                  <ScrollView>
                    <View style={style.bodyContainer}>
                      <View style={{flexDirection: 'row', marginTop: 0}}>
                        {/* <Text style={{fontSize: 32}}>{'\u2022'}</Text> */}
                        <Text
                          style={{
                            flex: 1,
                            paddingLeft: 5,
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 16,
                            paddingTop: 15,
                            color: '#5E5E5E',
                          }}>
                          This will help inform business requestors of the
                          experience you possess and what you are capable of
                          doing. Make sure to list all of your relevant
                          experience to increase the likelihood of getting
                          hired:
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 0}}>
                        <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                        <Text
                          style={{
                            flex: 1,
                            paddingLeft: 5,
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 16,
                            paddingTop: 15,
                            color: '#5E5E5E',
                          }}>
                          Worked in a restaurant or fast food chain for a while?
                          Put that down!
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 0}}>
                        <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                        <Text
                          style={{
                            flex: 1,
                            paddingLeft: 5,
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 16,
                            paddingTop: 15,
                            color: '#5E5E5E',
                          }}>
                          Worked at a warehouse before? Put that down!
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 0}}>
                        <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                        <Text
                          style={{
                            flex: 1,
                            paddingLeft: 5,
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 16,
                            paddingTop: 15,
                            color: '#5E5E5E',
                          }}>
                          Worked at a manufacturing facility? Put that down!
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 0}}>
                        <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                        <Text
                          style={{
                            flex: 1,
                            paddingLeft: 5,
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 16,
                            paddingTop: 15,
                            color: '#5E5E5E',
                          }}>
                          Worked at a retail outlet before? Put that down!
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 0}}>
                        <Text style={{fontSize: 32}}>{'\u2022'}</Text>
                        <Text
                          style={{
                            flex: 1,
                            paddingLeft: 5,
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 16,
                            paddingTop: 15,
                            color: '#5E5E5E',
                          }}>
                          We can honestly go all day but you get the gist by
                          now… Put those experiences down!
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.infoModal()}
        <View style={style.headerConatiner}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={Left} />
          </TouchableOpacity>
          <Image source={Logo} style={{marginLeft: '35%'}} />
        </View>
        <ScrollView>
          <View style={{marginBottom: 80}}>
            <View style={style.bodyContainer}>
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
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 40,
                }}>
                <Image source={Success} />
                <Text
                  style={{
                    marginTop: 30,
                    color: '#272727',
                    fontSize: 16,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  Awesome! Your exprience has been added.
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  marginHorizontal: 36,
                  alignItems: 'center',
                  paddingVertical: 12,
                  backgroundColor: '#FFCC41',
                  borderRadius: 4,
                  marginVertical: 15,
                }}
                onPress={() => this.props.navigation.navigate('ProfileSetup')}>
                <Text
                  style={{color: '#003862', fontSize: 14, fontWeight: 'bold'}}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  signInBtn: {
    marginTop: 29,
    marginBottom: 20,
    paddingHorizontal: 79,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#FFCC41',
    borderRadius: 3,
  },
});
