import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Girişimci Türk</h3>
          <p className="footer__text">
            Türk dünyasının geleceğini kodlayan yazılım mimarları ile yeni nesil
            eğitim ve ulaşım çözümleri.
          </p>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">Keşfet</h4>
          <ul className="footer__links">
            <li>
              <a href="/courses">Eğitimler (Udemy Modülü)</a>
            </li>
            <li>
              <a href="/request-lesson">Özel Ders</a>
            </li>
            <li>
              <a href="/teach">Eğitmen Ol</a>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4 className="footer__subtitle">İletişim</h4>
          <ul className="footer__links">
            <li>ik@girisimciturk.com</li>
            <li>Ankara, Türkiye</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {currentYear} Girişimci Türk - Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
