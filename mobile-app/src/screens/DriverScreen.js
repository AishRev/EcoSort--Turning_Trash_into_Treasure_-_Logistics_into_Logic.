import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

// ⚠️ REPLACE WITH YOUR LAPTOP'S LOCAL IP (e.g., 192.168.1.5)
// Do NOT use localhost (Android/iOS simulator won't see it)
const API_URL = 'http://192.168.56.1:5000/api/bins/all'; 

export default function DriverScreen() {
  const [bins, setBins] = useState([]);

  // Poll server every 2 seconds to check for "Full" bins
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const res = await axios.get(API_URL);
        setBins(res.data);
      } catch (err) {
        console.log("Network Error:", err);
      }
    };
    fetchBins(); // Initial fetch
    const interval = setInterval(fetchBins, 2000); // Poll loop
    return () => clearInterval(interval);
  }, []);

  const fullBins = bins.filter(b => b.status === 'FULL');

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 19.0760, 
          longitude: 72.8777,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {bins.map((bin) => (
          <Marker
            key={bin._id}
            coordinate={{ latitude: bin.location.lat, longitude: bin.location.lng }}
            // Green if EMPTY, Red if FULL
            pinColor={bin.status === 'FULL' ? 'red' : 'green'} 
            title={`Bin ${bin.binId}`}
          />
        ))}

        {/* Draw line connecting ONLY full bins */}
        {fullBins.length > 0 && (
           <Polyline
             coordinates={fullBins.map(b => ({ latitude: b.location.lat, longitude: b.location.lng }))}
             strokeColor="black"
             strokeWidth={4}
           />
        )}
      </MapView>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>🚛 Pickup Route: {fullBins.length} Stops</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  infoBox: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: 'white', padding: 15, borderRadius: 20, elevation: 5 },
  infoText: { fontWeight: 'bold', fontSize: 16 }
});