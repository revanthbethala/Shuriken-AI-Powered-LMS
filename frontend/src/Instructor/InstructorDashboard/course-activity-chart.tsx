"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseActivityChartProps {
  courses: any[]
}

export function CourseActivityChart({ courses }: CourseActivityChartProps) {
  // Process data for charts
  const chartData = useMemo(() => {
    // Group courses by month
    const coursesByMonth: Record<string, { total: number; published: number; unpublished: number }> = {}

    // Sort courses by creation date
    const sortedCourses = [...courses].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    sortedCourses.forEach((course) => {
      const date = new Date(course.createdAt)
      const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`

      if (!coursesByMonth[monthYear]) {
        coursesByMonth[monthYear] = { total: 0, published: 0, unpublished: 0 }
      }

      coursesByMonth[monthYear].total += 1
      if (course.isPublished) {
        coursesByMonth[monthYear].published += 1
      } else {
        coursesByMonth[monthYear].unpublished += 1
      }
    })

    // Convert to array for Recharts
    return Object.entries(coursesByMonth).map(([month, data]) => ({
      month,
      ...data,
    }))
  }, [courses])

  // If no courses, show placeholder data
  const displayData =
    chartData.length > 0
      ? chartData
      : [
          { month: "Jan 2025", total: 0, published: 0, unpublished: 0 },
          { month: "Feb 2025", total: 0, published: 0, unpublished: 0 },
          { month: "Mar 2025", total: 0, published: 0, unpublished: 0 },
        ]

  return (
    <Tabs defaultValue="area">
      <div className="mb-4 flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="area">Area</TabsTrigger>
          <TabsTrigger value="bar">Bar</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="area" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs text-muted-foreground" />
            <YAxis className="text-xs text-muted-foreground" allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="bar" className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs text-muted-foreground" />
            <YAxis className="text-xs text-muted-foreground" allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Bar dataKey="published" name="Published" fill="hsl(var(--success))" />
            <Bar dataKey="unpublished" name="Unpublished" fill="hsl(var(--warning))" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  )
}

