import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
  
    if (sessionId) {
        // Fetch a single order
        console.log('Attempting to fetch order with ID:', sessionId)
        try {
            const order = await prisma.order.findFirst({
                where: {
                    id: sessionId
                }
            })
    
            console.log('Fetched order:', order)
    
            if (!order) {
                return NextResponse.json({ error: 'Order not found' }, { status: 404 })
            }
    
            return NextResponse.json(order)
        } catch (error) {
            console.error('Error fetching order:', error)
            return NextResponse.json({ error: 'An error occurred while fetching the order' }, { status: 500 })
        }
    } else {
        // Fetch all orders
        console.log('Attempting to fetch all orders')
        try {
            const orders = await prisma.order.findMany({
                select: {
                    id: true,
                    customerEmail: true,
                    total: true,
                    status: true,
                    createdAt: true,
                    shippingAddress: true,
                    items: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
    
            console.log('Fetched orders count:', orders.length)
    
            return NextResponse.json(orders)
        } catch (error) {
            console.error('Error fetching orders:', error)
            return NextResponse.json({ error: 'An error occurred while fetching orders' }, { status: 500 })
        }
    }
}