import React, { useState, useEffect } from 'react';
import { Calendar, Pill, User, TrendingUp, Heart, Activity, Weight, Clock, Plus, Trash2, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [bmiData, setBmiData] = useState({ height: '', weight: '', result: null });
    const [pills, setPills] = useState([
        { id: 1, name: 'Vitamin D', time: '08:00', frequency: 'Daily', taken: false },
        { id: 2, name: 'Blood Pressure Med', time: '12:00', frequency: 'Twice Daily', taken: true },
        { id: 3, name: 'Calcium', time: '20:00', frequency: 'Daily', taken: false }
    ]);
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Diabetes Awareness', date: '2025-08-20', status: 'upcoming' },
        { id: 2, name: 'Heart Health Check', date: '2025-08-25', status: 'upcoming' },
        { id: 3, name: 'Mental Wellness Week', date: '2025-09-01', status: 'scheduled' }
    ]);
    const [personalDetails, setPersonalDetails] = useState({
        name: 'Ajay Agarwal',
        age: 32,
        gender: 'Male',
        bloodGroup: 'O+',
        height: '175 cm',
        weight: '70 kg',
        emergencyContact: '+91 98765 43210'
    });

    // Health tracking data
    const weightData = [
        { month: 'Jan', weight: 72 },
        { month: 'Feb', weight: 71.5 },
        { month: 'Mar', weight: 70.8 },
        { month: 'Apr', weight: 70.2 },
        { month: 'May', weight: 69.8 },
        { month: 'Jun', weight: 70.1 },
        { month: 'Jul', weight: 70.0 },
        { month: 'Aug', weight: 70.2 }
    ];

    const activityData = [
        { day: 'Mon', steps: 8500, calories: 320 },
        { day: 'Tue', steps: 6200, calories: 280 },
        { day: 'Wed', steps: 9800, calories: 380 },
        { day: 'Thu', steps: 7200, calories: 290 },
        { day: 'Fri', steps: 8900, calories: 340 },
        { day: 'Sat', steps: 12000, calories: 450 },
        { day: 'Sun', steps: 5500, calories: 220 }
    ];

    const healthMetrics = [
        { name: 'Excellent', value: 35, color: '#10B981' },
        { name: 'Good', value: 45, color: '#3B82F6' },
        { name: 'Average', value: 15, color: '#F59E0B' },
        { name: 'Poor', value: 5, color: '#EF4444' }
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
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeTab === id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
        >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Dashboard</h1>
                    <p className="text-gray-600">Monitor your health journey and stay on track</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <TabButton id="overview" label="Overview" icon={TrendingUp} />
                    <TabButton id="bmi" label="BMI Calculator" icon={Weight} />
                    <TabButton id="pills" label="Pill Reminder" icon={Pill} />
                    <TabButton id="campaigns" label="Campaigns" icon={Calendar} />
                    <TabButton id="profile" label="Personal Details" icon={User} />
                    <TabButton id="charts" label="Health Tracking" icon={Activity} />
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100">Current Weight</p>
                                        <p className="text-2xl font-bold">70.2 kg</p>
                                    </div>
                                    <Weight className="text-blue-200" size={32} />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100">Pills Today</p>
                                        <p className="text-2xl font-bold">1/3</p>
                                    </div>
                                    <Pill className="text-green-200" size={32} />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100">Steps Today</p>
                                        <p className="text-2xl font-bold">8,247</p>
                                    </div>
                                    <Activity className="text-purple-200" size={32} />
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-red-100">Heart Rate</p>
                                        <p className="text-2xl font-bold">72 BPM</p>
                                    </div>
                                    <Heart className="text-red-200" size={32} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bmi' && (
                        <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-bold mb-6 text-center">BMI Calculator</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={bmiData.height}
                                        onChange={(e) => setBmiData(prev => ({ ...prev, height: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter height in cm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={bmiData.weight}
                                        onChange={(e) => setBmiData(prev => ({ ...prev, weight: e.target.value }))}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter weight in kg"
                                    />
                                </div>
                                <button
                                    onClick={calculateBMI}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Calculate BMI
                                </button>
                                {bmiData.result && (
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                                        <p className="text-2xl font-bold text-blue-600">{bmiData.result.bmi}</p>
                                        <p className="text-lg text-gray-700">{bmiData.result.category}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'pills' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Pill Reminder</h2>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                                    <Plus size={18} />
                                    <span>Add Pill</span>
                                </button>
                            </div>
                            <div className="grid gap-4">
                                {pills.map(pill => (
                                    <div key={pill.id} className={`p-4 border rounded-lg ${pill.taken ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => togglePill(pill.id)}
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${pill.taken ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                                        }`}
                                                >
                                                    {pill.taken && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </button>
                                                <div>
                                                    <h3 className="font-medium">{pill.name}</h3>
                                                    <p className="text-sm text-gray-600">{pill.frequency}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-1 text-gray-600">
                                                    <Clock size={16} />
                                                    <span className="text-sm">{pill.time}</span>
                                                </div>
                                                <Bell size={16} className="text-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'campaigns' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Health Campaigns</h2>
                            <div className="grid gap-4">
                                {campaigns.map(campaign => (
                                    <div key={campaign.id} className="p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-lg">{campaign.name}</h3>
                                                <p className="text-gray-600">Scheduled for: {new Date(campaign.date).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm ${campaign.status === 'upcoming'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Name</h3>
                                        <p className="text-lg">{personalDetails.name}</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Age</h3>
                                        <p className="text-lg">{personalDetails.age} years</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Gender</h3>
                                        <p className="text-lg">{personalDetails.gender}</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Blood Group</h3>
                                        <p className="text-lg">{personalDetails.bloodGroup}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Height</h3>
                                        <p className="text-lg">{personalDetails.height}</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Weight</h3>
                                        <p className="text-lg">{personalDetails.weight}</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h3 className="font-medium text-gray-700">Emergency Contact</h3>
                                        <p className="text-lg">{personalDetails.emergencyContact}</p>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'charts' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Health Tracking Charts</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Weight Trend */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Weight Trend (Last 8 Months)</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={weightData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Activity Data */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={activityData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="steps" fill="#10B981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Health Metrics Pie Chart */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4 text-center">Overall Health Score Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={healthMetrics}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, value }) => `${name}: ${value}%`}
                                        >
                                            {healthMetrics.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;