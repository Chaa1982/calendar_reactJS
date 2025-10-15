import React, { useState } from "react";
import "./CreateEventForm.css";
import { Button } from "../shared/ui/Button.js";

export const CreateEventForm = ({ onSave, onClose, calendars, eventToEdit }) => {
    const isEditMode = !!eventToEdit;
    
    const [formData, setFormData] = useState({
        title: eventToEdit?.title || '',
        description: eventToEdit?.description || '',
        date: eventToEdit?.startTime || new Date(),
        startTime: eventToEdit ? 
            `${eventToEdit.startTime.getHours().toString().padStart(2, '0')}:${eventToEdit.startTime.getMinutes().toString().padStart(2, '0')}` 
            : '09:00',
        endTime: eventToEdit ? 
            `${eventToEdit.endTime.getHours().toString().padStart(2, '0')}:${eventToEdit.endTime.getMinutes().toString().padStart(2, '0')}` 
            : '10:00',
        calendar: eventToEdit?.calendar || calendars[0] || {}
    });

    const timeOptions = [
        "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
        "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const startDateTime = new Date(formData.date);
        const [startHours, startMinutes] = formData.startTime.split(':');
        startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
        
        const endDateTime = new Date(formData.date);
        const [endHours, endMinutes] = formData.endTime.split(':');
        endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

        const event = {
            ...formData,
            startTime: startDateTime,
            endTime: endDateTime,
            id: isEditMode ? eventToEdit.id : Date.now()
        };

        onSave(event);
    };

    return (
        <div className="create-event-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{isEditMode ? 'Edit Event' : 'Create Event'}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit} className="event-form">
                    <div className="form-section">
                        <label>Event title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Enter title"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Date</label>
                        <input
                            type="date"
                            value={formData.date.toISOString().split('T')[0]}
                            onChange={(e) => handleInputChange('date', new Date(e.target.value))}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Time</label>
                        <div className="time-fields">
                            <select
                                value={formData.startTime}
                                onChange={(e) => handleInputChange('startTime', e.target.value)}
                                className="time-select"
                            >
                                {timeOptions.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                            <span> - </span>
                            <select
                                value={formData.endTime}
                                onChange={(e) => handleInputChange('endTime', e.target.value)}
                                className="time-select"
                            >
                                {timeOptions.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="checkbox-option">
                            <input
                                type="checkbox"
                                id="all-day"
                                className="checkbox-input"
                            />
                            <label htmlFor="all-day">All day</label>
                        </div>
                    </div>

                    <div className="form-section">
                        <label>Calendar</label>
                        <select
                            value={formData.calendar.id}
                            onChange={(e) => {
                                const selectedCalendar = calendars.find(cal => cal.id === parseInt(e.target.value));
                                handleInputChange('calendar', selectedCalendar);
                            }}
                            className="form-input"
                        >
                            {calendars.map(calendar => (
                                <option key={calendar.id} value={calendar.id}>
                                    {calendar.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-section">
                        <label>Event description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Enter description"
                            rows={3}
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-actions">
                        <Button variant="secondary" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            {isEditMode ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};