import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import connectToDatabase from "@/app/lib/mongodb";
import { generateToken } from "@/app/utils/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    await connectToDatabase();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { message: "Geçersiz email veya şifre" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Geçersiz email veya şifre" },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());
    const userData = { id: user._id, name: user.name, email: user.email };

    return NextResponse.json({ token, user: userData });
  } catch (error) {
    return NextResponse.json(
      { message: "Sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}