import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Layout/Footer/Footer";
import HomeSection from "../../../components/Home/HomeSection/HomeSection";
import guideUserJSON from "../../../JSON/CRM/guideUser.json";
import CRMLayoutCSS from "./CRMLayout.module.css";
import CRMHeader from './CRM-Header/CRM-Header'

function CRMLayout() {
  return (
    <>
    <CRMHeader/>
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
