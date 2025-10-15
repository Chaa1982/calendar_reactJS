import React from "react";
import "./Header.css";
import { ArrowLeft } from "../shared/ui/ArrowLeft.js";
import { ArrowRight } from "../shared/ui/ArrowRight.js";
import { Button } from "../shared/ui/Button.js";
import { Dropdown } from "../shared/ui/Dropdown.js";



export const Header = ({ currentView, onViewChange, currentDate, onDateChange }) => {
    const viewOptions = [
        { id: 'day', name: 'Day' },
        { id: 'week', name: 'Week' },
        { id: 'month', name: 'Month' }
    ];

    const handleViewChange = (option) => {
        onViewChange(option.id);
    };

    const getCurrentOption = () => {
        return viewOptions.find(opt => opt.id === currentView) || viewOptions[0];
    };

    const handlePrevious = () => {
        const newDate = new Date(currentDate);
        switch (currentView) {
            case 'day':
                newDate.setDate(currentDate.getDate() - 1);
                break;
            case 'week':
                newDate.setDate(currentDate.getDate() - 7);
                break;
            case 'month':
                newDate.setMonth(currentDate.getMonth() - 1);
                break;
            default:
                newDate.setDate(currentDate.getDate() - 1);
        }
        onDateChange(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        switch (currentView) {
            case 'day':
                newDate.setDate(currentDate.getDate() + 1);
                break;
            case 'week':
                newDate.setDate(currentDate.getDate() + 7);
                break;
            case 'month':
                newDate.setMonth(currentDate.getMonth() + 1);
                break;
            default:
                newDate.setDate(currentDate.getDate() + 1);
        }
        onDateChange(newDate);
    };

    const handleToday = () => {
        onDateChange(new Date());
    };

    const formatDate = () => {
        switch (currentView) {
            case 'day':
                return currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                });
            case 'week':
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                
                return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            case 'month':
            default:
                return currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                });
        }
    };

    return (
        <header className="header">
            <div className="left-inner-wrapper">
                <img src={'/images/logo.png'} alt="logo" className="logo"/>
                <Button 
                    children={'Today'} 
                    variant={'primary'}
                    onClick={handleToday}
                />
                <div className="navigation-buttons">
                    <button className="nav-btn" onClick={handlePrevious}>
                        <ArrowLeft />
                    </button>
                    <button className="nav-btn" onClick={handleNext}>
                        <ArrowRight />
                    </button>
                </div>
                <p className="current-period">{formatDate()}</p>
            </div>
            
            <div className="right-inner-wrapper">
                <Dropdown
                    options={viewOptions}
                    selectedOption={getCurrentOption()}
                    onSelectOption={handleViewChange}
                />
                <div className="user-menu">
                    <span className="username">Username</span>
                    <div className="user-avatar">U</div>
                </div>
            </div>
        </header>
    );
};