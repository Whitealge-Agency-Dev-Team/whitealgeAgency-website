import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./assets/pages/layout/layout";
import Home from "./assets/pages/home/home";
import Services from "./assets/pages/services/services";
import NoPage from "./assets/pages/NoPage.jsx";
import Courses from "./assets/pages/courses/courses";
import CourseData from "./assets/pages/courses/coursedata";
import Relations from "./assets/pages/relationships/relationships";

// CRM imports
import ProtectedRoute from "./assets/crm/auth/ProtectedRoute.jsx";
import Login from "./assets/crm/pages/Login.jsx";
import CRMHome from "./assets/crm/pages/Home.jsx";
import CRMProfile from "./assets/crm/pages/Profile.jsx";
import CRMClients from "./assets/crm/pages/Clients.jsx";
import CRMProjects from "./assets/crm/pages/Projects.jsx";
import SetPassword from "./assets/crm/pages/SetPassword.jsx";
import Contact from "./assets/pages/contact/contact.jsx";
import ClientDetail from "./assets/crm/pages/ClientDetail.jsx";
import ProjectDetail from "./assets/crm/pages/ProjectDetail.jsx";
import InviteWorker from "./assets/crm/pages/InviteWorker.jsx";
import CRMChart from "./assets/crm/pages/ChartOrganization.jsx";
const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="relationships/" element={<Relations />} />
            <Route path="services/" element={<Services />} />
            <Route path="courses/" element={<Courses />} />
            <Route path="courses/:courseName" element={<CourseData />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="login" element={<Login />} />
          </Route>
          {/* CRM routes */}
          <Route path="/crm">
            <Route path="set-password" element={<SetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="home" element={<CRMHome />} />
              <Route path="organigrama" element={<CRMChart />} />
              <Route path="profile" element={<CRMProfile />} />
              <Route path="clientes" element={<CRMClients />} />
              <Route path="clientes/:id" element={<ClientDetail />} />
              <Route path="proyectos" element={<CRMProjects />} />
              <Route path="proyectos/:id" element={<ProjectDetail />} />
            </Route>
            {/* Ruta protegida por roles específicos (A, O, T) */}
            <Route element={<ProtectedRoute allow={["A", "O", "T"]} />}>
              <Route path="invitar" element={<InviteWorker />} />
            </Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
