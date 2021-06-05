import actions from '../actions/sensor';

const INITIAL_STATE = {
  items: [],
  selected: null
};

export function sensor(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actions.APPEND_SENSOR: {
      return { ...state, items: [...state.items, payload.sensor] };
    }
    case actions.SELECTED_SENSOR: {
      if (payload.sensor !== null) {
        sessionStorage.setItem('sensorId', payload.sensor.id);
      } else {
        sessionStorage.removeItem('sensorId');
      }
      return { ...state, selected: payload.sensor };
    }
    case actions.REPLACE_SENSOR: {
      const index = state.items.findIndex((element) => element.id === payload.sensor.id);
      const sensor = payload.sensor;
      const items = [...state.items.slice(0, index), sensor, ...state.items.slice(index + 1)];
      return { ...state, items };
    }
    case actions.DELETE_SENSOR: {
      const index = state.items.findIndex((element) => element.id === payload.sensorId);
      const items = [...state.items.slice(0, index), ...state.items.slice(index + 1)];
      return { ...state, items };
    }
    case actions.LOAD_SENSOR_LIST: {
      return { ...state, items: payload.sensorList };
    }
    default:
      return state;
  }
}
