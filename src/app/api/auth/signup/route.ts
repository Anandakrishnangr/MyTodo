import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/app/services/db';
import user from '@/app/models/user';
import { hashPassword } from '@/app/library/bcrypt';

export async function POST(request: Request) {
    const { username, email, password } = await request.json();
    if (!username || !email || !password) {
        return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }
    try {
        await connectToMongoDB();
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Email is already registered.' }, { status: 400 });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new user({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
}
