import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { LinkFrom } from "./BackLink.styled";

const CONSTANT_BACK_TITLE = "Back";

const BackLink = ({ location, titlePart, alternativePath }) => {
  return (
    <LinkFrom to={location?.state?.from || alternativePath}>
      <IoArrowBack />
      <span>
        {CONSTANT_BACK_TITLE} <span> {titlePart}</span>{" "}
      </span>
    </LinkFrom>
  );
};

export default BackLink;
