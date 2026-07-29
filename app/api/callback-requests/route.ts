import { NextResponse } from "next/server";

const allowedServices = new Set([
  "Computer help",
  "Internet & Wi-Fi",
  "Printer & email help",
  "Data recovery & transfer",
  "New device setup",
]);

const allowedBookingFor = new Set(["Myself", "Someone else"]);
const allowedCallbackTimes = new Set(["Morning", "Afternoon", "Any time"]);

type CallbackRequest = {
  service?: unknown;
  bookingFor?: unknown;
  name?: unknown;
  phone?: unknown;
  suburb?: unknown;
  callbackTime?: unknown;
  description?: unknown;
  website?: unknown;
};

const cleanText = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

const createReference = () => {
  const stamp = Date.now().toString(36).slice(-5).toUpperCase();
  const random = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `GNM-CB-${stamp}${random}`;
};

export async function POST(request: Request) {
  let input: CallbackRequest;

  try {
    input = (await request.json()) as CallbackRequest;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  // Quietly accept automated submissions without sending them onward.
  if (cleanText(input.website, 120)) {
    return NextResponse.json({
      ok: true,
      reference: createReference(),
      delivery: "preview",
    });
  }

  const payload = {
    service: cleanText(input.service, 80),
    bookingFor: cleanText(input.bookingFor, 40),
    name: cleanText(input.name, 100),
    phone: cleanText(input.phone, 40),
    suburb: cleanText(input.suburb, 100),
    callbackTime: cleanText(input.callbackTime, 40),
    description: cleanText(input.description, 1_500),
  };

  const phoneDigits = payload.phone.replace(/\D/g, "");
  const isValid =
    allowedServices.has(payload.service) &&
    allowedBookingFor.has(payload.bookingFor) &&
    allowedCallbackTimes.has(payload.callbackTime) &&
    payload.name.length >= 2 &&
    phoneDigits.length >= 8 &&
    phoneDigits.length <= 15 &&
    payload.suburb.length >= 2;

  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Please complete the required details and try again." },
      { status: 422 },
    );
  }

  const reference = createReference();
  const webhookUrl = process.env.CALLBACK_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return NextResponse.json({
      ok: true,
      reference,
      delivery: "preview",
    });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WEBHOOK_SIGNING_SECRET
          ? { Authorization: `Bearer ${process.env.WEBHOOK_SIGNING_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        type: "callback.requested",
        reference,
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook returned ${webhookResponse.status}`);
    }

    return NextResponse.json({
      ok: true,
      reference,
      delivery: "configured",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We could not send the request right now. Please call 0403 171 348.",
      },
      { status: 502 },
    );
  }
}
