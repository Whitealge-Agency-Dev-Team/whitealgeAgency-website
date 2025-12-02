import React, { useEffect } from "react";
import CoursesJSON from "./courses.json";
import CourseCard from "./coursecard";
import { Box, Typography, Grid } from "@mui/material";

export default function Courses() {
  useEffect(() => {
    document.title = "Cursos - WhitEagle";
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Cursos
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        exercitationem minus eveniet delectus necessitatibus alias ipsa ex!
        Suscipit dolor mollitia magni libero? Saepe laudantium dolore quas
        minima autem at voluptatem.
      </Typography>
      {CoursesJSON.map((category, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {category.name}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, sm: 4, md: 4 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {category.courses.map((course, idx) => (
              <Grid
                item
                xs={12} // 1 columna en mobile
                sm={6} // 2 columnas en tablet
                md={4} // 3 columnas en escritorio
                key={idx}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CourseCard
                  name={course.name}
                  description={course.desc}
                  img={course.img}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
