import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' } as any);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pack = body?.pack as '1k' | '5k';
    const priceId = pack === '5k' ? process.env.STRIPE_PRICE_5K : process.env.STRIPE_PRICE_1K;
    if (!priceId) return NextResponse.json({ error: 'Missing price config' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (e) {
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}