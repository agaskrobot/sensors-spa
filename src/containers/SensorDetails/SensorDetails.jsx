import { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { DeleteSensorModal } from './DeleteSensorModal';
import { EditSensorForm } from './EditSensorForm';
import { Button, Alert, Spinner } from '../../components';
import actions from '../../redux/actions/sensor';
import { getSensor, deleteSensor, updateSensor } from '../../api';

export function SensorDetails() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const sensor = useSelector((s) => s.sensor.selected);
  const [readOnly, setReadOnly] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const { sensorId } = useParams();

  // Load selected sensor
  useLayoutEffect(() => {
    if (!sensor) {
      setLoading(true);
      const id = sessionStorage.getItem('sensorId');
      if (!sensorId && !id) {
        history.push('/');
      } else {
        const newSensorId = sensorId ? sensorId : id;
        getSensor(newSensorId)
          .then((response) => dispatch(actions.selectedSensor(response.data)))
          .catch((error) => {
            dispatch(actions.selectedSensor(null));
            history.push('/404');
            setError(error.message);
          })
          .finally(() => setLoading(false));
      }
    }
  }, []);

  // Delete sensor and dispatch the action
  const handleDelete = () => {
    setLoading(true);
    deleteSensor(sensor.id)
      .then(() => {
        dispatch(actions.deleteSensor(sensor.id));
        setLoading(false);
        history.push('/');
      })
      .catch((error) => {
        setShowModal(false);
        setLoading(false);
        setError(error.message);
      });
  };

  // Edit sensor and dispatch the action
  const handleEdit = (data) => {
    setLoading(true);
    updateSensor(sensor.id, data)
      .then((response) => {
        setMessage('Your changes have been saved');
        dispatch(actions.replaceSensor(response.data));
        dispatch(actions.selectedSensor(response.data));
        setReadOnly(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const handleAlertClose = () => {
    setError(null);
    setMessage(null);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Button color={Button.COLOR_PURPLE} width="w-36" onClick={() => history.push('/')}>
            {'<-   Back to the list'}
          </Button>
          <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 text-sm font-light min-w-min">
            <Alert error={error} message={message} onClose={handleAlertClose} />
            <DeleteSensorModal
              id={sensor ? sensor.id : ''}
              showModal={showModal}
              onClose={() => setShowModal(false)}
              onDelete={handleDelete}
            />
            <div className="flex flex-wrap flex-col p-6 items-center bg-white shadow-lg rounded-lg justify-center min-w-min">
              <div className="flex flex-wrap justify-center">
                <Button
                  color={Button.COLOR_YELLOW}
                  width="w-36"
                  disabled={!readOnly}
                  onClick={() => setReadOnly(false)}
                >
                  Edit
                </Button>
                <Button color={Button.COLOR_RED} width="w-36" disabled={!readOnly} onClick={() => setShowModal(true)}>
                  Delete
                </Button>
              </div>
              <EditSensorForm sensor={sensor} onSave={handleEdit} readOnly={readOnly} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
