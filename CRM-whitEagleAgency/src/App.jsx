import Home from "./assets/pages/home/Home.jsx";
import Login from "./assets/pages/login/login.jsx";
import {Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./assets/pages/layout/layout.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
