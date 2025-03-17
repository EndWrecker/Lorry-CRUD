import connectMongoDB from "@/libs/mongodb";
import Driver from "@/models/driver";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name } = await request.json();
  await connectMongoDB();
  await Driver.create({ name });
  return NextResponse.json({ message: "Driver Added" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const drivers = await Driver.find();
  return NextResponse.json({ drivers });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const query = id ? { driverId: id } : {};
  await connectMongoDB();
  await Driver.findByIdAndDelete(id);
  await Transaction.deleteMany(query);
  return NextResponse.json({ message: "Driver deleted" }, { status: 200 });
}
