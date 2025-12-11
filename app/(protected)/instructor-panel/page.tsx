"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { lessonRequests, users, LessonRequest } from "@/lib/data";
import "./instructor.scss";

export default function InstructorPanelPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [myLessons, setMyLessons] = useState<LessonRequest[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.role !== "instructor") {
          alert("Bu sayfaya erişim yetkiniz yok!");
          router.push("/courses");
          return;
        }

        setCurrentUser(user);
        loadLessons(user.id);
      }
    }
  }, [router]);

  const loadLessons = (instructorId: number) => {
    const filtered = lessonRequests.filter(
      (req) => req.instructorId === instructorId
    );

    setMyLessons(filtered);
  };

  const getStudentName = (studentId: number) => {
    const student = users.find((u) => u.id === studentId);
    return student ? student.name : "Bilinmeyen Öğrenci";
  };

  if (!currentUser) return null;

  return (
    <div className="instructor-panel">
      <header className="panel-header">
        <h1>Eğitmen Kontrol Paneli</h1>
        <p>
          Hoşgeldin, <strong>{currentUser.name}</strong>. İşte ders programın.
        </p>
      </header>

      {/* İstatistik Kartları */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Toplam Ders Talepleri</h3>
          <p className="stat-number">{myLessons.length}</p>
        </div>
      </div>

      {/* Ders Listesi Tablosu */}
      <div className="lessons-container">
        <h2>Gelen Canlı Ders Talepleri</h2>

        {myLessons.length === 0 ? (
          <div className="empty-state">
            <p>Henüz atanmış bir dersiniz bulunmuyor.</p>
          </div>
        ) : (
          <table className="lessons-table">
            <thead>
              <tr>
                <th>Tarih</th>
                <th>Öğrenci</th>
                <th>Konu</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {myLessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>
                    {new Date(lesson.requestTime).toLocaleDateString("tr-TR")}
                  </td>
                  <td>
                    <div className="student-info">
                      <span className="avatar">🎓</span>
                      {getStudentName(lesson.studentId)}
                    </div>
                  </td>
                  <td>{lesson.subject}</td>
                  <td>
                    <span className={`status-badge status-${lesson.status}`}>
                      {lesson.status === "approved" ? "Bekliyor" : "Tamamlandı"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
