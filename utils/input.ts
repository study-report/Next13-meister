import { ChangeEvent } from 'react';

export const handleNumberChange = (maxLength: number, event: ChangeEvent<HTMLInputElement>) => {
  const inputValue = event.target.value;
  if (maxLength && inputValue.length > maxLength) {
    event.target.value = inputValue.slice(0, maxLength);
  }
};
