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

import Logo from '../../../assets/Logo.png';
import defaultStyle from '../../common/Typography';
import Weapons from '../../../assets/weapons.png';
import CriminalRecord from './CriminalRecord';

export default class AddBackgroundVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={style.headerConatiner}>
          <Image source={Logo} />
        </View>
        <CriminalRecord />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            marginHorizontal: 36,
            alignItems: 'center',
            paddingVertical: 12,
            backgroundColor: '#FFCC41',
            borderRadius: 4,
          }}>
          <Text style={{color: '#003862', fontSize: 14, fontWeight: 'bold'}}>
            Save & Finish
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  headerConatiner: {
    height: 72,
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
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
});
