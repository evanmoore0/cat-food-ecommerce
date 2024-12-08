import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    stripeKeySet: !!process.env.STRIPE_SECRET_KEY,
    stripeKeyFirstFour: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.slice(0, 4) : null
  });
}