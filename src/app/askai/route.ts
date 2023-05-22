import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
    return NextResponse.json({
        id:2,
        body: "Bu bir testtir"
    })
}