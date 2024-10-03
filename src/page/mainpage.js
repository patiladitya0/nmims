import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaSearch, FaBars, FaMapMarkerAlt } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './mainpage.css';

const MainPage = () => {
    const initialTabs = [
        { id: 'home', icon: <FaHome size={20} />, link: 'home' },
        { id: 'search', icon: <FaSearch size={20} />, link: 'search' },
        { id: 'maps', icon: <FaMapMarkerAlt size={20} />, link: 'maps' },
        { id: 'menu', icon: <FaBars size={20} />, link: 'menu' }
    ];
    
    const [tabs, setTabs] = useState(initialTabs);
    const [activeTab, setActiveTab] = useState('home');

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If the item is dropped outside the list or there's no destination, do nothing.
        if (!destination) return;

        // Reorder the tabs array.
        const reorderedTabs = Array.from(tabs);
        const [movedTab] = reorderedTabs.splice(source.index, 1);
        reorderedTabs.splice(destination.index, 0, movedTab);

        setTabs(reorderedTabs);
    };

    return (
        <div className="main-page-container">
            <div className="page-content">
                <Outlet /> {/* This will render the child route components */}
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="bottom-nav" direction="horizontal">
                    {(provided) => (
                        <nav
                            className="bottom-nav"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {tabs.map((tab, index) => (
                                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                                    {(provided) => (
                                        <Link
                                            to={tab.link}
                                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab.id)}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {tab.icon}
                                        </Link>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </nav>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default MainPage;
