import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import RelationsJSON from "./relationships.json";

export default function Relationships() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Empresas Internacionales
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mb: 4, maxWidth: 1200, mx: "auto" }}
        justifyContent="center"
        alignItems="center"
      >
        {Object.entries(RelationsJSON.internacionales).map(([key, company]) => (
          <Grid item xs={12} sm={4} md={4} key={company.id} sx={{ m: 0.5 }}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 320,
                height: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {company.empresa}
                </Typography>
                <Typography variant="body2">{company.rubro}</Typography>
                <Typography variant="body2">{company.ubicacion}</Typography>
                <Typography variant="body2">{company.representante}</Typography>
                <CardMedia
                  component="img"
                  height="60"
                  image={company.imagen} // company.logo debe ser la URL de la imagen
                  alt={company.empresa}
                  sx={{ objectFit: "contain", mx: "auto", my: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Empresas Nacionales
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: 1200, mx: "auto" }}
        justifyContent="center"
        alignItems="center"
      >
        {Object.entries(RelationsJSON.nacionales).map(([key, company]) => (
          <Grid item xs={12} sm={4} md={4} key={company.id} sx={{ m: 0.5 }}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 320,
                height: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mx: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {company.empresa}
                </Typography>
                <Typography variant="body2">{company.rubro}</Typography>
                <CardMedia
                  component="img"
                  height="60"
                  image={company.logo} // company.logo debe ser la URL de la imagen
                  alt={company.empresa}
                  sx={{ objectFit: "contain", mx: "auto", my: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
