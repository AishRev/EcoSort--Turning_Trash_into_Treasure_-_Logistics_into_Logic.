import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

// ⚠️ REPLACE WITH YOUR LAPTOP'S LOCAL IP
const API_URL = 'http://192.168.56.1:5000/api/bins/update';

export default function WorkerScreen() {
  
  const reportFull = async (binId) => {
    try {
      await axios.post(API_URL, {
        binId: binId,
        status: "FULL",
        workerName: "Raju"
      });
      Alert.alert("Sent!", `Control Room Notified: Bin ${binId} is FULL 🔴`);
    } catch (err) {
      Alert.alert("Error", "Check server connection");
    }
  };

  const reportEmpty = async (binId) => {
    try {
      await axios.post(API_URL, {
        binId: binId,
        status: "EMPTY",
        workerName: "Raju"
      });
      Alert.alert("Cleaned!", `Bin ${binId} marked as EMPTY 🟢`);
    } catch (err) {
        Alert.alert("Error", "Check server connection");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👷 Sanitation Staff Mode</Text>
      
      {/* Simulation Controls for Bin 101 */}
      <View style={styles.card}>
        <Text style={styles.binTitle}>Bin #101 (Dadar Station)</Text>
        <View style={styles.row}>
            <TouchableOpacity style={styles.btnRed} onPress={() => reportFull("101")}>
                <Text style={styles.btnText}>REPORT FULL 🔴</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnGreen} onPress={() => reportEmpty("101")}>
                <Text style={styles.btnText}>CLEANED 🟢</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Simulation Controls for Bin 102 */}
      <View style={styles.card}>
        <Text style={styles.binTitle}>Bin #102 (Shivaji Park)</Text>
        <View style={styles.row}>
            <TouchableOpacity style={styles.btnRed} onPress={() => reportFull("102")}>
                <Text style={styles.btnText}>REPORT FULL 🔴</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20, elevation: 3 },
  binTitle: { fontSize: 18, marginBottom: 15, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  btnRed: { backgroundColor: '#ff4444', padding: 15, borderRadius: 8, flex: 0.48 },
  btnGreen: { backgroundColor: '#00C851', padding: 15, borderRadius: 8, flex: 0.48 },
  btnText: { color: 'white', fontWeight: 'bold', textAlign: 'center' }
});