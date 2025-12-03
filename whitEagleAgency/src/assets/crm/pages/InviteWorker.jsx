import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importamos el ícono
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import api from "../services/client";

export default function InviteWorker() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    surname: "",
    phoneNumber: "",
    roleCode: "W",
    projectId: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProjects = async () => {
      try {
        const pro = await api.get('/projects');
        const listProjects = Array.isArray(pro["projects"])
          ? pro["projects"]
          : Array.isArray(pro.data)
            ? pro.data
            : pro.data?.rows || [];

        setProjects(listProjects);

      } catch (error) {
        setError(e.message || "No se pudo obtener los");
      }
    };
    getProjects();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones básicas (todos obligatorios)
    if (
      !form.email ||
      !form.name ||
      !form.surname ||
      !form.phoneNumber ||
      !form.roleCode ||
      !form.projectId
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    const emailOk = /.+@.+\..+/.test(form.email);
    if (!emailOk) return setError("Correo inválido.");

    try {
      setLoading(true);
      const res = await api.post("/auth/invite-worker", form);

      setSuccess(
        res?.message ||
        "Invitación enviada. Revisa la consola del servidor para el enlace de establecimiento de contraseña."
      );
      setForm({
        email: "",
        name: "",
        surname: "",
        phoneNumber: "",
        roleCode: "W",
        projectId: ""
      });
    } catch (e) {
      setError(e.message || "No se pudo enviar la invitación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* --- BOTÓN VOLVER --- */}
        <Box sx={{ mb: 2 }}>
          <Button
            component={Link}
            to="/crm/home" // Ajusta esta ruta si quieres volver a otro lado
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }} // Mantiene el texto en minúsculas (estilo moderno)
          >
            Volver
          </Button>
        </Box>
        {/* -------------------- */}

        <Typography variant="h5" gutterBottom>
          Invitar trabajador
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Completa los datos para enviar una invitación. En desarrollo, el
          enlace de establecimiento de contraseña se imprime en la consola del
          servidor.
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
              name="email"
              label="Correo"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />
            <TextField
              name="name"
              label="Nombre"
              value={form.name}
              onChange={onChange}
              required
            />
            <TextField
              name="surname"
              label="Apellido"
              value={form.surname}
              onChange={onChange}
              required
            />
            <TextField
              name="phoneNumber"
              label="Teléfono"
              value={form.phoneNumber}
              onChange={onChange}
              required
            />
            <TextField
              name="roleCode"
              select
              label="Rol"
              value={form.roleCode}
              onChange={onChange}
              required
            >
              <MenuItem value="A">Admin</MenuItem>
              <MenuItem value="O">Owner</MenuItem>
              <MenuItem value="T">Organizer (Team Manager)</MenuItem>
              <MenuItem value="W">Worker (Support Agent)</MenuItem>
            </TextField>

            <TextField
              name="projectId"
              select
              label="Incluir en proyecto"
              value={form.projectId}
              onChange={onChange}
              required
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.title}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Enviando…" : "Enviar invitación"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
