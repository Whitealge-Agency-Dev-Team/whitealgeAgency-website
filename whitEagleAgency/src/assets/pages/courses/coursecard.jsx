import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";

export default function CourseCard({ name, description, img }) {
  const [opacity, setOpacity] = useState(0);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        borderRadius: 3,
        cursor: "pointer",
        minHeight: 260,
         maxWidth: 340,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: 2,
        transition: "box-shadow 0.25s",
        "&:hover": {
          boxShadow: 8,
        },
      }}
      component={RouterLink}
      to={`/courses/${name.replace(/\s+/g, "_").toLowerCase()}`}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "rgba(255,255,255,0.92)",
          p: 2,
          transition: "opacity 0.4s",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "text.primary",
            mb: 1,
            fontWeight: 600,
            textShadow: "0 1px 3px rgba(255,255,255,0.3)",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            opacity: { xs: 1, md: opacity }, // Siempre visible en móvil, con hover en desktop.
            maxHeight: 100,
            overflow: "hidden",
            transition: "opacity 0.4s",
            color: "text.secondary",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}
