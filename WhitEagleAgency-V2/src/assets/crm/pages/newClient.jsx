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

export default function CreateClientDialog({
  open,
  onClose,
  onSuccess,
  statuses = [],
}) {
  const initialClientState = {
    companyName: "",
    problemDescription: "",
    employeeCount: 1,
    contactEmail: "",
    phone: "",
    cuit: "",
    industry: "",
    statusId: "",
  };

  const [formData, setFormData] = useState(initialClientState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reseteamos el formulario cada vez que se abre el modal
  useEffect(() => {
    if (open) {
      setFormData(initialClientState);
      setError("");
      setLoading(false);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    // --- Validaciones (Misma lógica que antes) ---
    if (!formData.companyName)
      return setError("El nombre de la empresa es obligatorio.");
    if (!formData.contactEmail)
      return setError("El email de contacto es obligatorio.");
    if (!formData.phone) return setError("El teléfono es obligatorio.");
    if (!formData.problemDescription)
      return setError("La descripción del problema es obligatoria.");
    if (!formData.employeeCount || formData.employeeCount < 1)
      return setError("La cantidad de empleados debe ser al menos 1.");

    if (formData.companyName.length > 60)
      return setError("El nombre no puede superar los 60 caracteres.");
    if (formData.problemDescription.length > 150)
      return setError("La descripción no puede superar los 150 caracteres.");

    setLoading(true);
    setError("");

    try {
      await api.post("/clients", formData);
      // Si todo sale bien:
      onSuccess(); // Avisamos al padre para que refresque la tabla
      onClose(); // Cerramos el modal
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || "Error al crear cliente";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Nuevo Cliente</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 0 }}>
          {/* 1. Datos Principales */}
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              label="Nombre de Empresa *"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 60 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CUIT / ID Fiscal"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          {/* 2. Contacto */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email de Contacto *"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              fullWidth
              type="email"
              inputProps={{ maxLength: 254 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono *"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 20 }}
            />
          </Grid>

          {/* 3. Detalles Operativos */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cantidad de Empleados *"
              name="employeeCount"
              type="number"
              value={formData.employeeCount}
              onChange={handleChange}
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Industria"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 80 }}
            />
          </Grid>

          {/* 4. Descripción */}
          <Grid item xs={12}>
            <TextField
              label="Descripción del Problema *"
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              helperText={`${formData.problemDescription.length}/150 caracteres`}
              inputProps={{ maxLength: 150 }}
            />
          </Grid>

          {/* 5. Estado */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Estado Inicial"
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
