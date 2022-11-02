import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "../Container";
import { Header } from "../Header";

const PageLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header onGetQuery={getQuery} />
      <Container>
        <Outlet context={{ searchQuery }} />
      </Container>
    </div>
  );
};

export default PageLayout;
