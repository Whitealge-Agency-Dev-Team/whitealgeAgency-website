import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const services = [
  {
    title: "Desarrollo de planes de negocio",
    desc: "Creamos planes claros y efectivos para guiar el crecimiento de tu empresa.",
  },
  {
    title: "Análisis de competencia",
    desc: "Estudiamos el mercado y la competencia para darte ventaja estratégica.",
  },
  {
    title: "Diseño de estrategias de crecimiento",
    desc: "Definimos caminos sólidos para expandir tus operaciones de forma sostenible.",
  },
  {
    title: "Reestructuración organizacional",
    desc: "Optimizamos la estructura de tu empresa para mejorar eficiencia y comunicación.",
  },
  {
    title: "Optimización de procesos internos",
    desc: "Detectamos y mejoramos procesos para reducir costos y aumentar productividad.",
  },
];

export default function Services() {
  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh", py: { xs: 4, md: 8 }, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Servicios
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        En WhitEagle ofrecemos soluciones adaptadas a tus necesidades: desde detectar problemas en sistemas hasta reuniones periódicas para medir avances y resultados.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
