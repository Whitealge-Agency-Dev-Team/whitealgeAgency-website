import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function ProjectEditDialog({
  open,
  onClose,
  project,
  userRole, // Recibimos el rol del usuario (1, 2, 3 o 4)
  onSave,   // async (projectId, data) => Promise
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    estimatedFinish: "",
  });
  const [saving, setSaving] = useState(false);

  // Lógica de permisos: Si es rol 4, está restringido.
  // Roles 1, 2, 3 (Admin/Staff) no están restringidos.
  const isRestricted = userRole === 4;

  // Cargar datos cuando se abre el modal o cambia el proyecto
  useEffect(() => {
    if (project) {
      // Formatear fecha para el input type="date" (YYYY-MM-DD)
      let dateValue = "";
      if (project.estimatedFinish) {
        // Asumiendo que viene como ISO string "2023-12-01T00:00:00.000Z"
        dateValue = project.estimatedFinish.split("T")[0];
      }

      setFormData({
        title: project.title || "",
        description: project.description || "",
        estimatedFinish: dateValue,
      });
    }
  }, [project, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!onSave || !project) return;
    setSaving(true);
    try {
      // Enviamos el objeto con los cambios
      await onSave(project.id, formData);
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isRestricted ? "Ver/Editar Detalles" : "Editar Proyecto"}
      </DialogTitle>
      
      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {/* TÍTULO: Bloqueado (disabled) si isRestricted es true */}
          <TextField
            label="Título del Proyecto"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            disabled={isRestricted} // <--- AQUI LA RESTRICCIÓN
            helperText={isRestricted ? "No tienes permisos para editar el título." : ""}
          />

          {/* DESCRIPCIÓN: Editable para todos */}
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />

          {/* FECHA: Editable para todos */}
          <TextField
            label="Fecha de finalización estimada"
            name="estimatedFinish"
            type="date"
            value={formData.estimatedFinish}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          {isRestricted && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              * Como ayudante, solo puedes modificar la descripción y las fechas.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
        >
          {saving ? <CircularProgress size={18} /> : "Guardar Cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}