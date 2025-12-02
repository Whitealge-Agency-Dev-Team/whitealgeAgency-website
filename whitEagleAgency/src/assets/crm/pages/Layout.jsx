import { useState, useEffect } from 'react';
import { Box, Paper, Avatar, Typography, Tabs, Tab, Button } from '@mui/material';
import Profile from './Profile.jsx';
import Security from './Security.jsx';
import api from '../services/client';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

export default function CRMLayout() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [usuario, setUsuario] = useState({ email: '', name: '', surname: '' });

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get('/auth/me');
        const u = data.user || {};
        setUsuario({ email: u.email || '', name: u.name || '', surname: u.surname || '' });
      } catch (e) {
        // ignore for now
      }
    })();
  }, []);

  const handleChange = (_event, newValue) => setValue(newValue);

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <Button variant="text" onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Volver</Button>
      <Paper elevation={3} sx={{ width: { xs: '100%', md: 300 }, bgcolor: 'background.paper', height: { xs: 'auto', md: '100vh' }, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: { md: '1px solid #e0e0e0' } }}>
        <Avatar src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" alt="user-img" sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {usuario.name} {usuario.surname}
        </Typography>
        <Typography variant="body2" color="text.secondary">{usuario.email}</Typography>
        <Typography variant="caption" color="text.secondary">Mi perfil</Typography>
      </Paper>

      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} aria-label="Secciones del perfil" variant="scrollable" allowScrollButtonsMobile>
            <Tab label="Perfil" />
            <Tab label="Seguridad" />
          </Tabs>
        </Box>
        <Paper elevation={1} sx={{ mt: 2 }}>
          <TabPanel value={value} index={0}><Profile /></TabPanel>
          <TabPanel value={value} index={1}><Security /></TabPanel>
        </Paper>
      </Box>
    </Box>
  );
}
