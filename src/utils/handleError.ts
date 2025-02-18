import { NextResponse } from "next/server";

export function handleError(error: any) {
  console.error(error);

  if (error.message === "Transaction not found") {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  if (error.message === "User not found") {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
