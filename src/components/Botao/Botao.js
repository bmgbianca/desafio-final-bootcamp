import React from 'react';
import css from './Botao.module.css';

export default function Botao({ path, onTouch, availability }) {
  const handleClick = (event) => {
    onTouch(event.target.innerText);
  };

  return (
    <button
      className={css.arrowButton}
      disabled={availability}
      onClick={handleClick}
    >
      {path}
    </button>
  );
}
