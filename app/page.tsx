"use client"

import { useState, useEffect } from "react"

import { ProductCard } from "@/components/core/ProductCard"
import { Header } from "@/components/core/Header"
import { Footer } from "@/components/core/Footer"
import { MainCarousel } from "@/components/core/MainCarousel"
import { ServiceHighlights } from "@/components/core/ServiceHighlights"

type Product = {
  id: string
  title: string
  description: string
  price: number
  image: string
}

type CartItem = Product & { quantity: number }

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError('Error loading products. Please try again later.')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])


  return (
    <div className="flex min-h-screen flex-col">
      {/* Warning Banner */}
      <div className="bg-yellow-100 p-2 text-center text-sm font-medium text-yellow-800">
        WARNING: This product contains cat food. Cat food is an addictive chemical.
      </div>

      <Header />

      <main className="flex-1">
        <MainCarousel />
        <ServiceHighlights />

        {/* Products Grid */}
        <section className="container py-8 px-4">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}