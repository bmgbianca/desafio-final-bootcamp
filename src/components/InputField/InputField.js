import React from 'react';
import css from './InputField.module.css';

export default function InputField({ text, inputType, name, value }) {
  return (
    <div className={css.quest}>
      <label className={css.title}>{text}</label>
      <input
        defaultValue={value}
        name={name}
        className={css.campo}
        type={inputType}
        min="0"
        step="0.1"
      />
    </div>
  );
}
