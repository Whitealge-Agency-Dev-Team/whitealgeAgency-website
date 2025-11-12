import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Staff from "./pages/Staff/Staff";
import Services from "./pages/Services/services";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CourseData from "./pages/Courses/CourseData/CourseData";
import NoPage from "./pages/NoPage/NoPage";
import UserGuide from "./pages/CRM/CRMLayout/CRMLayout";

// CRM imports
import ProtectedRoute from "./crm/auth/ProtectedRoute.jsx";
import CRMLogin from "./crm/pages/Login.jsx";
import CRMHome from "./crm/pages/Home.jsx";
import CRMProfile from "./crm/pages/Profile.jsx";
import CRMClients from "./crm/pages/Clients.jsx";
import CRMProjects from "./crm/pages/Projects.jsx";
import SetPassword from "./crm/pages/SetPassword.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import ClientDetail from "./crm/pages/ClientDetail.jsx";
import ProjectDetail from "./crm/pages/ProjectDetail.jsx";
import InviteWorker from "./crm/pages/InviteWorker.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="staff/" element={<Staff />} />
          <Route path="services/" element={<Services />} />
          <Route path="courses/" element={<Courses />} />
          <Route path="courses/:courseName" element={<CourseData />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="contacto" element={<Contact />} />
        </Route>

        {/* CRM routes */}
        <Route path="/crm">
          <Route path="login" element={<CRMLogin />} />
          <Route path="set-password" element={<SetPassword />} />
          <Route element={<ProtectedRoute />}> 
            <Route path="home" element={<CRMHome />} />
            <Route path="profile" element={<CRMProfile />} />
            <Route path="clientes" element={<CRMClients />} />
            <Route path="clientes/:id" element={<ClientDetail />} />
            <Route path="proyectos" element={<CRMProjects />} />
            <Route path="proyectos/:id" element={<ProjectDetail />} />
          </Route>
          {/* Ruta protegida por roles específicos (A, O, T) */}
          <Route element={<ProtectedRoute allow={["A","O","T"]} />}> 
            <Route path="invitar" element={<InviteWorker />} />
          </Route>
        </Route>

        <Route path="CRM/userGuide" element={<UserGuide />}></Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
