import { NextResponse } from "next/server";
import iyzipay from "@/lib/iyzipay";
import { Course, User } from "@/lib/data";

const initializeCheckoutForm = (request: any) => {
  return new Promise((resolve, reject) => {
    iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
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
    const body = await req.json();
    const { course, user }: { course: Course; user: User } = body;

    if (!course?.id || !user?.id) {
      return NextResponse.json(
        { status: "error", message: "ID Eksik" },
        { status: 400 }
      );
    }

    const robustBasketId = `B_${course.id}_U_${user.id}_${Date.now()}`;
    const conversationId = `COURSE_${course.id}_USER_${user.id}`;

    console.log("Ödeme Başlatılıyor...");
    console.log("ConversationID:", conversationId);
    console.log("BasketID (Yedek):", robustBasketId);

    const paymentData = {
      locale: "tr",
      conversationId: conversationId,
      price: course.price.toString(),
      paidPrice: course.price.toString(),
      currency: "TRY",
      basketId: robustBasketId,
      paymentGroup: "PRODUCT",
      callbackUrl: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/payment/callback`,
      enabledInstallments: [1],
      buyer: {
        id: user.id.toString(),
        name: user.name,
        surname: "Demo",
        gsmNumber: "+905350000000",
        email: "demo@girisimciturk.com",
        identityNumber: "74300864791",
        lastLoginDate: "2015-10-05 12:43:35",
        registrationDate: "2013-04-21 15:12:09",
        registrationAddress: "Istanbul",
        ip: "85.85.85.85",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34732",
      },
      shippingAddress: {
        contactName: user.name,
        city: "Istanbul",
        country: "Turkey",
        address: "Istanbul",
        zipCode: "34742",
      },
      billingAddress: {
        contactName: user.name,
        city: "Istanbul",
        country: "Turkey",
        address: "Istanbul",
        zipCode: "34742",
      },
      basketItems: [
        {
          id: course.id.toString(),
          name: course.title,
          category1: "Online Egitim",
          itemType: "VIRTUAL",
          price: course.price.toString(),
        },
      ],
    };

    const result: any = await initializeCheckoutForm(paymentData);

    if (result.status !== "success") {
      console.error("Iyzico Init Hatası:", result.errorMessage);
      throw new Error(result.errorMessage);
    }

    return NextResponse.json({
      status: "success",
      paymentPageUrl: result.paymentPageUrl,
    });
  } catch (error: any) {
    console.error("Ödeme Başlatma Catch:", error);
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
