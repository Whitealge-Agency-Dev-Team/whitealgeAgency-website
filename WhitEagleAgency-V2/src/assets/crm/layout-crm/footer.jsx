import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function Footer() {
  const [date, setDate] = useState(0);
  setDate(new Date().getFullYear);
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        p: 2,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center", // Centra contenido por defecto
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center" // Centra horizontalmente los items
        direction="row"
      >
        <Grid item xs={12} sm="auto">
          <Typography variant="body2" color="text.secondary">
            © {date} WhitEagle Legacy
          </Typography>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Typography variant="body2" color="text.secondary">
            Soporte:{" "}
            <a href="mailto:legacyeaglecrm@gmail.com">
              legacyeaglecrm@gmail.com
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
