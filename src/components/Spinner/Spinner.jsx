import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "styled-components";
import { SpinnerContainer } from "./Spinner.styled";

const Spinner = ({ size = 10 }) => {
  const theme = useTheme();

  return (
    <SpinnerContainer>
      <SyncLoader
        size={size}
        color={theme.colors.black}
        aria-label="Loading Spinner"
      />
    </SpinnerContainer>
  );
};

export default Spinner;
