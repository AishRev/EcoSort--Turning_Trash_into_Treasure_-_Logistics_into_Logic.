import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, Text } from 'react-native';

// Import Screens
import DriverScreen from './src/screens/DriverScreen';
import WorkerScreen from './src/screens/WorkerScreen';

const Stack = createStackNavigator();

// A simple Home Screen to choose your Role
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>EcoSort Login</Text>
      <Button 
        title="Login as DRIVER 🚛" 
        onPress={() => navigation.navigate('Driver')} 
      />
      <Button 
        title="Login as WORKER 👷" 
        onPress={() => navigation.navigate('Worker')} 
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EcoSort' }} />
        <Stack.Screen name="Driver" component={DriverScreen} />
        <Stack.Screen name="Worker" component={WorkerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}