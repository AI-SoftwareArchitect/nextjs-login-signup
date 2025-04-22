import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { generateToken } from '@/app/utils/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Geçersiz kimlik bilgileri' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id.toString());

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}