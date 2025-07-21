import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CourseCardCSS from "./CourseCard.module.css";

export default function CourseCard({ name, description, img }) {
  const [display, setDisplay] = useState("none");
  const handleMouseEnter = () => setDisplay("block");
  const handleMouseLeave = () => setDisplay("none");
  return (
    <Link to={`/courses/${name.replace(/\s+/g, "_").toLowerCase()}`}>
      <div
        className={CourseCardCSS.card}
        style={{ backgroundImage: `url(${img})` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1>{name}</h1>
        <p style={{ display: display }}>{description}</p>
      </div>
    </Link>
  );
}
