import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { generateToken } from "@/app/utils/auth";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Bu email ile zaten kayıt var" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    const token = generateToken(newUser._id.toString());
    const userData = { id: newUser._id, name: newUser.name, email: newUser.email };

    return NextResponse.json({ token, user: userData }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}