import PropTypes from 'prop-types';

import { FieldError } from './FieldError';

export function Input({ id, className, width, placeholder, type, rounded, value, error, readOnly, onChange }) {
  const handleOnChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(e.target.value);
  };

  if (readOnly) {
    return (
      <span className={`h-12 text-sm py-2 px-3 font-light ${className} ${width ? width : 'w-full'}`}>
        {type === 'password' ? '*********' : value}
      </span>
    );
  }

  const classes = [
    // Default CSS clases
    'appearance-none',
    'h-8',
    'bg-gray-50',
    'border',
    'bg-white',
    'py-2',
    'px-3',
    'font-light',
    'text-sm',
    'focus:outline-none',
    'focus:border-indigo-100',
    'focus:bg-white',
    'focus:shadow-outline',
    'focus:shadow-input',

    // Conditional CSS classes
    width || 'w-full',
    rounded ? 'rounded-full' : 'rounded',
    error ? 'border-red-100' : 'border-gray-700'
  ];

  // Add the custom CSS classes at the end, in case we need to override
  if (className) {
    classes.push(className);
  }

  return (
    <>
      <input
        className={classes.join(' ')}
        id={id}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
      {/* TODO: Should errors be implemented in a Form.Input component that composes Input ? */}
      {error ? <FieldError>{error}</FieldError> : null}
    </>
  );
}

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  rounded: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange: PropTypes.func
};
