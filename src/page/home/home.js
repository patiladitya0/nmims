import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaUser, FaHistory, FaUserFriends } from 'react-icons/fa'; // Import icons from react-icons
import './home.css'; // Importing the CSS file
import modulesData from '../../data/modules.json'; // Updated path

const Home = () => {
    const [modules, setModules] = useState(modulesData);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const reorderedModules = Array.from(modules);
        const [movedModule] = reorderedModules.splice(source.index, 1);
        reorderedModules.splice(destination.index, 0, movedModule);

        setModules(reorderedModules);
    };

    return (
        <div className="home-container">
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
                                {modules.map((module, index) => (
                                    <Draggable key={module.name} draggableId={module.name} index={index}>
                                        {(provided, snapshot) => (
                                            <Link
                                                to={module.link}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`module ${snapshot.isDragging ? 'dragging' : ''}`}
                                                key={index}
                                            >
                                                <div className="module-content">
                                                    <i className={module.icon}></i>
                                                    <span>{module.name}</span>
                                                </div>
                                            </Link>
                                        )}
                                    </Draggable>
                                ))}
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
