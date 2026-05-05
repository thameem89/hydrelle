import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy',
  description: 'Read our hassle-free return and exchange policy. We stand by our clinical-grade botanical skincare and guarantee your satisfaction.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
