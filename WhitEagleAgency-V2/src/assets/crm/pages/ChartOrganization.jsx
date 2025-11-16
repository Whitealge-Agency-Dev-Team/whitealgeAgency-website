import { Box, Grid, Paper, Typography, Avatar, Toolbar } from '@mui/material';
import Header from "../layout-crm/header";


const manager = { name: "Nombre Gerente", role: "Team Manager", img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" };
const agents = [
  { name: "Nombre Agente 1", role: "Support Agent", img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" },
  { name: "Nombre Agente 2", role: "Support Agent", img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" },
  { name: "Nombre Agente 3", role: "Support Agent", img: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" },
];

export default function Chart() {
  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <Header/>
      <Toolbar />
      
      <Typography variant="h5" gutterBottom>Organigrama de la empresa</Typography>
      {/* Contenedor principal del organigrama */}
      <Box sx={{ 
        minHeight: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        bgcolor: 'background.paper', // Fondo blanco
        py: 5, // Padding vertical
        px: { xs: 2, md: 4 } // Padding horizontal responsivo
      }}>

        {/* --- 1. Tarjeta del Manager --- */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            minWidth: 280, // Ancho mínimo de la tarjeta
            zIndex: 2 // Asegura que esté sobre las líneas
          }}
        >
          <Avatar src={manager.img} alt={manager.role} sx={{ width: 90, height: 90, mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {manager.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {manager.role}
          </Typography>
        </Paper>

        {/* --- 2. Líneas de Flujo (Vertical y Horizontal) --- */}
        {/* Línea Vertical (baja del manager) */}
        <Box sx={{ height: 40, width: '2px', bgcolor: 'divider' }} />
        
        {/* Línea Horizontal (conecta a los agentes) */}
        <Box sx={{ 
          height: '2px', 
          width: { xs: '80%', md: '53%' }, // Ancho responsivo
          bgcolor: 'divider' 
        }} />

        {/* --- 3. Tarjetas de Agentes (Grid Responsivo) --- */}
        <Grid 
          container 
          justifyContent="center" 
          spacing={4} // Espacio entre tarjetas
          sx={{ 
            width: { xs: '90%', md: '70%' }, 
            mt: 0, // Se pega a la línea horizontal
            justifyContent: 'space-evenly'
          }}
        >
          {agents.map((agent, idx) => (
            <Grid 
              item 
              xs={12} sm={4} md={3} 
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                pt: 4 // Padding superior para la línea conectora
              }}
            >
              {/* Línea Conectora Vertical (sube al agente) */}
              <Box sx={{
                height: 40, // Debe coincidir con el 'pt'
                width: '2px',
                bgcolor: 'divider',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)', // Centra la línea
              }} />

              {/* Tarjeta del Agente */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  width: '100%', // Ocupa todo el espacio del Grid
                }}
              >
                <Avatar src={agent.img} alt={agent.role} sx={{ width: 80, height: 80, mb: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {agent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {agent.role}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}