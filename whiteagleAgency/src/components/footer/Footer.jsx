import logo from "../../../public/images/logo.svg";
import footer from "./footer.module.css"

export default function Footer() {

    return (
        <footer className={footer.footer}>
            <img src={logo} alt="Home" className={footer.logo}/>
            <div>
                <h2>Contactos</h2>
                <ul>
                    <li><a href="https://www.facebook.com/WhitEagleconsultant/" target="_blank"><img src="#" alt="Facebook" /></a></li>
                    <li><a href="https://www.linkedin.com/company/whiteagleconsultant/" target="_blank"><img src="#" alt="Linkedin" /></a></li>
                    <li><a href="https://www.instagram.com/whiteagleagency/" target="_blank"><img src="#" alt="Instagram" /></a></li>
                    <li><a href="mailto:whiteagleconsultant@gmail.com" title="whiteagleconsultant@gmail.com"><img src="#" alt="email" /></a></li>
                </ul>
            </div>
        </footer>
    );
}