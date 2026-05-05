import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Understand the terms of service and conditions for using the Hydrelle Skincare platform and purchasing our premium products.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
