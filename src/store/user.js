import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { apiKey, databaseURL } from '../services/firebaseConfig';

const initialState = {
  isAuth: false,
  email: '',
  idToken: '',
  localId: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      isAuth: true,
      email: action.payload.email,
      idToken: action.payload.idToken,
      localId: action.payload.localId
    }),
    logout: (state) => initialState
  }
});

export const { login, logout } = userSlice.actions;

export const selectIsLogin = (state) => state.user.isAuth;
export const getRefreshToken = () => Cookies.get('refresh_token');

const setError = (errorMsg) => {
  console.error('#####:  ', errorMsg);
};

export const userLogout = () => (dispatch) => {
  Cookies.remove('refreshToken', { path: '' });
  dispatch(logout());
};

export const userSignUp =
  ({ email, password }) =>
  async (dispatch) => {
    const params = {
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    };
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      params
    ).then((resp) => resp.json());
    // if (response.hasOwnProperty('error')) {
    //   setError(response.error.message);
    //   return;
    // }

    console.log('#####: response ', response);
    // write response to store or localstorage

    const savePokemon = async (pokemon, userId, idToken) => {
      const res = await fetch(`${databaseURL}/${userId}/pokemons.json?auth=${idToken}`, {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({ pokemon })
      });
      const result = await res.json();
      if (!result.name) throw new Error("can't save pokemon to firebase");
      return result.name;
    };

    async function getDefaultPokemons() {
      const res = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter');
      const pokemons = await res.json();
      if (!pokemons.data) throw new Error("can't load default pokemons");
      return pokemons.data;
    }

    const pokemons = await getDefaultPokemons();
    for (let i = 0; i < pokemons.length; i += 1) {
      savePokemon(pokemons[i], response.localId, response.idToken);
    }

    dispatch(login({ email, idToken: response.idToken, localId: response.localId }));
    // get default pokemons from https://reactmarathon-api.herokuapp.com/api/pokemons/starter
    // save default pokemons to firebase https://<DATABASE_NAME>.firebaseio.com/<USER_UID>/pokemons.json?auth=<ID_TOKEN>
  };

export const userSignIn =
  ({ email, password }) =>
  async (dispatch) => {
    const params = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    };
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      params
    ).then((resp) => resp.json());

    // if (response.hasOwnProperty('error')) {
    //   setError(response.error.message);
    //   return;
    // }
    dispatch(login({ email, idToken: response.idToken, localId: response.localId }));
    const expires = new Date(new Date().getTime() + response.expiresIn);
    Cookies.set('refreshToken', response.refreshToken, { path: '', expires });
  };

export const userRefreshTokens = () => async (dispatch, token) => {
  const params = {
    method: 'POST',
    body: JSON.stringify({
      token,
      returnSecureToken: true
    })
  };
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`,
    params
  ).then((resp) => resp.json());
  // if (response.hasOwnProperty('error')) {
  //   setError(response.error.message);
  //   return;
  // }
  console.log('#####: response ', response);
};

export default userSlice.reducer;
