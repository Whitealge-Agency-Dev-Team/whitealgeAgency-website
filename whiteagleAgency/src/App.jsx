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
        </Route>
        <Route path="CRM/userGuide" element={<UserGuide />}>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
