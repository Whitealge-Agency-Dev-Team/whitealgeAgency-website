import logo from "../../../assets/images/logo.svg";
import FooterCSS from "./Footer.module.css";
import facebook from "../../../assets/images/footer/facebook.svg";
import linkedin from "../../../assets/images/footer/linkedin.svg";
import instagram from "../../../assets/images/footer/instagram.svg";
import gmail from "../../../assets/images/footer/gmail.svg";
import React from "react";

export default function Footer() {
  return (
    <footer className={FooterCSS.footer}>
      <div className={FooterCSS.footerContent}>
        <img src={logo} alt="Home" className={FooterCSS.logo} />
        <div>
          <h2>Contactos</h2>
          <ul className={FooterCSS.contactList}>
            <li>
              <a
                href="https://www.facebook.com/WhitEagleconsultant/"
                target="_blank"
              >
                <img src={facebook} alt="Facebook" className={FooterCSS.icon} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/whiteagleconsultant/"
                target="_blank"
              >
                <img src={linkedin} alt="Linkedin" className={FooterCSS.icon} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/whiteagleagency/"
                target="_blank"
              >
                <img src={instagram} alt="Instagram" className={FooterCSS.icon} />
              </a>
            </li>
            <li>
              <a
                href="mailto:whiteagleconsultant@gmail.com"
                title="whiteagleconsultant@gmail.com"
              >
                <img src={gmail} alt="email" className={FooterCSS.icon} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className={FooterCSS.creditsList}>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/facebook"
              title="facebook iconos"
              className={FooterCSS.creditLink}
            >
              Facebook iconos creados por Freepik - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/linkedin"
              title="linkedin iconos"
              className={FooterCSS.creditLink}
            >
              Linkedin iconos creados por Freepik - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/logotipo-de-instagram"
              title="logotipo de instagram iconos"
              className={FooterCSS.creditLink}
            >
              Logotipo de instagram iconos creados por Hight Quality Icons -
              Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/gmail"
              title="gmail iconos"
              className={FooterCSS.creditLink}
            >
              Gmail iconos creados por Freepik - Flaticon
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
