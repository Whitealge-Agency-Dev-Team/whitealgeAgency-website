import React, { useEffect } from "react";
import CoursesJSON from "../../JSON/Courses.json";
import CourseCard from "../../components/Courses/CourseCard/CourseCard";
import CoursesCSS from "./Courses.module.css";

export default function Courses() {
  useEffect(() => {
    document.title = "Cursos - WhitEagle";
    window.scrollTo(0, 0)
  }, []);
  return (
    <div className={CoursesCSS.container}>
      <h1 className={CoursesCSS.title}>Cursos</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        exercitationem minus eveniet delectus necessitatibus alias ipsa ex!
        Suscipit dolor mollitia magni libero? Saepe laudantium dolore quas
        minima autem at voluptatem.
      </p>
      <div>
        {CoursesJSON.map((category, index) => (
          <section key={index} className={CoursesCSS.section}>
            <h2>{category.name}</h2>
            <div className={CoursesCSS.category}>
              {category.courses.map((course, idx) => (
                <CourseCard
                  key={index + idx}
                  name={course.name}
                  description={course.desc}
                  img={course.img}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
