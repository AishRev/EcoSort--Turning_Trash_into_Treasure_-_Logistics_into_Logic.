// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, Dimensions } from 'react-native';
// // import MapView, { Marker, Polyline } from 'react-native-maps';
// // import axios from 'axios';

// // // ⚠️ REPLACE WITH YOUR LAPTOP'S LOCAL IP (e.g., 192.168.1.5)
// // // Do NOT use localhost (Android/iOS simulator won't see it)
// // const API_URL = 'http://192.168.56.1:5000/api/bins/all'; 

// // export default function DriverScreen() {
// //   const [bins, setBins] = useState([]);

// //   // Poll server every 2 seconds to check for "Full" bins
// //   useEffect(() => {
// //     const fetchBins = async () => {
// //       try {
// //         const res = await axios.get(API_URL);
// //         setBins(res.data);
// //       } catch (err) {
// //         console.log("Network Error:", err);
// //       }
// //     };
// //     fetchBins(); // Initial fetch
// //     const interval = setInterval(fetchBins, 2000); // Poll loop
// //     return () => clearInterval(interval);
// //   }, []);

// //   const fullBins = bins.filter(b => b.status === 'FULL');

// //   return (
// //     <View style={styles.container}>
// //       <MapView 
// //         style={styles.map}
// //         initialRegion={{
// //           latitude: 19.0760, 
// //           longitude: 72.8777,
// //           latitudeDelta: 0.05,
// //           longitudeDelta: 0.05,
// //         }}
// //       >
// //         {bins.map((bin) => (
// //           <Marker
// //             key={bin._id}
// //             coordinate={{ latitude: bin.location.lat, longitude: bin.location.lng }}
// //             // Green if EMPTY, Red if FULL
// //             pinColor={bin.status === 'FULL' ? 'red' : 'green'} 
// //             title={`Bin ${bin.binId}`}
// //           />
// //         ))}

// //         {/* Draw line connecting ONLY full bins */}
// //         {fullBins.length > 0 && (
// //            <Polyline
// //              coordinates={fullBins.map(b => ({ latitude: b.location.lat, longitude: b.location.lng }))}
// //              strokeColor="black"
// //              strokeWidth={4}
// //            />
// //         )}
// //       </MapView>
      
// //       <View style={styles.infoBox}>
// //         <Text style={styles.infoText}>🚛 Pickup Route: {fullBins.length} Stops</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   map: { width: '100%', height: '100%' },
// //   infoBox: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: 'white', padding: 15, borderRadius: 20, elevation: 5 },
// //   infoText: { fontWeight: 'bold', fontSize: 16 }
// // });

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Alert, StyleSheet } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import client from '../api/client';

// export default function DriverDashboard() {
//   const [bins, setBins] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(fetchBins, 3000); // Live Updates
//     return () => clearInterval(interval);
//   }, []);

//   const fetchBins = async () => {
//     try {
//       const res = await client.get('/bins');
//       setBins(res.data);
//     } catch(err) { console.log(err); }
//   };

//   const collectGarbage = async (binId) => {
//     await client.post('/bins/mark-empty', { binId });
//     Alert.alert("Collected!", "Bin is now empty.");
//     fetchBins();
//   };

//   const fullBins = bins.filter(b => b.status === 'FULL');

//   // Dummy Driver Location for Polyline Demo
//   const driverLoc = { latitude: 19.0760, longitude: 72.8777 };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: 19.0760, longitude: 72.8777,
//           latitudeDelta: 0.05, longitudeDelta: 0.05,
//         }}
//       >
//         <Marker coordinate={driverLoc} title="My Truck" pinColor="blue" />
        
//         {bins.map(bin => (
//           <Marker
//             key={bin._id}
//             coordinate={{ latitude: bin.location.lat, longitude: bin.location.lng }}
//             pinColor={bin.status === 'FULL' ? 'red' : 'green'}
//             title={`Bin ${bin.binId}`}
//             onCalloutPress={() => bin.status === 'FULL' && collectGarbage(bin.binId)}
//           />
//         ))}

//         {/* Shortest Path Visualization (Star Topology) */}
//         {fullBins.map(bin => (
//              <Polyline 
//                 key={bin._id}
//                 coordinates={[driverLoc, { latitude: bin.location.lat, longitude: bin.location.lng }]}
//                 strokeColor="black" strokeWidth={3}
//              />
//         ))}
//       </MapView>
//       <View style={{ padding: 20, backgroundColor: 'white' }}>
//          <Text style={{ fontWeight: 'bold' }}>🚛 Route Optimization Active</Text>
//          <Text>Tap on RED bins to collect them.</Text>
//       </View>
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import client from '../api/client';

export default function DriverDashboard() {
  const [bins, setBins] = useState([]);

  // POLL SERVER EVERY 2 SECONDS
  useEffect(() => {
    fetchBins(); // Run once immediately
    const interval = setInterval(fetchBins, 2000); // Run loop
    return () => clearInterval(interval); // Cleanup on exit
  }, []);

  const fetchBins = async () => {
    try {
      const res = await client.get('/bins');
      setBins(res.data);
    } catch (err) {
      console.log("Map Fetch Error:", err);
    }
  };

  const collectBin = async (binId) => {
    try {
      await client.post('/bins/mark-empty', { binId });
      Alert.alert("Collected!", `Bin ${binId} is now empty.`);
      fetchBins(); // Refresh immediately
    } catch (err) {
      Alert.alert("Error", "Failed to update server");
    }
  };

  // Filter for Red Bins
  const fullBins = bins.filter(b => b.status === 'FULL');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.0760, longitude: 72.8777, // Mumbai Center
          latitudeDelta: 0.05, longitudeDelta: 0.05,
        }}
      >
        {/* Draw all bins */}
        {bins.map((bin) => (
          <Marker
            key={bin._id}
            coordinate={{ latitude: bin.location.lat, longitude: bin.location.lng }}
            pinColor={bin.status === 'FULL' ? 'red' : 'green'}
            title={`Bin ${bin.binId}`}
            description={bin.status === 'FULL' ? "Tap to Collect" : "Empty"}
            onCalloutPress={() => {
              if (bin.status === 'FULL') collectBin(bin.binId);
            }}
          />
        ))}

        {/* Draw Route Line */}
        {fullBins.length > 0 && (
           <Polyline
             coordinates={fullBins.map(b => ({ latitude: b.location.lat, longitude: b.location.lng }))}
             strokeColor="black"
             strokeWidth={3}
           />
        )}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.text}>🚚 Active Pickups: {fullBins.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: 'white', padding: 15, borderRadius: 20, elevation: 5 },
  text: { fontWeight: 'bold', fontSize: 16 }
});