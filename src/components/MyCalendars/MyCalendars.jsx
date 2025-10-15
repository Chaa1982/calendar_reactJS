import React, { useState } from "react";
import "./MyCalendars.css";
import { Button } from "../shared/ui/Button.js";


export const MyCalendars = ({ calendars, events, onToggleCalendar, onAddCalendar, onDeleteCalendar, onEditEvent, onDeleteEvent }) => {
    const [editingCalendar, setEditingCalendar] = useState(null);
    const [newCalendarName, setNewCalendarName] = useState('');

    const getEventCount = (calendarId) => {
        return events.filter(event => event.calendar.id === calendarId).length;
    };

    const handleEditCalendar = (calendar) => {
        setEditingCalendar(calendar.id);
        setNewCalendarName(calendar.name);
    };

    const handleSaveCalendar = (calendarId) => {
        // In a real app, you would call an update function here
        setEditingCalendar(null);
        setNewCalendarName('');
    };

    const handleCancelEdit = () => {
        setEditingCalendar(null);
        setNewCalendarName('');
    };

    const isDefaultCalendar = (calendarId) => {
        return calendarId === 1; // First calendar is default
    };

    return (
        <div className="my-calendars">
            <div className="calendars-header">
                <h3>My Calendars</h3>
                <Button 
                    variant="secondary" 
                    onClick={onAddCalendar}
                    className="add-calendar-btn"
                >
                    + Add
                </Button>
            </div>
            
            {calendars.map(calendar => (
                <div key={calendar.id} className="calendar-item">
                    <div className="calendar-checkbox">
                        <input
                            type="checkbox"
                            checked={calendar.visible}
                            onChange={() => onToggleCalendar(calendar.id)}
                            className="checkbox-input"
                        />
                        <span 
                            className="calendar-color" 
                            style={{ backgroundColor: calendar.color }}
                        ></span>
                        
                        {editingCalendar === calendar.id ? (
                            <div className="calendar-edit">
                                <input
                                    type="text"
                                    value={newCalendarName}
                                    onChange={(e) => setNewCalendarName(e.target.value)}
                                    className="calendar-name-input"
                                />
                                <button 
                                    onClick={() => handleSaveCalendar(calendar.id)}
                                    className="save-btn"
                                >
                                    ✓
                                </button>
                                <button 
                                    onClick={handleCancelEdit}
                                    className="cancel-btn"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div className="calendar-info">
                                <span className="calendar-name">{calendar.name}</span>
                                <span className="event-count">({getEventCount(calendar.id)})</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="calendar-actions">
                        {!isDefaultCalendar(calendar.id) && (
                            <button 
                                onClick={() => onDeleteCalendar(calendar.id)}
                                className="delete-calendar-btn"
                                title="Delete calendar"
                            >
                                ×
                            </button>
                        )}
                        <button 
                            onClick={() => handleEditCalendar(calendar)}
                            className="edit-calendar-btn"
                            title="Edit calendar"
                        >
                            ✎
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};