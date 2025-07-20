import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Courses from "../../../JSON/Courses.json";
import "./Courses.css";
export default function CategoryCourses() {
  return (
    <div className="grid-Courses">
      {Object.entries(Courses.categories).map(([key, value]) => (
        <div className="categoryCourses" key={key}>
          <header className="categoryCourses-card-header">
            <h1 className="categoryCourses-card-title">{value.categoryName}</h1>
          </header>
          <img
            className="categoryCourses-img"
            src={value.categoryImg}
            alt={value.categoryName}
          />
          <div className="overlay">
            {Object.entries(value.courses).map(([k,v]) => (
              <Link className="categoryCourses-card-nameCourse" key={k} to={`/Curso/${key}/${k}`}>
                <li>{v.nameCourse}</li>
                <br/>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
