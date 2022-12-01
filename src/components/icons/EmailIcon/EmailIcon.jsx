import React from "react";
import PropTypes from "prop-types";

const EmailIcon = ({ size = "1em", color = "currentColor" }) => {
  return (
    <svg
      stroke={color}
      fill="none"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      ></path>
    </svg>
  );
};
export default EmailIcon;

EmailIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
