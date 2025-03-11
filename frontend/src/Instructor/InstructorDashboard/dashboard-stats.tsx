"use client"

import { motion } from "framer-motion"
import { BookOpen, CheckCircle, Clock } from "lucide-react"

interface DashboardStatsProps {
  courses: any[]
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function DashboardStats({ courses }: DashboardStatsProps) {
  const totalCourses = courses.length
  const publishedCourses = courses.filter((course) => course.isPublished).length
  const unpublishedCourses = totalCourses - publishedCourses

  // Calculate total lectures across all courses
  const totalLectures = courses.reduce((total, course) => {
    return total + (course.lectures?.length || 0)
  }, 0)

  const stats = [
    {
      title: "Total Courses",
      value: totalCourses,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    },
    {
      title: "Published",
      value: publishedCourses,
      icon: CheckCircle,
      color: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      title: "Unpublished",
      value: unpublishedCourses,
      icon: Clock,
      color: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div key={stat.title} variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className={`rounded-full p-2 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

