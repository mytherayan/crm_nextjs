"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [leadData, setLeadData] = useState({
    labels: ["New", "Contacted", "Qualified", "Converted", "Lost"],
    datasets: [
      {
        label: "Number of Leads",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  })

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const fetchLeadData = async () => {
      // Simulating API call
      const data = [12, 19, 3, 5, 2]
      setLeadData((prevState) => ({
        ...prevState,
        datasets: [{ ...prevState.datasets[0], data }],
      }))
    }

    fetchLeadData()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Lead Status Distribution",
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="mb-8">
        <Bar options={options} data={leadData} />
      </div>
      {/* Add more dashboard widgets here */}
    </div>
  )
}

