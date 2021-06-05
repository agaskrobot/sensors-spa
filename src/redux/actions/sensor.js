const APPEND_SENSOR = 'SENSOR_APPEND_SENSOR';
const SELECTED_SENSOR = 'SENSOR_SELECTED_SENSOR';
const LOAD_SENSOR_LIST = 'SENSOR_LOAD_SENSOR_LIST';
const REPLACE_SENSOR = 'SENSOR_REPLACE_SENSOR';
const DELETE_SENSOR = 'SENSOR_DELETE_SENSOR';

const actions = {
  APPEND_SENSOR,
  SELECTED_SENSOR,
  LOAD_SENSOR_LIST,
  REPLACE_SENSOR,
  DELETE_SENSOR,

  appendSensor: (sensor) => ({ type: APPEND_SENSOR, payload: { sensor } }),
  selectedSensor: (sensor) => ({ type: SELECTED_SENSOR, payload: { sensor } }),
  replaceSensor: (sensor) => ({ type: REPLACE_SENSOR, payload: { sensor } }),
  deleteSensor: (sensorId) => ({ type: DELETE_SENSOR, payload: { sensorId } }),
  loadTable: (sensorList) => ({ type: LOAD_SENSOR_LIST, payload: { sensorList } })
};

export default actions;
