import { useState, useEffect } from 'react';
import Profile from './sectionsLayout/profile.jsx';
import Team from './sectionsLayout/team.jsx';
import Login from '../login/login.jsx';
import Security from './sectionsLayout/security.jsx';

import { Box, Paper, Avatar, Typography, Tabs, Tab } from '@mui/material';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Layout() {
  const [value, setValue] = useState(0);
  const [usuario, setUsuario] = useState({ email: "", fname: "", surname: "", phone: "", roleId: "", });
  async function Fetching() {
    const response = await fetch("http://localhost:3000/auth/me", {
      method: "GET",
      headers: { "authorization": "Barer añadir_token_aca" }
    });
    const data = await response.json();
    setUsuario({ ...usuario, email: `${data.user.email}`, fname: `${data.user.name}`, surname: `${data.user.surname}`, phone: `${data.user.phoneNumber}`, roleId: `${data.user.roleId}` });
  }
  useEffect(() => { Fetching() }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        bgcolor: '#f4f6f8'
      }}
    >

      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', md: 300 },
          bgcolor: 'background.paper',
          height: { xs: 'auto', md: '100vh' },
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRight: { md: '1px solid #e0e0e0' }
        }}
      >
        <Avatar
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
          alt="user-img"
          sx={{ width: 100, height: 100, mb: 2 }} // mb = margin-bottom
        />
        <Typography variant="h6" gutterBottom>
          {usuario.name}, {usuario.surname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {usuario.email}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Team manager
        </Typography>
      </Paper>

      <Box
        sx={{
          flexGrow: 1, // Ocupa el resto del espacio
          p: { xs: 1, sm: 2, md: 3 } // Padding responsivo
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Secciones del perfil"
            variant="scrollable" // Requisito 1 (Responsive): permite scroll en móvil
            allowScrollButtonsMobile
          >
            <Tab label="Perfil" {...a11yProps(0)} />
            <Tab label="Equipo" {...a11yProps(1)} />
            <Tab label="Seguridad" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <Paper elevation={1} sx={{ mt: 2 }}>
          <TabPanel value={value} index={0}>
            <Profile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Team />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Security />
          </TabPanel>
        </Paper>
      </Box>

    </Box>
  );
}