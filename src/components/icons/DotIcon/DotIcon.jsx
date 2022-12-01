import React from "react";
import PropTypes from "prop-types";

const DotIcon = ({ size = "1em", color = "currentColor" }) => {
  return (
    <svg
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 8 16"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
      ></path>
    </svg>
  );
};

export default DotIcon;

DotIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
