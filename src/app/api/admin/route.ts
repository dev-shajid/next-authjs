import { CurrentRole } from "@/lib/authUser.server";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    const role = await CurrentRole()

    if (role === UserRole.ADMIN) {
        return NextResponse.json({ message: "Allowed API rote" }, { status: 200 })
    }
    return NextResponse.json({ message: "Forbidden API route" }, { status: 403 })
}