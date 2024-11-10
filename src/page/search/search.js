import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaUser, FaHistory, FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';
import './search.css';
import modulesData from '../../data/modules.json';

const iconMap = {
    GiArtificialIntelligence: require('react-icons/gi').GiArtificialIntelligence,
    FaBell: require('react-icons/fa').FaBell,
    FaHandshake: require('react-icons/fa').FaHandshake,
    FaComments: require('react-icons/fa').FaComments,
    FaBox: require('react-icons/fa').FaBox,
    FaBook: require('react-icons/fa').FaBook,
    FaShieldAlt: require('react-icons/fa').FaShieldAlt,
    FaTachometerAlt: require('react-icons/fa').FaTachometerAlt,
    FaHandsHelping: require('react-icons/fa').FaHandsHelping,
    FaAmbulance: require('react-icons/fa').FaAmbulance,
    FaBriefcaseMedical: require('react-icons/fa').FaBriefcaseMedical,
    FaChalkboardTeacher: require('react-icons/fa').FaChalkboardTeacher,
    FaPhoneAlt: require('react-icons/fa').FaPhoneAlt
};

const Search = () => {
    const [modules, setModules] = useState(modulesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch news articles
    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://cap-server-2.onrender.com/news');
            setArticles(response.data.articles);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Drag-and-drop for modules
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const reorderedModules = Array.from(modules);
        const [movedModule] = reorderedModules.splice(source.index, 1);
        reorderedModules.splice(destination.index, 0, movedModule);

        setModules(reorderedModules);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredModules = modules.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="loading">Loading news...</p>;
    if (error) return <p className="error">Error fetching news: {error}</p>;

    return (
        <div className="search-container">
            <div className="title-section">
                <h1 class="module-heading">Browse...</h1>
            </div>

            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button type="submit">Go</button>
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
                                {filteredModules.map((module, index) => {
                                    const IconComponent = iconMap[module.icon];
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
                                                        {IconComponent && <IconComponent size={24} />}
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

            {/* News Section */}
            <div className="news-section">
                <h2>Latest News</h2>
                <div className="news-grid">
                    {articles.map((article, index) => (
                        <div key={index} className="news-item">
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt={article.title} className="news-image" />
                            )}
                            <h3 className="news-title">{article.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="account-section-divider" />

            <div className="account-heading">Go to My Account</div>
            <div className="account-section">
                <Link to="/my-account" className="account-button">
                    <FaUser /> My Account
                </Link>
                <Link to="/myactivity" className="account-button">
                    <FaHistory /> My Activity
                </Link>
                <Link to="/nominee" className="account-button">
                    <AiOutlineUsergroupAdd /> Emergency Contact
                </Link>
            </div>
        </div>
    );
};

export default Search;
