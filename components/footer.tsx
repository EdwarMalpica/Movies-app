export function Footer() {
  return (
    <footer className="border-t py-3 sticky bottom-0 bg-background z-10 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">© {new Date().getFullYear()} Movie Explorer. All rights reserved.</div>
    </footer>
  )
}

