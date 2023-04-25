import { Hero, ProductList } from "@/components"

export const metadata = {
  title: "Home | Next Store",
  description: "Home Page For Next Store",
}

export default function Home() {
  return (
    <main>
      <Hero />
      {/* @ts-ignore Server Component */}
      <ProductList />
    </main>
  )
}
