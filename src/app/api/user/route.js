// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import connect from '../../lib/db';
import User from '../../models/User';

export async function GET() {
  try {
    await connect();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'An error occurred while fetching users', error: error.message }, { status: 500 });
  }
}
