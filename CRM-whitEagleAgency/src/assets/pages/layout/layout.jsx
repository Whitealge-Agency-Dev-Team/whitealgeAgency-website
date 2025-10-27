import Profile from './sectionsLayout/profile.jsx';
import Team from './sectionsLayout/team.jsx';
import Login from '../login/login.jsx';
import Security from './sectionsLayout/security.jsx';
import "./Layout.css";
import { useState } from 'react';

export default function Layout() {
  const [some, setSome] = useState(<Profile/>);
  const handleSection = (e) => {
    
    if (e.target.getAttribute('data-value') == 'login') return setSome(<Login/>);
    if (e.target.getAttribute('data-value') == 'profile') return setSome(<Profile/>);
    if (e.target.getAttribute('data-value') == 'team') return setSome(<Team/>);
    if (e.target.getAttribute('data-value') == 'security') return setSome(<Security/>);
  }

  return (
    <div className="box-container">
      <div className="user-information">
        <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
          alt="user-img"
          id="user-img"
        />
        <span className="text">Lorem, ipsum.</span>
        <p>Lorem@gmail.com</p>
        <p>Team manager</p>
      </div>
      <div className="bar-section-container">
        <header className="bar-container">
          <button className="bar-section" data-value={'profile'} onClick={handleSection}>
            Perfil
          </button>
          <button className="bar-section" data-value={"team"} onClick={handleSection}>
            Equipo
          </button>
          <button className="bar-section" id="section-1" data-value={"security"} onClick={handleSection}>
            Seguridad
          </button>
        </header>
        {some}
      </div>
    </div>
  );
}
