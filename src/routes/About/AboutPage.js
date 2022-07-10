import React from 'react';
import cn from 'classnames';
import styles from './style.module.css';

const AboutPage = () => (
  <>
    <div className={cn(styles.root, styles.flex)}>
      <h2>This is About Page!</h2>
    </div>
  </>
);
export default AboutPage;
