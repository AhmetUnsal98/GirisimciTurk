"use client";

import React, { useState } from "react";
import { Course, User } from "@/lib/data";
import CourseCard from "../CourseCard/CourseCard";

interface CourseListProps {
  courses: Course[];
  users: User[];
}

const CourseList: React.FC<CourseListProps> = ({ courses, users }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [currentUser, setCurrentUser] = useState<User>(
    users.find((u) => u.id === 1) || users[0]
  );

  const handleBuyClick = (course: Course) => {
    if (!currentUser) {
      alert("Lütfen önce giriş yapın.");
      return;
    }
    if (currentUser.purchasedCoursesIds.includes(course.id)) {
      alert("Bu eğitimi zaten satın aldınız.");
      return;
    }

    setSelectedCourse(course);
  };

  const proceedToPayment = async () => {
    if (!selectedCourse) return;

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: selectedCourse,
          user: currentUser,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        window.location.href = data.paymentPageUrl;
      } else {
        alert("Ödeme başlatılamadı: " + data.message);
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error("Sistem hatası:", error);
      alert("Bir hata oluştu.");
      setSelectedCourse(null);
    }
  };

  const copyCardNumber = () => {
    navigator.clipboard.writeText("5890040000000016");
    alert("Kart numarası panoya kopyalandı!");
  };

  const getInstructorName = (id: number) => {
    const instructor = users.find((u) => u.id === id);
    return instructor ? instructor.name : "Bilinmiyor";
  };

  return (
    <>
      {/* KURS LİSTESİ */}
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            instructorName={getInstructorName(course.instructorId)}
            isPurchased={currentUser.purchasedCoursesIds.includes(course.id)}
            onBuy={handleBuyClick}
          />
        ))}
      </div>

      {selectedCourse && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>Ödeme Onayı</h2>

            <p style={{ color: "#666", lineHeight: "1.5" }}>
              <strong>{selectedCourse.title}</strong> eğitimi için ödeme
              sayfasına yönlendirileceksiniz.
            </p>

            <div
              style={{
                background: "#f3f4f6",
                padding: "15px",
                borderRadius: "8px",
                margin: "20px 0",
                border: "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                TEST KART BİLGİLERİ:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <code
                  style={{
                    background: "#fff",
                    padding: "5px 10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    flex: 1,
                  }}
                >
                  5890040000000016
                </code>
                <button
                  onClick={copyCardNumber}
                  style={{
                    cursor: "pointer",
                    padding: "5px 10px",
                    fontSize: "0.8rem",
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Kopyala
                </button>
              </div>

              <p style={{ fontSize: "0.85rem", margin: 0, color: "#555" }}>
                Tarih: 12/30 (Gelecek herhangi bir tarih)
                <br />
                CVC: 123
                <br />
                Ad Soyad: Farketmez "Test Test" olabilir.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setSelectedCourse(null)}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              >
                Vazgeç
              </button>
              <button
                onClick={proceedToPayment}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                Ödemeye Git
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseList;
