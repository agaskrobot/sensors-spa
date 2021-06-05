import PropTypes from 'prop-types';

export function Modal({ title, showModal, onClose, children }) {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="flex w-auto my-6 items-center">
              <div className="flex flex-col border border-black border-opacity-75 rounded-md shadow-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between border-b border-gray-600 px-5 py-3">
                  <div className="text-lg leading-6 text-gray-100">{title}</div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-xs leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCloseClick}
                  >
                    <div className="bg-white text-black opacity-50 text-2xl block outline-none focus:outline-none">
                      ×
                    </div>
                  </button>
                </div>

                <div className="flex pb-6 px-6 flex-auto">{children}</div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
Modal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  saveButtonTitle: PropTypes.string,
  buttonIconAdd: PropTypes.bool,
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};
