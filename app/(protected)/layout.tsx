// components/ProtectedLayout.js
"use client";

import React from "react";
import { useAuthGuard } from "../hooks/AuthGuard/useAuthGuard"; // Hook'un yolu

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mantığı hook'tan çekiyoruz
  const { isAuthenticated } = useAuthGuard();

  // Eğer doğrulanmadıysa Loading gösteriyoruz
  if (!isAuthenticated) {
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

  // Doğrulandıysa içeriği gösteriyoruz
  return <>{children}</>;
}
