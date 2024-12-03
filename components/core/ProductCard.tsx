"use client"

import Image from "next/image"
import { useState } from "react"
import { Check } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCartStore, CartItem } from '@/lib/store/useCartStore'

interface Product {
  id: string
  title: string
  price: number
  image: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const totalPrice = product.price * quantity
  const savings = quantity > 1 ? (product.price - totalPrice / quantity).toFixed(2) : null

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity
    }
    addItem(cartItem)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="border-b p-0">
        <div className="aspect-square relative">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{product.title}</h3>
            <p className="text-sm font-bold">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-xs text-gray-600">{product.description}</p>
          <div className="flex items-center gap-2">
            <Select
              defaultValue="1"
              onValueChange={(value) => setQuantity(parseInt(value, 10))}
            >
              <SelectTrigger className="flex-grow text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 3, 5, 10].map((qty) => (
                  <SelectItem key={qty} value={qty.toString()}>
                    {qty} can{qty > 1 ? "s" : ""} (${(qty * product.price).toFixed(2)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-20 bg-green-500 hover:bg-green-600 text-xs transition-all duration-300 ease-in-out"
              onClick={handleAddToCart}
            >
              <span className={`transition-opacity duration-300 ${isAdded ? 'opacity-0' : 'opacity-100'}`}>
                Add
              </span>
              <Check
                className={`absolute transition-opacity duration-300 ${isAdded ? 'opacity-100' : 'opacity-0'}`}
              />
            </Button>
          </div>
          {savings && (
            <p className="text-xs text-red-500 font-medium">
              Save ${savings} per can!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}