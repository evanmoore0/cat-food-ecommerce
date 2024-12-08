"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface OrderStatus {
  status: 'Processing' | 'Shipped' | 'Delivered'
  timestamp: string
  description: string
}

interface OrderDetails {
  id: string
  customerName: string
  status: OrderStatus['status']
  estimatedDelivery: string
  statusHistory: OrderStatus[]
}

export default function OrderTrackingPage() {
  const router = useRouter()
  const params = useParams()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the order details from your backend
    // For this example, we'll simulate it with mock data
    setOrderDetails({
      id: params.orderId as string,
      customerName: 'John Doe',
      status: 'Shipped',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      statusHistory: [
        { status: 'Processing', timestamp: '2023-06-01 10:00 AM', description: 'Order received and processing started' },
        { status: 'Shipped', timestamp: '2023-06-02 2:00 PM', description: 'Order shipped via Express Delivery' },
      ]
    })
  }, [params.orderId])

  if (!orderDetails) {
    return <div className="container mx-auto py-10 text-center">Loading order details...</div>
  }

  const getStatusProgress = (status: OrderDetails['status']) => {
    switch (status) {
      case 'Processing':
        return 33
      case 'Shipped':
        return 66
      case 'Delivered':
        return 100
      default:
        return 0
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Order Tracking</CardTitle>
          <CardDescription>Track your order: {orderDetails.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Customer Name:</h3>
              <p>{orderDetails.customerName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Current Status:</h3>
              <div className="flex items-center space-x-2">
                <Badge variant={orderDetails.status === 'Delivered' ? 'default' : 'secondary'}>
                  {orderDetails.status}
                </Badge>
                <Progress value={getStatusProgress(orderDetails.status)} className="w-full" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Estimated Delivery:</h3>
              <p>{orderDetails.estimatedDelivery}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status History:</h3>
              <ul className="mt-2 space-y-4">
                {orderDetails.statusHistory.map((status, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Badge variant="outline">{status.status}</Badge>
                    <div>
                      <p className="font-medium">{status.timestamp}</p>
                      <p className="text-sm text-gray-600">{status.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/')}>Return to Home</Button>
        </CardFooter>
      </Card>
    </div>
  )
}