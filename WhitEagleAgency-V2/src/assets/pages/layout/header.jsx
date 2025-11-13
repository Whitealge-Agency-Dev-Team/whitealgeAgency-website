import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from "../../../assets/images/logo.svg";

export default function Header() {
  const [login, setLogin] = useState(true);

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ background: "#fff" }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} sm={3}>
            <Link to="/">
              <img src={logo} alt="Home" style={{ width: "2.8rem", height: "auto" }} />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", gap: { xs: "0.6rem", sm: "1.2rem" }, justifyContent: { xs: "center", sm: "flex-end" } }}>
              <Button component={Link} to="/services" sx={{ color: "#1257A2", fontFamily: "Roboto Slab" }}>
                Servicios
              </Button>
              <Button component={Link} to="/" sx={{ color: "#1257A2", fontFamily: "Roboto Slab" }}>
                Staff
              </Button>
              <Button component={Link} to="/courses" sx={{ color: "#1257A2", fontFamily: "Roboto Slab" }}>
                Cursos
              </Button>
              {login && (
                <>
                  <Button component={Link} to="/login" variant="contained" sx={{ background: "#1257A2", borderRadius: "10px", whiteSpace: "nowrap", fontFamily: "Roboto Slab", ml: 1 }}>
                    Iniciar sesión
                  </Button>
                  <Button component={Link} to="/register" variant="contained" sx={{ background: "#1257A2", borderRadius: "10px", whiteSpace: "nowrap", fontFamily: "Roboto Slab", ml: 1 }}>
                    Formulario de consulta
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
