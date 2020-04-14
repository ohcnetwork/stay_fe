import { appStateConstants } from '../constants';

const setLoading = (data) => ({
  type: appStateConstants.SET_LOADING,
  payload: data
});

export const appStateActions = {
  setLoading
};
