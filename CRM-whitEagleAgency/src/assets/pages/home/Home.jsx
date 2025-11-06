import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box, Avatar } from '@mui/material';
import {Link} from "react-router-dom";

const drawerWidth = 240;

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {['Clientes', 'Proyectos'].map((text) => (
          <ListItem button={text} key={text}>
            <Link to={`/${text.toLowerCase()}`}><ListItemText primary={text} /></Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              edge="start" 
              onClick={handleDrawerToggle} 
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              CRM home
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: '#123f6cff', cursor: 'pointer' }}><Link to={'/profile'}>User</Link></Avatar>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Bienvenido al CRM de whitEagle
        </Typography>
        <Typography>
          Aquí puedes gestionar tus clientes, proyectos y tareas fácilmente.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
