"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/lib/data";
import "./login.scss";

export default function LoginPage() {
  const router = useRouter();

  // State Yönetimi
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert(`Hoşgeldin ${user.name} (${user.role})`);
        router.push("/courses");
      } else {
        setError("Kullanıcı adı veya şifre hatalı!");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Giriş Yap</h1>
          <p>Girişimci Türk Eğitim Platformuna Devam Et</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E - Posta</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Örn: ahmet"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Hesaplar:</p>
          <small>User: ahmet@gmail.com / 123</small> <br />
          <small>Instructor: mehmet@gmail.com / 123</small>
        </div>
      </div>
    </div>
  );
}
