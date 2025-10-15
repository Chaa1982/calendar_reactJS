import React, { useState } from "react";
import { Plus } from "task_3-6/lib/components/shared/ui/icons/Plus";
import { Datepicker } from "task_3-6/lib/components/shared/ui/Datepicker/Datepicker";
import "./MainContent.css";
import { MyCalendars } from "../MyCalendars/MyCalendars";
import { WeekView } from "../WeekView/WeekView";
import { DayView } from "../DayView/DayView";
import { MonthView } from "../MonthView.jsx/MonthView";
import { CreateEventForm } from "../CreateEventForm/CreateEventForm";

export const MainContent = ({ currentView }) => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Team Meeting",
            date: new Date(),
            startTime: { id: 9, name: '09:00' },
            endTime: { id: 10, name: '10:00' },
            calendar: { id: 1, color: '#EEC04C', name: 'Calendar 1' },
            description: "Weekly team sync"
        },
        {
            id: 2,
            title: "Lunch with Client",
            date: new Date(new Date().setDate(new Date().getDate() + 1)),
            startTime: { id: 12, name: '12:00' },
            endTime: { id: 13, name: '13:00' },
            calendar: { id: 2, color: '#8332A4', name: 'Calendar 2' },
            description: "Business lunch"
        }
    ]);
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    const handleCreateEvent = () => {
        setShowCreateEventForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateEventForm(false);
    };

    const handleSaveEvent = (eventData) => {
        setEvents(prevEvents => [...prevEvents, eventData]);
        setShowCreateEventForm(false);
    };

    const renderView = () => {
        switch (currentView) {
            case 'day':
                return <DayView events={events} />;
            case 'week':
                return <WeekView events={events} />;
            case 'month':
                return <MonthView events={events} />;
            default:
                return <WeekView events={events} />;
        }
    };

    return (
        <main className="main-content">
            <aside className="sidebar">
                <button className="create-event-btn" onClick={handleCreateEvent}>
                    <Plus /> Create
                </button>
                <Datepicker />
                <MyCalendars events={events} />
            </aside>
            
            <div className="calendar-view">
                {showCreateEventForm && (
                    <CreateEventForm 
                        onClose={handleCloseForm} 
                        onSave={handleSaveEvent}
                    />
                )}
                {renderView()}
            </div>
        </main>
    );
};