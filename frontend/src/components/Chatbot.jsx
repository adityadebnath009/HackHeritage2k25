import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { menuItems } from "./Icons.jsx";
import ChatbotSidebar from "./ChatbotSidebar.jsx";
import { Tooltip } from "react-tooltip";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSidebar] = useState(true);
    const navigate = useNavigate(); // Initialize navigate

    if (!showSidebar) return null;

    return (
        <div>
            {/* Close button in top right */}
            <button
                className="fixed top-4 right-4 z-50 bg-white text-gray-900 rounded-full p-2 shadow hover:bg-gray-200 transition"
                onClick={() => navigate("/")} // Redirect to main page
                aria-label="Close Sidebar"
            >
                <FaTimes size={20} />
            </button>
            <motion.div
                initial={{ width: 60 }}
                animate={{ width: isOpen ? 240 : 60 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-900 h-screen text-white p-4 flex flex-col gap-6"
            >
                <button className="text-xl mb-4" onClick={() => setIsOpen((prev) => !prev)}>
                    <FaBars />
                </button>
                <nav className={`flex flex-col gap-11 h-full overflow-y-auto ${!isOpen && 'no-scrollbar'}`}>
                    {menuItems.map((item, index) => (
                        <ChatbotSidebar
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    ))}
                </nav>
            </motion.div>
            {!isOpen && <Tooltip id="sidebar-tooltip" offset={40} />}
        </div>
    );
};

export default Chatbot;
