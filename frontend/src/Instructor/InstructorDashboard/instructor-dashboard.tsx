"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import GetUserId from "@/helperFunctions/GetUserId"
import useGet from "@/myComponents/useGet"
import { DashboardStats } from "./dashboard-stats"
import { CourseActivityChart } from "./course-activity-chart"
import { CourseTable } from "./course-table"
import { DashboardHeader } from "./dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function InstructorDashboard() {
  const id = GetUserId()
  const { data: courseData, isLoading, error } = useGet(`courses/creator/${id}`)
  const courses = courseData?.courses || []

  useEffect(() => {
    if (courses.length > 0) {
      console.log("Courses loaded:", courses)
    }
  }, [courses])

  if (error) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive">Error loading dashboard</h2>
          <p className="mt-2 text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader courses={courses} isLoading={isLoading} />

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {isLoading ? (
              <>
                <Skeleton className="h-[180px] w-full rounded-xl" />
                <Skeleton className="h-[180px] w-full rounded-xl" />
                <Skeleton className="h-[180px] w-full rounded-xl" />
              </>
            ) : (
              <DashboardStats courses={courses} />
            )}
          </motion.div>

          <motion.div variants={item} initial="hidden" animate="show" className="mt-8">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-medium">Course Activity</h3>
              {isLoading ? <Skeleton className="h-[300px] w-full" /> : <CourseActivityChart courses={courses} />}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="courses">
          <motion.div variants={item} initial="hidden" animate="show" className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <CourseTable courses={courses} />
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

