import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";

export default function ProjectTeamDialog({
  open,
  onClose,
  project,
  users = [],          // lista de todos los usuarios disponibles
  initialUserIds = [], // ids ya asignados al proyecto
  onSave,              // async (projectId, userIds[]) => Promise
}) {
  const [selectedIds, setSelectedIds] = useState(initialUserIds);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSelectedIds(initialUserIds);
  }, [initialUserIds, project?.id, open]);

  const handleToggle = (userId) => {
    setSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = async () => {
    if (!onSave || !project) return;
    setSaving(true);
    try {
      await onSave(project.id, selectedIds);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Asignar integrantes a: {project.description || `Proyecto #${project.id}`}
      </DialogTitle>
      <DialogContent dividers>
        {users.length === 0 ? (
          <Typography variant="body2">
            No hay usuarios disponibles.
          </Typography>
        ) : (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Selecciona los integrantes:
            </Typography>
            <FormGroup>
              {users.map((u) => (
                <FormControlLabel
                  key={u.id}
                  control={
                    <Checkbox
                      checked={selectedIds.includes(u.id)}
                      onChange={() => handleToggle(u.id)}
                    />
                  }
                  label={`${u.name} ${u.surname || ""} (${u.email})`}
                />
              ))}
            </FormGroup>
          </Box>
        )}
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
          {saving ? <CircularProgress size={18} /> : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
