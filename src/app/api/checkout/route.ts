import { NextResponse } from 'next/server';

import stripe from '@/libs/stripe';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function OPTIONS(req: Request, res: Response) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, res: Response) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NskQnF8nm8tvbVtwq48ZguX',
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: process.env.NEXTAUTH_URL,
    cancel_url: process.env.NEXTAUTH_URL
  });
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders
    }
  );
}
