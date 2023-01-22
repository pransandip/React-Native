import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { moderateScale,verticalScale } from '../../Constants/PixelRatio';
import defaultStyle from '../../common/Typography';
import LandigOne from '../../../assets/LandingOne.png';
import LandingTwo from '../../../assets/LandingTwo.png';
import LandingThree from '../../../assets/LandingThree.png';
import GroupOne from '../../../assets/group-1.png';
import GroupTwo from '../../../assets/group-2.png';
import GroupThree from '../../../assets/group-3.png';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0,
    };
  }

  onNextPress = () => {
    if (this.state.itemCount < 2) {
      this.setState({itemCount: this.state.itemCount + 1});
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  renderItem = () => {
    const {itemCount} = this.state;
    return (
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={[defaultStyle.Title_One, {color: '#393939'}]}>
          Welcome to WorkBriefly
        </Text>
        <Image
          style={style.imgstyle}
          source={
            itemCount === 0
              ? LandigOne
              : itemCount === 1
              ? LandingTwo
              : LandingThree
          }
        />
        <Text style={[defaultStyle.Body_One, {color: '#393939'}]}>
          {itemCount === 0
            ? 'Earn up to $24/hr'
            : itemCount === 1
            ? 'You are in control'
            : 'Gigs only a tab away'}
        </Text>
        {itemCount === 0 ? (
          <Text
            style={[
              defaultStyle.Body_paragraph,
              {paddingHorizontal: 16, marginTop: 11, color: '#545454'},
            ]}>
            Get paid in as quickly as one hour after working a gig at a local
            business with all earnings sent straight to your account. It’s that
            simple.
          </Text>
        ) : itemCount === 1 ? (
          <Text
            style={[
              defaultStyle.Body_paragraph,
              {paddingHorizontal: 16, marginTop: 11, color: '#545454'},
            ]}>
            You have the freedom to decide where and when you want to work as
            well as which gigs you want to do.
          </Text>
        ) : (
          <Text
            style={[
              defaultStyle.Body_paragraph,
              {paddingHorizontal: 16, marginTop: 11, color: '#545454'},
            ]}>
            See a gig that suits your schedule and experience? Just claim it,
            work it, and then get paid for it!
          </Text>
        )}
        {itemCount === 0 ? (
          <Image source={GroupOne} style={{marginTop: 37}} />
        ) : itemCount === 1 ? (
          <Image source={GroupTwo} style={{marginTop: 37}} />
        ) : (
          <Image source={GroupThree} style={{marginTop: 37}} />
        )}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFF'}}>
        <ScrollView>
          <View style={style.container}>
            {this.renderItem()}
            <View style={style.footerContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: '#002E6D'}}>
                  Skip All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.nextButton}
                onPress={() => this.onNextPress()}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 16, fontWeight: '600'}}>
                  Next
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
  container: {
    paddingTop: 75,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  imgstyle: {
    marginBottom: 16,
  },
  footerContainer: {
    marginTop: verticalScale(80),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', alignItems:'center',
    paddingHorizontal: 15,
    marginBottom:verticalScale(10)
  },
  nextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#002E6D',
  },
});
