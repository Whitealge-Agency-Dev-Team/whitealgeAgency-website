import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './pages/layout/layout'
import Home from "./pages/home/home"
import Staff from "./pages/staff"
import Services from "./pages/services"
import Courses from "./pages/courses"
import NotFound from "./pages/noPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="staff" element={<Staff />} />
          <Route path="services" element={<Services />} />
          <Route path="courses" element={<Courses />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
