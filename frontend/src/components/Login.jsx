import React, { useState, useEffect} from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import OtpModal from "./OtpModal";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";      // Import axios for API calls

import {initializeApp} from "firebase/app";     // Import Firebase app initialization
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; // Import Firebase authentication methods

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyRyuevoNLqJ6bXqn2G4xvDhsTyCZrwn4",
  authDomain: "hackathon-83422.firebaseapp.com",
  projectId: "hackathon-83422",
  storageBucket: "hackathon-83422.firebasestorage.app",
  messagingSenderId: "1080108757472",
  appId: "1:1080108757472:web:ce815fac936904a9a43b85",
  measurementId: "G-T2DT75R52P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function LoginForm() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [userType, setUserType] = useState("User");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [phone, setPhone] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const setupRecaptcha = () => {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    console.log("reCAPTCHA verified");
                }
            });
        };
        setupRecaptcha();
    }, []);

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (!phone || phone.length < 10) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        const appVerifier = window.recaptchaVerifier;
        const formattedPhoneNumber = `+91${phone}`; // Adjust country code as needed
        console.log("Formatted for Firebase:", formattedPhoneNumber);
        signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("OTP sent successfully!");
                setShowOtpModal(true);
            }).catch((error) => {
                console.error("Error sending OTP", error);
                toast.error("Failed to send OTP. Check the console for details.");
            });
    };

    // 4. This function will be passed to the OtpModal
    const handleVerifyOtp = (otp) => {
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            toast.info("Phone number verified. Logging in...");

            // 5. Get the Firebase ID Token
            user.getIdToken().then((idToken) => {
                
                // 6. Send the token to your FastAPI backend
                axios.post("http://127.0.0.1:8000/verify-otp", { id_token: idToken })
                    .then(response => {
                        // Assuming your backend returns user data and your internal JWT
                        const backendResponse = response.data;
                        console.log("Backend response:", backendResponse);

                        // MOCK USER DATA (replace with data from backendResponse)
                        const loggedInUser = {
                            name: "Ajay Agarwal", // This should come from your DB via the backend
                            role: userType,
                            phone: backendResponse.phone,
                            uid: backendResponse.uid,
                            // Add the internal JWT token here to use for other API calls
                            token: backendResponse.access_token 
                        };
                        
                        loginUser(loggedInUser);
                        setIsOtpVerified(true);
                        setShowOtpModal(false);

                        toast.success(isLoginMode ? "Login successful 🎉" : "Signup successful 🎉");
                        setTimeout(() => navigate("/"), 1200);

                    }).catch(error => {
                        console.error("Error verifying with backend:", error);
                        toast.error("Backend verification failed. Please try again.");
                    });
            });

        }).catch((error) => {
            console.error("Error verifying OTP with Firebase", error);
            toast.error("Invalid OTP. Please try again.");
        });
    };



    return (
        <div className='grid gap-4 w-screen min-h-screen place-items-center bg-gray-200 login-page'>
            <div id="recaptcha-container"></div>
            <div className="w-[400px] bg-white p-8 mt-[20px] mb-[20px]  rounded-2xl shadow-lg shadow-gray-500/80">
                <div className="flex justify-center mb-2">
                    <img src="src/components/images/projectLogo2.png" alt="Project Logo" className=" w-[140px]" />
                </div>
                {/* Header Titles */}
                <div className="flex justify-center mb-4">
                    <h2 className="text-3xl font-semibold text-center ">
                        {isLoginMode ? "Login" : "Sign Up"}
                    </h2>
                </div>



                {/* Login/Signup Toggle */}
                <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
                    <button
                        className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" : "text-black"
                            }`}
                        onClick={() => setIsLoginMode(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "text-black"
                            }`}
                        onClick={() => setIsLoginMode(false)}
                    >
                        Signup
                    </button>
                    <div
                        className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all ${isLoginMode ? "left-0" : "left-1/2"
                            }`}
                    ></div>
                </div>
                {/* User Type Toggle */}
                <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
                    {["User", "Doctor", "Admin"].map((type) => (
                        <button
                            key={type}
                            className={`w-1/3 text-lg font-medium transition-all z-10 ${userType === type ? "text-white" : "text-black"
                                }`}
                            onClick={() => setUserType(type)}
                            type="button"
                        >
                            {type}
                        </button>
                    ))}
                    <div
                        className={`absolute top-0 h-full w-1/3 rounded-full bg-gray-400 transition-all duration-300`}
                        style={{
                            left: userType === "User" ? "0%" : userType === "Doctor" ? "33.3333%" : "66.6666%",
                        }}
                    ></div>
                </div>

                {/* Form Section */}
                <form className="space-y-4">
                    {/* Signup-only Field */}
                    {!isLoginMode && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full p-[6px] border-b-2  border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                        />
                    )}

                    {/* ABHA Number Field for User, Dropdown for Admin */}
                    <div>
                        {userType === "User" && (
                            <div>
                                <input
                                    type="number"
                                    placeholder="Enter ABHA Number"
                                    required
                                    className="w-full p-[6px] border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                                />
                                {/* Create ABHA Number Link (Only for Signup) */}
                                <div className="text-right mt-1">
                                    {!isLoginMode && (
                                        <a
                                            href="https://abha.abdm.gov.in/abha/v3/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#D66025] hover:underline text-[14px] font-medium"
                                        >
                                            Create ABHA Number
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Admin ID Field for Admin */}
                        {userType === "Admin" && (
                            <div>
                                <select
                                    required
                                    className="w-full p-[6px] border-b-2 border-gray-300 outline-none focus:border-cyan-500 bg-white text-gray-700"
                                    defaultValue=""

                                >
                                    <option value="" >
                                        Select Admin ID
                                    </option>
                                    <option value="admin1">Admin ID 1</option>
                                    <option value="admin2">Admin ID 2</option>
                                    <option value="admin3">Admin ID 3</option>

                                </select>
                                <div className="text-right mt-4">
                                    <input
                                        type="number"
                                        placeholder="Enter the ID no."
                                        required
                                        className="w-full p-[6px] border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shared Fields */}
                    {/* Phone Number Field with Send OTP */}
                    <div className="flex items-center gap-2">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="p-[6px] border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                        />
                        {isOtpVerified && (
                            <CheckCircleIcon className="h-7 w-7 text-green-500" />
                        )}
                        {!isOtpVerified && (
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                className="bg-cyan-500 text-white px-2 py-2 rounded-lg mt-2 w-full hover:bg-cyan-600"
                            >
                                Send OTP
                            </button>
                        )}
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full p-[6px] border-b-2  border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full p-[6px] border-b-2  border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                    />

                    {/* Signup-only Field */}
                    {!isLoginMode && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="w-full p-[6px] border-b-2  border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
                        />
                    )}

                    {/* Forgot Password (Only for Login) */}
                    {isLoginMode && (
                        <div className="text-right">
                            <a href="#" className="text-cyan-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="button"
                        onClick={handleSendOtp}
                        className="w-full p-3 bg-[#D66025] text-white rounded-full text-lg font-medium hover:bg-[#D60025]"
                    >
                        {isLoginMode ? `Login as ${userType}` : `Signup as ${userType}`}
                    </button>

                    {/* Switch Mode Link */}
                    <p className="text-center text-gray-600">
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsLoginMode(!isLoginMode);
                            }}
                            className="text-cyan-600 hover:underline"
                        >
                            {isLoginMode ? "Signup now" : "Login"}
                        </a>
                    </p>
                </form>
            </div>
            {showOtpModal && (
                <OtpModal
                    phoneNumber={phone}
                    onClose={() => setShowOtpModal(false)}
                    onVerify={handleVerifyOtp}
                />
            )}
        </div>
    );
}

export default LoginForm;
