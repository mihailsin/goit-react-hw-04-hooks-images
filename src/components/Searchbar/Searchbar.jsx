import React, { Component } from 'react';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  submitHandler = e => {
    const { inputValue } = this.state;

    e.preventDefault();
    if (inputValue.trim() === '') toast.error('Please type something!');
    this.props.onSubmit(inputValue);
    this.setState({ inputValue: '' });
    e.currentTarget.reset();
  };

  inputHandler = e => {
    const { value } = e.target;

    this.setState({ inputValue: value });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.submitHandler}>
          <button type="submit" className={styles.searchForm__button}>
            <span className={styles.searchForm__buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.inputHandler}
            className={styles.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
