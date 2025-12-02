import React from "react";
import { Box, Grid, Typography, Link as MuiLink } from "@mui/material";
import logo from "../../images/logo.svg";
import facebook from "../../images/icons/facebook.svg";
import linkedin from "../../images/icons/linkedin.svg";
import instagram from "../../images/icons/instagram.svg";
import gmail from "../../images/icons/gmail.svg";

export default function Footer() {
  return (
    <Box component="footer" sx={{
      background: "#fff",
      boxShadow: "0 0.2rem 2rem rgba(0,0,0,0.05)",
      padding: { xs: "2rem 1rem", sm: "2.5rem 4rem" },
      mt: 3
    }}>
      <Grid container spacing={3} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <img src={logo} alt="Home" style={{ width: "6rem", height: "6rem", display: "flex" }} />
          <Typography>WhitEagleAgency</Typography>
          <Typography style={{color: "gray"}}>Consultora de Marketing para Pymes.</Typography>
          <Typography style={{color: "gray"}}>Siendo la mejor alternativa para tus proyectos.</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontFamily: "Roboto Slab", mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
            Contactos
          </Typography>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 2 }}>
            <MuiLink href="https://www.facebook.com/WhitEagleconsultant/" target="_blank" rel="noopener">
              <img src={facebook} alt="Facebook" style={{ width: "2.2rem", height: "2.2rem" }} />
            </MuiLink>
            <MuiLink href="https://www.linkedin.com/company/whiteagleconsultant/" target="_blank" rel="noopener">
              <img src={linkedin} alt="Linkedin" style={{ width: "2.2rem", height: "2.2rem" }} />
            </MuiLink>
            <MuiLink href="https://www.instagram.com/whiteagleagency/" target="_blank" rel="noopener">
              <img src={instagram} alt="Instagram" style={{ width: "2.2rem", height: "2.2rem" }} />
            </MuiLink>
            <MuiLink href="mailto:whiteagleconsultant@gmail.com" title="whiteagleconsultant@gmail.com">
              <img src={gmail} alt="email" style={{ width: "2.2rem", height: "2.2rem" }} />
            </MuiLink>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ mt: { xs: 4, md: 0 } }}>
            <ul style={{ padding: 0, margin: 0 }}>
              <li>
                <MuiLink
                  href="https://www.flaticon.es/iconos-gratis/facebook"
                  title="facebook iconos"
                  sx={{ fontSize: "0.8rem", color: "#1257A2", textDecoration: "none", fontFamily: "Roboto Slab" }}
                  target="_blank"
                  rel="noopener"
                >
                  Facebook iconos creados por Freepik - Flaticon
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="https://www.flaticon.es/iconos-gratis/linkedin"
                  title="linkedin iconos"
                  sx={{ fontSize: "0.8rem", color: "#1257A2", textDecoration: "none", fontFamily: "Roboto Slab" }}
                  target="_blank"
                  rel="noopener"
                >
                  Linkedin iconos creados por Freepik - Flaticon
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="https://www.flaticon.es/iconos-gratis/logotipo-de-instagram"
                  title="logotipo de instagram iconos"
                  sx={{ fontSize: "0.8rem", color: "#1257A2", textDecoration: "none", fontFamily: "Roboto Slab" }}
                  target="_blank"
                  rel="noopener"
                >
                  Logotipo de instagram iconos creados por Hight Quality Icons - Flaticon
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  href="https://www.flaticon.es/iconos-gratis/gmail"
                  title="gmail iconos"
                  sx={{ fontSize: "0.8rem", color: "#1257A2", textDecoration: "none", fontFamily: "Roboto Slab" }}
                  target="_blank"
                  rel="noopener"
                >
                  Gmail iconos creados por Freepik - Flaticon
                </MuiLink>
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
