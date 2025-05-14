import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Dashboard from "@/components/Dashboard"

export default async function Home() {
  // const session = await getServerSession(authOptions)

  const session = 'hi'
  if (!session) {
    redirect("/login")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dashboard />
    </main>
  )
}

