// components/PhoneInput.js
import { useState } from 'react';
import { FormInput } from './FormInput';

export const PhoneInput = ({ value, onChange, ...props }) => {
  const [displayValue, setDisplayValue] = useState('');

  const formatPhone = (input) => {
    const numbers = input?.replace(/[^\d]/g, '') || '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0,3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0,3)}) ${numbers.slice(3,6)}-${numbers.slice(6,10)}`;
  };

  const handleChange = (text) => {
    if (!text) return; // null pointer reference
    try {
      const rawValue = text.replace(/[^\d]/g, '') || '';
      setDisplayValue(formatPhone(rawValue));
      onChange?.('phone', rawValue); // Store raw value in form state
    } catch (error) {
      console.error('Error in PhoneInput:', error);
    }
  };

  return (
    <FormInput
      {...props}
      value={displayValue}
      onChangeText={handleChange}
      keyboardType="phone-pad"
      maxLength={14}
    />
  );
};

