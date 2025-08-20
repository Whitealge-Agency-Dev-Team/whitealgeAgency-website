import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CourseCardCSS from "./CourseCard.module.css";

export default function CourseCard({ name, description, img }) {
  const [opacity, setOpacity] = useState(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  return (
    <Link to={`/courses/${name.replace(/\s+/g, "_").toLowerCase()}`}>
      <div
        className={CourseCardCSS.card}
        style={{ backgroundImage: `url(${img})` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{name}</h1>
        <p style={{ opacity: opacity }} className={CourseCardCSS.desc}>
          {description}
        </p>
      </div>
    </Link>
  );
}
