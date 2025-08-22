import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Pill, User, Activity, Weight, Clock, Plus, Bell, Upload, Shield, History, MessageSquare, Star, Heart, Zap, Moon, Sun, Target, Thermometer, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from "axios";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [bmiData, setBmiData] = useState({ height: '', weight: '', result: null });

  const [prescriptions, setPrescriptions] = useState([]);

  const profileId = user?.uid || "demo_profile_id"; // 👈 Replace with real profile id

  // ---- Prescription handling ----
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please choose a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("profile_id", profileId);

    // debug
    console.log("Uploading:", selectedFile?.name, "profile_id=", profileId);

    try {
      // remove manual Content-Type header so browser sets boundary
      await axios.post("http://127.0.0.1:8000/upload-prescription", formData);
      alert("Uploaded successfully!");
      fetchPrescriptions();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/list-prescriptions/${profileId}`);
      setPrescriptions(res.data);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [profileId]);

  // ---- Rest of your states (pills, campaigns, personalDetails, charts, etc.) ----
  const [pills, setPills] = useState([
    { id: 1, name: 'Vitamin D', time: '08:00', frequency: 'Daily', taken: false },
    { id: 2, name: 'Blood Pressure Med', time: '12:00', frequency: 'Twice Daily', taken: true },
    { id: 3, name: 'Calcium', time: '20:00', frequency: 'Daily', taken: false }
  ]);

  const [campaigns] = useState([
    { id: 1, name: 'Diabetes Awareness', date: '2025-08-20', status: 'upcoming', type: 'screening' },
    { id: 2, name: 'Heart Health Check', date: '2025-08-25', status: 'upcoming', type: 'checkup' },
    { id: 3, name: 'Mental Wellness Week', date: '2025-09-01', status: 'scheduled', type: 'workshop' },
    { id: 4, name: 'Blood Donation Drive', date: '2025-07-15', status: 'completed', type: 'donation' },
    { id: 5, name: 'Eye Checkup Camp', date: '2025-06-20', status: 'completed', type: 'screening' }
  ]);

  const [personalDetails] = useState({
    name: 'Ajay Agarwal',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    height: '175 cm',
    weight: '70 kg',
    emergencyContact: '+91 98765 43210',
    abhaId: 'ABHA-1234-5678-9012',
    email: 'ajay.agarwal@email.com',
    address: 'Mumbai, Maharashtra'
  });

  const healthHistory = [
    { date: '2025-08-10', type: 'Prescription', doctor: 'Dr. Sharma', condition: 'Hypertension' },
    { date: '2025-07-25', type: 'Lab Report', test: 'Blood Sugar', result: 'Normal' },
    { date: '2025-07-15', type: 'Checkup', doctor: 'Dr. Patel', notes: 'Routine checkup' },
    { date: '2025-06-30', type: 'Prescription', doctor: 'Dr. Kumar', condition: 'Vitamin D deficiency' }
  ];

  const serviceHistory = [
    { date: '2025-08-15', service: 'Telemedicine Consultation', doctor: 'Dr. Mehta', status: 'completed' },
    { date: '2025-08-10', service: 'Health Analytics Report', type: 'Monthly Report', status: 'generated' },
    { date: '2025-08-05', service: 'Pill Reminder Setup', medications: '3 medications', status: 'active' },
    { date: '2025-07-28', service: 'BMI Tracking', result: 'Normal range', status: 'completed' }
  ];

  const feedbackHistory = [
    { date: '2025-08-12', rating: 5, service: 'Telemedicine', comment: 'Excellent consultation experience' },
    { date: '2025-08-05', rating: 4, service: 'Analytics', comment: 'Very helpful insights' },
    { date: '2025-07-20', rating: 5, service: 'Pill Reminder', comment: 'Never miss medications now' },
    { date: '2025-07-10', rating: 4, service: 'Campaign Registration', comment: 'Easy to register' }
  ];

  const heartRateData = [
    { time: '06:00', rate: 65 }, { time: '09:00', rate: 78 }, { time: '12:00', rate: 85 },
    { time: '15:00', rate: 82 }, { time: '18:00', rate: 90 }, { time: '21:00', rate: 72 }
  ];

  const weeklyStepsData = [
    { day: 'Mon', steps: 8500, calories: 320 },
    { day: 'Tue', steps: 6200, calories: 280 },
    { day: 'Wed', steps: 9800, calories: 380 },
    { day: 'Thu', steps: 7200, calories: 290 },
    { day: 'Fri', steps: 8900, calories: 340 },
    { day: 'Sat', steps: 12000, calories: 450 },
    { day: 'Sun', steps: 5500, calories: 220 }
  ];

  const sleepData = [
    { day: 'Mon', hours: 7.5, quality: 85 },
    { day: 'Tue', hours: 6.8, quality: 72 },
    { day: 'Wed', hours: 8.2, quality: 92 },
    { day: 'Thu', hours: 7.1, quality: 78 },
    { day: 'Fri', hours: 6.5, quality: 68 },
    { day: 'Sat', hours: 8.5, quality: 95 },
    { day: 'Sun', hours: 7.8, quality: 88 }
  ];

  const calculateBMI = () => {
    const height = parseFloat(bmiData.height) / 100;
    const weight = parseFloat(bmiData.weight);
    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setBmiData(prev => ({ ...prev, result: { bmi: bmi.toFixed(1), category } }));
    }
  };

  const togglePill = (id) => {
    setPills(pills.map(pill =>
      pill.id === id ? { ...pill, taken: !pill.taken } : pill
    ));
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-all text-base ${activeTab === id
        ? 'bg-blue-800 text-white shadow-md'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
    >
      <Icon size={16} />
      <span className="font-medium">{label}</span>
    </button>
  );

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-slate-50">
      <p className="text-lg text-slate-600">Loading dashboard...</p>
    </div>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center p-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
          <p className="text-slate-600">Please <Link to="/login" className="font-medium text-blue-600 hover:underline">log in</Link> to the site to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 mt-30">
      <div className="max-w-7xl mx-auto">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <TabButton id="profile" label="Profile" icon={User} />
          <TabButton id="health-history" label="Health History" icon={Activity} />
          <TabButton id="wearables" label="Wearables" icon={Heart} />
          <TabButton id="pills" label="Pill Reminder" icon={Pill} />
          <TabButton id="bmi" label="BMI Calculator" icon={Weight} />
          <TabButton id="campaigns" label="Campaigns" icon={Calendar} />
          <TabButton id="history" label="App History" icon={History} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
          {activeTab === 'health-history' && (
            <div>
              <h2 className="text-xl font-semibold mb-5 text-slate-800">Health History & Prescriptions</h2>

              {/* Upload */}
              <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50 mb-6">
                <Upload className="mx-auto mb-2 text-slate-500" size={32} />
                <h3 className="text-sm font-medium text-slate-700 mb-2">Upload Prescription</h3>
                <input type="file" onChange={handleFileChange} className="mb-3" />
                <button
                  onClick={handleUpload}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition-colors"
                >
                  Upload File
                </button>
              </div>

              {/* Prescriptions list */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 text-slate-700">Your Prescriptions</h3>
                {prescriptions.length === 0 ? (
                  <p className="text-sm text-slate-500">No prescriptions uploaded yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {prescriptions.map((p, idx) => (
                      <li key={idx} className="p-3 border border-slate-200 rounded-md bg-slate-50 flex justify-between">
                        <span>{p.file_name} ({new Date(p.uploaded_at).toLocaleDateString()})</span>
                        <a
                          href={`http://127.0.0.1:8000/get-prescription/${p.file_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {/* ... keep your other tabs (profile, wearables, pills, bmi, campaigns, history) same as before ... */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
