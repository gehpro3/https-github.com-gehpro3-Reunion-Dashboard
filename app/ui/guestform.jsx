"use client";

import { useState } from 'react';

const GuestForm = ({ guest, onSave, onCancel }) => {
  const [formData, setFormData] = useState(guest);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">Edit Guest</h2>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Name</label>
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 bg-bg-dark border border-border-color rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary">RSVP Status</label>
        <select
          name="rsvpStatus"
          value={formData.rsvpStatus}
          onChange={handleChange}
          className="w-full p-2 bg-bg-dark border border-border-color rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {/* Add more fields here for numberOfAttendees, paymentStatus, etc. */}
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
          Cancel
        </button>
        <button type="submit" className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2 px-4 rounded-lg">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default GuestForm;
