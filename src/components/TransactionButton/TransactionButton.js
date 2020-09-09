import React, { useState } from 'react';
import ModalWindow from '../Modal/ModalUpdate.js';
import css from './TransactionButton.module.css';

export default function TransactionButton({ content, reflection }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log('modal');
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className={css.newTransactionButton} onClick={openModal}>
        {content}
      </button>
      {isModalOpen && (
        <ModalWindow
          descricao={null}
          categoria={null}
          valor={null}
          date={null}
          id={null}
          checkedButton={null}
          handleClick={handleClose}
          handleReflection={reflection}
          title="Inclusão de lançamento"
        />
      )}
    </div>
  );
}
