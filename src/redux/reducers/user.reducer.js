import { userConstants } from '../constants';

const initialState = '';

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_LOGIN: {
      return action.payload;
    }

    case userConstants.USER_LOGOUT: {
      return '';
    }

    default: {
      return state;
    }
  }
} 