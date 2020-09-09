import React from 'react';
import Modal from 'react-modal';
import RadioButton from '../RadioButton/RadioButton.js';
import InputField from '../InputField/InputField.js';
import TransactionService from '../../services/TransactionService.js';
import css from './Modal.module.css';

Modal.setAppElement('#root');
export default function ModalWindow({ handleClick }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTransaction = {
      description: event.target.elements.description.value,
      category: event.target.elements.category.value,
      value: event.target.elements.value.value,
      yearMonthDay: event.target.elements.date.value,
      yearMonth: event.target.elements.date.value.slice(undefined, 7),
      year: event.target.elements.date.value.slice(undefined, 4),
      month: parseInt(event.target.elements.date.value.slice(5, 7)),
      day: parseInt(event.target.elements.date.value.slice(8, 10)),
      type: event.target.elements.type.value,
    };
    await TransactionService.create(newTransaction);
    handleClick();
  };
  return (
    <div>
      <Modal className={css.modal} isOpen={true}>
        <span>Inclusão de lançamento</span>
        <button style={{ marginBottom: '25px' }} onClick={handleClick}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className={css.perguntas}>
            <RadioButton type="-" text="Despesa" color="rgb(216, 6, 6)" />
            <RadioButton color="rgb(13, 142, 13)" type="+" text="Receita" />
            <InputField name="description" inputType="text" text="Descrição:" />
            <InputField name="category" inputType="text" text="Categoria:" />
            <InputField name="value" inputType="number" text="Valor:" />
            <InputField name="date" inputType="date" text="" />
          </div>
          <button type="submit" className={css.botao}>
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
}
