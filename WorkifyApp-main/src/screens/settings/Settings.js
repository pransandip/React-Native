import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'native-base';

import SettingsHeader from '../../components/Header/SettingsHeader';
import SettingsTopBar from './SettingsTopBar';
import Exprience from '../AccountSetup/Exprience';
import Certificate from '../AccountSetup/Certificate';
import Preference from '../AccountSetup/Preference';
import PhotoIds from '../AccountSetup/PhotoIds';
import CriminalRecord from '../AccountSetup/CriminalRecord';

const Settings = (props) => {
  const [selectedTab, setSelectedTab] = useState('Experiences');
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [isSelected, setIsSelected] = useState(false);

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
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  const navigation = (value, params) => {
    props.navigation.navigate(value, params);
  };

  const selectedTabs = (item) => {
    setSelectedTab(item);
  };

  const exprienceView = () => {
    return (
      <View>
        {token ? (
          <Exprience
            userId={userData?.id}
            token={token}
            settingScreen={true}
            navigation={navigation}
          />
        ) : (
          <></>
        )}
      </View>
    );
  };

  const certificateView = () => {
    return (
      <View>
        {token ? (
          <Certificate
            userId={userData?.id}
            token={token}
            settingScreen={true}
            navigation={navigation}
          />
        ) : (
          <></>
        )}
      </View>
    );
  };

  const preferenceView = () => {
    return (
      <ScrollView>
        {token ? (
          <Preference
            userId={userData?.id}
            token={token}
            settingScreen={true}
            navigation={navigation}
          />
        ) : (
          <></>
        )}
      </ScrollView>
    );
  };

  const photoIdView = () => {
    return (
      <View>
        {token ? (
          <PhotoIds userId={userData?.id} token={token} settingScreen={true} />
        ) : (
          <></>
        )}
      </View>
    );
  };

  const criminalRecord = () => {
    return (
      <View>
        <CriminalRecord settingScreen={true} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SettingsHeader headerTxt="Settings" navigation={navigation} />
      <SettingsTopBar selectedTabs={selectedTabs} />
      {selectedTab === 'Experiences'
        ? exprienceView()
        : selectedTab === 'Certificates & Licenses'
        ? certificateView()
        : selectedTab === 'Preferences'
        ? preferenceView()
        : selectedTab === 'Photo ID Verification'
        ? photoIdView()
        : criminalRecord()}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
