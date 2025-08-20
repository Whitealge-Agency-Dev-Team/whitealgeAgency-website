import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Layout/Footer/Footer";
import HomeSection from "../../../components/Home/HomeSection/HomeSection";
import guideUserJSON from "../../../JSON/CRM/guideUser.json";
import CRMLayoutCSS from "./CRMLayout.module.css";

function CRMLayout() {
  return (
    <>
      <header className={CRMLayoutCSS.header}>
        <nav className={CRMLayoutCSS.navbar}>
          <ul className={CRMLayoutCSS.navlist}>
            <li className={CRMLayoutCSS.navitem}>
              <Link to={"/"}>WhitEagle</Link>
            </li>
            <li className={CRMLayoutCSS.navitem}>Funcionalidad 1</li>
            <li className={CRMLayoutCSS.navitem}>Funcionalidad 2</li>
            <li className={CRMLayoutCSS.navitem}>Funcionalidad 3</li>
            <li className={CRMLayoutCSS.navitem}>Funcionalidad 4</li>
          </ul>
        </nav>
      </header>
      <main className={CRMLayoutCSS.main}>
        <h1 className={CRMLayoutCSS.title}>Guia de usuario</h1>
        {guideUserJSON.map((section, index) => {
          return (
            <HomeSection
              key={index}
              title={section.title}
              desc={section.desc}
              img={section.img}
              alt={section.alt}
              flex={section.flex}
            />
          );
        })}
      </main>
      <br />
      <Footer />
    </>
  );
}

export default CRMLayout;
