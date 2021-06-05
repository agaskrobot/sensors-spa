import { createStore, combineReducers } from 'redux';
import { user, getCurrentUserState, message, sensor } from './reducers';

const initialState = {
  user: getCurrentUserState()
};

const rootReducer = combineReducers({
  sensor,
  message,
  user
});

const store = createStore(rootReducer, initialState);

export default store;
