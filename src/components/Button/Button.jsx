import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = ({ name, style, onClick }) => {
  return (
    <button className={classes[style]} onClick={onClick}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
