import React, { useState, useEffect } from 'react';
import emergencyKitData from '../../data/emergencyKitItems.json';
import './emergencyKIT.css';

const KitItem = ({ item, index, toggleItem, showDescription, toggleDescription, type }) => (
    <div className={`kit-item ${showDescription ? 'expanded' : ''}`}>
        <div className="kit-item-header">
            <div className="kit-item-info">
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={toggleItem}
                    id={`${type}-${index}`}
                />
                <label htmlFor={`${type}-${index}`}>{item.name}</label>
            </div>
            <div className="plusButton" onClick={toggleDescription} tabIndex="0">
                <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                </svg>
            </div>
        </div>
        {showDescription && (
            <div className="item-description">
                <p>{item.description}</p>
            </div>
        )}
    </div>
);

const EmergencyKit = () => {
    const [basicKit, setBasicKit] = useState([]);
    const [additionalSupplies, setAdditionalSupplies] = useState([]);
    const [showDescription, setShowDescription] = useState({});

    useEffect(() => {
        if (emergencyKitData) {
            setBasicKit(emergencyKitData.basicKit || []);
            setAdditionalSupplies(emergencyKitData.additionalSupplies || []);
        }
    }, []);

    const toggleItem = (index, type) => {
        if (type === 'basic') {
            const updated = [...basicKit];
            updated[index].checked = !updated[index].checked;
            setBasicKit(updated);
        } else {
            const updated = [...additionalSupplies];
            updated[index].checked = !updated[index].checked;
            setAdditionalSupplies(updated);
        }
    };

    const toggleDescription = (index) => {
        setShowDescription((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className="emergency-kit-container">
            <div className="kit-section">
                <h2>Basic Emergency Kit</h2>
                {basicKit.length > 0 ? (
                    basicKit.map((item, index) => (
                        <KitItem 
                            key={index} 
                            item={item} 
                            index={index} 
                            toggleItem={() => toggleItem(index, 'basic')} 
                            showDescription={showDescription[`basic-${index}`]} 
                            toggleDescription={() => toggleDescription(`basic-${index}`)} 
                            type="basic"
                        />
                    ))
                ) : (
                    <p>Loading basic kit items...</p>
                )}
            </div>

            <div className="kit-section additional-section">
                <h2>Consider These Additional Emergency Kit Supplies:</h2>
                {additionalSupplies.length > 0 ? (
                    additionalSupplies.map((item, index) => (
                        <KitItem 
                            key={index} 
                            item={item} 
                            index={index} 
                            toggleItem={() => toggleItem(index, 'additional')} 
                            showDescription={showDescription[`additional-${index}`]} 
                            toggleDescription={() => toggleDescription(`additional-${index}`)} 
                            type="additional"
                        />
                    ))
                ) : (
                    <p>Loading additional supplies...</p>
                )}
            </div>
        </div>
    );
};

export default EmergencyKit;
