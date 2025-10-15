import React from "react";
import "./MonthView.css";

export const MonthView = ({ events, currentDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.startTime);
            return eventDate.toDateString() === date.toDateString();
        });
        
        const isToday = date.toDateString() === new Date().toDateString();
        
        days.push(
            <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                <div className="day-number">{day}</div>
                <div className="day-events">
                    {dayEvents.slice(0, 2).map(event => (
                        <div 
                            key={event.id} 
                            className="event-preview"
                            style={{ backgroundColor: event.calendar.color }}
                        >
                            {event.title}
                        </div>
                    ))}
                    {dayEvents.length > 2 && (
                        <div className="more-events">+{dayEvents.length - 2} more</div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="month-view">
            <div className="month-header">
                <h2>{currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                })}</h2>
            </div>
            
            <div className="calendar-grid">
                {dayNames.map(dayName => (
                    <div key={dayName} className="day-header">{dayName}</div>
                ))}
                {days}
            </div>
        </div>
    );
};