"use client"

import { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Order {
  id: string
  customerEmail: string
  total: number
  status: string
  createdAt: string
  shippingAddress: string
  items: Array<{
    id: string
    title: string
    price: number
    quantity: number
  }>
}

export function CustomerOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddress, setShowAddress] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data)
      } catch (err) {
        setError('An error occurred while fetching orders')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return <div>Loading orders...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Prepare data for the orders by date chart
  const ordersByDate = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const ordersByDateData = Object.entries(ordersByDate).map(([date, count]) => ({
    date,
    orders: count
  }))

  // Prepare data for the order status chart
  const orderStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const orderStatusData = Object.entries(orderStatus).map(([status, count]) => ({
    status,
    count
  }))

  const dateChartConfig = {
    orders: {
      label: "Orders",
      color: "hsl(var(--chart-1))",
    },
  }

  const statusChartConfig = {
    count: {
      label: "Orders",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders by Date</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={dateChartConfig} className="h-[300px]">
              <BarChart data={ordersByDateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => Math.floor(value).toString()}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="orders" 
                  fill="var(--color-orders)" 
                  radius={4}
                  barSize={30}
                  yAxisId={0}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={statusChartConfig} className="h-[300px]">
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis 
                  tickFormatter={(value) => Math.floor(value).toString()}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="var(--color-count)" 
                  radius={4}
                  barSize={30}
                  yAxisId={0}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableCaption>A list of recent customer orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
              <TableCell>{order.customerEmail}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={order.status === 'Processing' ? 'secondary' : 'default'}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription className="break-all">
                        Order ID: {order.id}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold">Customer Email:</h4>
                        <p>{order.customerEmail}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Items:</h4>
                        <ul className="list-disc list-inside">
                          {order.items.map((item) => (
                            <li key={item.id}>
                              {item.title} - ${item.price.toFixed(2)} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Total:</h4>
                        <p>${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Status:</h4>
                        <Badge variant={order.status === 'Processing' ? 'secondary' : 'default'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold">Order Date:</h4>
                        <p>{new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <Button 
                          onClick={() => setShowAddress(!showAddress)}
                          variant="outline"
                        >
                          {showAddress ? 'Hide' : 'Show'} Shipping Address
                        </Button>
                        {showAddress && (
                          <div className="mt-2">
                            <h4 className="font-semibold">Shipping Address:</h4>
                            <p className="whitespace-pre-wrap">{order.shippingAddress}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}