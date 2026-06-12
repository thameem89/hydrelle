import { NextResponse } from 'next/server';
import { getAdminPassword, updateAdminPassword } from '@/lib/settings';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword) {
      return NextResponse.json({ success: false, error: 'Current password is required' }, { status: 400 });
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const adminPassword = await getAdminPassword();

    if (currentPassword !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Invalid current password' }, { status: 401 });
    }

    await updateAdminPassword(newPassword);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to change password' }, { status: 500 });
  }
}
