import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserPage from "../pages/UserPage/UserPage";
import FavoritesPage from "../pages/FavoritesPage/FaforitesPage";
import { PageLayout } from "./PageLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
