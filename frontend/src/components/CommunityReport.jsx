import React, { useState } from 'react';
import './CommunityReport.css'; // We will create this CSS file next

const CommunityReport = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        reporter_name: '',
        phone_number: '',
        category: '',
        description: '',
        location: ''
    });

    // State for managing submission status (e.g., loading, success, error)
    const [status, setStatus] = useState({
        loading: false,
        error: null,
        success: null,
    });

    // --- IMPORTANT: UPDATE THIS URL ---
    // This should be the full URL to your running FastAPI backend's create endpoint
    const API_URL = 'http://127.0.0.1:8000/reports/create';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: null });

        // Get current date and time
        const now = new Date();
        const report_date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const report_time = now.toTimeString().split(' ')[0]; // Format: HH:MM:SS

        const payload = {
            ...formData,
            report_date: report_date,
            report_time: report_time,
            // You can add lat/long here if you implement geolocation
            lat: null, 
            long: null,
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                // Try to get error detail from API response
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Something went wrong');
            }

            const result = await response.json();
            setStatus({ loading: false, success: `Report submitted successfully! Your Report ID is: ${result.report_id}`, error: null });
            setFormData({ // Reset form
                reporter_name: '',
                phone_number: '',
                category: '',
                description: '',
                location: ''
            });

        } catch (error) {
            setStatus({ loading: false, success: null, error: error.message });
        }
    };

    return (
        <div className="report-container">
            <div className="report-header">
                <h2>Community Report Form</h2>
                <p>Report a local issue. Your submission helps us improve our community.</p>
            </div>
            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                    <label htmlFor="reporter_name">Your Name</label>
                    <input type="text" id="reporter_name" name="reporter_name" value={formData.reporter_name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Your Phone Number</label>
                    <input type="tel" id="phone_number" name="phone_number" placeholder="+91..." value={formData.phone_number} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category of Report</label>
                    <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                        <option value="" disabled>Select a category</option>
                        <option value="Symptoms / Health Concern">Symptoms / Health Concern</option>
                        <option value="Environmental Health">Environmental Health</option>
                        <option value="Healthcare Services">Healthcare Services</option>
                        <option value="Emergency / Disaster">Emergency / Disaster</option>
                        <option value="Animal / Vector Issues">Animal / Vector Issues</option>
                        <option value="Community Requests / Awareness / Requests">Community Requests / Awareness</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Details of the Issue</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location / Address</label>
                    <input type="text" id="location" name="location" placeholder="e.g., Near Habra Station Road" value={formData.location} onChange={handleInputChange} required />
                </div>
                <button type="submit" disabled={status.loading}>
                    {status.loading ? 'Submitting...' : 'Submit Report'}
                </button>
            </form>
            {status.success && <div className="form-message success">{status.success}</div>}
            {status.error && <div className="form-message error">{status.error}</div>}
        </div>
    );
};

export default CommunityReport;