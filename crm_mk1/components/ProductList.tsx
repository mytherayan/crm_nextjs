"use client"

import { useState } from "react"
import { Product } from "@prisma/client"

type ProductListProps = {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    )
    setFilteredProducts(filtered)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="mb-4 w-full rounded-md border p-2"
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Availability
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{product.sku}</td>
              <td className="whitespace-nowrap px-6 py-4">${product.price.toFixed(2)}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {product.availability ? "In Stock" : "Out of Stock"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

