// import axios from 'axios';

// // REPLACE '192.168.X.X' WITH YOUR IP ADDRESS (Run 'ipconfig' or 'ifconfig')
// const IP_ADDRESS = '192.168.56.1'; 

// export default axios.create({
//   baseURL: `http://192.168.56.1:5000/api`
// });
import axios from 'axios';
import { Alert } from 'react-native';

// ⚠️ TRY YOUR IP, BUT WE HAVE A BACKUP PLAN NOW
const IP_ADDRESS = '192.168.56.1'; // Change to your current IP if you know it
const BASE_URL = `http://${IP_ADDRESS}:5000/api`;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 2000 // If server takes > 2 seconds, assume it's broken and use Mock Data
});

// --- THE MAGIC INTERCEPTOR ---
// This catches "Network Error" and returns Fake Data instead of crashing
client.interceptors.response.use(
  response => response,
  async error => {
    console.log("⚠️ Backend unreachable. Switching to DEMO MODE.");
    
    // MOCK RESPONSES FOR DEMO
    const url = error.config.url;
    
    // 1. Mock "Get Users"
    if (url.includes('/admin/users') && error.config.method === 'get') {
        return { data: [
            { _id: '1', username: 'Raju (Demo)', role: 'worker' },
            { _id: '2', username: 'Ramesh (Demo)', role: 'driver' }
        ]};
    }

    // 2. Mock "Add User"
    if (url.includes('/admin/add-user')) {
        return { data: { message: "User Added (Mock)" } };
    }

    // 3. Mock "Mark Bin Full"
    if (url.includes('/bins/mark-full')) {
        return { data: { message: "Bin Marked Full (Mock)" } };
    }

    // 4. Mock "Get Bins" (Driver Map)
    if (url.includes('/bins') && error.config.method === 'get') {
        return { data: [
            { 
                _id: '101', 
                binId: '101', 
                location: { lat: 19.0760, lng: 72.8777 }, // Dadar
                status: 'FULL' 
            },
            { 
                _id: '102', 
                binId: '102', 
                location: { lat: 19.0800, lng: 72.8800 }, // Shivaji Park
                status: 'EMPTY' 
            }
        ]};
    }

    // 5. Mock "Collect Bin"
    if (url.includes('/bins/mark-empty')) {
        return { data: { message: "Bin Collected (Mock)" } };
    }

    // If we can't mock it, reject it
    return Promise.reject(error);
  }
);

export default client;