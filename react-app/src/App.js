import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import SinglePage from "./pages/singlepage";
import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/musicas"
          element={
            <ProtectedRoute>
              <SinglePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;