import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function Alert({ error, message, onClose }) {
  useEffect(() => {
    if (error !== undefined && error !== null) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } else if (message !== undefined && message !== null) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  if (
    (error === undefined || error === null || error === '') &&
    (message === undefined || message === null || message === '')
  ) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  let className;
  let alertMessage;
  if (error !== undefined && error !== null && error !== '') {
    className = ' bg-red-200 text-red-700 ';
    alertMessage = error;
  } else if (message !== undefined && message !== null && message !== '') {
    className = ' bg-green-200 text-green-700 ';
    alertMessage = message;
  }

  return (
    <div
      className={`absolute inset-x-0 top-0 h-10 ${className} cursor-pointer text-xs font-mono`}
      role="alert"
      onClick={handleClick}
    >
      <div className="flex h-full items-center justify-between px-24 py-1">
        <div className="flex h-full items-center">
          <p>{alertMessage}</p>
        </div>
        <p className="text-lg font-thin font-mono">×</p>
      </div>
    </div>
  );
}
Alert.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func
};
