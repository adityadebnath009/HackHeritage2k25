import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function OtpModal({ phoneNumber, onClose, onVerify }) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleVerifyOtp = () => {
        // Replace with actual OTP validation API call
        if (otp === "1234") {
            onVerify();
            onClose();
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>

                {/* Title */}
                <h2 className="text-lg font-semibold text-center mb-4">Verify OTP</h2>

                {/* Phone Display */}
                <p className="text-sm text-gray-600 text-center mb-2">
                    Sent to: <span className="font-medium">
                        {phoneNumber
                            ? `${"x".repeat(phoneNumber.length - 4)}${phoneNumber.slice(-4)}`
                            : ""}
                    </span>
                </p>

                {/* OTP Input */}
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="border border-gray-300 rounded-lg p-2 w-full text-center focus:outline-none focus:ring focus:ring-cyan-400"
                />

                {/* Error Message */}
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                {/* Verify Button */}
                <button
                    onClick={handleVerifyOtp}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-cyan-600"
                >
                    Verify
                </button>
            </div>
        </div>
    );
}
