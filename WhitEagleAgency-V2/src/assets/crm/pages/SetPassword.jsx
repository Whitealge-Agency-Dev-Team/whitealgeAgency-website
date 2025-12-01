import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, TextField, Typography, Alert, Stack } from '@mui/material';
import api from '../services/client';

export default function SetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = useMemo(() => new URLSearchParams(search).get('token') || '', [search]);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) return setError('Falta el token de invitación.');
    if (password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.');
    if (password !== confirm) return setError('Las contraseñas no coinciden.');

    try {
      setLoading(true);
      await api.post('/auth/set-password', { token, newPassword: password }, { auth: false });
      setSuccess('¡Contraseña establecida! Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (e) {
      setError(e.message || 'No se pudo establecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', p: 2 }}>
      <Paper sx={{ p: 3, maxWidth: 420, width: '100%' }} elevation={3}>
        <Typography variant="h5" gutterBottom>Establecer contraseña</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Ingresa tu nueva contraseña para activar tu cuenta.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Nueva contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField label="Confirmar contraseña" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
            <Button type="submit" variant="contained" disabled={loading}>Guardar</Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
