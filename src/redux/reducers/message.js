import actions from '../actions/message';

const INITIAL_STATE = null;

export function message(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actions.INFO:
      return { ...payload, type: 'info' };
    case actions.ERROR:
      return { ...payload, type: 'error' };
    case actions.REMOVE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
