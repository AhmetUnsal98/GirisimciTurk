"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { courses, users, Course } from "@/lib/data";
import "./my-courses.scss";

export default function MyCoursesPage() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);

        const purchased = courses.filter((course) =>
          user.purchasedCoursesIds.includes(course.id)
        );

        setMyCourses(purchased);
      }
    }
    setLoading(false);
  }, []);

  const getInstructorName = (id: number) => {
    return users.find((u) => u.id === id)?.name || "Bilinmiyor";
  };

  if (loading) return <div className="loading-state">Yükleniyor...</div>;

  return (
    <div className="my-courses-page">
      <header className="page-header">
        <h1>Öğrenim İçeriğim</h1>
        <p>
          Geleceğini kodlamaya devam et, <strong>{currentUser?.name}</strong>.
        </p>
      </header>

      {myCourses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>Henüz bir eğitime katılmadınız.</h2>
          <p>Kariyeriniz için ilk adımı atın ve kütüphanemizi keşfedin.</p>
          <Link href="/courses" className="btn-browse">
            Eğitimleri Keşfet
          </Link>
        </div>
      ) : (
        <div className="courses-grid">
          {myCourses.map((course) => (
            <div key={course.id} className="course-card-watch">
              <div className="card-image-placeholder">
                <span>▶</span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="card-instructor">
                  👨‍🏫 {getInstructorName(course.instructorId)}
                </p>

                {/* İlerleme Çubuğu (Simülasyon) */}
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  %{(Math.random() * 100).toFixed(0)} Tamamlandı
                </span>

                <button
                  className="btn-watch"
                  onClick={() =>
                    alert(
                      `"${course.title}" dersi oynatılıyor... (Video Player Modülü)`
                    )
                  }
                >
                  Derse Devam Et
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
