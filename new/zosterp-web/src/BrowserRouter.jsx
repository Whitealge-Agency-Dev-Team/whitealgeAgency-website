import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Layout from "./Layout";
import Landpage from "./pages/Landpage";
import { AuthRoute, LandingRoute, ProfileRoute } from "./protectedRoutes";
import Profile from "./pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <LandingRoute>
            <Landpage />
          </LandingRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProfileRoute>
            <Profile />
          </ProfileRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoute />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
