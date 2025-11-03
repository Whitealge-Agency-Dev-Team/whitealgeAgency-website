import { Box, Grid, TextField, Button, Typography } from '@mui/material';

export default function Profile() {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h5" gutterBottom>
        Editar Perfil
      </Typography>
      
      {/* Grid responsivo: 2 columnas en desktop (sm={6}), 1 en móvil (xs={12}) */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            id="name"
            defaultValue="lorem"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido"
            name="surname"
            id="surname"
            defaultValue="ipsum"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Número de teléfono"
            type="number"
            name="phone"
            id="phone"
            defaultValue={1135231122}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            id="email"
            defaultValue="Lorem@gmail.com"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          {/* Botón de carga de archivos (sin ícono) */}
          <Button
            variant="outlined"
            component="label" // Actúa como un <label>
          >
            Subir nueva imagen
            <input
              type="file"
              hidden // El input real está oculto
              name="img"
              id="img"
            />
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          {/* Botón de guardado (sin ícono) */}
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: 'primary.main' 
            }}
          >
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}