'use client'
import { useAuthInit } from '@/hooks/initializeAuth'
import React from 'react'

const DashboardPage = () => {
  useAuthInit()
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage