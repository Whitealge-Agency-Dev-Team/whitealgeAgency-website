import Home from "./assets/pages/home/Home.jsx";
import Login from "./assets/pages/login/login.jsx";
import {Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./assets/pages/layout/layout.jsx";
import Functionability from "./assets/pages/home/Functionability.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Layout />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<Functionability data={{name: 'clientes'}}/>} />
        <Route path="/proyectos" element={<Functionability data={{name: 'proyectos'}}/>} />
      </Routes>
    </div>
  );
}

export default App;
