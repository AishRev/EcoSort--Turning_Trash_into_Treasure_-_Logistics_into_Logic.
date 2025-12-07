// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
// import client from '../api/client';

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('worker');

//   useEffect(() => { fetchUsers(); }, []);

//   const fetchUsers = async () => {
//     try {
//         const res = await client.get('/admin/users');
//         setUsers(res.data);
//     } catch(e) { console.log(e); }
//   };

//   const addStaff = async () => {
//     await client.post('/admin/add-user', { username: name, role });
//     Alert.alert("Success", "Staff Added");
//     fetchUsers();
//     setName('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>👥 Staff Management</Text>
      
//       {/* Add Staff Form */}
//       <View style={styles.form}>
//         <TextInput placeholder="Staff Name" style={styles.input} value={name} onChangeText={setName} />
//         <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
//             <Button title="Worker" onPress={() => setRole('worker')} color={role === 'worker' ? 'blue' : 'gray'} />
//             <Button title="Driver" onPress={() => setRole('driver')} color={role === 'driver' ? 'orange' : 'gray'} />
//         </View>
//         <Button title="Add Staff Member" onPress={addStaff} />
//       </View>

//       {/* List */}
//       <FlatList
//         data={users}
//         keyExtractor={item => item._id}
//         renderItem={({item}) => (
//           <View style={styles.item}>
//             <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.username}</Text>
//             <Text style={{color: 'gray'}}>Role: {item.role.toUpperCase()}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   form: { backgroundColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 20 },
//   input: { backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 5 },
//   item: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' }
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import client from '../api/client';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('worker'); // Default role

  // Load users on startup
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await client.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const handleAddUser = async () => {
    if (!name) return Alert.alert("Error", "Enter a name");
    
    try {
      // Send to Server
      await client.post('/admin/add-user', { username: name, role: role });
      Alert.alert("Success", `${name} added as ${role}`);
      setName(''); // Clear input
      fetchUsers(); // Refresh list
    } catch (err) {
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel 👮‍♂️</Text>

      {/* ADD STAFF FORM */}
      <View style={styles.card}>
        <Text style={styles.label}>Add New Staff:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Name (e.g. Ramesh)" 
          value={name} 
          onChangeText={setName} 
        />
        
        <View style={styles.row}>
          <Button 
            title="Worker" 
            color={role === 'worker' ? 'blue' : 'gray'} 
            onPress={() => setRole('worker')} 
          />
          <View style={{width: 10}} />
          <Button 
            title="Driver" 
            color={role === 'driver' ? 'orange' : 'gray'} 
            onPress={() => setRole('driver')} 
          />
        </View>
        <Text style={{marginVertical: 10}}>Selected Role: {role.toUpperCase()}</Text>
        
        <Button title="✅ Save Staff Member" onPress={handleAddUser} />
      </View>

      {/* LIST */}
      <Text style={styles.label}>Current Staff:</Text>
      <FlatList
        data={users}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={{fontWeight: 'bold'}}>{item.username}</Text>
            <Text style={{color: 'gray'}}>{item.role.toUpperCase()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  row: { flexDirection: 'row', marginBottom: 5 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  listItem: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' }
});