"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/lib/data";

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const processedRef = useRef(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Ödemeniz doğrulanıyor...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token bulunamadı.");
      return;
    }

    if (processedRef.current) return;
    processedRef.current = true;

    const verifyPayment = async () => {
      try {
        const res = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        console.log("API Yanıtı:", data);

        if (data.status === "success") {
          let courseId = 0;

          if (data.conversationId && data.conversationId.includes("COURSE_")) {
            const parts = data.conversationId.split("_");
            // parts[1] ID'dir
            courseId = parseInt(parts[1]);
            console.log("ID conversationId'den alındı:", courseId);
          } else if (data.basketId && data.basketId.includes("B_")) {
            console.warn("conversationId eksik, basketId kullanılıyor.");
            const parts = data.basketId.split("_");

            courseId = parseInt(parts[1]);
            console.log("ID basketId'den kurtarıldı:", courseId);
          } else {
            throw new Error(
              "Ne conversationId ne de basketId içinde ID bulunamadı."
            );
          }

          if (isNaN(courseId) || courseId === 0) {
            throw new Error("ID parse edilemedi.");
          }

          const storedUser = localStorage.getItem("currentUser");
          if (storedUser) {
            const user: User = JSON.parse(storedUser);
            if (!user.purchasedCoursesIds.includes(courseId)) {
              user.purchasedCoursesIds.push(courseId);
              localStorage.setItem("currentUser", JSON.stringify(user));
              window.dispatchEvent(new Event("storage"));
            }
          }

          setStatus("success");
          setMessage("Ödeme Başarılı! Kurs tanımlandı.");
        } else {
          setStatus("error");
          setMessage(data.message || "Ödeme başarısız.");
        }
      } catch (error: any) {
        console.error("Kritik Hata:", error);
        setStatus("error");
        setMessage(
          "Ödeme alındı ancak kurs tanımlanırken hata oluştu: " + error.message
        );
      }
    };

    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {status === "loading" && (
          <p className="text-blue-600 font-bold">{message}</p>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Başarılı!
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              href="/my-courses"
              className="w-full bg-blue-600 text-white py-3 rounded-lg block"
            >
              Eğitimlerime Git
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Hata!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link href="/courses" className="text-blue-500 underline">
              Geri Dön
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
