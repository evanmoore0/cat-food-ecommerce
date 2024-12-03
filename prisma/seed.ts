import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      title: 'ZYN - Coffee 9MG',
      description: 'Smooth coffee flavor with a nicotine kick',
      price: 7.99,
      image: '/placeholder.svg',
    },
    {
      title: 'ZYN - Mint 6MG',
      description: 'Refreshing mint flavor with medium strength',
      price: 6.99,
      image: '/placeholder.svg',
    },
    {
      title: 'ZYN - Citrus 3MG',
      description: 'Zesty citrus flavor with low nicotine content',
      price: 5.99,
      image: '/placeholder.svg',
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })