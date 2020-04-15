import { userConstants } from '../constants';

const login = (data) => ({
  type: userConstants.USER_LOGIN,
  payload: data
});

const logout = () => ({
  type: userConstants.USER_LOGOUT,
  payload: ''
});

export const userActions = {
  login,
  logout
};
