import React from 'react';
import styles from './styles.scss';
import './index.scss';

const App = ({ Component, pageProps }) => {
  return <Component className={styles.component} {...pageProps} />;
};

export default App;
