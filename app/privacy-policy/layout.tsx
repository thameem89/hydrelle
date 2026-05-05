import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Your privacy is our priority. Learn how Hydrelle Skincare safely collects, uses, and protects your personal information.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
