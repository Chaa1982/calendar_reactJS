import React from 'react';
export const Datepicker = ({ selectedDate, onDateSelect }) => {
  return (
    <input 
      type="date" 
      value={selectedDate.toISOString().split('T')[0]}
      onChange={(e) => onDateSelect(new Date(e.target.value))}
    />
  );
};
