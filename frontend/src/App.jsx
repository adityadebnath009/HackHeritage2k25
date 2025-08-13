import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx"; // Importing Home component
// import Chatbot from "./components/Chatbot.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/chatbot" element={<Chatbot />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
