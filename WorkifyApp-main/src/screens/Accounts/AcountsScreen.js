import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SettingsHeader from '../../components/Header/SettingsHeader';
import {moderateScale, verticalScale} from '../../Constants/PixelRatio';
import {Icon} from 'native-base';

const {height, width} = Dimensions.get('window');

const AcountsScreen = () => {
  const [completedGigs, setCompletedGigs] = useState([
    {
      img: 'https://s29755.pcdn.co/wp-content/uploads/2022/04/shutterstock_1896593944-1536x864.jpg.webp',
      gigname: 'Warehouse Mover',
      name: 'Jinya Ramen',
      date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
      amount: '150.00',
    },
    {
        img: 'https://s29755.pcdn.co/wp-content/uploads/2022/04/shutterstock_1896593944-1536x864.jpg.webp',
        gigname: 'Warehouse Mover',
        name: 'Jinya Ramen',
        date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
        amount: '150.00',
      },
      {
        img: 'https://s29755.pcdn.co/wp-content/uploads/2022/04/shutterstock_1896593944-1536x864.jpg.webp',
        gigname: 'Warehouse Mover',
        name: 'Jinya Ramen',
        date: 'Sat, Mar 14, 2022 - Mon, Mar 16, 2022',
        amount: '150.00',
      },
  ]);

  return (
    <View style={styles.rootView}>
      <SettingsHeader headerTxt="Account" />
      <ScrollView>
        <View style={styles.imgView}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg',
            }}
            style={styles.profileImg}
          />
          <Text style={styles.nameTxt}>Mike Tyson</Text>
        </View>

        <View style={styles.percentageView}>
          <View style={styles.percentageSubView}>
            <Text style={styles.percentageTxt}>100%</Text>
            <Text style={styles.cause}>Dressed Appropriately</Text>
          </View>

          <View style={styles.percentageSubView}>
            <Text style={styles.percentageTxt}>98%</Text>
            <Text style={styles.cause}>On Time</Text>
          </View>

          <View style={styles.percentageSubView}>
            <Text style={styles.percentageTxt}>95%</Text>
            <Text style={styles.cause}>Would Hire Again</Text>
          </View>
        </View>

        <View style={styles.bodyView}>
          <Text style={styles.experienceTxt}>Experience</Text>
          <TouchableOpacity
            style={[styles.experienceBtns, {marginTop: verticalScale(12)}]}>
            <Text style={styles.experienceTxtDesc}>
              Barista at Starbucks for 5 yrs
            </Text>
            <Icon name="cross" type="Entypo" style={styles.crossIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.experienceBtns, {marginTop: verticalScale(8)}]}>
            <Text style={styles.experienceTxtDesc}>
              Designer at Shanti Infosoft... for 2 yrs 4 mos
            </Text>
            <Icon name="cross" type="Entypo" style={styles.crossIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bodyView}>
          <Text style={styles.experienceTxt}>Certificates/Licenses</Text>
          <TouchableOpacity
            style={[styles.experienceBtns, {marginTop: verticalScale(12)}]}>
            <Text style={styles.experienceTxtDesc}>
              Serving it Right expires Nov, 2024
            </Text>
            <Icon name="cross" type="Entypo" style={styles.crossIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.experienceBtns, {marginTop: verticalScale(8)}]}>
            <Text style={styles.experienceTxtDesc}>
              Serving it Right expires Mar, 2030
            </Text>
            <Icon name="cross" type="Entypo" style={styles.crossIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <Text style={styles.experienceTxt}>
            Gigs Completed <Text style={{fontWeight: 'normal'}}>(07)</Text>
          </Text>
          <View style={styles.listView}>
            {completedGigs.map((item, index) => {
              return (
                <View style={styles.card}>
                  <View>
                    <Image
                      source={{
                        uri: item.img,
                      }}
                      style={styles.img}
                    />
                  </View>
                  <View>
                    <Text style={styles.gigname}>{item.gigname}</Text>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    <Text style={styles.dateTxt}>{item.date}</Text>
                  </View>
                  <Text style={styles.amountTxt}>${item.amount}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text style={styles.showMoreTxt}>Show More</Text>
      </ScrollView>
    </View>
  );
};

export default AcountsScreen;

const styles = StyleSheet.create({
  rootView: {
    height: height,
  },
  profileImg: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(45),
  },
  imgView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(36),
  },
  nameTxt: {
    color: '#393939',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  percentageView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: verticalScale(18),
  },
  percentageSubView: {
    alignItems: 'center',
  },
  percentageTxt: {
    color: '#393939',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  cause: {
    color: '#393939',
  },
  bodyView: {
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(36),
    color: '#393939',
  },
  experienceTxt: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    color: '#393939',
  },
  listView: {
    marginTop: verticalScale(12),
  },
  experienceBtns: {
    flexDirection: 'row',
    backgroundColor: '#002E6D',
    justifyContent: 'space-between',
    height: verticalScale(36),
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
  },
  experienceTxtDesc: {
    color: 'white',
  },
  crossIcon: {
    color: 'white',
    fontSize: moderateScale(13),
  },
  bottomView: {
    marginTop: verticalScale(40),
    paddingHorizontal: moderateScale(16),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth:1,
    borderColor:'#ECECEC',
    marginVertical:verticalScale(8),
    height:verticalScale(84)
  },
  img: {
    height: moderateScale(56),
    width: moderateScale(56),
  },
  showMoreTxt: {
    textAlign: 'center',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(48),
    color: '#002E6D',
    fontWeight:'bold'
  },gigname:{
    fontSize:moderateScale(20),
    color: '#393939'
  },nameTxt:{
    color: '#545454',
    fontWeight:'bold'
  },dateTxt:{
    fontSize:moderateScale(11),
    color:'#545454'
  },amountTxt:{
    color: '#393939',
    fontWeight:'bold'
  }
});
