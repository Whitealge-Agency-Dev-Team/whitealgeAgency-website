import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./assets/pages/layout/layout";
import Home from "./assets/pages/layout/home-views/home";
// import Staff from "./pages/Staff/Staff";
// import Services from "./pages/Services/services";
// import Courses from "./pages/Courses/Courses";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import CourseData from "./pages/Courses/CourseData/CourseData";
// import NoPage from "./pages/NoPage/NoPage";
// import UserGuide from "./pages/CRM/CRMLayout/CRMLayout";

// CRM imports
// import ProtectedRoute from "./crm/auth/ProtectedRoute.jsx";
// import CRMLogin from "./crm/pages/Login.jsx";
// import CRMHome from "./crm/pages/Home.jsx";
// import CRMProfile from "./crm/pages/Profile.jsx";
// import CRMClients from "./crm/pages/Clients.jsx";
// import CRMProjects from "./crm/pages/Projects.jsx";
// import SetPassword from "./crm/pages/SetPassword.jsx";
// import Contact from "./pages/Contact/Contact.jsx";
// import ClientDetail from "./crm/pages/ClientDetail.jsx";
// import ProjectDetail from "./crm/pages/ProjectDetail.jsx";
// import InviteWorker from "./crm/pages/InviteWorker.jsx";
// import CRMChart from "./crm/pages/ChartOrganization.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
                  
        </Route>
          
      </Routes>
    </BrowserRouter>
  );
}
