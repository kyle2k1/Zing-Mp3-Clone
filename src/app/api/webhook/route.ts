import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { buffer } from 'node:stream/consumers';
import Stripe from 'stripe';

import prisma from '@/libs/prismadb';
import stripe from '@/libs/stripe';

export async function POST(req: Request) {
  const body = await buffer(req.body as any);
  console.log('❄️ ~ file: route.ts:10 ~ body:', body);
  const signature = req.headers.get('stripe-signature') as string;
  console.log('❄️ ~ file: route.ts:10 ~ headers:', headers);
  if (!signature) {
    return new NextResponse('No Stripe Signature found', {
      status: 401
    });
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === 'checkout.session.completed') {
    // @ts-ignore
    const email = session.customer_details?.email as string;
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return new NextResponse('User not found, maybe you entered wrong email!', {
        status: 401
      });
    }
    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        isSubscribed: true
      }
    });
  }
  return new NextResponse(null, { status: 200 });
}
