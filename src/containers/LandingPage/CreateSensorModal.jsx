import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Input, TextArea } from '../../components';

export function CreateSensorModal({ showModal, onClose, onCreate }) {
  const [error, setError] = useState({});
  const [description, setDescription] = useState('');
  const [samplingPeriod, setSamplingPeriod] = useState(5);
  const [active, setActive] = useState(false);

  const handleCreateClick = () => {
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
      onCreate(data);
    } else {
      setError(errors);
    }
  };

  // useEffect clean inputs
  useEffect(() => {
    if (showModal === false) {
      setDescription('');
      setSamplingPeriod(5);
      setActive(false);
    }
  }, [showModal]);

  return (
    <Modal title="Create item" showModal={showModal} onClose={onClose}>
      <div className="flex flex-col flex-wrap items-center justify-start w-full p-4">
        <div className="flex my-2 items-center w-full">
          <p className="mr-2">Description</p>
          <TextArea
            id="description"
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
            placeholder="Sampling Period"
            value={samplingPeriod}
            error={error.samplingPeriod}
            onChange={setSamplingPeriod}
          />
        </div>
        <div className="flex my-2 items-center w-full">
          <p className="mr-2">Active</p>
          <input type="checkbox" id="isActive" checked={active} onChange={() => setActive(!active)} />
        </div>
        <div className="flex flex-wrap mt-5">
          <Button color={Button.COLOR_GREEN} width="w-36" onClick={handleCreateClick}>
            Create sensor
          </Button>
          <Button color={Button.COLOR_YELLOW} width="w-36" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
CreateSensorModal.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func
};
