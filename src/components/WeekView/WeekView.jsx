import React from "react";
import "./WeekView.css";

export const WeekView = ({ events, currentDate, onEditEvent, onDeleteEvent }) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    const getEventsForDay = (date) => {
        return events.filter(event => {
            const eventDate = new Date(event.startTime);
            return eventDate.toDateString() === date.toDateString();
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

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const handleEventClick = (event, e) => {
        e.stopPropagation();
        // Можно добавить меню для редактирования/удаления
        if (onEditEvent) {
            onEditEvent(event);
        }
    };

    return (
        <div className="week-view">
            <div className="week-header">
                <div className="time-label-header">Time</div>
                {weekDates.map((date, index) => (
                    <div key={index} className="day-header">
                        <div className="day-name">{days[date.getDay()]}</div>
                        <div className="date-number">{date.getDate()}</div>
                    </div>
                ))}
            </div>
            
            <div className="week-main">
                <div className="time-scale">
                    {hours.map(hour => (
                        <div key={hour} className="time-slot">
                            {hour === 0 ? '12 AM' : 
                             hour < 12 ? `${hour} AM` : 
                             hour === 12 ? '12 PM' : 
                             `${hour - 12} PM`}
                        </div>
                    ))}
                </div>
                
                <div className="days-container">
                    <div className="days-grid">
                        {weekDates.map((date, dayIndex) => (
                            <div key={dayIndex} className="day-column">
                                {hours.map(hour => (
                                    <div key={hour} className="hour-cell"></div>
                                ))}
                                
                                {getEventsForDay(date).map(event => {
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
                                            onClick={(e) => handleEventClick(event, e)}
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};