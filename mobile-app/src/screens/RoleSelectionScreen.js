// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// export default function RoleSelectionScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>EcoSort Mumbai 🌱</Text>
//       <Text style={styles.subtitle}>Select your Role to Continue</Text>

//       <View style={styles.grid}>
//         {/* BMC SECTIONS */}
//         <TouchableOpacity 
//           style={[styles.card, { backgroundColor: '#e3f2fd' }]} 
//           onPress={() => navigation.navigate('Auth', { role: 'admin' })}
//         >
//           <Text style={styles.emoji}>👨‍💼</Text>
//           <Text style={styles.cardText}>BMC Admin</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.card, { backgroundColor: '#fff3e0' }]} 
//           onPress={() => navigation.navigate('Auth', { role: 'worker' })}
//         >
//           <Text style={styles.emoji}>🧹</Text>
//           <Text style={styles.cardText}>Sanitation Worker</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.card, { backgroundColor: '#e8f5e9' }]} 
//           onPress={() => navigation.navigate('Auth', { role: 'driver' })}
//         >
//           <Text style={styles.emoji}>🚛</Text>
//           <Text style={styles.cardText}>Garbage Collector</Text>
//         </TouchableOpacity>

//         {/* RESIDENT SECTION */}
//         <TouchableOpacity 
//           style={[styles.card, { backgroundColor: '#f3e5f5', borderColor: 'purple', borderWidth: 1 }]} 
//           onPress={() => navigation.navigate('Auth', { role: 'resident' })}
//         >
//           <Text style={styles.emoji}>🏠</Text>
//           <Text style={styles.cardText}>Resident / Citizen</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
//   title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#2ecc71', marginBottom: 10 },
//   subtitle: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 40 },
//   grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   card: { width: '48%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginBottom: 20, elevation: 3 },
//   emoji: { fontSize: 40, marginBottom: 10 },
//   cardText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoSort Demo 🚀</Text>
      <Text style={styles.subtitle}>Tap a role to enter (No Login)</Text>

      <View style={styles.grid}>
        {/* 1. ADMIN */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#e3f2fd' }]} 
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Text style={styles.emoji}>👨‍💼</Text>
          <Text style={styles.cardText}>BMC Admin</Text>
        </TouchableOpacity>

        {/* 2. WORKER */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#fff3e0' }]} 
          onPress={() => navigation.navigate('WorkerDashboard')}
        >
          <Text style={styles.emoji}>🧹</Text>
          <Text style={styles.cardText}>Sanitation Worker</Text>
        </TouchableOpacity>

        {/* 3. DRIVER */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#e8f5e9' }]} 
          onPress={() => navigation.navigate('DriverDashboard')}
        >
          <Text style={styles.emoji}>🚛</Text>
          <Text style={styles.cardText}>Garbage Driver</Text>
        </TouchableOpacity>

        {/* 4. RESIDENT */}
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#f3e5f5', borderColor: 'purple', borderWidth: 2 }]} 
          onPress={() => navigation.navigate('CitizenDashboard')}
        >
          <Text style={styles.emoji}>🏠</Text>
          <Text style={styles.cardText}>Resident (AI)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#2ecc71', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginBottom: 20, elevation: 5 },
  emoji: { fontSize: 40, marginBottom: 10 },
  cardText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
});