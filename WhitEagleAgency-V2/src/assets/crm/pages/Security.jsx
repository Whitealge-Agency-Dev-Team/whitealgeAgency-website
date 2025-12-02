import { Box, TextField, Button, Typography, Alert, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import api from '../services/client';

export default function Security() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get('/auth/me');
        setEmail(data?.user?.email || '');
      } catch (e) {
        setMessage(e.message || 'No se pudo obtener el correo');
      }
    })();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const strong = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!strong.test(newPassword)) {
      setMessage('La nueva contraseña debe tener al menos 8 caracteres, incluir una mayúscula y un número.');
      return;
    }
    try {
      const res = await api.post('/auth/change-password', { currentPassword, newPassword });
      setMessage(res?.message || 'Contraseña actualizada');
      setCurrentPassword('');
      setNewPassword('');
    } catch (e) {
      setMessage(e.message || 'Error al actualizar la contraseña');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Seguridad
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Actualizar tu contraseña
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label="Correo electrónico" type="email" name="email" id="email" value={email} disabled fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Contraseña Actual" type="password" name="current-password" id="current-password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Nueva Contraseña" type="password" name="new-password" id="new-password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info">La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.</Alert>
          </Grid>
          {message && (
            <Grid item xs={12}>
              <Alert severity={message.startsWith('Función') ? 'info' : 'error'}>{message}</Alert>
            </Grid>
          )}
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button type="submit" variant="contained">Actualizar Contraseña</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
