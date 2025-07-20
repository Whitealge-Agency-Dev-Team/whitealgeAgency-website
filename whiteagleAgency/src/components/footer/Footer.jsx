import logo from "../../../public/images/logo.svg";
import footer from "./footer.module.css";
import facebook from "../../assets/images/footer/facebook.svg";
import linkedin from "../../assets/images/footer/linkedin.svg";
import instagram from "../../assets/images/footer/instagram.svg";
import gmail from "../../assets/images/footer/gmail.svg";
import React from "react";

export default function Footer() {
  return (
    <footer className={footer.footer}>
      <div className={footer.footerContent}>
        <img src={logo} alt="Home" className={footer.logo} />
        <div>
          <h2>Contactos</h2>
          <ul className={footer.contactList}>
            <li>
              <a
                href="https://www.facebook.com/WhitEagleconsultant/"
                target="_blank"
              >
                <img src={facebook} alt="Facebook" className={footer.icon} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/whiteagleconsultant/"
                target="_blank"
              >
                <img src={linkedin} alt="Linkedin" className={footer.icon} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/whiteagleagency/"
                target="_blank"
              >
                <img src={instagram} alt="Instagram" className={footer.icon} />
              </a>
            </li>
            <li>
              <a
                href="mailto:whiteagleconsultant@gmail.com"
                title="whiteagleconsultant@gmail.com"
              >
                <img src={gmail} alt="email" className={footer.icon} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className={footer.creditsList}>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/facebook"
              title="facebook iconos"
              className={footer.creditLink}
            >
              Facebook iconos creados por Freepik - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/linkedin"
              title="linkedin iconos"
              className={footer.creditLink}
            >
              Linkedin iconos creados por Freepik - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/logotipo-de-instagram"
              title="logotipo de instagram iconos"
              className={footer.creditLink}
            >
              Logotipo de instagram iconos creados por Hight Quality Icons -
              Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.es/iconos-gratis/gmail"
              title="gmail iconos"
              className={footer.creditLink}
            >
              Gmail iconos creados por Freepik - Flaticon
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
