import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import LeadList from "./LeadList"

export default async function Leads() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const leads = await prisma.lead.findMany({
    where: {
      companyId: session.user.companyId,
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Leads</h1>
      <LeadList leads={leads} />
    </div>
  )
}

