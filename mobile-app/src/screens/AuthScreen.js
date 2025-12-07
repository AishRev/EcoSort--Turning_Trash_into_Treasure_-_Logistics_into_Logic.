import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import client from '../api/client'; // Ensure this points to your server IP

export default function AuthScreen({ route, navigation }) {
  const { role } = route.params; // Get role passed from previous screen
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? '/auth/login' : '/auth/register';

    try {
      const res = await client.post(endpoint, {
        username,
        password,
        role // Send the role automatically
      });

      if (res.data) {
        Alert.alert("Success", `Welcome ${role.toUpperCase()}!`);
        // Navigate to the correct Dashboard
        if (role === 'admin') navigation.replace('AdminDashboard');
        else if (role === 'worker') navigation.replace('WorkerDashboard');
        else if (role === 'driver') navigation.replace('DriverDashboard');
        else if (role === 'resident') navigation.replace('CitizenDashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Connection Error";
      Alert.alert("Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? 'Login' : 'Register'} as {role.charAt(0).toUpperCase() + role.slice(1)}
      </Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      {loading ? (
        <ActivityIndicator color="green" size="large" />
      ) : (
        <Button title={isLogin ? "Login 🔐" : "Register 📝"} onPress={handleAuth} color="#2ecc71" />
      )}

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
        <Text style={styles.switchText}>
          {isLogin ? "New user? Register here" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  switchText: { textAlign: 'center', color: 'blue', marginTop: 10 }
});