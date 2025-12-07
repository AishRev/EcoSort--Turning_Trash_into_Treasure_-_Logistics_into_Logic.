

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
// // import client from '../api/client';

// // export default function WorkerDashboard() {
// //   const [binId, setBinId] = useState('');
// //   const [reports, setReports] = useState([]);

// //   useEffect(() => { fetchReports(); }, []);

// //   const fetchReports = async () => {
// //     const res = await client.get('/reports/pending');
// //     setReports(res.data);
// //   };

// //   const markBinFull = async () => {
// //     if(!binId) return;
// //     try {
// //       await client.post('/bins/mark-full', { binId });
// //       Alert.alert("Success", `Bin ${binId} marked FULL 🔴`);
// //     } catch(err) { Alert.alert("Error", "Failed"); }
// //   };

// //   const verifyReport = async (id, status) => {
// //     await client.post('/reports/verify', { id, status });
// //     Alert.alert(status === 'VERIFIED' ? "Verified" : "Rejected");
// //     fetchReports();
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Worker Tasks 👷</Text>
      
// //       {/* 1. Manual QR Simulation */}
// //       <View style={styles.card}>
// //         <Text style={styles.h2}>Scan Bin QR Code</Text>
// //         <TextInput 
// //             placeholder="Enter Bin ID (e.g., 101)" 
// //             style={styles.input} 
// //             onChangeText={setBinId}
// //         />
// //         <Button title="Report Bin Full 🔴" color="red" onPress={markBinFull} />
// //       </View>

// //       {/* 2. Verify Citizen Reports */}
// //       <Text style={styles.h2}>Verify Citizen Complaints</Text>
// //       <FlatList 
// //         data={reports}
// //         keyExtractor={item => item._id}
// //         renderItem={({item}) => (
// //            <View style={styles.reportCard}>
// //                <Text>Type: {item.description}</Text>
// //                <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
// //                    <Button title="Real ✅" onPress={() => verifyReport(item._id, 'VERIFIED')} />
// //                    <Button title="Fake ❌" color="red" onPress={() => verifyReport(item._id, 'FAKE')} />
// //                </View>
// //            </View>
// //         )}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //     container: { flex: 1, padding: 20 },
// //     title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
// //     h2: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
// //     card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
// //     input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
// //     reportCard: { backgroundColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 5 }
// // });

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet } from 'react-native';
// import client from '../api/client';

// export default function WorkerDashboard() {
//   const [binId, setBinId] = useState('');
//   const [reports, setReports] = useState([]);

//   useEffect(() => { fetchReports(); }, []);

//   const fetchReports = async () => {
//     try {
//         const res = await client.get('/reports/pending');
//         setReports(res.data);
//     } catch(e) { console.log(e); }
//   };

//   const markBinFull = async () => {
//     if(!binId) return Alert.alert("Enter Bin ID");
//     try {
//       await client.post('/bins/mark-full', { binId });
//       Alert.alert("Success", `Bin ${binId} reported FULL 🔴`);
//       setBinId('');
//     } catch(err) { Alert.alert("Error", "Failed"); }
//   };

//   const verifyReport = async (id, status) => {
//     await client.post('/reports/verify', { id, status });
//     Alert.alert(status === 'VERIFIED' ? "Verified" : "Rejected");
//     fetchReports();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>👷 Worker Tasks</Text>
      
//       {/* Bin Status */}
//       <View style={styles.card}>
//         <Text style={styles.label}>Report Full Bin (QR Simulation)</Text>
//         <TextInput 
//             placeholder="Enter Bin ID (e.g., 101)" 
//             style={styles.input} 
//             onChangeText={setBinId}
//             value={binId}
//             keyboardType="numeric"
//         />
//         <Button title="Mark Full 🔴" color="red" onPress={markBinFull} />
//       </View>

//       {/* Verify Reports */}
//       <Text style={styles.title}>Citizen Complaints</Text>
//       <FlatList 
//         data={reports}
//         keyExtractor={item => item._id}
//         renderItem={({item}) => (
//            <View style={styles.reportItem}>
//                <Text style={{fontWeight: 'bold'}}>{item.description}</Text>
//                <View style={{flexDirection: 'row', gap: 10, marginTop: 5}}>
//                    <Button title="✅ Real" onPress={() => verifyReport(item._id, 'VERIFIED')} />
//                    <Button title="❌ Fake" color="red" onPress={() => verifyReport(item._id, 'FAKE')} />
//                </View>
//            </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20 },
//     title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
//     card: { backgroundColor: 'white', padding: 15, borderRadius: 10, elevation: 3, marginBottom: 20 },
//     input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
//     reportItem: { backgroundColor: '#e3f2fd', padding: 10, marginBottom: 10, borderRadius: 5 }
// });

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import client from '../api/client';

export default function WorkerDashboard() {
  const [binId, setBinId] = useState('');

  // OPTION 1: Manual Submit
  const handleManualSubmit = async () => {
    if (!binId) return Alert.alert("Error", "Enter a Bin ID");
    try {
      await client.post('/bins/mark-full', { binId });
      Alert.alert("Success", `Bin ${binId} reported FULL 🔴`);
      setBinId('');
    } catch (err) {
      Alert.alert("Error", "Server Connection Failed");
    }
  };

  // OPTION 2: Simulated QR Scan (Safe for Demo)
  const handleSimulateScan = () => {
    Alert.alert("📷 QR Scanner", "Scanning code...", [
      { text: "Cancel", style: "cancel" },
      { text: "Confirm Scan", onPress: () => {
          setBinId('101'); // Auto-fills the ID
          Alert.alert("Scanned!", "Bin #101 Detected");
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sanitation Worker 🧹</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Report Full Bin</Text>
        
        {/* OPTION 1: MANUAL */}
        <Text style={styles.subLabel}>Option 1: Manual Entry</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Bin ID (e.g. 101)" 
          value={binId}
          onChangeText={setBinId}
          keyboardType="numeric"
        />
        
        {/* OPTION 2: QR SCAN */}
        <Text style={styles.subLabel}>Option 2: Scan QR</Text>
        <TouchableOpacity style={styles.scanBtn} onPress={handleSimulateScan}>
          <Text style={styles.scanText}>📷 OPEN SCANNER</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20}}>
          <Button title="🔴 MARK BIN FULL" color="red" onPress={handleManualSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 },
  label: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  subLabel: { color: 'gray', marginTop: 10, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, fontSize: 18 },
  scanBtn: { backgroundColor: '#333', padding: 15, borderRadius: 5, alignItems: 'center' },
  scanText: { color: 'white', fontWeight: 'bold' }
});