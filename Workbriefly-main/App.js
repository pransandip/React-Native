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
// import GigSummary from './src/screens/gigSummary/GigSummary';
// import CreateAGig from './src/screens/createGig/CreateAGig';
// import ViewProfile from './src/screens/viewProfile/ViewProfile';
// import HelpAndSupport from './src/screens/helpAndSupport/HelpAndSupport';
// import GiveFeedback from './src/screens/giveFeedback/GiveFeedback';
// import ConfirmCheckIn from './src/screens/checkInCheckOut/ConfirmCheckIn';
// import Experience from './src/screens/createGig/Experience';
// import ReportAnIssue from './src/reportAnIssue/ReportAnIssue';
// import GigDetails from './src/screens/Gigs/GigDetails';

// const App = () => {
//   return (
//     <View>
//       {/* <CreateAGig /> */}
//       {/* <GigSummary /> */}
//       {/* <ViewProfile /> */}
//       {/* <HelpAndSupport /> */}
//       {/* <GiveFeedback /> */}
//       {/* <ConfirmCheckIn /> */}
//       {/* <Experience /> */}
//       {/* <ReportAnIssue /> */}
//       {/* <GigDetails /> */}
//       {/* <CreateAGig /> */}
//     </View>
//   );
// };

// export default App;
