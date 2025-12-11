import { NextResponse } from "next/server";
import iyzipay from "@/lib/iyzipay";

const retrieveCheckoutForm = (token: string) => {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve({ token }, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { status: "error", message: "Token yok" },
        { status: 400 }
      );
    }

    const result: any = await retrieveCheckoutForm(token);

    console.log("--- IYZICO RAW RESPONSE ---");
    console.log("Status:", result.status);
    console.log("PaymentStatus:", result.paymentStatus);
    console.log("ConversationId:", result.conversationId);
    console.log("BasketId:", result.basketId);
    console.log("---------------------------");

    if (result.status === "success") {
      return NextResponse.json({
        status: "success",
        conversationId: result.conversationId || "",
        basketId: result.basketId || "",
        paymentStatus: result.paymentStatus,
        paidPrice: result.paidPrice,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: result.errorMessage || "Ödeme onaylanmadı.",
      });
    }
  } catch (error: any) {
    console.error("Verify Catch:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
