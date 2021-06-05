import PropTypes from 'prop-types';

import { Button, Modal } from '../../components';

export function DeleteSensorModal({ id, showModal, onClose, onDelete }) {
  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <Modal title="Delete item" showModal={showModal} onClose={onClose}>
      <div className="flex flex-col flex-wrap items-center justify-center p-4">
        Are you sure you want to delete &quot;{id}&quot;
        <div className="flex flex-wrap mt-5">
          <Button color={Button.COLOR_RED} width="w-36" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button color={Button.COLOR_YELLOW} width="w-36" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
DeleteSensorModal.propTypes = {
  id: PropTypes.number,
  title: PropTypes.any,
  saveButtonTitle: PropTypes.string,
  buttonIconAdd: PropTypes.bool,
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};
