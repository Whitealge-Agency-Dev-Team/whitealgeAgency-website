import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Ícono para cerrar menú
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Asumiendo que usas el hook de auth para logout

// Definimos los items del menú aquí para reutilizarlos
const navItems = [
  { label: "Clientes", to: "/crm/clientes" },
  { label: "Proyectos", to: "/crm/proyectos" },
  { label: "Organigrama", to: "/crm/organigrama" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth(); // Para el botón de cerrar sesión
  const location = useLocation(); // Para saber en qué ruta estamos y "iluminar" el botón

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // Contenido del menú lateral (Solo para Móvil)
  const drawerContent = (
    <Box sx={{ textAlign: "center", pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography
        variant="h6"
        sx={{ my: 2, fontWeight: "bold", color: "#1976d2" }}
      >
        CRM MENU
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.to}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary="Cerrar Sesión" sx={{ color: "error.main" }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky" // Sticky ayuda a que se quede arriba pero sin tapar contenido innecesariamente
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          color: "#333",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* SECCIÓN IZQUIERDA: Logo y Menú Móvil */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }} // Oculto en PC (md up)
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/crm/home"
              sx={{
                fontWeight: 700,
                textDecoration: "none",
                color: "inherit",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              whitEagle{" "}
              <Box component="span" sx={{ color: "#1976d2" }}>
                CRM
              </Box>
            </Typography>
          </Box>

          {/* SECCIÓN CENTRAL: Menú Desktop (Solo visible en PC) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map((item) => {
              // Detectamos si es la ruta activa para darle estilo
              const isActive = location.pathname === item.to;
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.to}
                  sx={{
                    color: isActive ? "#1976d2" : "#555",
                    fontWeight: isActive ? 700 : 500,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.04)" },
                    borderBottom: isActive
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                    borderRadius: 0,
                    px: 2,
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* SECCIÓN DERECHA: Perfil y Logout (Desktop) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Botón Salir solo en Desktop (en móvil está dentro del drawer) */}
            <Button
              onClick={handleLogout}
              sx={{
                display: { xs: "none", md: "block" },
                color: "#777",
                textTransform: "none",
              }}
            >
              Salir
            </Button>

            <Avatar
              component={Link}
              to="/crm/profile"
              sx={{
                bgcolor: "#123f6c",
                cursor: "pointer",
                width: 36,
                height: 36,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER MÓVIL (Componente oculto que se abre al dar click) */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
}
