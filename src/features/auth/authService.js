import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '../../services/firebase';

export const logoutUser = async () => {
  await signOut(auth);
};

export const registerUser = async ({ email, password }) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  if (response.user) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  return response.user.toJSON();
};

export const loginUser = async ({ email, password }) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  if (response.user) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  return response.user.toJSON();
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
