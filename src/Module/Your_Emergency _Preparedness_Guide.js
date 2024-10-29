import React from 'react';
import './Your_Emergency_Preparedness_Guide.css';

const YourEmergencyPreparednessGuide = () => {
  return (
    <div className="guide-container">
      <h1>Your Emergency Preparedness Guide</h1>
      <p className="guide-paragraph">
        As a key publication, this guide outlines the steps Indians should take to enhance their readiness for emergencies. Included are a Family Emergency Plan template and a list of emergency kit essentials.
      </p>

      <h2 className="section-title">Table of Contents</h2>
      <ul className="guide-list">
        <li>Step 1: Know the Risks</li>
        <li>Step 2: Make a Plan</li>
        <li>Step 3: Get an Emergency Kit</li>
        <li>Emergency Kit Essentials</li>
        <li>Resources</li>
      </ul>

      <p className="guide-paragraph">
        In the event of a disaster in your area, emergency services may take time to reach you. Ensure you can care for yourself and your family for at least 72 hours. This guide will help you create an emergency plan and compile a 72-hour emergency kit.
      </p>

      <h2 className="section-title">Step 1: Know the Risks</h2>
      <p className="guide-paragraph">
        India faces a range of natural and man-made hazards, including floods, earthquakes, cyclones, landslides, and industrial accidents. Understanding the risks specific to your area can aid in better preparation.
      </p>

      <h2 className="section-title">Step 2: Make a Plan</h2>
      <p className="guide-paragraph">
        Creating an emergency plan is essential. Your family might be separated when an emergency occurs, so plan how to meet or contact one another and discuss what to do in various scenarios.
      </p>

      <h3 className="subsection-title">Plan for Specific Risks</h3>
      <p className="guide-paragraph">
        The NDMA provides resources on specific risks like earthquakes, floods, and heatwaves. Visit their website at <a href="https://ndma.gov.in">ndma.gov.in</a> for more information.
      </p>

      <h2 className="section-title">Step 3: Get an Emergency Kit</h2>
      <p className="guide-paragraph">
        In a crisis, you may need to manage without power or drinking water. Aim to have supplies for at least 72 hours.
      </p>

      <h3 className="subsection-title">Basic Emergency Kit</h3>
      <ul className="guide-list">
        <li>Water: 2 liters per person per day</li>
        <li>Food: Non-perishable items like canned foods and snacks</li>
        <li>Manual Can-Opener</li>
        <li>Battery-Powered Radio</li>
        <li>First Aid Kit</li>
      </ul>

      <h2 className="section-title">Emergency Contacts</h2>
      <p className="guide-paragraph emergency-contacts">
        National Emergency Number: 112
      </p>

      
    </div>
  );
};

export default YourEmergencyPreparednessGuide;
