import { createSlice } from '@reduxjs/toolkit';
import { apiKey } from '../services/firebaseConfig';
import Cookies from 'js-cookie';

const initialState = {
    isAuth: false,

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
            localId: action.payload.localId,
        }),
        logout: _state => initialState,
    }
})


export const { login, logout } = userSlice.actions;

export const selectIsLogin = state => state.user.isAuth;
export const getRefreshToken = () => Cookies.get('refresh_token');

const setError = (errorMsg) => {
    console.error('#####:  ', errorMsg);
}

export const userLogout = () => (dispatch) => {
    Cookies.remove('refreshToken', { path: '' });
    dispatch(logout());
}

export const userSignUp = ({ email, password }) => async (dispatch) => {
    const params = {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    };
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, params)
        .then(resp => resp.json());
    if (response.hasOwnProperty('error')) {
        setError(response.error.message);
        return
    }

    console.log('#####: response ', response);

    dispatch(login({ email, idToken: response.idToken }));
}

export const userSignIn = ({ email, password }) => async (dispatch) => {
    const params = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    };
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, params)
        .then(resp => resp.json());

    if (response.hasOwnProperty('error')) {
        setError(response.error.message)
        return
    }
    dispatch(login({ email, idToken: response.idToken, localId: response.localId }));
    const expires = new Date(new Date().getTime() + response.expiresIn);
    Cookies.set('refreshToken', response.refreshToken, { path: '', expires });
}

export const userRefreshTokens = () => async (dispatch, token) => {
    const params = {
        method: 'POST',
        body: JSON.stringify({
            token,
            returnSecureToken: true
        })
    };
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`, params)
        .then(resp => resp.json());
    if (response.hasOwnProperty('error')) {
        setError(response.error.message)
        return
    }
    console.log('#####: response ', response);
}


export default userSlice.reducer;