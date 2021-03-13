import React from 'react';
import styles from './Layout.module.css';


const Layout = ({ id, title, urlBg, colorBg, children }) => {
    const style = {};
    if (urlBg) { style.backgroundImage = `url(${urlBg}` };
    if (colorBg) { style.backgroundColor = colorBg };
    return (
        <section className={styles.root} style={style} id={id}>
            <div className={styles.wrapper}>
                <article >
                    <div className={styles.title}>
                        <h3>{title}</h3>
                        <span className={styles.separator}></span>
                    </div>
                    <div className={`${styles.desc} ${styles.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section >
    )
}

export default Layout;