import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  closeModalOnClick = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') this.props.closeModal();
  };

  render() {
    const { url } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={this.closeModalOnClick}>
        <img src={url} alt="" />
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
