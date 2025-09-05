import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { userId } = await request.json();

    if (session.user.id !== userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await getUserById(userId);
    const hasPassword = !!user?.password;

    return NextResponse.json({ hasPassword });
  } catch (error) {
    console.error("Error checking password:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
