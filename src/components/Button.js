import PropTypes from 'prop-types';

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'
    >
      {text}
    </button>
  );
};

// Default prop values
Button.defaultProps = {
  color: 'steelblue', // Default button color
  text: 'Button', // Default button text
};

// Prop type validation
Button.propTypes = {
  text: PropTypes.string, // text should be a string
  color: PropTypes.string, // color should be a string
  onClick: PropTypes.func.isRequired, // onClick should be a function and is required
};

export default Button;
