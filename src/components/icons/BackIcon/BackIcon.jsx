import React from "react";
import PropTypes from "prop-types";

const BackIcon = ({ size = "1em", color = "currentColor" }) => {
  return (
    <svg
      stroke={color}
      fill={color}
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M244 400L100 256l144-144M120 256h292"
      ></path>
    </svg>
  );
};

export default BackIcon;

BackIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
