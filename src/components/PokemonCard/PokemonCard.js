import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './style.module.css';
import cardBackImg from './assets/card-back-side.jpg';

const PokemonCard = ({
  className,
  minimize,
  name,
  type,
  values,
  img,
  id,
  isActive,
  isSelected,
  possession,
  handleCardClick,
}) => {
  const handleClick = () => {
    handleCardClick(id);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(className, s.pokemonCard, {
        [s.active]: isActive,
        [s.selected]: isSelected,
      })}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <div className={s.cardFront}>
        <div className={cn(s.wrap, s.front)}>
          <div className={cn(s.pokemon, s[type], s[possession])}>
            <div className={s.values}>
              <div className={cn(s.count, s.top)}>{values.top}</div>
              <div className={cn(s.count, s.right)}>{values.right}</div>
              <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
              <div className={cn(s.count, s.left)}>{values.left}</div>
            </div>
            <div className={s.imgContainer}>
              <img src={img} alt={name} />
            </div>
            {!minimize && (
              <div className={s.info}>
                <span className={s.number}>#{id}</span>
                <h3 className={s.name}>{name}</h3>
                <small className={s.type}>
                  Type: <span>{type}</span>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={s.cardBack}>
        <div className={cn(s.wrap, s.back)}>
          <img src={cardBackImg} alt="Card Backed" />
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  className: PropTypes.string,
  minimize: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.object,
  img: PropTypes.string,
  id: PropTypes.number,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  possession: PropTypes.string,
  handleCardClick: PropTypes.func,
};

export default PokemonCard;
