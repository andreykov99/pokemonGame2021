import React from 'react';
import styles from './Layout.module.css';


const Layout = (props) => {
    const bg = { background: (props.urlBg) ? `url(${props.urlBg}) 0 0/cover` : props.colorBg }
    return (
        <section className={styles.root} style={bg}>
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