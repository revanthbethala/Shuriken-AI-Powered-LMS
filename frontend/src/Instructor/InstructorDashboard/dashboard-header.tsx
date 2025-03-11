"use client"

import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { NavLink } from "react-router"

interface DashboardHeaderProps {
  courses: any[]
  isLoading: boolean
}

export function DashboardHeader({ courses, isLoading }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Instructor Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-1 text-muted-foreground"
        >
          {isLoading ? (
            <Skeleton className="h-4 w-48" />
          ) : (
            `Manage your ${courses.length} course${courses.length !== 1 ? "s" : ""}`
          )}
        </motion.p>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <NavLink to="/instructor/addCourse">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Course
        </Button>
        </NavLink>
      </motion.div>
    </div>
  )
}

