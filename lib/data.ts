export type Role = "user" | "instructor" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  purchasedCoursesIds: number[];
}

export interface Course {
  id: number;
  title: string;
  price: number;
  instructorId: number;
}
export interface LessonRequest {
  id: number;
  studentId: number;
  instructorId: number;
  subject: string;
  status: "pending" | "approved" | "rejected";
  requestTime: string;
}
export const users: User[] = [
  {
    id: 1,
    name: "Ahmet",
    email: "ahmet@gmail.com",
    password: "123",
    role: "user",
    purchasedCoursesIds: [],
  },
  {
    id: 2,
    name: "Mehmet Eğitmen",
    email: "mehmet@gmail.com",
    password: "123",
    role: "instructor",
    purchasedCoursesIds: [],
  },
  {
    id: 3,
    name: "Murat Admin",
    email: "admin@gmail.com",
    password: "123",
    role: "admin",
    purchasedCoursesIds: [],
  },
];

export const courses: Course[] = [
  { id: 1, title: "TypeScript Basics", price: 50, instructorId: 2 },
  { id: 2, title: "Advanced JavaScript", price: 75, instructorId: 2 },
  { id: 3, title: "RabbitMQ", price: 175, instructorId: 2 },
  { id: 4, title: ".Net Core", price: 150, instructorId: 2 },
  { id: 5, title: "Veritabani Temelleri", price: 100, instructorId: 2 },
];

export const lessonRequests: LessonRequest[] = [];
