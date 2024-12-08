"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderDetails {
  id: string
  customerEmail: string
  items: Array<{
    id: string
    title: string
    price: number
    quantity: number
  }>
  total: number
  status: string
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      fetchOrderDetails(sessionId)
    }
  }, [searchParams])

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/orders?session_id=${sessionId}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch order details')
      }
      const data = await response.json()
      setOrderDetails(data)
    } catch (error) {
      console.error('Error fetching order details:', error)
      // You might want to set an error state here to display to the user
      setOrderDetails(null)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Order Confirmation</CardTitle>
          <CardDescription>Thank you for your purchase!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Order ID:</h3>
              <p>{orderDetails?.id}</p>
            </div>
            <div>
              <h3 className="font-semibold">Customer Email:</h3>
              <p>{orderDetails?.customerEmail}</p>
            </div>
            <div>
              <h3 className="font-semibold">Items Purchased:</h3>
              <ul className="list-disc list-inside">
                {orderDetails?.items.map((item: any) => (
                  <li key={item.id}>
                    {item.title} - ${item.price.toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Total Amount Paid:</h3>
              <p className="text-lg font-bold">${orderDetails?.total.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Order Status:</h3>
              <p>{orderDetails?.status}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </CardFooter>
      </Card>
    </div>
  )
}