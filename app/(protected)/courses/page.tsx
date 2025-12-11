import React from "react";
import { courses, users } from "@/lib/data";
import "./courses.scss";
import CourseList from "./Components/CourseList/CourseList";

export default function CoursesPage() {
  return (
    <div className="courses-page-container">
      <header className="page-header">
        <h1 className="page-title">Yazılım Eğitimleri</h1>
        <p className="page-subtitle">
          Girişimci Türk ekosistemindeki uzman eğitmenlerden kariyerinize yön
          verecek eğitimler.
        </p>
      </header>

      <main>
        <CourseList courses={courses} users={users} />
      </main>
    </div>
  );
}
