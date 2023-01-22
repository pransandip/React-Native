import {createSlice} from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    login_status: false,
  },
  reducers: {
    setuser(state, action) {
      state.userData = action.payload;
      state.login_status = true;
    },
    logout(state, action) {
      state.userData = {};
      state.login_status = false;
    },
  },
});
export const {setuser, logout} = UserSlice.actions;

export default UserSlice.reducer;
