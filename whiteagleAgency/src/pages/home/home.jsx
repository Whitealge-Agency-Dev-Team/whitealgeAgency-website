import HomeCSS from "./home.module.css";
import Staff from "../../components/Home/StaffCard/Staff";
import StaffJSON from "../../JSON/staff.json";
import HomeSectionJSON from "../../JSON/HomeSection.json";
import Welcome from "../../components/Home/Welcome/Welcome";
import HomeSection from "../../components/Home/HomeSection/HomeSection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Inicio - WhitEagle";
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
      <Welcome />
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
