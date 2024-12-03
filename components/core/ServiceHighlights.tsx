import { Truck, Shield, DollarSign } from "lucide-react"

export function ServiceHighlights() {
  const services = [
    { icon: Truck, text: "Fast Delivery" },
    { icon: Shield, text: "Guaranteed Product Quality" },
    { icon: DollarSign, text: "Best Prices" }
  ]

  return (
    <section className="border-b">
      <div className="container grid grid-cols-1 gap-4 py-8 md:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-center font-medium"
          >
            <service.icon className="mr-2 h-5 w-5" />
            <span>{service.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}