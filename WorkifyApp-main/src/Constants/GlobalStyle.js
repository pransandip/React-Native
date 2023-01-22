import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale, verticalModerateScale} from './PixelRatio/index';
const {width, height} = Dimensions.get('window');
import {COLORS} from '../Constants/Colors';

export const Global_Style = StyleSheet.create({
  button: {
    width: width - 20,
    height: verticalModerateScale(35),
    backgroundColor: COLORS.themecolor,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(10),
  },
  smallbutton: {
    height: verticalModerateScale(35),
    backgroundColor: COLORS.themecolor,
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(130),
  },
});
