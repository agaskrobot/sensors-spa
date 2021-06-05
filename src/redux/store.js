import { createStore, combineReducers } from 'redux';
import { user, getCurrentUserState, message } from './reducers';

const initialState = {
  user: getCurrentUserState()
};

const rootReducer = combineReducers({
  message,
  user
});

const store = createStore(rootReducer, initialState);

export default store;
