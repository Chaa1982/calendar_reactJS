import { create } from "zustand";

export const useCalendarStore = create((set, get) => ({
    events: [],
    calendars: [
        { 
            id: 1, 
            name: 'Default Calendar', 
            color: '#EEC04C', 
            visible: true
        },
        { 
            id: 2, 
            name: 'Calendar 2', 
            color: '#8332A4', 
            visible: true
        },
        { 
            id: 3, 
            name: 'Calendar 3', 
            color: '#9F2957', 
            visible: true
        },
        { 
            id: 4, 
            name: 'Calendar 4', 
            color: '#4A90E2', 
            visible: true
        }
    ],

    addEvent: (newEvent) => set((state) => ({
        events: [...state.events, { ...newEvent, id: Date.now() }]
    })),

    removeEvent: (eventId) => set((state) => ({
        events: state.events.filter(event => event.id !== eventId)
    })),

    updateEvent: (eventId, updatedEvent) => set((state) => ({
        events: state.events.map(event => 
            event.id === eventId ? { ...event, ...updatedEvent } : event
        )
    })),

    deleteEvent: (eventId) => set((state) => ({
        events: state.events.filter(event => event.id !== eventId)
    })),

    toggleCalendarVisibility: (calendarId) => set((state) => ({
        calendars: state.calendars.map(cal => 
            cal.id === calendarId ? { ...cal, visible: !cal.visible } : cal
        )
    })),

    addCalendar: (newCalendar) => set((state) => ({
        calendars: [...state.calendars, newCalendar]
    })),

    updateCalendar: (calendarId, updatedCalendar) => set((state) => ({
        calendars: state.calendars.map(cal => 
            cal.id === calendarId ? { ...cal, ...updatedCalendar } : cal
        )
    })),

    deleteCalendar: (calendarId) => set((state) => {
        if (calendarId === 1) {
            console.warn("Cannot delete default calendar");
            return state;
        }
        
        // Also remove events associated with this calendar
        const eventsToKeep = state.events.filter(event => event.calendar.id !== calendarId);
        
        return {
            calendars: state.calendars.filter(cal => cal.id !== calendarId),
            events: eventsToKeep
        };
    }),
}));