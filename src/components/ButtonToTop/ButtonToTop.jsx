import React from "react";
import PropTypes from "prop-types";
import ArrowUpIcon from "../icons/ArrowUpIcon/ArrowUpIcon";
import IconButton from "../IconButton/IconButton";

const ButtonToTop = ({ onClick }) => {
  return (
    <IconButton
      type="button"
      variant="sticky"
      onClick={onClick}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon size={25} />
    </IconButton>
  );
};

export default ButtonToTop;

ButtonToTop.propTypes = {
  onClick: PropTypes.func.isRequired,
};
