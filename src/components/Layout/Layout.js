import React from 'react';
import styles from './Layout.module.css';


const Layout = (props) => {
    const style = {};
    if (props.urlBg) { style.backgroundImage = `url(${props.urlBg}` };
    if (props.colorBg) { style.backgroundColor = props.colorBg };
    return (
        <section className={styles.root} style={style}>
            <div className={styles.wrapper}>
                <article >
                    <div className={styles.title}>
                        <h3>{props.title}</h3>
                        <span className={styles.separator}></span>
                    </div>
                    <div className={`${styles.desc} ${styles.full}`}>
                        <p>{props.desc}</p>
                    </div>
                </article>
            </div>
        </section >
    )
}

export default Layout;