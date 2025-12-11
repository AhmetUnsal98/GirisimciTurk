import Link from "next/link";
import "./page.scss"; // SCSS dosyasını import ediyoruz

export default function Home() {
  return (
    <div className="landing-page">
      <div className="ambient-light light-blue" />
      <div className="ambient-light light-purple" />

      <div className="container">
        <div className="badge">
          <span className="dot-container">
            <span className="ping"></span>
            <span className="dot"></span>
          </span>
          Girişimci Türk Ekosistemi
        </div>

        {/* Başlık */}
        <h1 className="hero-title">
          Geleceği Kodlayanların <br />
          <span className="gradient-text">Buluşma Noktası</span>
        </h1>

        {/* Açıklama */}
        <p className="hero-description">
          Yazılım dünyasına adım at, uzman eğitmenlerden ders al veya
          <strong> Canlı Mentorluk </strong>
          ile kariyerine hız kazandır. Hepsi tek platformda.
        </p>

        {/* Butonlar */}
        <div className="cta-group">
          <Link href="/courses" className="btn btn-primary">
            Eğitimleri İncele
            <span className="arrow">→</span>
          </Link>

          <Link href="/login" className="btn btn-outline">
            Giriş Yap
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Video Eğitim</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Uzman Eğitmen</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">7/24</div>
            <div className="stat-label">Canlı Destek</div>
          </div>
        </div>
      </div>
    </div>
  );
}
