import { Box, TextField, Button, Typography, Alert, Grid } from '@mui/material';

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
        noValidate 
        autoComplete="off"
        sx={{
          mt: 3, 
        }}
      >
        <Grid container spacing={3}>
          
          <Grid>
            <TextField
              label="Correo electrónico"
              type="email"
              name="email"
              id="email"
              value="Lorem@gmail.com"
              disabled 
              fullWidth 
            />
          </Grid>
          
          <Grid>
            <TextField
              label="Contraseña Actual"
              type="password"
              name="current-password"
              id="current-password"
              fullWidth
            />
          </Grid>
          
          <Grid>
            <TextField
              label="Nueva Contraseña"
              type="password"
              name="new-password"
              id="new-password"
              fullWidth
            />
          </Grid>

          <Grid>
            <Alert severity="info">
              La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
            </Alert>
          </Grid>

          <Grid x={{ textAlign: 'right' }}>
            <Button variant="contained" sx={{ bgcolor: 'primary.main' }}>
              Actualizar Contraseña
            </Button>
          </Grid>
          
        </Grid>
      </Box>
    </Box>
  );
}