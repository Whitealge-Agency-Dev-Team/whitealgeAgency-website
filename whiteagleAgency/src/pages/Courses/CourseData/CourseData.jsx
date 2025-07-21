import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CoursesJSON from "../../../JSON/Courses.json";

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
    } else
      navigate("/404", { replace: true });
  }, [lowerName, navigate]);

  if (!course) return null;

  return (
    <>
      <h1>{course.name}</h1>
      <img src={course.img} alt={course.name} />
      <p>{course.desc}</p>
    </>
  );
}