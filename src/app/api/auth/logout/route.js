import { destroySession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (token) {
      await destroySession(token);
    }

    const response = NextResponse.json(
      { success: true, message: 'Logout berhasil' },
      { status: 200 }
    );

    // Clear cookie
    response.cookies.delete('token');

    return response;
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
