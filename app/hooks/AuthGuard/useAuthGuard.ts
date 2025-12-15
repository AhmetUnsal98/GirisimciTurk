// hooks/useAuthGuard.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Sadece client tarafında çalışması için kontrol
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");

      if (!user) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  return { isAuthenticated };
};
