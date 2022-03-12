import {
  SIGN_IN,
  SIGN_OUT,
  LOADING,
  RESET_LOADING,
  UPDATE_TOKEN,
  UPDATE_CONFIG,
} from '../ActionTypes/actionType';
import { store } from '../Store/store';

export const signIn = (user_token) => {
  store.dispatch({ type: SIGN_IN, token: user_token });
};

export const signOut = () => {
  store.dispatch({ type: SIGN_OUT });
};

export const setLoading = () => {
  store.dispatch({ type: LOADING });
};

export const resetLoading = () => {
  store.dispatch({ type: RESET_LOADING });
};

export const updateUserToken = (new_token) => {
  store.dispatch({ type: UPDATE_TOKEN, token: new_token });
};

export const updateConfig = (new_token) => {
  store.dispatch({ type: UPDATE_CONFIG, token: new_token });
};
