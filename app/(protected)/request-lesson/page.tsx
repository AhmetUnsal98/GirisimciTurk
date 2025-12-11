"use client";

import React, { useState, useEffect } from "react";
import { users, lessonRequests, LessonRequest } from "@/lib/data";
import { useRouter } from "next/navigation";
import "./request.scss";

export default function RequestLessonPage() {
  const router = useRouter();

  // State Yönetimi
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [subject, setSubject] = useState("React & Next.js");
  const [status, setStatus] = useState<"idle" | "searching" | "approved">(
    "idle"
  );
  const [assignedInstructor, setAssignedInstructor] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser");
      if (stored) setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const handleRequest = () => {
    if (!currentUser) return;

    setStatus("searching");

    setTimeout(() => {
      findAndMatchInstructor();
    }, 3000);
  };

  const findAndMatchInstructor = () => {
    const instructor = users.find((u) => u.role === "instructor");

    if (instructor) {
      // B) Eşleşmeyi Kaydet (Mock Database)
      const newRequest: LessonRequest = {
        id: Date.now(),
        studentId: currentUser.id,
        instructorId: instructor.id,
        subject: subject,
        status: "approved",
        requestTime: new Date().toISOString(),
      };
      lessonRequests.push(newRequest);

      // C) State Güncelle
      setAssignedInstructor(instructor);
      setStatus("approved");

      alert(
        `🔔 SİMÜLASYON: Eğitmen ${instructor.name} cihazına bildirim gönderildi!\n"Yeni Ders Talebi: ${subject}"`
      );
    } else {
      alert("Şu an uygun eğitmen bulunamadı.");
      setStatus("idle");
    }
  };

  return (
    <div className="request-page">
      <div className="request-card">
        {/* DURUM 1: BOŞTA (Talep Oluşturma) */}
        {status === "idle" && (
          <>
            <h1 className="title">Canlı Ders Talep Et</h1>
            <p className="subtitle">Hangi konuda desteğe ihtiyacın var?</p>

            <div className="form-group">
              <label>Konu Seçimi</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="subject-select"
              >
                <option>React & Next.js</option>
                <option>TypeScript Mimarisi</option>
                <option>.NET Core & Backend</option>
                <option>DevOps & Docker</option>
              </select>
            </div>

            <div className="info-box">
              <p>
                📍 Konumunuz: <strong>Ankara/Türkiye</strong> (Otomatik)
              </p>
            </div>

            <button onClick={handleRequest} className="action-btn">
              Hemen Eğitmen Bul
            </button>
          </>
        )}

        {status === "searching" && (
          <div className="searching-container">
            <div className="pulse-ring"></div>
            <h3>En Uygun Eğitmen Aranıyor...</h3>
          </div>
        )}

        {status === "approved" && assignedInstructor && (
          <div className="match-container">
            <div className="success-icon">✓</div>
            <h2>Eşleşme Başarılı!</h2>

            <div className="instructor-card-mini">
              <div className="avatar">👨‍🏫</div>
              <div className="details">
                <h4>{assignedInstructor.name}</h4>
                <p>Kıdemli Yazılım Eğitmeni</p>
                <span className="rating">⭐ 4.9 (120 Ders)</span>
              </div>
            </div>

            <p className="match-note">
              Eğitmeniniz bildirimi kabul etti. Ders odası hazırlanıyor...
            </p>

            <button
              onClick={() => router.push("/courses")}
              className="action-btn action-btn--secondary"
            >
              Derse Git (Demo)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
