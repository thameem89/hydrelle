import { Metadata } from 'next';
import { getProductById } from '@/lib/products';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const cleanDescription = product.description 
    ? product.description.substring(0, 160)
    : `Discover ${product.name}, a premium botanical skincare solution for radiant, youthful skin.`;

  return {
    title: product.name,
    description: cleanDescription,
    openGraph: {
      title: `${product.name} | Hydrelle Skincare`,
      description: cleanDescription,
      url: `https://hydrelleskincare.com/product/${id}`,
      siteName: 'Hydrelle',
      images: [
        {
          url: product.image_url,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      locale: 'en_AE',
      type: 'website', // using website to avoid strict OpenGraph product type requirements, but could use 'product'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: cleanDescription,
      images: [product.image_url],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
