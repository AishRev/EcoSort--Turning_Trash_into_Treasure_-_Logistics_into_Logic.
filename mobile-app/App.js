
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// // import LoginScreen from './src/screens/LoginScreen';
// // import AdminDashboard from './src/screens/AdminDashboard';
// // import DriverDashboard from './src/screens/DriverDashboard';
// // import WorkerDashboard from './src/screens/WorkerDashboard';
// // import CitizenDashboard from './src/screens/CitizenDashboard';

// // const Stack = createStackNavigator();

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Login">
// //         <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
// //         <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{title: 'BMC Admin'}} />
// //         <Stack.Screen name="DriverDashboard" component={DriverDashboard} options={{title: 'Driver Logistics'}} />
// //         <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} options={{title: 'Ground Staff'}} />
// //         <Stack.Screen name="CitizenDashboard" component={CitizenDashboard} options={{title: 'EcoSort Resident'}} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // Import Screens
// import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
// import AuthScreen from './src/screens/AuthScreen';
// import AdminDashboard from './src/screens/AdminDashboard';
// import DriverDashboard from './src/screens/DriverDashboard';
// import WorkerDashboard from './src/screens/WorkerDashboard';
// import CitizenDashboard from './src/screens/CitizenDashboard';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="RoleSelection">
//         {/* Auth Flow */}
//         <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Authentication' }} />

//         {/* Dashboards (Use replace() so user can't go back to login easily) */}
//         <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Panel', headerLeft: null }} />
//         <Stack.Screen name="DriverDashboard" component={DriverDashboard} options={{ title: 'Logistics Map', headerLeft: null }} />
//         <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} options={{ title: 'Safai Mitra', headerLeft: null }} />
//         <Stack.Screen name="CitizenDashboard" component={CitizenDashboard} options={{ title: 'Resident Home', headerLeft: null }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import AdminDashboard from './src/screens/AdminDashboard';
import DriverDashboard from './src/screens/DriverDashboard';
import WorkerDashboard from './src/screens/WorkerDashboard';
import CitizenDashboard from './src/screens/CitizenDashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoleSelection">
        {/* Main Menu */}
        <Stack.Screen 
          name="RoleSelection" 
          component={RoleSelectionScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Direct Access Dashboards */}
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'BMC Admin Panel' }} />
        <Stack.Screen name="DriverDashboard" component={DriverDashboard} options={{ title: 'Garbage Collector' }} />
        <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} options={{ title: 'Sanitation Worker' }} />
        <Stack.Screen name="CitizenDashboard" component={CitizenDashboard} options={{ title: 'Resident View' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}