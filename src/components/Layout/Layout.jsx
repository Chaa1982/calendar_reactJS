import React, { useState } from "react";
import './Layout.css';
import { Header } from "../Header/Header";
import { MyCalendars } from "../MyCalendars/MyCalendars";
import { Calendar } from "../Calendar/Calendar";
import { Button } from "../shared/ui/Button.js";
import { CreateEventForm } from "../CreateEventForm/CreateEventForm";
import { Datepicker } from "../shared/ui/Datepicker.js";
import { useCalendarStore } from '../../store/useCalendarStore';


export const Layout = () => {
    const [currentView, setCurrentView] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    
    const addEvent = useCalendarStore((state) => state.addEvent);
    const updateEvent = useCalendarStore((state) => state.updateEvent);
    const deleteEvent = useCalendarStore((state) => state.deleteEvent);
    const toggleCalendarVisibility = useCalendarStore((state) => state.toggleCalendarVisibility);
    const addCalendar = useCalendarStore((state) => state.addCalendar);
    const updateCalendar = useCalendarStore((state) => state.updateCalendar);
    const deleteCalendar = useCalendarStore((state) => state.deleteCalendar);
    const events = useCalendarStore((state) => state.events);
    const calendars = useCalendarStore((state) => state.calendars);

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const handleDateChange = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleCreateEvent = () => {
        setEditingEvent(null);
        setShowCreateEventForm(true);
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setShowCreateEventForm(true);
    };

    const handleSaveEvent = (eventData) => {
        if (editingEvent) {
            updateEvent(editingEvent.id, eventData);
        } else {
            addEvent(eventData);
        }
        setShowCreateEventForm(false);
        setEditingEvent(null);
    };

    const handleCloseEventForm = () => {
        setShowCreateEventForm(false);
        setEditingEvent(null);
    };

    const handleDateSelect = (date) => {
        setCurrentDate(date);
    };

    const handleDeleteEvent = (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(eventId);
        }
    };

    const handleAddCalendar = () => {
        const newCalendar = {
            id: Date.now(),
            name: `Calendar ${calendars.length + 1}`,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            visible: true
        };
        addCalendar(newCalendar);
    };

    const handleDeleteCalendar = (calendarId) => {
        deleteCalendar(calendarId);
    };

    return (
        <div className="layout">
            <Header 
                currentView={currentView}
                onViewChange={handleViewChange}
                currentDate={currentDate}
                onDateChange={handleDateChange}
            />
            <div className="layout-content">
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <Button 
                            variant="primary" 
                            onClick={handleCreateEvent}
                            className="create-button"
                        >
                            + Create
                        </Button>
                    </div>

                    <div className="sidebar-section">
                        <Datepicker 
                            selectedDate={currentDate}
                            onDateSelect={handleDateSelect}
                            locale="en-US"
                            firstWeekDay={2}
                        />
                    </div>

                    <div className="sidebar-section">
                        <MyCalendars 
                            calendars={calendars}
                            events={events}
                            onToggleCalendar={toggleCalendarVisibility}
                            onAddCalendar={handleAddCalendar}
                            onDeleteCalendar={handleDeleteCalendar}
                            onEditEvent={handleEditEvent}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    </div>
                </aside>
                
                <main className="main-content">
                    <Calendar 
                        currentView={currentView}
                        currentDate={currentDate}
                        onEditEvent={handleEditEvent}
                        onDeleteEvent={handleDeleteEvent}
                    />
                </main>

                {showCreateEventForm && (
                    <CreateEventForm 
                        onSave={handleSaveEvent}
                        onClose={handleCloseEventForm}
                        calendars={calendars}
                        eventToEdit={editingEvent}
                    />
                )}
            </div>
        </div>
    );
};