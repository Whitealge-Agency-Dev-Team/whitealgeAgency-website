import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Alert,
} from "@mui/material";
import api from "../services/client"; 

export default function CreateProjectDialog({
  open,
  onClose,
  onSuccess,
  statuses = [],
  clients = [] // Nueva prop: Lista de clientes para seleccionar
}) {
  const initialProjectState = {
    description: "",
    estimatedFinish: "", // Formato YYYY-MM-DD
    statusId: "",
    clientId: "" // Opcional
  };

  const [formData, setFormData] = useState(initialProjectState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reseteamos el formulario al abrir
  useEffect(() => {
    if (open) {
      setFormData(initialProjectState);
      setError("");
      setLoading(false);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // --- Validaciones ---
    if (!formData.description) return setError("La descripción es obligatoria.");
    if (!formData.estimatedFinish) return setError("La fecha de finalización es obligatoria.");
    if (!formData.statusId) return setError("El estado inicial es obligatorio.");

    if (formData.description.length > 255)
      return setError("La descripción no puede superar los 255 caracteres.");

    setLoading(true);
    setError("");

    try {
      // Endpoint ajustado a Proyectos
      await api.post("/projects", formData);

      // --- CORRECCIÓN DE FLUJO (Evita error en consola) ---
      // 1. Avisamos al padre (refetch)
      await onSuccess(); 
      
      // 2. Apagamos carga ANTES de cerrar
      setLoading(false);
      
      // 3. Cerramos el modal
      onClose(); 

    } catch (e) {
      const msg = e.response?.data?.message || e.message || "Error al crear proyecto";
      setError(msg);
      // Solo apagamos loading aquí si hubo error y NO cerramos el modal
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo Proyecto</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 0 }}>
          {/* 1. Descripción (Campo principal) */}
          <Grid item xs={12}>
            <TextField
              autoFocus
              label="Descripción del Proyecto *"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              inputProps={{ maxLength: 255 }}
              helperText={`${formData.description.length}/255 caracteres`}
            />
          </Grid>

          {/* 2. Fecha Estimada */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha Estimada de Fin *"
              name="estimatedFinish"
              type="date"
              value={formData.estimatedFinish}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true, // Necesario para que la etiqueta no tape la fecha
              }}
            />
          </Grid>

          {/* 3. Estado (Obligatorio) */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Estado Inicial *"
              name="statusId"
              value={formData.statusId}
              onChange={handleChange}
              fullWidth
            >
              {statuses.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* 4. Cliente (Opcional - Relación N:M) */}
          <Grid item xs={12}>
            <TextField
              select
              label="Asignar a Cliente (Opcional)"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              fullWidth
              helperText="Si el proyecto es para un cliente específico"
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {clients.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.companyName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Creando..." : "Crear Proyecto"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}