import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';

export default function CitizenDashboard() {
  const [image, setImage] = useState(null);
  const [points, setPoints] = useState(120); // Dummy stored points
  const [desc, setDesc] = useState('');

  // 1. AI Waste Detection (Simulated)
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Mock AI Response
      setTimeout(() => {
        Alert.alert("AI Detection Result 🤖", "Object: Plastic Bottle\nCategory: Dry Waste\nInstructions: Recycle Bin (Blue)");
      }, 1500);
    }
  };

  // 2. Report Issue
  const reportIssue = async () => {
    try {
        await client.post('/reports', {
            description: desc || "Garbage Dump",
            location: { lat: 19.0760, lng: 72.8777 } // Hardcoded for demo
        });
        Alert.alert("Report Sent", "Once verified by a worker, you earn +50 Points!");
        setDesc('');
    } catch(err) { Alert.alert("Error", "Could not send report"); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, Citizen! 🌱</Text>
      
      {/* Gamification Badge */}
      <View style={styles.badge}>
         <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>🏆 Points: {points}</Text>
         <Text style={{color: 'white'}}>Level: Eco-Warrior</Text>
      </View>

      {/* AI Scanner */}
      <View style={styles.section}>
        <Text style={styles.label}>Smart Waste Scanner</Text>
        <Button title="📷 Scan Waste (AI)" onPress={pickImage} />
      </View>

      {/* Report Form */}
      <View style={styles.section}>
        <Text style={styles.label}>Report a Mess</Text>
        <TextInput 
            placeholder="Describe issue (e.g. Overflowing bin)" 
            style={styles.input}
            onChangeText={setDesc}
            value={desc}
        />
        <Button title="Submit Report" color="orange" onPress={reportIssue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    badge: { backgroundColor: '#2ecc71', padding: 20, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
    section: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 }
});