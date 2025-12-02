import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoursesJSON from "./courses.json";
import { Box, Typography, Card, CardMedia, CardContent, Button} from "@mui/material";

export default function CourseData() {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const lowerName = courseName.toLowerCase().replace(/_/g, " ");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const foundCourse = CoursesJSON.flatMap((category) => category.courses)
      .find((course) => course.name.toLowerCase() === lowerName);

    if (foundCourse) {
      setCourse(foundCourse);
      document.title = `${foundCourse.name} - WhitEagle`;
      window.scrollTo(0, 0);
    } else {
      navigate("/404", { replace: true });
    }
  }, [lowerName, navigate]);

  if (!course) return null;

  return (
    <Box sx={{ bgcolor: "white", minHeight: "80vh", py: { xs: 4, md: 8 }, px: { xs: 2, md: 8 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button
      variant="outlined"
      color="primary"
      sx={{ mb: 3, alignSelf: "flex-start" }}
      onClick={() => navigate("/courses")}
    >
      Volver a Cursos
    </Button>
      <Card sx={{ maxWidth: 480, width: "100%", boxShadow: 3, borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="230"
          image={course.img}
          alt={course.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            {course.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {course.desc}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
