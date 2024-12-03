"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCartStore } from '@/lib/store/useCartStore'

export function CartSnapshot() {
  const router = useRouter()
  const { items, removeItem } = useCartStore()
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Cart
        </CardTitle>
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        ) : (
          <ScrollArea className="h-[250px] pr-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-2">
                <div className="relative h-16 w-16 overflow-hidden rounded">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total ({totalItems} items)</span>
          <span className="text-sm font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        <Button onClick={handleCheckout} className="w-full" disabled={items.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}