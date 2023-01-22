import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect,useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002E6D',
  },
});

const Splash = (props) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      console.log(token);
      if (token) {
        setTimeout(() => {
          props.navigation.navigate('BottomTab', {
            screen: 'Dashboard',
          });
        }, 2000);
      } else {
        setTimeout(() => {
          props.navigation.navigate('Landing');
        }, 2000);
      }
    });
  }, [token]);
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/wthree.png')} />
    </View>
  );
};

export default Splash;
