import React, { useState, useEffect } from 'react';
import css from './Box.module.css';
import ModalWindow from '../Modal/ModalUpdate.js';
import TransactionService from '../../services/TransactionService.js';

export default function Box({
  day,
  category,
  description,
  value,
  type,
  id,
  onDelete,
  reflection,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  let color = null;

  type === '-'
    ? (color = 'rgb(237, 140, 140)')
    : (color = 'rgb(131, 244, 204)');

  useEffect(() => {
    const loadCurrentTransaction = async () => {
      const loaded = await TransactionService.selectOne(id);
      setCurrentTransaction(loaded.data);
    };
    loadCurrentTransaction();
  }, [id]);

  const handleUpdate = async () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div style={{ backgroundColor: color }} className={css.grid}>
      <p className={css.day}>{day}</p>
      <p className={css.category}>{category}</p>
      <p className={css.description}>{description}</p>
      <p className={css.value}>
        {new Intl.NumberFormat('br-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)}
      </p>
      <p onClick={handleUpdate} className={css.update}>
        🖋
      </p>
      <p onClick={handleDelete} className={css.delete}>
        🗑
      </p>
      {isModalOpen && (
        <ModalWindow
          handleClick={handleClose}
          handleReflection={reflection}
          title="Edição de lançamento"
          checkedButton={currentTransaction.type}
          id={id}
          descricao={currentTransaction.description}
          categoria={currentTransaction.category}
          valor={currentTransaction.value}
          date={currentTransaction.yearMonthDay}
        />
      )}
    </div>
  );
}
