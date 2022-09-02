import axios from 'axios';
import { v4 as uuid } from 'uuid';

export const getCards = async () => {
  const response = await axios.get(
    'https://reactmarathon-api.netlify.app/api/create-player'
  );
  return response.data.data.map((item) => ({
    ...item,
    possession: 'red',
    player: 2,
    key: uuid(),
  }));
};

export const getBoard = async () => {
  const response = await axios.get(
    'https://reactmarathon-api.netlify.app/api/board'
  );
  return response.data.data;
};

export const getPlayersTurn = async (params) => {
  const response = await axios.post(
    'https://reactmarathon-api.netlify.app/api/players-turn',
    params
  );
  return response.data.data;
};

const GameService = {
  getCards,
  getBoard,
  getPlayersTurn,
};

export default GameService;
