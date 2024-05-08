import React, { Routes, Route, Router } from "react-router-dom";
import { useState } from "react";
//import { useAutoKeys } from "react-easier";

import "./style/App.css";
import Login from "./pages/Login";
import DefaultPage from "./pages/DefaultPage";
import ExternalPage from "./pages/ExternalPage";
import AddUser from "./pages/addUser";
import PageWithSidebar from "./components/Layout";
import { AuthProvider } from "./utils/authContext";
import Unauthorized from "./pages/unauthorize";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  // const [count, setCount] = useState(0)
  // useAutoKeys();
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/default"
          element={<PageWithSidebar mainComponent={DefaultPage} />}
        />
        <Route
          path="/add-user"
          element={<PageWithSidebar mainComponent={AddUser} />}
        />
        <Route path="/external" element={<ExternalPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
