import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Layout } from "./Layout";
import { Landpage, Profile, Authenticate, Auth2fa } from "./pages";
import { ByUser } from "./guardians";
import { RequestNewPw } from "./pages/RequestNewPw/RequestNewPw";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ByUser redirectTo="/profile">
            <Landpage />
          </ByUser>
        ),
      },
      {
        path: "profile",
        element: (
          <ByUser mustLogged={true}>
            <Profile />
          </ByUser>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <ByUser redirectTo="/profile">
        <Outlet />
      </ByUser>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "register",
        element: <Authenticate isLogin={false} />,
      },
      {
        path: "login",
        element: <Authenticate />,
      },
      {
        path: "2FA",
        element: <Auth2fa />,
      },
      {
        path: "renew-password",
        element: <RequestNewPw />,
      },
    ],
  },
]);
