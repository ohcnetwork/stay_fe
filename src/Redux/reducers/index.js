import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { appState } from './appState.reducer';

const rootReducer = combineReducers({
  user,
  appState
});

export default rootReducer;