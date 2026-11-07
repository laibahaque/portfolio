import { NextResponse } from "next/server";
import { toMailto, validateContact, type ContactFields } from "@/lib/contact";
import { CONTACT_LIMITS } from "@/lib/validation";

type ContactPayload = ContactFields & { website?: string };

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const fields: ContactFields = {
    name: String(body.name ?? "").slice(0, CONTACT_LIMITS.name),
    email: String(body.email ?? "").slice(0, CONTACT_LIMITS.email),
    message: String(body.message ?? "").slice(0, CONTACT_LIMITS.message),
  };

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  return NextResponse.json({
    ok: true,
    mailto: toMailto(fields),
  });
}
