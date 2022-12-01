import React from "react";
import PropTypes from "prop-types";

const SearchIcon = ({ size = "1em", color = "currentColor" }) => {
  return (
    <svg
      stroke={color}
      fill="none"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
      ></path>
      <path
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M338.29 338.29L448 448"
      ></path>
    </svg>
  );
};

export default SearchIcon;

SearchIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
