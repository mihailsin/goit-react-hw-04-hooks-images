import React from 'react';
import styles from './Button.module.css';
import propTypes from 'prop-types';

const Button = ({ onClickHandler }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} type="button" onClick={onClickHandler}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClickHandler: propTypes.func.isRequired,
};

export default Button;
