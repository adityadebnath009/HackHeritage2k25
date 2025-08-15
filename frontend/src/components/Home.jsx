import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faUserDoctor,
    faBookMedical,
    faHandHoldingMedical,
    faLaptopMedical,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCalendar,
    faComments,
    faComment,
    faCircleUser,
    faHouse,
    faFile,
} from "@fortawesome/free-regular-svg-icons";

class Home extends React.Component {
    render() {
        return (
            <>
                {/* HEADER */}
                <header className="header">
                    <div className="header-info">
                        <div className="header-info-logo">
                            <img src="src/components/images/projectLogo2.png" alt="Project Logo" />
                        </div>
                    </div>
                    <div className="navbar">
                        <div className="nav-opts">
                            {/* <FontAwesomeIcon icon={faBars} /> */}
                            <div className="home">
                                <FontAwesomeIcon icon={faHouse} />
                                <p>HOME</p>
                            </div>
                            <div className="about">
                                <FontAwesomeIcon icon={faFile} />
                                <p>ABOUT US</p>
                            </div>
                            <div className="dashboard">
                                <FontAwesomeIcon icon={faLaptopMedical} />
                                <pre> DASHBOARD</pre>
                            </div>
                        </div>
                        <div className="nav-login">
                            <Link to="/login" className="login-link" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5em" }}>
                                <button className="login-btn">LOGIN <FontAwesomeIcon icon={faCircleUser} /></button>                                
                            </Link>
                        </div>
                    </div>
                </header>

                {/* MAIN */}
                <main>
                    <div className="content">
                        {/* Content background */}
                        <div className="content-bg">
                            <div className="content-bg-content">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Maiores fuga ullam eligendi aliquid accusantium incidunt
                                    quibusdam magni, id odit quae eius molestias quidem ratione
                                    sint ea repellat, praesentium libero veniam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Totam aliquam sapiente rem tempora officiis ullam deserunt
                                    vero quasi ut magni ratione architecto, maiores dignissimos
                                    aut corporis. Optio eum illum magni.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                                    non vitae nulla, dolorum corrupti officia maxime libero
                                    repellat odio nostrum, eligendi accusantium harum, dignissimos
                                    enim nisi itaque culpa laborum ea.
                                </p>
                            </div>
                            <div className="content-bg-img">
                                <img src="src/components/images/hh25bg-1.jpg" alt="Background" />
                            </div>
                        </div>

                        {/* Menu section */}
                        <div className="content-menu">
                            <div className="content-menu-topic">
                                <p>Our Key Features</p>
                            </div>
                            <div className="content-menu-body-items">
                                <div className="content-menu-items">
                                    <FontAwesomeIcon icon={faUserDoctor} />
                                    <p>Telemedicine</p>
                                </div>
                                <div className="content-menu-items">
                                    <FontAwesomeIcon icon={faBookMedical} />
                                    <p>Health And Wellness Module</p>
                                </div>
                                <div className="content-menu-items">
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <p>Program Tracker And Campaign</p>
                                </div>
                                <div className="content-menu-items">
                                    <FontAwesomeIcon icon={faHandHoldingMedical} />
                                    <p>Health Resource Hub</p>
                                </div>
                                <div className="content-menu-items">
                                    <FontAwesomeIcon icon={faLaptopMedical} />
                                    <p>Dashboard</p>
                                </div>
                                <div className="content-menu-items">
                                    <FontAwesomeIcon icon={faComments} />
                                    <p>Feedback</p>
                                </div>
                            </div>
                        </div>

                        <div className="test"></div>
                    </div>
                    <footer>
                        <Link to="/chatbot" className="footer-chat">
                            <div className="footer-chat-content">
                                <FontAwesomeIcon icon={faComment} />
                            </div>
                        </Link>
                    </footer>
                </main>
            </>
        );
    }
}

export default Home;
