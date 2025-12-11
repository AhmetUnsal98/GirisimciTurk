"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { lessonRequests } from "@/lib/data"; // Veri kaynağını import ediyoruz
import "./Navbar.scss";

interface User {
  id: number; // ID kontrolü için gerekli
  name: string;
  role: "admin" | "instructor" | "user";
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        setCurrentUser(null);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (currentUser?.role === "instructor") {
      const checkNotifications = () => {
        const count = lessonRequests.filter(
          (req) =>
            req.instructorId === currentUser.id && req.status === "approved"
        ).length;

        setNotificationCount(count);
      };

      checkNotifications();

      const interval = setInterval(checkNotifications, 2000);

      return () => clearInterval(interval);
    } else {
      setNotificationCount(0);
    }
  }, [currentUser, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setNotificationCount(0);
    router.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link href="/">Girişimci Türk</Link>
        </div>

        <ul className="navbar__menu">
          <li>
            <Link href="/courses" className="navbar__link">
              Eğitimler
            </Link>
          </li>

          {currentUser &&
            (currentUser.role === "user" ||
              currentUser.role === "instructor") && (
              <li>
                <Link href="/request-lesson" className="navbar__link">
                  Canlı Ders Talep
                </Link>
              </li>
            )}

          {currentUser && currentUser.role === "instructor" && (
            <li>
              <Link href="/instructor-panel" className="navbar__link">
                Eğitmen Paneli
                {notificationCount > 0 && (
                  <span className="nav-badge animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </li>
          )}

          {currentUser && currentUser.role === "user" && (
            <li>
              <Link href="/my-courses" className="navbar__link">
                Satın Aldıklarım
              </Link>
            </li>
          )}

          {currentUser && currentUser.role === "admin" && (
            <li>
              <Link href="/admin" className="navbar__link">
                Yönetim Paneli
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar__actions">
          {currentUser ? (
            <div className="navbar__user-info">
              <div className="navbar__profile">
                <span className="navbar__username">{currentUser.name}</span>
                <span className="navbar__role-badge">
                  {currentUser.role.toUpperCase()}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="navbar__btn navbar__btn--outline"
              >
                Çıkış
              </button>
            </div>
          ) : (
            <Link href="/login" className="navbar__btn navbar__btn--primary">
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
