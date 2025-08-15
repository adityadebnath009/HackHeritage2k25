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
    constructor(props) {
        super(props);
        this.state = {
            hoveredItem: null, // which item is currently hovered
        };
    }

    render() {
        const { hoveredItem } = this.state;

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
                                <p> DASHBOARD</p>
                            </div>
                        </div>
                        <div className="nav-login">
                            <Link to="/login" className="login-link" >
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
                                <div
                                    className="content-menu-items"
                                    onMouseEnter={() => this.setState({ hoveredItem: 1 })}
                                    onMouseLeave={() => this.setState({ hoveredItem: null })}
                                >
                                    {this.state.hoveredItem !== 1 && <FontAwesomeIcon icon={faUserDoctor} />}
                                    <p className={this.state.hoveredItem === 1 ? "content-menu-hover" : ""}>
                                        {this.state.hoveredItem === 1
                                            ? "India’s top doctors, now just a click away !! Skip the crowd. Get the care. Anytime. Anywhere.   "
                                            : "Telemedicine"}
                                    </p>
                                </div>
                                <div
                                    className="content-menu-items"
                                    onMouseEnter={() => this.setState({ hoveredItem: 2 })}
                                    onMouseLeave={() => this.setState({ hoveredItem: null })}
                                >
                                    {this.state.hoveredItem !== 2 && <FontAwesomeIcon icon={faBookMedical} />}
                                    <p className={this.state.hoveredItem === 2 ? "content-menu-hover" : ""}>
                                        {this.state.hoveredItem === 2
                                            ? "Wellness meets fun — learn, play, and grow healthier every day !! Nutrition, fitness, mental wellness, lifestyle health, WCD, and more..."
                                            : "Health And Wellness Module"}
                                    </p>
                                </div>
                                <div
                                    className="content-menu-items"
                                    onMouseEnter={() => this.setState({ hoveredItem: 3 })}
                                    onMouseLeave={() => this.setState({ hoveredItem: null })}
                                >
                                    {this.state.hoveredItem !== 3 && <FontAwesomeIcon icon={faCalendar} />}
                                    <p className={this.state.hoveredItem === 3 ? "content-menu-hover" : ""}>
                                        {this.state.hoveredItem === 3
                                            ? "Every campaign, perfectly timed on your calendar — because great timing means greater results."
                                            : "Program And Campaign Tracker"}
                                    </p>
                                </div>
                                <div
                                    className="content-menu-items"
                                    onMouseEnter={() => this.setState({ hoveredItem: 4 })}
                                    onMouseLeave={() => this.setState({ hoveredItem: null })}
                                >
                                    {this.state.hoveredItem !== 4 && <FontAwesomeIcon icon={faHandHoldingMedical} />}
                                    <p className={this.state.hoveredItem === 4 ? "content-menu-hover" : ""}>
                                        {this.state.hoveredItem === 4
                                            ? "Instant help when every second counts. Medical aid & ambulances — just a tap away."
                                            : "Health Resource Hub"}
                                    </p>
                                </div>
                                <div
                                    className="content-menu-items"
                                    onMouseEnter={() => this.setState({ hoveredItem: 5 })}
                                    onMouseLeave={() => this.setState({ hoveredItem: null })}
                                >
                                    {this.state.hoveredItem !== 5 && <FontAwesomeIcon icon={faComments} />}
                                    <p className={this.state.hoveredItem === 5 ? "content-menu-hover" : ""}>
                                        {this.state.hoveredItem === 5
                                            ? "We value your opinion — share your thoughts and help us shape the future of our services."
                                            : "Feedback"}
                                    </p>
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
