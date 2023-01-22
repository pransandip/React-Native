/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import MainStackNavigator from './src/navigation/MainStackNavigator';

const App: () => React$Node = () => {
  return <MainStackNavigator />;
};

export default App;

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import GigDetails from './src/screens/Gigs/GigDetails';
// import Settings from './src/screens/settings/Settings';
// import GigDetailsManager from './src/screens/Gigs/GigDetailsManager';
// import AddPreferences from './src/screens/AccountSetup/AddPreferences';
// import AcountsScreen from './src/screens/Accounts/AcountsScreen';
// import Survey from './src/screens/survey/Survey';
// import AddCertificate from './src/screens/AccountSetup/AddCertificate';
// // import AccountsScreen from './src/screens/Accounts/AccountsScreen'

// const App = () => {
//   return (
//     <View>
//       {/* <GigDetails /> */}
//       {/* <Settings />1 */}
//       {/* <GigDetailsManager /> */}
//       {/* <AccountsScreen/> */}
//       {/* <AddPreferences/> */}
//       {/* <AcountsScreen/> */}
//       {/* <Survey /> */}
//       {/* <AddCertificate /> */}
//     </View>
//   );
// };

// export default App;
