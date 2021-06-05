import actions from '../actions/user';

const INITIAL_STATE = {
  authenticated: false
};

export function getCurrentUserState() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? { ...user, authenticated: true } : { ...INITIAL_STATE };
}

export const USER_KEY = 'user';

export function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actions.SET_USER: {
      const { user } = payload;
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      return { ...state, ...user, authenticated: true };
    }
    case actions.REMOVE_USER:
      sessionStorage.removeItem(USER_KEY);
      return INITIAL_STATE;
    default:
      return state;
  }
}
