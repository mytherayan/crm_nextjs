import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import ProductList from "./ProductList"

export default async function Products() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const products = await prisma.product.findMany({
    where: {
      companyId: session.user.companyId,
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <ProductList products={products} />
    </div>
  )
}

