import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/app/models/user';
import { comparePassword } from '@/app/library/bcrypt';
import { connectToMongoDB } from '@/app/services/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
  console.log(process.env.MONGO_URI)
  const { email, password } = await req.json();
     await connectToMongoDB();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600, // 1 hour
    path: '/',
  });
  return response;
}
