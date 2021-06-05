import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import actions from '../../redux/actions/sensor';
import { getSensorList, addSensor } from '../../api/sensor';
import { Button, Alert, Spinner } from '../../components';
import { CreateSensorModal } from './CreateSensorModal';
import { useAuth } from '../../api';

export function LandingPage() {
  const history = useHistory();
  const sensorList = useSelector((s) => s.sensor.items);
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect loads all sensors.
  useEffect(() => {
    setLoading(true);
    sessionStorage.removeItem('sensorId');
    dispatch(actions.selectedSensor(null));
    getSensorList()
      .then((response) => dispatch(actions.loadTable(response.data)))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  // Dispatch selected sensor
  const handleSensorSelect = (sensor) => {
    dispatch(actions.selectedSensor(sensor));
    history.push(`/sensor/${sensor.id}/details`);
  };

  // Create new sensor
  const handleCreateSensor = (data) => {
    setLoading(true);
    addSensor(data)
      .then((response) => {
        setLoading(false);
        dispatch(actions.appendSensor(response.data));
        dispatch(actions.selectedSensor(response.data));
        history.push(`/sensor/${response.data.id}/details`);
      })
      .catch((error) => {
        setLoading(false);
        setShowModal(false);
        setError(error.message);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap md:px-20 flex-row justify-start text-gray-700 text-sm font-light min-w-min w-screen">
          <Alert error={error} onClose={() => setError(null)} />
          <CreateSensorModal showModal={showModal} onClose={() => setShowModal(false)} onCreate={handleCreateSensor} />
          <div className="flex flex-wrap justify-center md:justify-end w-full m-6">
            <Button color={Button.COLOR_PURPLE} width="w-24" onClick={() => logout()}>
              Logout
            </Button>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end w-full m-6">
            <Button color={Button.COLOR_GREEN} width="w-64" onClick={() => setShowModal(true)}>
              Add new sensor
            </Button>
          </div>
          {sensorList.map((sensor) => (
            <div
              key={sensor.id}
              className="inline-block hover:bg-white cursor-pointer p-6 w-full rounded hover:shadow-lg"
              onClick={() => handleSensorSelect(sensor)}
            >
              <div>Description : {sensor.description}</div>
              <div>Active : {sensor.isActive}</div>
              <div>Sampling Period : {sensor.samplingPeriod}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
