import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoPeopleCircleSharp } from "react-icons/io5";

const Logo = () => {
  const location = useLocation();
  const [click, setClick] = useState(false);

  const iconColor = useMemo(() => {
    return click ? "lightgrey" : "#000000";
  }, [click]);

  const handleClick = () => {
    setClick(true);
  };

  useEffect(() => {
    setClick(false);
  }, [location]);

  return (
    <Link to="/" onClick={handleClick}>
      <IconContext.Provider
        value={{
          style: {
            color: iconColor,
          },
        }}
      >
        <IoPeopleCircleSharp size={28} />
      </IconContext.Provider>
    </Link>
  );
};

export default Logo;
