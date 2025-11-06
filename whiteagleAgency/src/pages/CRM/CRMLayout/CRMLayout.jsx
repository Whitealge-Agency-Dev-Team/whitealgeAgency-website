import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Layout/Footer/Footer";
import CRMLayoutCSS from "./CRMLayout.module.css";
import CRMHeader from "./CRM-Header/CRM-Header";
import { Box, Button, Typography, Stack } from "@mui/material";

// Imágenes de fondo ejemplo:
const images = {
  proyectos: "../../../assets/images/home/backgroundWelcome.jpg",
  entrevistas: "../../../assets/images/home/backgroundWelcome.jpg",
  organigrama: "../../../assets/images/home/backgroundWelcome.jpg",
  trabajadores: "../../../assets/images/home/backgroundWelcome.jpg",
};

const buttonStyle = (image) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: 260,
  height: 180,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 18,
  boxShadow: "0 4px 20px rgba(14, 26, 66, 0.989)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 28px rgba(0,0,0,0.22)",
    filter: "brightness(1.07)",
  },
});

const textStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 28,
  textShadow: "2px 2px 6px #000, -2px -2px 6px #000",
  letterSpacing: 1.5,
};

function CRMLayout() {
  return (
    <>
      <CRMHeader />
      <main className={CRMLayoutCSS.main}>
        <Box
          minHeight="100vh"
          width="100vw"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Stack direction="column" spacing={12} width="70%" alignItems="center">
            <Typography sx={textStyle}>¡Bienvenido al CRM de WhitEagle Agency!</Typography>
            {/* Botones superiores */}
            <Stack direction="row" spacing={12}>
              <Button sx={buttonStyle(images.proyectos)}>
                <Typography sx={textStyle}>Mis proyectos</Typography>
              </Button>
              <Button sx={buttonStyle(images.entrevistas)}>
                <Typography sx={textStyle}>Mis entrevistas</Typography>
              </Button>
            </Stack>
            {/* Botones inferiores */}
            <Stack direction="row" spacing={12}>
              <Button sx={buttonStyle(images.organigrama)}>
                <Typography sx={textStyle}>Mi organigrama</Typography>
              </Button>
              <Button sx={buttonStyle(images.trabajadores)}>
                <Typography sx={textStyle}>Trabajadores</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </main>
      <br />
      <Footer />
    </>
  );
}

export default CRMLayout;
