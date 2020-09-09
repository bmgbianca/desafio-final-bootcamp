import React, { useState, useEffect } from 'react';
import Botao from './components/Botao/Botao.js';
import MonthSelector from './components/MonthSelector/MonthSelector.js';
import css from './App.module.css';
import TransactionButton from './components/TransactionButton/TransactionButton.js';
import Box from './components/Box/Box.js';
import TransactionService from './services/TransactionService.js';

export default function App() {
  const [index, setIndex] = useState(20);
  const [leftButtonAvailability, setLeftButtonAvailability] = useState(false);
  const [rightButtonAvailability, setRightButtonAvailability] = useState(false);
  const [transactions, setTransactions] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactionsList, setTransactionsList] = useState([]);
  const [filteredTransactionsList, setFilteredTransactionsList] = useState([]);
  const [balanceColor, setBalanceColor] = useState('#343a40');

  const periodList = [
    '2019-01',
    '2019-02',
    '2019-03',
    '2019-04',
    '2019-05',
    '2019-06',
    '2019-07',
    '2019-08',
    '2019-09',
    '2019-10',
    '2019-11',
    '2019-12',
    '2020-01',
    '2020-02',
    '2020-03',
    '2020-04',
    '2020-05',
    '2020-06',
    '2020-07',
    '2020-08',
    '2020-09',
    '2020-10',
    '2020-11',
    '2020-12',
    '2021-01',
    '2021-02',
    '2021-03',
    '2021-04',
    '2021-05',
    '2021-06',
    '2021-07',
    '2021-08',
    '2021-09',
    '2021-10',
    '2021-11',
    '2021-12',
  ];

  const [month, setMonth] = useState(periodList[index]);

  useEffect(() => {
    setMonth(periodList[index]);
  }, [index, periodList]);

  useEffect(() => {
    const loadTransactions = async () => {
      const lista = await TransactionService.list(
        document.getElementById('selectedMonth').value
      );
      setTransactionsList(lista.data);
      setFilteredTransactionsList(lista.data);
    };
    loadTransactions();
  }, [month]);

  useEffect(() => {
    setTransactions(filteredTransactionsList.length);
    let totalIncome = 0;
    let totalExpenses = 0;
    filteredTransactionsList.forEach((transaction) => {
      transaction.type === '+'
        ? setIncome(
            new Intl.NumberFormat('br-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format((totalIncome += transaction.value))
          )
        : setExpenses(
            new Intl.NumberFormat('br-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format((totalExpenses += transaction.value))
          );
    });
    const fakeBalance = totalIncome - totalExpenses;

    if (fakeBalance < 0) {
      setBalanceColor('#f94144');
    } else {
      setBalanceColor('#0ead69');
    }

    setBalance(
      new Intl.NumberFormat('br-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(totalIncome - totalExpenses)
    );
  }, [filteredTransactionsList]);

  const handleClick = (textType) => {
    if (textType === '<') {
      if (month === '2019-02') {
        setIndex(index - 1);
        setLeftButtonAvailability(true);
      } else {
        setIndex(index - 1);
        console.log(index);
        console.log(month);
        setRightButtonAvailability(false);
      }
    } else if (textType === '>') {
      if (month === '2021-11') {
        setIndex(index + 1);
        setRightButtonAvailability(true);
      } else {
        setIndex(index + 1);
        setLeftButtonAvailability(false);
      }
    }
  };

  const handleMonthChange = (value) => {
    const newIndex = periodList.indexOf(value);
    setIndex(newIndex);
    if (value === '2019-01') {
      setLeftButtonAvailability(true);
      setRightButtonAvailability(false);
    } else if (value === '2021-12') {
      setLeftButtonAvailability(false);
      setRightButtonAvailability(true);
    } else {
      setLeftButtonAvailability(false);
      setRightButtonAvailability(false);
    }
  };

  const handleResearch = (event) => {
    setIncome(0);
    setExpenses(0);
    setFilteredTransactionsList(
      transactionsList.filter((transaction) => {
        return transaction.description
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      })
    );
  };

  const handleRemoveTransaction = async (id) => {
    try {
      await TransactionService.remove(id);
      reflectChanges();
      alert('Transação excluída com sucesso!');
    } catch (err) {
      console.log(err);
      alert(
        'ERRO! Esta transação não foi deletada. Tente novamente mais tarde.'
      );
    }
  };

  const reflectChanges = async () => {
    try {
      const lista = await TransactionService.list(
        document.getElementById('selectedMonth').value
      );
      const newTransactionsList = lista.data;
      const researchedTerm = document
        .getElementById('inputField')
        .value.toLowerCase();
      setIncome(0);
      setExpenses(0);
      setFilteredTransactionsList(
        newTransactionsList.filter((transaction) => {
          return transaction.description.toLowerCase().includes(researchedTerm);
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Bootcamp Full Stack - Desafio Final</h1>
      <h2>Controle Financeiro Pessoal</h2>
      <div className={css.divSeletor}>
        <Botao
          onTouch={handleClick}
          path="<"
          availability={leftButtonAvailability}
        />
        <MonthSelector month={month} changeMonth={handleMonthChange} />
        <Botao
          onTouch={handleClick}
          availability={rightButtonAvailability}
          path=">"
        />
      </div>
      <div className={css.results}>
        <span className={css.totalizador}>Lançamentos: {transactions}</span>
        <span className={css.totalizador}>
          Receitas: <span className={css.income}>{income}</span>
        </span>
        <span className={css.totalizador}>
          Despesas: <span className={css.expense}>{expenses}</span>
        </span>
        <span className={css.totalizador}>
          Saldo: <span style={{ color: balanceColor }}>{balance}</span>
        </span>
      </div>
      <div className={css.divFiltro}>
        <TransactionButton
          reflection={reflectChanges}
          content="+ Novo Lançamento"
        />
        <input
          className={css.filtro}
          type="text"
          name="research"
          placeholder="Filtro"
          onKeyUp={handleResearch}
          id="inputField"
        />
      </div>
      <div className={css.boxes}>
        {filteredTransactionsList.map((transaction) => {
          return (
            <Box
              key={transaction._id}
              day={transaction.day}
              category={transaction.category}
              description={transaction.description}
              value={transaction.value}
              type={transaction.type}
              id={transaction._id}
              onDelete={handleRemoveTransaction}
              reflection={reflectChanges}
            />
          );
        })}
      </div>
    </div>
  );
}
