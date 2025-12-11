"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");

      if (!user) {
        router.push("/login");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Yükleniyor...</h3>
      </div>
    );
  }

  return <>{children}</>;
}
