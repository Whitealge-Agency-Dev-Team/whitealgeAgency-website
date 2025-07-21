import React from "react";
import HomeSectionCSS from "./HomeSection.module.css";

export default function HomeSection({ title, desc, img, alt, flex}) {
  return (
    <section className={HomeSectionCSS.section}>
      <h1 className={HomeSectionCSS.sectionTitle}>{title}</h1>
      <div className={HomeSectionCSS.sectionInfo} style={{ flexDirection: flex }}>
        <p>{desc}</p>
        <img src={img} alt={alt} className={HomeSectionCSS.image} />
      </div>
    </section>
  );
}
