import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about the Hydrelle philosophy. We blend scientific precision with the rarest botanical essences to redefine skincare and natural radiance.',
  openGraph: {
    title: 'Our Story | Hydrelle Skincare',
    description: 'Learn about the Hydrelle philosophy. We blend scientific precision with the rarest botanical essences to redefine skincare.',
    url: 'https://hydrelleskincare.com/story',
    type: 'website',
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
