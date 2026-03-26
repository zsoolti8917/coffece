import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/order-schema";
import { sendOrderEmail } from "@/lib/email";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data", details: parsed.error.flatten() }, { status: 400 });
    }
    await sendOrderEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json({ error: "Failed to send order. Please try again." }, { status: 500 });
  }
}
