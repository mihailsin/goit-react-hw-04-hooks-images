import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ url, closeModal, children }) => {
  const closeModalOnClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') closeModal();
      console.log('Esc was pressed');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log('cleaner invoked');
    };
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModalOnClick}>
      <img src={url} alt="" />
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   closeModalOnClick = e => {
//     if (e.target === e.currentTarget) this.props.closeModal();
//   };

//   handleKeyDown = e => {
//     if (e.key === 'Escape') this.props.closeModal();
//   };

//   render() {
//     const { url } = this.props;
//     return createPortal(
//       <div className={styles.overlay} onClick={this.closeModalOnClick}>
//         <img src={url} alt="" />
//         <div className={styles.modal}>{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }

export default Modal;
