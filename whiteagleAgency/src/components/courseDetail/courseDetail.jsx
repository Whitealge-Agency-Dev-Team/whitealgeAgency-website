import { useParams } from "react-router-dom"
import Course from '../../../JSON/Courses.json'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './courseDetail.css'
export default function CourseDetail() {
    const params = useParams();
    let findCourseByParams = () => {
        try {
        let listCourses = Object.entries(Course.categories).map(([key, value]) => (
        {key, value}
        ))
        
        let checkCategory = listCourses.find((e) => e.key == params.category);
        let checkCourseName = Object.entries(checkCategory.value.courses).find((x) => x[0] == params.id);

        checkCategory == undefined && checkCourseName == undefined ?
        console.error("Course not found") :
        (checkCategory == undefined || checkCourseName == undefined) ??
        console.error("Course not found")
        return checkCourseName[1]
    } catch (error) {
            console.error("error: " + error);
        }
    }
    return (
    
    <div className="course-Detail">
        <Link to="/courses">Volver</Link>
        <h1 className="cd-name" >{findCourseByParams().nameCourse}</h1>
        <h2 className="cd-desc" >{findCourseByParams().descriptionCourse}</h2>
        <img className="cd-img" src={findCourseByParams().imgCourse} alt={findCourseByParams().nameCourse} />
    </div>
    )
}
