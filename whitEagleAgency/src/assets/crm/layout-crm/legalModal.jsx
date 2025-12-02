import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function LegalModal({ open, onClose, title, contentType }) {
  const getContent = () => {
    if (contentType === "privacy") {
      return (
        <>
          <Typography variant="subtitle1" fontWeight="bold">
            1. Información Recopilada
          </Typography>
          <Typography paragraph variant="body2">
            Recopilamos datos de registro y gestión comercial necesarios para el
            funcionamiento del CRM.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            2. Uso de Datos
          </Typography>
          <Typography paragraph variant="body2">
            Sus datos son confidenciales y solo se usan para proveer el
            servicio. No vendemos información a terceros.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            3. Seguridad
          </Typography>
          <Typography paragraph variant="body2">
            Utilizamos estándares de la industria para proteger sus credenciales
            y bases de datos.
          </Typography>
        </>
      );
    }
    if (contentType === "terms") {
      return (
        <>
          <Typography variant="subtitle1" fontWeight="bold">
            1. Aceptación
          </Typography>
          <Typography paragraph variant="body2">
            Al usar WhitEagle CRM, acepta gestionar datos de manera ética y
            legal.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            2. Responsabilidad
          </Typography>
          <Typography paragraph variant="body2">
            El servicio se entrega "tal cual". No nos responsabilizamos por
            pérdidas de datos accidentales.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            3. Propiedad
          </Typography>
          <Typography paragraph variant="body2">
            Todo el código y diseño pertenece a "Fiscella y Asociados".
          </Typography>
        </>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{getContent()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Entendido</Button>
      </DialogActions>
    </Dialog>
  );
}
