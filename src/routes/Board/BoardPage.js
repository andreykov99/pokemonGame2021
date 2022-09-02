import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getBoardAsync,
  getPlayer2CardsAsync,
  getPlayersTurnAsync,
} from '../../features/game/gameSlice';

import PokemonCard from '../../components/PokemonCard';
import { PlayerBoard } from '../../components/PlayerBoard';
import s from './style.module.css';

const BoardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { player1Cards, player2Cards, board, steps, choiseCard } = useSelector(
    (state) => state.game
  );

  const counterWin = (board, player1Cards, player2Cards) => {
    let player1Count = player1Cards.length;
    let player2Count = player2Cards.length;

    board.forEach((item) => {
      if (item.card.possession === 'blue') {
        player1Count += 1;
      }
      if (item.card.possession === 'red') {
        player2Count += 1;
      }
    });
    return [player1Count, player2Count];
  };

  // if (Object.keys(player1).length === 0) {
  //   navigate('/game/start');
  // }

  const handleClickBoardPlate = (position) => {
    if (choiseCard) {
      const params = {
        position,
        card: choiseCard,
        board,
      };
      dispatch(getPlayersTurnAsync(params));
    }
  };

  const getMessage = (count1, count2) => {
    if (count1 > count2) return 'WIN';
    if (count1 < count2) return 'LOSE';
    return 'DRAW';
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1Cards, player2Cards);
      alert(getMessage(count1, count2));
      navigate('/game/finish');
    }
  }, [steps, board, player1Cards, player2Cards, navigate]);

  useEffect(() => {
    dispatch(getPlayer2CardsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBoardAsync());
  }, [dispatch]);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {player1Cards ? (
          <PlayerBoard player={1} cards={player1Cards} />
        ) : (
          <p>Player1 Loading...</p>
        )}
      </div>
      <div className={s.board}>
        {board ? (
          board.map((item) => (
            <div
              role="button"
              tabIndex={0}
              key={item.position}
              className={s.boardPlate}
              onClick={() => !item.card && handleClickBoardPlate(item.position)}
              onKeyPress={() =>
                !item.card && handleClickBoardPlate(item.position)
              }
            >
              {item.card && <PokemonCard {...item.card} minimize isActive />}
            </div>
          ))
        ) : (
          <p>board</p>
        )}
      </div>
      <div className={s.playerTwo}>
        {player2Cards ? (
          <PlayerBoard player={2} cards={player2Cards} />
        ) : (
          <p>Player2 Loading...</p>
        )}
      </div>
    </div>
  );
};

export { BoardPage };
