import React from 'react';
import { Box, Grid, Paper, Avatar, Typography, Divider } from '@mui/material';

// Datos de ejemplo para los miembros
const members = [
  { name: 'Lorem1' },
  { name: 'Lorem2' },
  { name: 'Lorem3' },
  { name: 'Lorem4' },
  { name: 'Lorem5' },
];

export default function Team() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Equipo
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sos el gerente del equipo
      </Typography>

      {/* Grid responsivo: 1 col en móvil (xs), 2 en tablet (sm), 3 en desktop (md) */}
      <Grid container spacing={2} sx={{ my: 2 }}>
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 // Espacio entre avatar y texto
              }}
            >
              <Avatar src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" />
              <Typography variant="body1">{member.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Sección de Proyectos */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Project: Lorem, ipsum.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, tempora.
          Tempora recusandae reprehenderit odio voluptatum veritatis ad quibusdam
          enim ea, consequatur error maiores mollitia! Ad repellendus incidunt
          cum nam id?
        </Typography>
      </Box>
    </Box>
  );
}