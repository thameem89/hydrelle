import { NextResponse } from 'next/server';
import { updateAdminPassword } from '@/lib/settings';

export async function POST(request: Request) {
  try {
    const { newPassword } = await request.json();
    
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    await updateAdminPassword(newPassword);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
