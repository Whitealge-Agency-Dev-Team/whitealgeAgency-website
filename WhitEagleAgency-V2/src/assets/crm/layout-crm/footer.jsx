import {React, useState} from "react";
import { Box, Grid, Typography, Link, Container, Divider } from "@mui/material";
import LegalModal from "./legalModal";
export default function Footer() {
  const date = new Date().getFullYear();
  const version = "v1.0.0 (Beta)";
  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("privacy"); // 'privacy' o 'terms'
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (type, title) => {
    setModalType(type);
    setModalTitle(title);
    setModalOpen(true);
  };
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "space-between" }} // MD: Separado extremos, XS: Centrado
          alignItems="center"
        >
          {/* LADO IZQUIERDO: Copyright + Versión */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Typography variant="body2" color="text.secondary">
              © {date} <strong>WhitEagle Legacy | Fiscella y Asociados</strong>
              {/* Separador vertical pequeño */}
              <Box component="span" sx={{ mx: 1, opacity: 0.5 }}>
                |
              </Box>
              <Typography
                component="span"
                variant="caption"
                sx={{ opacity: 0.7 }}
              >
                {version}
              </Typography>
            </Typography>
          </Grid>

          {/* LADO DERECHO: Links Legales + Soporte */}
          <Grid
            item
            xs={12}
            md="auto"
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-end" },
                flexWrap: "wrap",
              }}
            >
              {/* Estos links dan "peso" corporativo, aunque apunten a # por ahora */}
              <Link
                component="button" // Importante para que actúe como botón
                onClick={() => openModal("privacy", "Política de Privacidad")}
                color="text.secondary"
                underline="hover"
                variant="body2"
              >
                Privacidad
              </Link>

              <Link
                color="text.secondary"
                underline="hover"
                variant="body2"
                component="button"
                onClick={() => openModal("terms", "Términos de Uso")}
              >
                Términos
              </Link>

              <LegalModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                contentType={modalType}
              />

              <Typography variant="body2" color="text.secondary">
                Soporte:{" "}
                <Link
                  href="mailto:legacyeaglecrm@gmail.com"
                  color="primary" // Color primario para resaltar la acción importante
                  underline="hover"
                  sx={{ fontWeight: 500 }}
                >
                  legacyeaglecrm@gmail.com
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
