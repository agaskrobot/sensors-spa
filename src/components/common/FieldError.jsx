import PropTypes from 'prop-types';

export const FieldError = ({ children }) => <p className="text-red-500 text-xs italic">{children}</p>;

FieldError.propTypes = {
  children: PropTypes.any.isRequired
};
