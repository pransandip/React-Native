import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import Axios from '../api/Axios';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

let token = AsyncStorage.getItem('token');

export const RefreshToken = (newToken) => {
  let configData = {
    headers: {
      Authorization: `${token}`,
    },
  };

  Axios.get('api/refresh_token', configData)
    .then((res) => {
      AsyncStorage.setItem('token', res.data.data);
      let token = res.data.data;
      const user = jwt(token); // decode your token here
      AsyncStorage.setItem('user', JSON.stringify(user));
    })
    .catch((error) => console.log(error));
};
