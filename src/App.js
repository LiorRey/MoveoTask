import React from "react";
import { Routes, Route } from "react-router-dom";

import AllUsers from "./pages/AllUsers";
import UserDetails from "./pages/UserDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AllUsers />} />
      <Route path="/user/:userDetails" element={<UserDetails />} />
    </Routes>
  );
};

export default App;
