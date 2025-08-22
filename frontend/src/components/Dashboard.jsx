import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Pill, User, TrendingUp, Heart, Activity, Weight, Clock, Plus, Trash2, Bell, Upload, Shield, Watch, History, MessageSquare, Star, Eye, Thermometer, Droplets, Zap, Moon, Sun, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [bmiData, setBmiData] = useState({ height: '', weight: '', result: null });
    const [pills, setPills] = useState([
        { id: 1, name: 'Vitamin D', time: '08:00', frequency: 'Daily', taken: false },
        { id: 2, name: 'Blood Pressure Med', time: '12:00', frequency: 'Twice Daily', taken: true },
        { id: 3, name: 'Calcium', time: '20:00', frequency: 'Daily', taken: false }
    ]);
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Diabetes Awareness', date: '2025-08-20', status: 'upcoming', type: 'screening' },
        { id: 2, name: 'Heart Health Check', date: '2025-08-25', status: 'upcoming', type: 'checkup' },
        { id: 3, name: 'Mental Wellness Week', date: '2025-09-01', status: 'scheduled', type: 'workshop' },
        { id: 4, name: 'Blood Donation Drive', date: '2025-07-15', status: 'completed', type: 'donation' },
        { id: 5, name: 'Eye Checkup Camp', date: '2025-06-20', status: 'completed', type: 'screening' }
    ]);

    const [personalDetails, setPersonalDetails] = useState({
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

    // Wearable data
    const wearableData = {
        heartRate: { current: 72, resting: 65, max: 185 },
        steps: { today: 8247, goal: 10000, weekly: 52341 },
        calories: { burned: 324, goal: 400 },
        sleep: { hours: 7.2, quality: 'Good' },
        bodyTemp: { current: 98.6, normal: true },
        oxygenSat: { current: 98, normal: true },
        stress: { level: 'Low', score: 25 },
        hydration: { current: 6, goal: 8 },
        bloodPressure: { systolic: 120, diastolic: 80 },
        activeMinutes: { today: 45, goal: 30 }
    };

    // Health history data
    const healthHistory = [
        { date: '2025-08-10', type: 'Prescription', doctor: 'Dr. Sharma', condition: 'Hypertension' },
        { date: '2025-07-25', type: 'Lab Report', test: 'Blood Sugar', result: 'Normal' },
        { date: '2025-07-15', type: 'Checkup', doctor: 'Dr. Patel', notes: 'Routine checkup' },
        { date: '2025-06-30', type: 'Prescription', doctor: 'Dr. Kumar', condition: 'Vitamin D deficiency' }
    ];

    // Service history
    const serviceHistory = [
        { date: '2025-08-15', service: 'Telemedicine Consultation', doctor: 'Dr. Mehta', status: 'completed' },
        { date: '2025-08-10', service: 'Health Analytics Report', type: 'Monthly Report', status: 'generated' },
        { date: '2025-08-05', service: 'Pill Reminder Setup', medications: '3 medications', status: 'active' },
        { date: '2025-07-28', service: 'BMI Tracking', result: 'Normal range', status: 'completed' }
    ];

    // Feedback history
    const feedbackHistory = [
        { date: '2025-08-12', rating: 5, service: 'Telemedicine', comment: 'Excellent consultation experience' },
        { date: '2025-08-05', rating: 4, service: 'Analytics', comment: 'Very helpful insights' },
        { date: '2025-07-20', rating: 5, service: 'Pill Reminder', comment: 'Never miss medications now' },
        { date: '2025-07-10', rating: 4, service: 'Campaign Registration', comment: 'Easy to register' }
    ];

    // Chart data
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
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <p className="text-lg text-slate-600">Loading dashboard...</p>
            </div>
        );
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
                {/* Header */}
                <div className="mb-6">
                    <p className="text-lg text-blue-950 font-bold">Monitor your health journey and stay on track</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <TabButton id="profile" label="Profile" icon={User} />
                    <TabButton id="health-history" label="Health History" icon={Activity} />
                    <TabButton id="wearables" label="Wearables" icon={Watch} />
                    <TabButton id="pills" label="Pill Reminder" icon={Pill} />
                    <TabButton id="bmi" label="BMI Calculator" icon={Weight} />
                    <TabButton id="campaigns" label="Campaigns" icon={Calendar} />
                    <TabButton id="history" label="App History" icon={History} />
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Full Name</h3>
                                    <p className="text-base text-slate-800">{personalDetails.name}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Age</h3>
                                    <p className="text-base text-slate-800">{personalDetails.age} years</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Gender</h3>
                                    <p className="text-base text-slate-800">{personalDetails.gender}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Blood Group</h3>
                                    <p className="text-base text-slate-800">{personalDetails.bloodGroup}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Height</h3>
                                    <p className="text-base text-slate-800">{personalDetails.height}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Weight</h3>
                                    <p className="text-base text-slate-800">{personalDetails.weight}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">ABHA ID</h3>
                                    <p className="text-base text-slate-800">{personalDetails.abhaId}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Email</h3>
                                    <p className="text-base text-slate-800">{personalDetails.email}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Emergency Contact</h3>
                                    <p className="text-base text-slate-800">{personalDetails.emergencyContact}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'health-history' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Health History & Analytics</h2>

                            {/* Upload and ABHA Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50">
                                    <Upload className="mx-auto mb-2 text-slate-500" size={32} />
                                    <h3 className="text-sm font-medium text-slate-700 mb-2">Upload Prescriptions</h3>
                                    <p className="text-xs text-slate-500 mb-3">Upload your medical prescriptions and reports</p>
                                    <button className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition-colors">
                                        Choose Files
                                    </button>
                                </div>
                                <div className="p-4 border border-slate-300 rounded-lg bg-slate-50">
                                    <Shield className="mb-2 text-slate-600" size={32} />
                                    <h3 className="text-sm font-medium text-slate-700 mb-2">ABHA Profile Integration</h3>
                                    <p className="text-xs text-slate-500 mb-3">Connect with your ABHA profile to fetch medical history</p>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                                        Fetch from ABHA
                                    </button>
                                </div>
                            </div>

                            {/* Medical History */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-slate-700">Medical History</h3>
                                <div className="space-y-3">
                                    {healthHistory.map((record, index) => (
                                        <div key={index} className="p-3 border border-slate-200 rounded-md bg-slate-50">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">{record.type}</p>
                                                    <p className="text-xs text-slate-600">
                                                        {record.doctor && `Dr. ${record.doctor} • `}
                                                        {record.condition || record.test || record.notes}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-slate-500">{record.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Analytics Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold mb-3 text-blue-900">Heart Rate Today</h3>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <AreaChart data={heartRateData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="rate" stroke="#1d3878" fill="#87b6f5" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold mb-3 text-blue-900">Weekly Sleep Quality</h3>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart data={sleepData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Bar dataKey="quality" fill="#8b6cf0" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'wearables' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Wearable Device Data</h2>

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Heart className="text-red-600" size={20} />
                                        <span className="text-xs text-red-600 font-medium">BPM</span>
                                    </div>
                                    <p className="text-lg font-semibold text-red-700">{wearableData.heartRate.current}</p>
                                    <p className="text-xs text-red-600">Heart Rate</p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity className="text-blue-600" size={20} />
                                        <span className="text-xs text-blue-600 font-medium">Steps</span>
                                    </div>
                                    <p className="text-lg font-semibold text-blue-700">{wearableData.steps.today.toLocaleString()}</p>
                                    <p className="text-xs text-blue-600">Today</p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Zap className="text-orange-600" size={20} />
                                        <span className="text-xs text-orange-600 font-medium">Cal</span>
                                    </div>
                                    <p className="text-lg font-semibold text-orange-700">{wearableData.calories.burned}</p>
                                    <p className="text-xs text-orange-600">Calories</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Moon className="text-purple-600" size={20} />
                                        <span className="text-xs text-purple-600 font-medium">Hrs</span>
                                    </div>
                                    <p className="text-lg font-semibold text-purple-700">{wearableData.sleep.hours}</p>
                                    <p className="text-xs text-purple-600">Sleep</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Thermometer className="text-green-600" size={20} />
                                        <span className="text-xs text-green-600 font-medium">°F</span>
                                    </div>
                                    <p className="text-lg font-semibold text-green-700">{wearableData.bodyTemp.current}</p>
                                    <p className="text-xs text-green-600">Body Temp</p>
                                </div>
                            </div>

                            {/* Additional Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Droplets className="text-slate-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Blood Pressure</span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-800">
                                        {wearableData.bloodPressure.systolic}/{wearableData.bloodPressure.diastolic} mmHg
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Target className="text-slate-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Oxygen Saturation</span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-800">{wearableData.oxygenSat.current}%</p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Sun className="text-slate-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Active Minutes</span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-800">{wearableData.activeMinutes.today} min</p>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold mb-3 text-slate-700">Weekly Steps</h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={weeklyStepsData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Bar dataKey="steps" fill="#1d3878" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold mb-3 text-slate-700">Sleep Hours</h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={sleepData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="hours" stroke="#4526ab" strokeWidth={2} dot={{ fill: '#475569' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pills' && (
                        <div>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-semibold text-slate-800">Pill Reminder</h2>
                                <button className="bg-blue-900 text-white px-3 py-2 rounded-md hover:bg-slate-800 transition-colors flex items-center space-x-2 text-sm">
                                    <Plus size={16} />
                                    <span>Add Pill</span>
                                </button>
                            </div>
                            <div className="space-y-3">
                                {pills.map(pill => (
                                    <div key={pill.id} className={`p-4 border rounded-lg ${pill.taken ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => togglePill(pill.id)}
                                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pill.taken ? 'bg-green-600 border-green-600' : 'border-slate-300'
                                                        }`}
                                                >
                                                    {pill.taken && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </button>
                                                <div>
                                                    <h3 className="text-sm font-medium text-slate-800">{pill.name}</h3>
                                                    <p className="text-xs text-slate-600">{pill.frequency}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-1 text-slate-600">
                                                    <Clock size={14} />
                                                    <span className="text-xs">{pill.time}</span>
                                                </div>
                                                <Bell size={14} className="text-slate-500" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'bmi' && (
                        <div className="max-w-md mx-auto">
                            <h2 className="text-xl font-semibold mb-5 text-center text-slate-800">BMI Calculator</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={bmiData.height}
                                        onChange={(e) => setBmiData(prev => ({ ...prev, height: e.target.value }))}
                                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                        placeholder="Enter height in cm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={bmiData.weight}
                                        onChange={(e) => setBmiData(prev => ({ ...prev, weight: e.target.value }))}
                                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                        placeholder="Enter weight in kg"
                                    />
                                </div>
                                <button
                                    onClick={calculateBMI}
                                    className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                                >
                                    Calculate BMI
                                </button>
                                {bmiData.result && (
                                    <div className="mt-6 p-4 bg-slate-50 rounded-md text-center border border-slate-200">
                                        <p className="text-xl font-semibold text-slate-700">{bmiData.result.bmi}</p>
                                        <p className="text-sm text-slate-600">{bmiData.result.category}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'campaigns' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Health Campaigns</h2>

                            {/* Upcoming Campaigns */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium mb-4 text-slate-700">Upcoming Campaigns</h3>
                                <div className="grid gap-4">
                                    {campaigns.filter(campaign => campaign.status === 'upcoming').map(campaign => (
                                        <div key={campaign.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium text-slate-800">{campaign.name}</h4>
                                                    <p className="text-sm text-slate-600">
                                                        {new Date(campaign.date).toLocaleDateString()} • {campaign.type}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="bg-slate-700 text-white px-3 py-1 rounded text-xs hover:bg-slate-800 transition-colors">
                                                        registered
                                                    </button>
                                                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                                                        {campaign.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Campaign History */}
                            <div>
                                <h3 className="text-lg font-medium mb-4 text-slate-700">Campaign History</h3>
                                <div className="grid gap-4">
                                    {campaigns.filter(campaign => campaign.status === 'completed').map(campaign => (
                                        <div key={campaign.id} className="p-4 border border-slate-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium text-slate-800">{campaign.name}</h4>
                                                    <p className="text-sm text-slate-600">
                                                        {new Date(campaign.date).toLocaleDateString()} • {campaign.type}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                                        {campaign.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">App History</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Feedback History */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <MessageSquare className="text-slate-600" size={20} />
                                        <h3 className="text-lg font-medium text-slate-700">Feedback History</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {feedbackHistory.map((feedback, index) => (
                                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">{feedback.service}</p>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {Array.from({ length: 5 }, (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={12}
                                                                    className={`${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-slate-500">{feedback.date}</span>
                                                </div>
                                                <p className="text-xs text-slate-600">{feedback.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Service History */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <History className="text-slate-600" size={20} />
                                        <h3 className="text-lg font-medium text-slate-700">Service Usage History</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {serviceHistory.map((service, index) => (
                                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">{service.service}</p>
                                                        <p className="text-xs text-slate-600">
                                                            {service.doctor && `${service.doctor} • `}
                                                            {service.type || service.medications || service.result}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-slate-500">{service.date}</span>
                                                        <div className="mt-1">
                                                            <span className={`px-2 py-1 rounded text-xs ${service.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                service.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-slate-100 text-slate-800'
                                                                }`}>
                                                                {service.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;