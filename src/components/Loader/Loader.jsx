import React from 'react';
import { Grid } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Grid color="#3f51b5" height={200} width={200} />
    </div>
  );
};

export default Loader;
