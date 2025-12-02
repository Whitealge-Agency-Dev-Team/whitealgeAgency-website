import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Alert,
  Fade,
} from "@mui/material";
import api from "../services/client";
import Header from "../layout-crm/header"; // Asegúrate de que la ruta sea correcta
import Footer from "../layout-crm/footer"; // Asegúrate de que la ruta sea correcta

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // Mejor manejo de estado para mensajes

  // Cargar datos al iniciar
  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/auth/me");
        const u = data.user || {};
        setForm({
          name: u.name || "",
          surname: u.surname || "",
          phoneNumber: u.phoneNumber || "",
          email: u.email || "",
        });
      } catch (e) {
        setMessage({
          type: "error",
          text: e.message || "No se pudo cargar el perfil",
        });
      }
    })();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" }); // Limpiar mensajes previos

    try {
      await api.put("/auth/upload_me", form);
      setMessage({ type: "success", text: "Perfil actualizado exitosamente" });
    } catch (e) {
      setMessage({
        type: "error",
        text: e.message || "Error al guardar cambios",
      });
    } finally {
      setSaving(false);
    }
  };

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

      {/* 1. Header Integrado */}
      <Header />

      {/* 2. Contenedor Principal */}
      <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
        {/* 3. Tarjeta de Formulario estilo "Paper" minimalista */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
          sx={{
            bgcolor: "white",
            p: { xs: 3, md: 5 }, // Padding responsive (más chico en celular)
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
              Tu Perfil
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Actualiza tu información personal y de contacto.
            </Typography>
          </Box>

          {/* Mensajes de Alerta (Éxito/Error) */}
          {message.text && (
            <Fade in={!!message.text}>
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            </Fade>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Nombre"
                value={form.name}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="surname"
                label="Apellido"
                value={form.surname}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="tel"
                name="phoneNumber"
                label="Teléfono"
                value={form.phoneNumber}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Correo electrónico"
                value={form.email}
                onChange={onChange}
                variant="outlined"
                // Opcional: disabled si no quieres que cambien su email
                // disabled
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                disableElevation // Quita la sombra del botón para hacerlo más plano/moderno
                sx={{
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer/>
    </Box>
  );
}
