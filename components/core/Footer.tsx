import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="mb-4 font-semibold">About Niconnect</h4>
            <p className="text-sm text-muted-foreground">
              Premium cat food delivered to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>
            <p className="text-sm text-muted-foreground">
              support@niconnect.com
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Twitter
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}