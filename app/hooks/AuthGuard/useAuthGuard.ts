"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");

      if (!user) {
        router.push("/login");
      }
    }
  }, [router]);
};
