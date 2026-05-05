import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Transform cart items to Stripe line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'aed',
        product_data: {
          name: item.name,
          images: [item.image_url.startsWith('http') ? item.image_url : `${process.env.NEXT_PUBLIC_BASE_URL}${item.image_url}`],
          description: item.tagline,
        },
        unit_amount: Math.round(parseFloat(item.price.replace('AED ', '')) * 100), // Convert to fils
      },
      quantity: item.quantity,
    }));

    const origin = req.headers.get('origin');

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['AE', 'SA', 'QA', 'KW', 'OM', 'BH'], // Focus on GCC region
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
