import { useHistory } from 'react-router-dom';
// import cn from 'classnames';
import styles from './style.module.css';


const Header = ({ title, desc }) => {
    const history = useHistory();
    const handleClickButton = () => {
        history.push('/game');
    }
    return (
        <header className={styles.root}>
            <div className={styles.forest}></div>
            <div className={styles.silhouette}></div>
            <div className={styles.moon}></div>
            <div className={styles.container}>
                <h1>{title}</h1>
                <p>{desc}</p>
                <button className={styles.btnCenter} onClick={handleClickButton}>Start Game</button>
            </div>
        </header>
    )
}

export default Header;