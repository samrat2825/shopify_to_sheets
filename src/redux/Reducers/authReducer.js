import {
  LOADING,
  SIGN_IN,
  SIGN_OUT,
  RESET_LOADING,
  UPDATE_TOKEN,
  UPDATE_CONFIG,
} from '../ActionTypes/actionType';

const initialState = {
  user: {
    displayName: '',
    uid: '',
    email: '',
  },
  loggedIn: false,
  loading: false,
  config: {},
};

const authReducer = (state = initialState, action) => {
  console.log(action.type, action.token);
  if (action.type === SIGN_IN) {
    return {
      ...state,
      user: action.token,
      loggedIn: true,
      loading: false,
    };
  } else if (action.type === SIGN_OUT) {
    return {
      ...state,
      user: {
        displayName: '',
        uid: '',
        email: '',
      },
      loggedIn: false,
      loading: false,
    };
  } else if (action.type === LOADING) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === RESET_LOADING) {
    return {
      ...state,
      loading: false,
    };
  } else if (action.type === UPDATE_TOKEN) {
    return {
      ...state,
      user: action.token,
    };
  } else if (action.type === UPDATE_CONFIG) {
    return {
      ...state,
      config: action.token,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default authReducer;
