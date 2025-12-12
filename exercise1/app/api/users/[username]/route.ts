import { NextResponse } from "next/server";

interface Params {
  params: {
    username: string;
  };
}

export function GET(req: Request, { params }: Params) {
  return NextResponse.json({ username: params.username });
}
