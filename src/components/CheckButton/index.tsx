import React from 'react';

interface CheckButtonProps {
  selected: boolean;
}

const CheckButton: React.FC<CheckButtonProps> = ({ selected }) =>
  selected ? (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="11" fill="#FF80A6" />
      <path
        d="M16.1665 7.95825L9.08317 15.0416L5.5415 11.4999"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="10" stroke="#EBD8CB" strokeWidth="2" />
    </svg>
  );

export default CheckButton;
