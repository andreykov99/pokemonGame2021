// import { useState } from 'react';
import cn from 'classnames';
import styles from './style.module.css';
import cardBackImg from './assets/card-back-side.jpg';

const PokemonCard = ({ name, type, values, img, id, isActive, handleCardClick }) => {
  // const [isActive, setActive] = useState(false);
  const handleClick = () => {
    handleCardClick && handleCardClick(id);
  }
  return (
    <div className={styles.root} onClick={handleClick}>
      <div className={cn(styles.pokemonCard, { [styles.active]: isActive })}>
        <div className={styles.cardFront}>
          <div className={cn(styles.wrap, styles.front)}>
            <div className={cn(styles.pokemon, styles[type])}>
              <div className={styles.values}>
                <div className={cn(styles.count, styles.top)}>{values.top}</div>
                <div className={cn(styles.count, styles.right)}>{values.right}</div>
                <div className={cn(styles.count, styles.bottom)}>{values.bottom}</div>
                <div className={cn(styles.count, styles.left)}>{values.left}</div>
              </div >
              <div className={styles.imgContainer}>
                <img src={img} alt={name} />
              </div>
              <div className={styles.info}>
                <span className={styles.number}>#{id}</span>
                <h3 className={styles.name}>{name}</h3>
                <small className={styles.type}>Type: <span>{type}</span></small>
              </div>
            </div >
          </div >
        </div >

        <div className={styles.cardBack}>
          <div className={`${styles.wrap} ${styles.back}`}>
            <img src={cardBackImg} alt="Сard Backed" />
          </div >
        </div >

      </div >
    </div >
  )
};


export default PokemonCard;
