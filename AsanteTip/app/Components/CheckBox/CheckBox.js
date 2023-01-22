import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import {moderateScale, verticalScale} from '../../PixelRatio';
import {COLORS} from '../../Constants/Colors';
import {Icon} from 'native-base';

const {height, width} = Dimensions.get('window');

const CheckBox = props => {
  const [onChecked, setOnChecked] = useState(false);
  useEffect(() => {
    if (props.value != null) {
      setOnChecked(props.value);
    }
  }, [props.value]);

  // console.log(`Login----->`, onChecked);

  return (
    <Pressable
      onPress={() => {
        props.onChangeVal(!onChecked);
        setOnChecked(!onChecked);
      }}>
      <Neomorph
        inner // <- enable shadow inside of neomorph
        swapShadows // <- change zIndex of each shadow color
        style={[
          styles.neomorphCheckBox,
          {
            backgroundColor: onChecked
              ? COLORS.themeColor
              : COLORS.socialBtnColor,
          },
        ]}>
        {onChecked == true ? (
          <Icon name="check" type="Entypo" style={styles.CheckIcon} />
        ) : null}
      </Neomorph>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  neomorphCheckBox: {
    shadowRadius: moderateScale(3),
    // borderRadius: moderateScale(10),
    // backgroundColor: COLORS.socialBtnColor,
    width: moderateScale(20),
    height: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  CheckIcon: {
    fontSize: moderateScale(12),
    color: COLORS.white,
  },
});
