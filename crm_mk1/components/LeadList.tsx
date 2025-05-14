"use client"

import { useState } from "react"
import { Lead } from "@prisma/client"

type LeadListProps = {
  leads: Lead[]
}

export default function LeadList({ leads }: LeadListProps) {
  const [filteredLeads, setFilteredLeads] = useState(leads)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm)
    )
    setFilteredLeads(filtered)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search leads..."
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
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td className="whitespace-nowrap px-6 py-4">{lead.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{lead.email}</td>
              <td className="whitespace-nowrap px-6 py-4">{lead.company}</td>
              <td className="whitespace-nowrap px-6 py-4">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

