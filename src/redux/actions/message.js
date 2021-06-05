const INFO = 'MESSSAGE_INFO';
const ERROR = 'MESSSAGE_ERROR';
const REMOVE = 'MESSSAGE_REMOVE';

const actions = {
  INFO,
  ERROR,
  REMOVE,

  info: (title, text) => ({ type: INFO, payload: { title, text } }),
  error: (title, text) => ({ type: ERROR, payload: { title, text } }),
  remove: () => ({ type: REMOVE })
};

export default actions;
