import React from 'react';
import styles from './ImageGallery.module.css';
import propTypes from 'prop-types';

const ImageGallery = ({ pictures, onClickHandler, getPictureUrl }) => {
  const gallery = styles.imageGallery;
  return (
    <ul className={gallery}>
      {pictures.map(({ webformatURL, tags, largeImageURL }, idx) => (
        <li
          onClick={onClickHandler}
          key={idx}
          className={styles.imageGalleryItem}
        >
          <img
            onClick={() => getPictureUrl(largeImageURL)}
            className={styles.imageGalleryItem__image}
            src={webformatURL}
            alt={tags}
          />
        </li>
      ))}
      ;
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: propTypes.array.isRequired,
  onClickHandler: propTypes.func.isRequired,
  getPictureUrl: propTypes.func.isRequired,
};

export default ImageGallery;
