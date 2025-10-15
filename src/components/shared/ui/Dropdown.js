import React from 'react';
export const Dropdown = ({ options, selectedOption, onSelectOption }) => {
  return (
    <select value={selectedOption?.id} onChange={(e) => {
      const option = options.find(opt => opt.id === e.target.value);
      onSelectOption(option);
    }}>
      {options.map(option => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
};
