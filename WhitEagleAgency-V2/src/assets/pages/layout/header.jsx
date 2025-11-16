import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../../assets/images/logo.svg";

export default function Header() {
  const [login, setLogin] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const navLinks = [
    { label: "Servicios", to: "/services" },
    { label: "Relaciones", to: "/" },
    { label: "Cursos", to: "/courses" },
  ];

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ background: "#fff" }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flexShrink: 0 }}> 
          <Link to="/">
            <img
              src={logo}
              alt="Home"
              style={{ width: "2.8rem", height: "auto", display: 'block' }} // display:block para evitar márgenes
            />
          </Link>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            position: 'absolute', // Centrado absoluto
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {navLinks.map((item) => (
            <Button
              key={item.to}
              component={Link}
              to={item.to}
              sx={{ color: "#1257A2", fontFamily: "Roboto Slab" }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {login && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    background: "#1257A2",
                    borderRadius: "10px",
                    whiteSpace: "nowrap",
                    fontFamily: "Roboto Slab",
                    ml: 1,
                  }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  component={Link}
                  to="/contacto"
                  variant="contained"
                  sx={{
                    background: "#1257A2",
                    borderRadius: "10px",
                    whiteSpace: "nowrap",
                    fontFamily: "Roboto Slab",
                    ml: 1,
                  }}
                >
                  Formulario de consulta
                </Button>
              </>
            )}
          </Box>

          <Button
            onClick={handleDrawerOpen}
            variant="outlined"
            sx={{
              display: { xs: "flex", sm: "none" },
              ml: 1,
              fontFamily: "Roboto Slab",
              color: "#1257A2",
              borderColor: "#1257A2",
              "&:hover": {
                borderColor: "#1257A2", // Mantener color en hover
                backgroundColor: "#1257a20a" // Ligero fondo azul en hover
              }
            }}
            aria-label="abrir menú"
          >
            Menú
          </Button>

        </Box>

      </Toolbar>

      {/* --- DRAWER (Navegación Móvil) --- */}
      {/* No hay cambios aquí, el Drawer sigue funcionando igual */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <Box
          sx={{ width: 200 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            {navLinks.map((item) => (
              <ListItem button component={Link} to={item.to} key={item.to}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { fontFamily: "Roboto Slab", color: "#1257A2" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}