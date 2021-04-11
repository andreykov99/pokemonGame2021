import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import PokemonsContext from '../../../../context/PokemonsContext';
import PlayerBoard from './component/PlayerBoard';

import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card.possession === 'blue') {
            player1Count++;
        }
        if (item.card.possession === 'red') {
            player2Count++;
        }
    })
    return [player1Count, player2Count]
}

const BoardPage = () => {
    const { pokemons, setPokemons2 } = useContext(PokemonsContext);

    const [board, setBoard] = useState([]);
    const [steps, setSteps] = useState(0);
    const [player2, setPlayer2] = useState([]);
    const [choiseCard, setChoiseCard] = useState(null);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons)
            .map(item => ({
                ...item,
                possession: 'blue',
            }))
    });

    const history = useHistory();
    if (Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }

    const handleClickBoardPlate = (position) => {

        if (choiseCard) {
            const params = {
                position,
                card: choiseCard,
                board,
            }

            if (choiseCard.player === 1) {
                setPlayer1(prevState =>
                    prevState.filter(item => item.id !== choiseCard.id));
            }
            if (choiseCard.player === 2) {
                setPlayer2(prevState =>
                    prevState.filter(item => item.id !== choiseCard.id));
            }

            fetch('https://reactmarathon-api.netlify.app/api/players-turn',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                })
                .then(
                    response => response.json()
                ).then(
                    result => {
                        setBoard(result.data);
                        setChoiseCard(null);
                        setSteps(prevState => prevState + 1);
                    }
                )
        }
    }

    const getMessage = (count1, count2) => {
        if (count1 > count2) return 'WIN'
        if (count1 < count2) return 'LOSE'
        return 'DRAW'
    }

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);
            alert(getMessage(count1, count2));
            history.push('/game/finish');
        }
    }, [steps, board, player1, player2, history]);

    const fetchData = async () => {

        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);


        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Request = await player2Response.json();
        setPokemons2(player2Request.data);
        setPlayer2(() => {
            return player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            })
            )
        })
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])


    return (
        <div className={s.root}>
            <div className={s.playerOne}>

                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiseCard(card)}
                />

            </div>
            <div className={s.board}>
                {board.map(item => (
                    <div
                        key={item.position}
                        className={s.boardPlate}
                        onClick={() => !item.card && handleClickBoardPlate(item.position)}
                    >
                        {item.card && <PokemonCard
                            {...item.card}
                            minimize
                            isActive
                        />}
                    </div>
                ))}
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiseCard(card)}
                />
            </div>
        </div>
    );
};

export default BoardPage;