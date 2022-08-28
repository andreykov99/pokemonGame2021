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
  return response.user;
};

export const loginUser = async ({ email, password }) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response.user;
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
