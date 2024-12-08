import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

export async function POST(request: Request) {
  const body = await request.json()
  const { items, customerEmail, shippingAddress } = body

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: customerEmail,
    })

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Store order in database
    const order = await prisma.order.create({
      data: {
        id: session.id,
        customerEmail,
        shippingAddress,
        items: items,
        total,
        status: 'Processing',
      },
    })

    return NextResponse.json({ sessionId: session.id, orderId: order.id })
  } catch (err: any) {
    console.error('Error in create-checkout-session:', err)
    return NextResponse.json({ error: { message: err.message } }, { status: 500 })
  }
}