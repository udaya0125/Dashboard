import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const categoryOptions = [
  { value: 'meeting', label: 'Meeting', color: '#3b82f6' },
  { value: 'appointment', label: 'Appointment', color: '#10b981' },
  { value: 'reminder', label: 'Reminder', color: '#f59e0b' },
  { value: 'task', label: 'Task', color: '#8b5cf6' },
  { value: 'birthday', label: 'Birthday', color: '#ec4899' },
  { value: 'holiday', label: 'Holiday', color: '#ef4444' },
];

const EventForm = ({ event, onClose, onSubmit, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'meeting',
    start: new Date(),
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        category: event.category || 'meeting',
        start: event.start || new Date(),
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: event?.id,
      start: formData.start,
      end: formData.start,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {event?.id ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categoryOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setFormData({...formData, category: option.value})}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${
                    formData.category === option.value
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : ''
                  }`}
                  style={{ backgroundColor: option.color, color: 'white' }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter event name"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            {event?.id && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {event?.id ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;