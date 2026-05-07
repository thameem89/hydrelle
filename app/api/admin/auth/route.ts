import { NextResponse } from 'next/server';
import { getAdminPassword } from '@/lib/settings';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = await getAdminPassword();

    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
