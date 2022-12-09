import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { BACK_BUTTON_TITLE } from "../../constants/constants";
import BackIcon from "../icons/BackIcon/BackIcon";
// import styles from "./BackButton.module.scss";

const BackButton = ({}) => {
  return (
    <Button title={BACK_BUTTON_TITLE} ariaLabel="Back button" type="button">
      <BackIcon />
    </Button>
  );
};

export default BackButton;

BackButton.propTypes = {};
