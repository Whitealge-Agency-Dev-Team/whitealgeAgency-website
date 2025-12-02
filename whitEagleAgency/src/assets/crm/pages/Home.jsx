import { Typography, Box, Button, CssBaseline, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Header from "../layout-crm/header";
import Footer from "../layout-crm/footer";

function InviteCTA() {
  const { user } = useAuth();
  const roleCode = (user?.Role?.code || user?.role?.code || user?.role || "")
    .toString()
    .toUpperCase();
  const canInvite = ["A", "O", "T"].includes(roleCode);

  if (!canInvite) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        component={Link}
        to="/crm/invitar"
        variant="contained"
        disableElevation
      >
        Invitar trabajador
      </Button>
    </Box>
  );
}

export default function CRMHome() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      <CssBaseline />
      <Header />

      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {/* Un Box con estilo de tarjeta limpia */}
        <Box
          sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            border: "1px solid #eee",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1a1a1a" }}
          >
            Bienvenido al CRM de whitEagle
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, maxWidth: 600 }}
          >
            Gestiona tus clientes, visualiza el progreso de proyectos y
            administra el organigrama de la empresa desde la barra de navegación
            superior.
          </Typography>

          <InviteCTA />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
