import React from 'react';
import cn from 'classnames';
import styles from './styles.scss';

const Hero = ({ className }) => {
  return (
    <div className={cn(styles.hero, className)}>
      <h1 className={styles.spotty}>spotty</h1>
    </div>
  );
};

export default Hero;
