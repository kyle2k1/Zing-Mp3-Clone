import { NextResponse } from 'next/server';

import { nextauth } from '@/libs/env';
import stripe from '@/libs/stripe';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function OPTIONS(_req: Request, _res: Response) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(_req: Request, _res: Response) {
  const session = await stripe.checkout.sessions.create({
    // biome-ignore lint/style/useNamingConvention: Stripe API requires snake_case
    line_items: [
      {
        price: 'price_1NskQnF8nm8tvbVtwq48ZguX',
        quantity: 1
      }
    ],
    mode: 'payment',
    // biome-ignore lint/style/useNamingConvention: Stripe API requires snake_case
    success_url: nextauth.url,
    // biome-ignore lint/style/useNamingConvention: Stripe API requires snake_case
    cancel_url: nextauth.url
  });
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders
    }
  );
}
