import React, { useState } from 'react';
import './VolunteerMatching.css';

export default function VolunteerMatching() {
  const [formData, setFormData] = useState({
    organizationName: '',
    headline: '',
    purpose: '',
    location: '',
    timeCommitment: '',
    volunteerBenefits: '',
    contactInfo: '',
    testimonials: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can add a submit function here to send formData to your backend
  };

  return (
    <div className="volunteer-matching-container">
      <h2>Advertise Your Volunteer Opportunity</h2>
      <form onSubmit={handleSubmit} className="volunteer-matching-form">
        <label>Organization Name:</label>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder="Enter the NGO name"
          required
        />

        <label>Headline:</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Catchy title like 'Join Us to Make a Difference!'"
          required
        />

        <label>Purpose of the Volunteering:</label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Describe the purpose and impact of this volunteer work"
          required
        ></textarea>

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location of the activity"
          required
        />

        <label>Time Commitment:</label>
        <input
          type="text"
          name="timeCommitment"
          value={formData.timeCommitment}
          onChange={handleChange}
          placeholder="Duration (e.g., 4 hours per week)"
          required
        />

        <label>Benefits for Volunteers:</label>
        <textarea
          name="volunteerBenefits"
          value={formData.volunteerBenefits}
          onChange={handleChange}
          placeholder="Skill-building, networking, etc."
        ></textarea>

        <label>Contact Information:</label>
        <input
          type="text"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="Contact number, email, or website"
          required
        />

        <label>Testimonials or Success Stories:</label>
        <textarea
          name="testimonials"
          value={formData.testimonials}
          onChange={handleChange}
          placeholder="Brief quotes or success stories from past volunteers"
        ></textarea>

        <button type="submit">Submit Opportunity</button>
      </form>
    </div>
  );
}
