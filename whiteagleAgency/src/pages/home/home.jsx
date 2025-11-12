import HomeCSS from "./home.module.css";
import Staff from "../../components/Home/StaffCard/Staff";
import StaffJSON from "../../JSON/staff.json";
import HomeSectionJSON from "../../JSON/HomeSection.json";
import Welcome from "../../components/Home/Welcome/Welcome";
import HomeSection from "../../components/Home/HomeSection/HomeSection";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.title = "Inicio - WhitEagle";
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
      <Welcome />
      <div style={{display:'flex',gap:'1rem',justifyContent:'center',margin:'20px 0'}}>
        <Link to="/crm/login" className={HomeCSS.ctaLink}>Login</Link>
        <Link to="/contacto" className={HomeCSS.ctaLink}>Realizar consulta</Link>
      </div>
      <div className={HomeCSS.first}>
        {HomeSectionJSON.map((section, index) => (
          <HomeSection
            key={index}
            title={section.title}
            desc={section.desc}
            img={section.img}
            alt={section.alt}
            flex={section.flex}
          />
        ))}
      </div>
      <div>
        <h1 className={HomeCSS.sectionTitle}>Nuestro Staff</h1>
        <div className={HomeCSS.staffContainer}>
          {StaffJSON.map((member, index) => (
            <Staff
              key={index}
              name={member.name}
              assets={member.assets}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
