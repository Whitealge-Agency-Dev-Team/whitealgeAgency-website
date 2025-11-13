import { StrictMode } from "react";
import "normalize.css";
import "./index.css"
import App from "./App.jsx";
import { AuthProvider } from "./crm/auth/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
