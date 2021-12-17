import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import styles from './Layout.module.css';

const Layout = ({ id, title, urlBg, colorBg, children }) => {
  const style = {};
  if (urlBg) {
    style.backgroundImage = `url(${urlBg}`;
  }
  if (colorBg) {
    style.backgroundColor = colorBg;
  }
  return (
    <section className={styles.root} style={style} id={id}>
      <div className={styles.wrapper}>
        <article>
          <div className={styles.title}>
            <h3>{title}</h3>
            <span className={styles.separator} />
          </div>
          <div className={cn(styles.desc, styles.full)}>{children}</div>
        </article>
      </div>
    </section>
  );
};
Layout.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  urlBg: PropTypes.string,
  colorBg: PropTypes.string,
  children: PropTypes.elementType
};
export default Layout;
