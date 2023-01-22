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

const StaffHeader = (props) => {
  return (
    <View style={styles.header_view}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        StatusBarStyle="light-content"
      />
      <TouchableOpacity
        onPress={() => {
          props.back();
        }}>
        <Icon
          name="arrow-back"
          type="Ionicons"
          style={[styles.backIcon, {color: 'transparent'}]}
        />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>

      <TouchableOpacity
        onPress={() => {
          props.navigateToAddPage();
        }}>
        <Icon name="plus-square" type="Feather" style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default StaffHeader;

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
