import { useState } from "react";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Header from "../layout-crm/header";

function InviteCTA() {
  const { user } = useAuth();
  const roleCode = (user?.Role?.code || user?.role?.code || user?.role || "")
    .toString()
    .toUpperCase();
  const canInvite = ["A", "O", "T"].includes(roleCode);
  if (!canInvite) return null;
  return (
    <Button component={Link} to="/crm/invitar" variant="outlined">
      Invitar trabajador
    </Button>
  );
}

const drawerWidth = 240;

export default function CRMHome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();

  const exit = () => {
    logout();
    window.location.href = "http://localhost:5173/";
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          { label: "Clientes", to: "/crm/clientes" },
          { label: "Proyectos", to: "/crm/proyectos" },
          { label: "Organigrama", to: "/crm/organigrama" },
        ].map((item) => (
          <ListItemButton key={item.label} component={Link} to={item.to}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Button variant="outlined" onClick={exit}>
        Cerrar Sesión
      </Button>
    </div>
  );

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        //aca comienza el menu
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="crm navigation"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Typography variant="h4" gutterBottom>
            Bienvenido al CRM de whitEagle
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Aquí puedes gestionar tus clientes, proyectos y tareas fácilmente.
          </Typography>
          {/* Botón de invitación visible para roles con permiso (A, O, T) */}
          <InviteCTA />
        </Box>
      </Box>
  );
}
