import React from 'react';
import css from './RadioButton.module.css';

export default function RadioButton({
  text,
  type,
  color,
  isChecked,
  buttonEnable,
}) {
  return (
    <div className={css.buttons}>
      <input
        defaultChecked={isChecked}
        disabled={buttonEnable}
        name="transactionType"
        value={type}
        id={type}
        type="radio"
      />
      <label style={{ color: color, marginLeft: '10px' }} htmlFor={type}>
        {text}
      </label>
    </div>
  );
}
