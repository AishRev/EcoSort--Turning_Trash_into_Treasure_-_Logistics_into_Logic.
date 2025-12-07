# ♻️ EcoSort: Smart Waste Management Automation
### Turning Trash into Treasure & Logistics into Logic

EcoSort is an **AI-powered Smart City solution** that optimizes waste collection, enforces waste segregation, and digitizes the sanitation workforce.  
It bridges the gap between **Citizens**, **Sanitation Workers (Safai Mitras)**, and **Municipal Logistics (Drivers)** using **AI**, **IoT-simulation**, and **Real-Time Geolocation**.

---

## 🌟 Key Features (By Role)

---

### 🏠 1. Resident (Citizen) – Gamified Segregation

- 🤖 **AI Waste Scanner**  
  Uses a MobileNetV2 Deep Learning model to identify waste types (Wet vs. Dry) in real-time.

- 📸 **Report a Mess**  
  Capture photos of illegal dumping spots. Automatically geo-tagged & forwarded to ground staff.

- 🏆 **Eco-Points System**  
  Users earn points for verifying proper disposal (Gamification).

---

### 🧹 2. Sanitation Worker (Safai Mitra) – Ground Intelligence

- 📲 **QR Code “Human Sensor”**  
  Simulates IoT sensors by allowing workers to scan bin QR codes to mark them as **FULL**.

- ✅ **Task Verification**  
  Workers verify citizen complaints to filter spam.

- 📍 **Manual Reporting**  
  Allows manual Bin ID entry if scanning fails.

---

### 🚛 3. Garbage Collector (Driver) – Logistics Optimization

- 🗺️ **Live Route Map**  
  Shows only the full bins (red markers) on Google Maps.

- ⚡ **Dynamic Routing**  
  Auto-generates the shortest pickup path using polylines.

- 🚛 **One-Tap Collection**  
  Drivers tap a bin to mark it **Empty**, resetting the cycle.

---

### 👨‍💼 4. BMC Admin – Command Center

- 👥 **Staff Management**  
  Add/manage Workers & Drivers.

- 📊 **Live Dashboard**  
  Monitor all staff and active bin statuses in real-time.

---

## 🏗️ Technical Architecture

| Component       | Tech Stack                | Description |
|----------------|---------------------------|-------------|
| **Mobile App** | React Native (Expo)       | Cross-platform app with 4 Role Modes. |
| **Backend**    | Node.js + Express         | REST API handling Users, Bins, and Reports. |
| **Database**   | MongoDB (Atlas/Local)     | Stores Bin Status, Geolocation, and User Data. |
| **AI Engine**  | Python (Flask + TensorFlow) | Hosts MobileNetV2 for image classification. |
| **Maps**       | React Native Maps         | Visualization of bins and routes. |

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js & npm installed  
- Python 3.8+ installed  
- MongoDB installed or Atlas URI ready  
- Expo Go App installed on your mobile phone  

---

### 1️⃣ Backend Setup (Node.js)

```bash
cd server
npm install

# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string

```

Expected Output:
✅ MongoDB Connected

2️⃣ AI Service Setup (Python)
cd ai-service
pip install -r requirements.txt
python app.py


Expected Output:
Running on http://0.0.0.0:5001

3️⃣ Mobile App Setup (React Native)
cd mobile-app
npm install
npx expo start --clear


Scan the QR code using Expo Go.

### 🧠 AI Model Training

We utilize Transfer Learning with MobileNetV2 for rapid and accurate waste classification.

Dataset: Kaggle Waste Classification Dataset (22,500+ images)

Classes: Organic vs Recyclable

Training: 10 epochs

Accuracy: ~90%

Optimized for: Low-latency CPU inference using Flask

### 🛡️ Hackathon “Survival Mode”

Built to ensure zero app crashes during demonstrations.

Offline Mocking:
The client uses an intelligent interceptor that switches automatically to Demo Mode if the backend server or internet fails.

Tunneling Support:
Fully compatible with ngrok to bypass college/venue firewalls.

📱 How to Demo (Walkthrough)
1. Start App → Choose Role
2. Admin Flow

Go to Admin

Add a new Staff Member (e.g., “Raju”)

3. Sanitation Worker Flow

Select Sanitation Worker

Tap Scan QR

Confirm action → Mark Full

4. Driver Flow

Select Garbage Driver

View Map → See Red Pin (bin marked full)

Tap pin → Collect → Pin turns Green

5. Resident Flow

Select Resident

Take a photo of a waste item

AI predicts:
“Dry Waste – Blue Bin” or “Wet Waste – Green Bin”

### 🔮 Future Scope

IoT Hardware Upgrade: Replace QR scanning with Ultrasonic Sensors (HC-SR04).

Blockchain Rewards: Eco-Points exchanged for tokenized rewards.

Predictive Analytics: Forecast high-waste zones using ML models.


