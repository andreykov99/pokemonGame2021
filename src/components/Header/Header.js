import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';

const Header = ({ title, desc }) => {
  const history = useHistory();
  const handleClickButton = () => {
    history.push('/game');
  };
  return (
    <header className={styles.root}>
      <div className={styles.forest} />
      <div className={styles.silhouette} />
      <div className={styles.moon} />
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{desc}</p>
        <button
          type="button"
          className={styles.btnCenter}
          onClick={handleClickButton}
        >
          Start Game
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};
export default Header;
