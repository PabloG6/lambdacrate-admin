import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log(await request.json())
    return NextResponse.json({});
}
