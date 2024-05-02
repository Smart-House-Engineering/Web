import { Routes, Route, Router } from "react-router-dom";
import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useAutoKeys } from "react-easier";

import "./App.css";
import Login from "./Login";
import DefaultPage from "./DefaultPage";
import ExternalPage from "./ExternalPage";
import AddUser from "./pages/addUser";
import Home from "./components/sidebar";
import PageWithSidebar from "./components/Layout";

function App() {
  // const [count, setCount] = useState(0)
  useAutoKeys();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/default-page"
        element={<PageWithSidebar mainComponent={DefaultPage} />}
      />
      <Route
        path="/add-user"
        element={<PageWithSidebar mainComponent={AddUser} />}
      />
      <Route path="/external-page" element={<ExternalPage />} />
    </Routes>
  );
}

export default App;
