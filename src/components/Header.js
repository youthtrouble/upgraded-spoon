import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className='header'>
      {/* Title of the app */}
      <h1>{title}</h1>
      {/* Button to toggle the add film form */}
      <Button
        color={showAdd ? 'red' : 'green'} // Change color based on showAdd state
        text={showAdd ? 'Close' : 'Add'} // Change text based on showAdd state
        onClick={onAdd} // Call the onAdd function when button is clicked
      />
    </header>
  );
};

// Default prop values
Header.defaultProps = {
  title: 'Films App', // Default title if none is provided
};

// Prop type validation
Header.propTypes = {
  title: PropTypes.string.isRequired, // title should be a string and is required
};

export default Header;
