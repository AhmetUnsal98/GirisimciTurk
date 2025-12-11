import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const token = formData.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 400 });
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://sunny-dieffenbachia-4aad06.netlify.app";
    // -------------------------------------

    const redirectUrl = new URL("/payment-result", baseUrl);
    redirectUrl.searchParams.set("token", token.toString());

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Callback Hatası:", error);
    return NextResponse.json({ error: "Callback işlenemedi" }, { status: 500 });
  }
}
