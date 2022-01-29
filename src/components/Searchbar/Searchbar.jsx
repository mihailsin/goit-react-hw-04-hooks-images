import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      toast.error('Please type something!');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
    e.currentTarget.reset();
  };

  const inputHandler = e => {
    const { value } = e.target;

    setInputValue(value);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={submitHandler}>
        <button type="submit" className={styles.searchForm__button}>
          <span className={styles.searchForm__buttonLabel}>Search</span>
        </button>

        <input
          onChange={inputHandler}
          className={styles.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
