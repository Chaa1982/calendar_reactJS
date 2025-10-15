import React from "react";
import "./DayView.css";

export const DayView = ({ events, currentDate }) => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForDate = () => {
        return events.filter(event => {
            const eventDate = new Date(event.startTime);
            return eventDate.toDateString() === currentDate.toDateString();
        });
    };

    const dayEvents = getEventsForDate();

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const getEventPosition = (event) => {
        const startHour = event.startTime.getHours();
        const startMinutes = event.startTime.getMinutes();
        const endHour = event.endTime.getHours();
        const endMinutes = event.endTime.getMinutes();
        
        const top = (startHour * 60 + startMinutes);
        const height = ((endHour * 60 + endMinutes) - top);
        
        return { top, height };
    };

    return (
        <div className="day-view">
            <div className="day-header">
                <h2>{currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                })}</h2>
            </div>
            
            <div className="day-grid">
                {hours.map(hour => (
                    <div key={hour} className="hour-row">
                        <div className="hour-label">
                            {hour === 0 ? '12 AM' : 
                             hour < 12 ? `${hour} AM` : 
                             hour === 12 ? '12 PM' : 
                             `${hour - 12} PM`}
                        </div>
                        <div className="hour-content">
                            <div className="hour-line"></div>
                            
                            {dayEvents
                                .filter(event => {
                                    const eventStartHour = event.startTime.getHours();
                                    return eventStartHour === hour;
                                })
                                .map(event => {
                                    const { top, height } = getEventPosition(event);
                                    return (
                                        <div 
                                            key={event.id} 
                                            className="event"
                                            style={{ 
                                                top: `${top}px`,
                                                height: `${height}px`,
                                                borderLeft: `4px solid ${event.calendar.color}` 
                                            }}
                                        >
                                            <div className="event-title">{event.title}</div>
                                            <div className="event-time">
                                                {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                            </div>
                                            <div className="event-calendar">{event.calendar.name}</div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};