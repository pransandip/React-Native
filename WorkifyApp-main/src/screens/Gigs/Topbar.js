import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const Topbar = (props) => {

  


const toggle = props.handlePress
  



  return (
    <View style={styles.topbar}>
      <TouchableOpacity onPress={()=> toggle('gigInfo')}>
        <Text>Gig info</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> toggle('applicants')}>
        <Text>Applicants</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> toggle('bookedWorkers')}>
        <Text>Booked Workers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> toggle('invoice')}>
        <Text>invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
    topbar:{
        flexDirection:'row', alignItems:'center', justifyContent:'space-evenly',

    },
});
