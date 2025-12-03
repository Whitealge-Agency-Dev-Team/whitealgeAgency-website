import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Avatar,
  Fade,
  Alert
} from '@mui/material';
import {
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  ErrorOutline as ErrorIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';

export default function ConfirmClientContent (){
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Estados de la interfaz
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const clientData = {
    companyName: searchParams.get('companyName') || 'Empresa Desconocida',
    contactEmail: searchParams.get('contactEmail') || '',
    phone: searchParams.get('phone') || '',
    industry: searchParams.get('industry') || '',
    problemDescription: searchParams.get('problemDescription') || '',
    userId: searchParams.get('userId') 
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3000/clients/confirm-client', clientData);
      setSuccess(true);
      
    } catch (err) {
      console.error(err);
      setError('Hubo un error al intentar crear el cliente. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado de Estado: ÉXITO
  if (success) {
    return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Fade in={true}>
          <Paper elevation={3} sx={{ p: 5, textAlign: 'center', width: '100%', borderRadius: 4 }}>
            <Avatar sx={{ bgcolor: 'success.light', width: 80, height: 80, mx: 'auto', mb: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} />
            </Avatar>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
              ¡Cliente Creado!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              La empresa <strong>{clientData.companyName}</strong> ha sido añadida exitosamente a tu base de datos.
            </Typography>
            <Button variant="outlined" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
              Iniciar sesión para ver a sus clientes
            </Button>
          </Paper>
        </Fade>
      </Container>
    );
  }

  // Renderizado Principal (Formulario de confirmación)
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', py: 8, display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e0e0e0' }}>
            
            {/* Cabecera */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <PersonAddIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Solicitud de Nuevo Cliente
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Revisa los detalles antes de aceptar.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Lista de Detalles */}
            <List disablePadding>
              <DataItem label="Nombre de la Empresa" value={clientData.companyName} icon={<BusinessIcon color="action" />} />
              <DataItem label="Email de Contacto" value={clientData.contactEmail} />
              <DataItem label="Teléfono" value={clientData.phone} />
              <DataItem label="Industria" value={clientData.industry} />
              <Box sx={{ mt: 2, p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight="bold" display="block" mb={0.5}>
                  PROBLEMÁTICA
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {clientData.problemDescription || "Sin descripción proporcionada."}
                </Typography>
              </Box>
            </List>

            {/* Mensaje de Error si falla */}
            {error && (
              <Alert severity="error" icon={<ErrorIcon />} sx={{ mt: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Botones de Acción */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={handleConfirm}
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  fontWeight: 'bold', 
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' } 
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar y Crear'}
              </Button>
            </Box>

          </Paper>
        </Fade>
        
        <Typography variant="caption" align="center" display="block" sx={{ mt: 4, color: 'text.disabled' }}>
          Sistema de Gestión de Clientes &copy; 2024
        </Typography>
      </Container>
    </Box>
  );
};

// Sub-componente para filas limpias
const DataItem = ({ label, value, icon }) => (
  <ListItem disableGutters sx={{ py: 1 }}>
    <ListItemText
      primary={
        <Typography variant="caption" color="text.secondary" fontWeight="bold">
          {label.toUpperCase()}
        </Typography>
      }
      secondary={
        <Typography variant="body1" color="text.primary" sx={{ mt: 0.5 }}>
          {value || '---'}
        </Typography>
      }
    />
  </ListItem>
);

