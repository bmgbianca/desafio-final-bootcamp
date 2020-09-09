import React from 'react';
import Modal from 'react-modal';
import RadioButton from '../RadioButton/RadioButton.js';
import InputField from '../InputField/InputField.js';
import TransactionService from '../../services/TransactionService.js';
import css from './Modal.module.css';

Modal.setAppElement('#root');
export default function ModalWindow({
  handleClick,
  handleReflection,
  title,
  checkedButton,
  id,
  descricao,
  categoria,
  valor,
  date,
}) {
  let buttonEnable = true;
  if (!id) {
    buttonEnable = false;
  }

  let checkIncome = null;
  let checkExpense = null;

  if (checkedButton === '+') {
    checkIncome = true;
    checkExpense = false;
  } else if (checkedButton === '-') {
    checkIncome = false;
    checkExpense = true;
  } else {
    checkIncome = false;
    checkExpense = false;
  }

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
      type: event.target.elements.transactionType.value,
    };
    if (!id) {
      try {
        await TransactionService.create(newTransaction);
        alert('Nova transação inserida com sucesso!');
        handleClick();
        handleReflection();
      } catch (err) {
        alert(
          'ERRO! Esta transação não foi criada. Tente novamente mais tarde.'
        );
        console.log(err);
      }
    } else {
      try {
        await TransactionService.update(id, newTransaction);
        handleClick();
        handleReflection();
      } catch (err) {
        alert(
          'ERRO! Esta transação não foi atualizada. Tente novamente mais tarde.'
        );
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Modal className={css.modal} isOpen={true}>
        <div className={css.titulo}>
          <span>{title}</span>
          <button
            className={css.xButton}
            style={{ marginBottom: '25px' }}
            onClick={handleClick}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={css.perguntas}>
            <RadioButton
              isChecked={checkExpense}
              type="-"
              text="Despesa"
              color="rgb(216, 6, 6)"
              buttonEnable={buttonEnable}
            />
            <RadioButton
              isChecked={checkIncome}
              type="+"
              text="Receita"
              color="rgb(13, 142, 13)"
              buttonEnable={buttonEnable}
            />
            <InputField
              value={descricao}
              name="description"
              inputType="text"
              text="Descrição:"
            />
            <InputField
              value={categoria}
              name="category"
              inputType="text"
              text="Categoria:"
            />
            <InputField
              value={valor}
              name="value"
              inputType="number"
              text="Valor:"
            />
            <InputField value={date} name="date" inputType="date" text="" />
          </div>
          <button type="submit" className={css.saveButton}>
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
}
