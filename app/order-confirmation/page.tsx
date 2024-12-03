"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from '@/lib/store/useCartStore'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      // Here you would typically fetch the order details from your backend
      // For this example, we'll just simulate it
      setOrderDetails({
        id: 'ORD' + Math.random().toString(36).substr(2, 9),
        total: '$XX.XX',
        items: ['Item 1', 'Item 2']
      })
      clearCart()
    }
  }, [searchParams, clearCart])

  if (!orderDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Order Confirmation</CardTitle>
          <CardDescription>Thank you for your purchase!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Order ID: {orderDetails.id}</p>
          <p className="text-lg mb-4">Total: {orderDetails.total}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <ul className="list-disc list-inside">
              {orderDetails.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </CardFooter>
      </Card>
    </div>
  )
}