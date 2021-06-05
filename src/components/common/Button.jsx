import PropTypes from 'prop-types';

export function Button({ children, width, color, rounded, disabled, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  const widthClass = width ? width : 'w-full';
  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  return (
    <button
      className={`flex justify-center text-sm font-light ${color} ${roundedClass} items-center text-center leading-3.5 disabled:opacity-50 disabled:cursor-not-allowed h-8 ${widthClass} focus:outline-none text-white m-3`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  width: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool
};

Button.COLOR_RED = 'bg-red-500';
Button.COLOR_YELLOW = 'bg-yellow-500';
Button.COLOR_GREEN = 'bg-green-500';
Button.COLOR_PURPLE = 'bg-indigo-500';
Button.COLOR_BLUE = 'bg-blue-500';
Button.COLOR_GRAY_LIGHT = 'bg-gray-200';
Button.COLOR_GRAY_DARK = 'bg-gray-500';
