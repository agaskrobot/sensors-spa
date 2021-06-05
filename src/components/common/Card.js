import PropTypes from 'prop-types';

export const Card = ({ className, width, height, children }) => (
  <div
    className={`flex flex-col ${width} ${height} ${className} rounded-xl overflow-hidden bg-white shadow-card text-sm font-light text-gray-300`}
  >
    {children}
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.any
};
