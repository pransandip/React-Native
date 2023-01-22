import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';

const SettingsHeader = (props) => {
  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation('BottomTab', {
            screen: 'Account',
          });
        }}>
        <Icon name="arrow-back" type="Ionicons" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>

      <Icon
        name="arrow-back"
        type="Ionicons"
        style={[styles.backIcon, {color: 'transparent'}]}
      />
    </View>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  header_view: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: StatusBar.currentHeight + 55,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#002E6D',
    justifyContent: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  headerTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  backIcon: {
    color: 'white',
  },
});
