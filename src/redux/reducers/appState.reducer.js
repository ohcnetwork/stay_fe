import { appStateConstants } from '../constants';

const initialState = {
  isLoading: true,
}

export function appState(state = initialState, action) {
  switch (action.type) {
    case appStateConstants.SET_LOADING: {
      return {...state, isLoading: action.payload}
    }

    default: {
      return state;
    }
  }
} 