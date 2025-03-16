import connectMongoDB from "@/libs/mongodb";
import Driver from "@/models/driver";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { newName: name } = await request.json();
  await connectMongoDB();
  await Driver.findByIdAndUpdate(id, { name });
  return NextResponse.json({ message: "Driver updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = await params;
  await connectMongoDB();
  const driver = await Driver.findOne({ _id: id });
  return NextResponse.json({ driver }, { status: 200 });
}
