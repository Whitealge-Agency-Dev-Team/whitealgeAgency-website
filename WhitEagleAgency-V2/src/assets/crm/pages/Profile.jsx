import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../services/client';

export default function Profile() {
  const [form, setForm] = useState({ name: '', surname: '', phoneNumber: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get('/auth/me');
        const u = data.user || {};
        setForm({ name: u.name || '', surname: u.surname || '', phoneNumber: u.phoneNumber || '', email: u.email || '' });
      } catch (e) {
        setMessage(e.message || 'No se pudo cargar el perfil');
      }
    })();
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setMessage('');
    try {
      await api.put('/auth/upload_me', form);
      setMessage('Perfil actualizado exitosamente');
    } catch (e) {
      setMessage(e.message || 'Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <Typography variant="h5" gutterBottom>
        Editar Perfil
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth name="name" id="name" label="Nombre" value={form.name} onChange={onChange} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth name="surname" id="surname" label="Apellido" value={form.surname} onChange={onChange} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth type="tel" name="phoneNumber" id="phoneNumber" label="Teléfono" value={form.phoneNumber} onChange={onChange} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth type="email" name="email" id="email" label="Correo electrónico" value={form.email} onChange={onChange} variant="outlined" />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Guardando…' : 'Guardar Cambios'}</Button>
        </Grid>
        {message && (
          <Grid item xs={12}>
            <Typography color={message.includes('Error') ? 'error' : 'primary'}>{message}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
