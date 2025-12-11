import React from "react";
import { Course } from "@/lib/data";
import Link from "next/link";
import "./CourseCard.scss";

interface CourseCardProps {
  course: Course;
  instructorName: string;
  isPurchased: boolean;
  onBuy: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  instructorName,
  isPurchased,
  onBuy,
}) => {
  return (
    <div className={`course-card ${isPurchased ? "course-card--owned" : ""}`}>
      <div className="course-card__header">
        <span className="course-card__badge">
          {isPurchased ? "Satın Alındı" : "Popüler"}
        </span>
      </div>

      <div className="course-card__body">
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__instructor"> {instructorName}</p>
        <div className="course-card__price-wrapper">
          <span className="course-card__price">
            {isPurchased ? "Erişime Açık" : `${course.price} ₺`}
          </span>
        </div>
      </div>

      <div className="course-card__footer">
        <Link href={``} className="course-card__btn course-card__btn--detail">
          İncele
        </Link>

        <button
          onClick={() => onBuy(course)}
          disabled={isPurchased}
          className={`course-card__btn ${
            isPurchased ? "course-card__btn--disabled" : "course-card__btn--buy"
          }`}
        >
          {isPurchased ? "Dersleri İzle" : "Satın Al"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
