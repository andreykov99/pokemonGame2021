import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  isModalOpen: false,
  isLoginForm: true,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isActive = !state.isActive;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    showLogin: (state) => {
      state.isLoginForm = true;
    },
    showRegister: (state) => {
      state.isLoginForm = false;
    },
  },
});

export const { toggleMenu, openModal, closeModal, showLogin, showRegister } =
  headerSlice.actions;
export default headerSlice.reducer;
