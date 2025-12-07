import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import client from '../api/client';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await client.post('/auth/login', { username, password });
      const user = res.data;
      
      if (user.role === 'admin') navigation.navigate('AdminDashboard');
      else if (user.role === 'driver') navigation.navigate('DriverDashboard');
      else if (user.role === 'worker') navigation.navigate('WorkerDashboard');
      
    } catch (err) {
      Alert.alert("Login Failed", "Invalid Credentials or Server Error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMC Staff Login 🏛️</Text>
      <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      
      <Text style={{marginTop: 30, textAlign: 'center'}}>Are you a Resident?</Text>
      <Button title="Continue as Citizen (No Login)" color="green" onPress={() => navigation.navigate('CitizenDashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});