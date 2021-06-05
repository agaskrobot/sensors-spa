import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import actions from '../../redux/actions/message';

// Default delay in milliseconds to remove the message
const DEFAULT_DELAY = 4000;

// FlashMessage component displays global messages.
// These messages are displayed for a few seconds and then they dissapear automatically.
export const FlashMessage = ({ className, delay }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const message = useSelector((s) => s.message);

  // When a message is assigned set a timeout to remove it
  useEffect(() => {
    // Clear the previous timeout if it exists
    if (ref.current) {
      clearTimeout(ref.current);
    }

    // Add a new timeout
    if (message) {
      ref.current = setTimeout(() => dispatch(actions.remove()), delay || DEFAULT_DELAY);
    }
  }, [message]);

  // Don't render enything when there is no message
  if (!message) {
    return null;
  }

  const handleCloseClick = (evt) => {
    evt.preventDefault();
    dispatch(actions.remove());
  };

  // Initialize the color classes for the type of message
  const color = message.type === 'error' ? 'red' : 'green';
  const colorClasses = `bg-${color}-200 text-${color}-700 border-${color}-400`;

  return (
    <div className={`shadow ${colorClasses} border px-4 py-2 rounded-lg font-light ${className}`}>
      <button className="absolute top-0 right-0 pt-2 pr-4" onClick={handleCloseClick}>
        x
      </button>
      <h1 className="text-xl pb-1 pr-4">{message.title}</h1>
      <p>{message.text}</p>
    </div>
  );
};

FlashMessage.propTypes = {
  // Custom classes to apply to the component
  className: PropTypes.string,
  // Number of milliseconds to wait until the message is removed
  delay: PropTypes.number
};
