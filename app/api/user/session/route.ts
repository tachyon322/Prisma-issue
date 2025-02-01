import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ data: null, message: "Не авторизован" }, { status: 401 });
  } else {
    return NextResponse.json(session);
  }
}
