import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [usuario, setUsuario] = useState({ email: "", fname: "", surname: "", phone: "", roleId: "", });

  async function Fetching() {
    const response = await fetch("http://localhost:3000/auth/me", {
      method: "GET",
      headers: { "authorization": "Barer añadir_token_aca" }
    });
    const data = await response.json();
    setUsuario({ ...usuario, email: `${data.user.email}`, fname: `${data.user.name}`, surname: `${data.user.surname}`, phone: `${data.user.phoneNumber}`, roleId: `${data.user.roleId}` });
  }
  useEffect(() => { Fetching() }, []);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h5" gutterBottom>
        Editar Perfil
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid>
          <TextField
            fullWidth
            name="name"
            id="name"
            defaultValue={usuario.fname}
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            name="surname"
            id="surname"
            defaultValue={usuario.surname}
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            type="number"
            name="phone"
            id="phone"
            defaultValue={usuario.phone}
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            type="email"
            name="email"
            id="email"
            defaultValue={usuario.email}
            variant="outlined"
          />
        </Grid>
        <Grid >
          <Button
            variant="outlined"
            component="label"
          >
            Subir nueva imagen
            <input
              type="file"
              hidden
              name="img"
              id="img"
            />
          </Button>
        </Grid>
        <Grid sx={{ textAlign: 'right' }}>
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