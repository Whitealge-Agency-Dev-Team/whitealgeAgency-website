import { Box, TextField, Button, Typography, Alert } from '@mui/material';

export default function Security() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Seguridad
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Actualizar tu contraseña
      </Typography>

      <Box 
        component="form" 
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3, // Espacio entre cada campo
          maxWidth: 'sm' // Ancho máximo para el formulario
        }}
      >
        <TextField
          label="Correo electrónico"
          type="email"
          name="email"
          id="email"
          value="Lorem@gmail.com"
          disabled // El email no se puede cambiar
          fullWidth
        />
        <TextField
          label="Contraseña Actual"
          type="password"
          name="current-password"
          id="current-password"
          fullWidth
        />
        <TextField
          label="Nueva Contraseña"
          type="password"
          name="new-password"
          id="new-password"
          fullWidth
        />

        <Alert severity="info" sx={{ mt: 1 }}>
          La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
        </Alert>

        <Box sx={{ textAlign: 'right' }}>
          <Button variant="contained" sx={{ bgcolor: 'primary.main' }}>
            Actualizar Contraseña
          </Button>
        </Box>
      </Box>
    </Box>
  );
}