import Home from "./assets/pages/home/Home.jsx";
import {Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./assets/pages/Layout/Layout.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Layout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
