import Box from "@mui/material/Box";
import StaffSection from "./staffSection";
import Typography from "@mui/material/Typography";
import bg_image from "../../images/backgroundWelcome.jpg";

export default function HomeSection() {
  return (
    <>
      <Box
        component="section"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: 280, sm: 400 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 5, sm: 8 },
          overflow: "hidden",
        }}
      >
        {/* Fondo con blur */}
        <Box
          component="img"
          src={bg_image}
          alt="background-image"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(5px) brightness(0.7)",
            zIndex: 0,
          }}
        />
        {/* Gradiente superior para prevenir solapamiento */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: { xs: 56, sm: 72, md: 10 },
            zIndex: 1,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, #fff 90%)",
          }}
        />
        {/* Contenido por delante */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1100,
            mx: "auto",

            px: 0, // <-- sin padding horizontal
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Roboto Slab",
              fontWeight: 800,
              color: "#fff",
              textShadow: "0 1px 8px #12376b80",
              mb: { xs: 2, sm: 3 },
              lineHeight: 1.2,
              fontSize: {
                xs: "clamp(2.2rem, 8vw, 3.4rem)", // Escala entre móviles y tablets
                sm: "clamp(2.7rem, 6vw, 4.5rem)", // Tablets
                md: "clamp(3.2rem, 7vw, 6rem)", // Desktop
              },
              letterSpacing: "-0.03em",
            }}
          >
            Somos WhitEagle
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Roboto Slab",
              color: "#f2f2f2",
              textShadow: "0 1px 6px #1257A2cc",
              px: { xs: 1, sm: 3 },
              lineHeight: 1.5,
              maxWidth: 540,
              fontSize: {
                xs: "clamp(1.05rem, 4vw, 1.35rem)", // Escala en móviles/tablet
                sm: "clamp(1.15rem, 2vw, 1.5rem)", // Tablets
                md: "1.8rem", // Desktop
              },
            }}
          >
            La mejor alternativa para tus proyectos
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          p: "2%"
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Roboto Slab",
            color: "#000000ff",
            textShadow: "0 1px 6px #1257A2cc",
            px: { xs: 1, sm: 3 },
            lineHeight: 1.5,
            maxWidth: 540,
            fontSize: {
              xs: "clamp(1.05rem, 4vw, 1.35rem)", // Escala en móviles/tablet
              sm: "clamp(1.15rem, 2vw, 1.5rem)", // Tablets
              md: "1.8rem", // Desktop
            },
            alignItems: "center",
          }}
        >
          Nuesto equipo
        </Typography>
      </Box>
      <StaffSection />
    </>
  );
}
