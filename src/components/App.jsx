import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserPage from "../pages/UserPage/UserPage";
import { PageLayout } from "./PageLayout";
import { Header } from "./Header";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onGetQuery={getQuery} />
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage query={searchQuery} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:login" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
