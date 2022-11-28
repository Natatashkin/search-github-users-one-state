import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";
import IconButton from "../IconButton/IconButton";

const ButtonToTop = ({ onClick }) => {
  return (
    <IconButton type="button" variant="sticky" onClick={onClick}>
      <IoIosArrowUp size={25} />
    </IconButton>
  );
};

export default ButtonToTop;

ButtonToTop.propTypes = {
  onClick: PropTypes.func.isRequired,
};
