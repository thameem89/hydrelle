import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Review our global shipping options, estimated delivery times, and packaging details for your premium botanical skincare orders.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
