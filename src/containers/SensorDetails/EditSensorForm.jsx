import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Input, TextArea } from '../../components';

export function EditSensorForm({ readOnly, sensor, onSave }) {
  const [error, setError] = useState({});
  const [description, setDescription] = useState('');
  const [samplingPeriod, setSamplingPeriod] = useState(5);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (sensor) {
      setDescription(sensor.description);
      setSamplingPeriod(sensor.samplingPeriod);
      setActive(sensor.isActive);
    }
  }, [sensor]);

  const handleSaveClick = () => {
    setError({});
    let errors = {};
    if (description === '') {
      errors = { ...errors };
      errors.description = 'This field is required';
    }
    if (samplingPeriod === '' || samplingPeriod === null || samplingPeriod < 5) {
      errors = { ...errors };
      errors.samplingPeriod = 'This field has to be grater or equal 5';
    }

    if (Object.keys(errors).length === 0) {
      const data = { description, samplingPeriod, isActive: active };
      onSave(data);
    } else {
      setError(errors);
    }
  };

  return (
    <form className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-start items-start my-3">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col">
            <div className="flex my-2 items-center w-full">
              <p className="mr-2">Description</p>
              <TextArea
                id="description"
                readOnly={readOnly}
                placeholder="Description"
                value={description}
                error={error.description}
                onChange={setDescription}
              />
            </div>
            <div className="flex my-2 items-center w-full">
              <p className="mr-2">Sampling Period</p>
              <Input
                id="samplingPeriod"
                type="number"
                readOnly={readOnly}
                placeholder="Sampling Period"
                value={samplingPeriod}
                error={error.samplingPeriod}
                onChange={setSamplingPeriod}
              />
            </div>
            <div className="flex my-2 items-center w-full">
              <p className="mr-2">Active</p>
              {readOnly ? (
                <p>{active ? 'true' : 'false'}</p>
              ) : (
                <input type="checkbox" id="isActive" checked={active} onChange={() => setActive(!active)} />
              )}
            </div>
          </div>
        </div>
      </div>
      {!readOnly ? (
        <Button color={Button.COLOR_GREEN} width="w-64" disabled={readOnly} onClick={handleSaveClick}>
          Save Changes
        </Button>
      ) : (
        <div className="h-20" />
      )}
    </form>
  );
}
EditSensorForm.propTypes = {
  sensor: PropTypes.object,
  readOnly: PropTypes.bool,
  onSave: PropTypes.func
};
