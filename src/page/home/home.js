import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaUser, FaHistory, FaUserFriends, FaBell, FaHandshake, FaComments, FaBox, FaBook, FaShieldAlt, FaTachometerAlt, FaHandsHelping, FaAmbulance, FaBriefcaseMedical, FaChalkboardTeacher } from 'react-icons/fa'; // Import icons
import './home.css'; // Importing the CSS file
import modulesData from '../../data/modules.json'; // Updated path
import axios from 'axios';

const iconMap = {
    FaBell,
    FaHandshake,
    FaComments,
    FaBox,
    FaBook,
    FaShieldAlt,
    FaTachometerAlt,
    FaHandsHelping,
    FaAmbulance,
    FaBriefcaseMedical,
    FaChalkboardTeacher
};

const Home = () => {
    const [modules, setModules] = useState(modulesData);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const reorderedModules = Array.from(modules);
        const [movedModule] = reorderedModules.splice(source.index, 1);
        reorderedModules.splice(destination.index, 0, movedModule);

        setModules(reorderedModules);
    };

    // const fetchUserData = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         };

    //         const response = await axios.get('http://localhost:5000/api/user/account', config);
    //         setUserData(response.data);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         setError('Failed to fetch user data');
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserData();
    // }, []);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // if (error) {
    //     return <p>{error}</p>;
    // }

    return (
        <div className="home-container">
            <div>
                {userData ? (
                    <h2>Hi, {userData.fullName}! Welcome to our Disaster Management App.</h2>
                ) : (
                    <h2>Welcome to our Disaster Management App.</h2>
                )}
            </div>
            <div className="title-section">
                <h1>This is Our Modules</h1>
            </div>
            <div className="module-section">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="module-grid" direction="horizontal">
                        {(provided) => (
                            <div
                                className="module-grid"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {modules.map((module, index) => {
                                    const IconComponent = iconMap[module.icon]; // Get the correct icon component
                                    return (
                                        <Draggable key={module.name} draggableId={module.name} index={index}>
                                            {(provided, snapshot) => (
                                                <Link
                                                    to={module.link}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`module ${snapshot.isDragging ? 'dragging' : ''}`}
                                                >
                                                    <div className="module-content">
                                                        {IconComponent && <IconComponent size={24} />} {/* Render the icon */}
                                                        <span>{module.name}</span>
                                                    </div>
                                                </Link>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <hr className="account-section-divider" />

            <div className="additional-content">
                <p>Explore more features and updates.</p>
            </div>

            <hr className="account-section-divider" />
            <div className="account-heading">
                Go to My Account
            </div>

            <div className="account-section">
                <Link to="/myaccount" className="account-button">
                    <FaUser /> My Account
                </Link>
                <Link to="/myactivity" className="account-button">
                    <FaHistory /> My Activity
                </Link>
                <Link to="/mynominee" className="account-button">
                    <FaUserFriends /> Nominee
                </Link>
            </div>
        </div>
    );
};

export default Home;
