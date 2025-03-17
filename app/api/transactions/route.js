import connectMongoDB from "@/libs/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function GET(request) {
  const driverId = request.nextUrl.searchParams.get("id");
  const query = driverId ? { driverId: driverId } : {};
  await connectMongoDB();
  const transactions = await Transaction.find(query);
  return NextResponse.json({ transactions });
}

export async function POST(request) {
  const { driverId, amount, type } = await request.json();
  await connectMongoDB();
  const res = await Transaction.create({ driverId, amount, type });
  console.log(res);

  return NextResponse.json(res, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Driver deleted" }, { status: 200 });
}
