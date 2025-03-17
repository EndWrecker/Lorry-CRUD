import connectMongoDB from "@/libs/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { amount, type } = await request.json();
  await connectMongoDB();
  await Transaction.findByIdAndUpdate(id, { amount, type });
  return NextResponse.json({ message: "Transaction updated" }, { status: 200 });
}
