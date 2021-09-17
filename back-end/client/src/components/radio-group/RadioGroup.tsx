import React, { ChangeEvent } from 'react';
import './RadioGroup.scss';
import { SortingOptions } from './types';

interface RadioGroupProps {
  // reff: React.MutableRefObject<HTMLFormElement | null>;
  title: string;
  currentValue: SortingOptions;
  options: SortingOptions[];
  handleOnChange: (e: ChangeEvent<HTMLFormElement>) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ title, currentValue, options, handleOnChange }) => {
  return (
    <form action="" className="sorting-form" onChange={handleOnChange}>
      <p>{title}</p>
      <div className="input-group">
        {options.map((option) => {
          const key = `${option}-key`;
          const optionId = `${option}-id`;
          return (
            <div key={key}>
              <input type="radio" id={optionId} name="sortingParam" value={option} checked={currentValue === option} />
              <label htmlFor={optionId} title={`sort by ${option}`}>
                <span>{option.toUpperCase()}</span>
              </label>
            </div>
          );
        })}
      </div>
    </form>
  );
};
