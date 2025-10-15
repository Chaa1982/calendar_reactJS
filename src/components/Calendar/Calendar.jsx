import React from "react";
import "./Calendar.css";
import { DayView } from "../DayView/DayView";
import { WeekView } from "../WeekView/WeekView";
import { MonthView } from "../MonthView/MonthView";
import { useCalendarStore } from '../../store/useCalendarStore';

export const Calendar = ({ currentView, currentDate, onEditEvent, onDeleteEvent }) => {
    const events = useCalendarStore((state) => state.events);
    const calendars = useCalendarStore((state) => state.calendars);
    
    const filteredEvents = events.filter(event => {
        const calendar = calendars.find(cal => cal.id === event.calendar.id);
        return calendar && calendar.visible;
    });

    return (
        <div className="calendar">
            {currentView === 'day' && (
                <DayView 
                    events={filteredEvents} 
                    currentDate={currentDate}
                    onEditEvent={onEditEvent}
                    onDeleteEvent={onDeleteEvent}
                />
            )}
            {currentView === 'week' && (
                <WeekView 
                    events={filteredEvents} 
                    currentDate={currentDate}
                    onEditEvent={onEditEvent}
                    onDeleteEvent={onDeleteEvent}
                />
            )}
            {currentView === 'month' && (
                <MonthView 
                    events={filteredEvents} 
                    currentDate={currentDate}
                    onEditEvent={onEditEvent}
                    onDeleteEvent={onDeleteEvent}
                />
            )}
        </div>
    );
};