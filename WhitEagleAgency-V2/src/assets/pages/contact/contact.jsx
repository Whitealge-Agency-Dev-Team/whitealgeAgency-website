import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({
    companyName: "",
    contactEmail: "",
    phone: "",
    industry: "",
    problemDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  
  if (
    !form.companyName ||
    !form.contactEmail ||
    !form.phone ||
    !form.industry ||
    !form.problemDescription
  ) {
    return setError(
      "Por favor, completa todos los campos: Empresa, Email, Teléfono, Industria y Descripción del problema."
    );
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:3000/auth/sendConsult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreEmpresa: form.companyName,
        emailEmpresa: form.contactEmail,
        telefonoEmpresa: form.phone,
        industriaEmpresa: form.industry,
        descEmpresa: form.problemDescription,
      }),
    });

    if (!response.ok) {
      // Manejo de errores HTTP
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el servidor");
    }

    const data = await response.json();
    setSuccess("Formulario enviado correctamente");
    setForm({
      companyName: "",
      contactEmail: "",
      phone: "",
      industry: "",
      problemDescription: "",
    });
    console.log(data);
  } catch (e) {
    setError(e.message || "No se pudo enviar el formulario");
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        p: 2,
      }}
    >
      <Paper sx={{ p: 3, width: "100%", maxWidth: 560 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Formulario de consulta
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Completa tus datos y cuéntanos tu problemática. Si es aceptada,
          recibirás un enlace para crear tu contraseña e ingresar al CRM.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              name="companyName"
              label="Empresa"
              value={form.companyName}
              onChange={onChange}
              required
            />
            <TextField
              name="contactEmail"
              type="email"
              label="Email de contacto"
              value={form.contactEmail}
              onChange={onChange}
              required
            />
            <TextField
              name="phone"
              label="Teléfono"
              value={form.phone}
              onChange={onChange}
            />
            <TextField
              name="industry"
              label="Industria"
              value={form.industry}
              onChange={onChange}
            />
            <TextField
              name="problemDescription"
              label="Descripción del problema"
              value={form.problemDescription}
              onChange={onChange}
              multiline
              minRows={4}
              required
            />
            <Button type="submit" variant="contained" disabled={loading}>
              Enviar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
