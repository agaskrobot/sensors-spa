const SET_USER = 'USER_SET';
const REMOVE_USER = 'USER_REMOVE';

const actions = {
  SET_USER,
  REMOVE_USER,

  setUser: (user) => ({ type: SET_USER, payload: { user } }),

  removeUser: () => ({ type: REMOVE_USER })
};

export default actions;
