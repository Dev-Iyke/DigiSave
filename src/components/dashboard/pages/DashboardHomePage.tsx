'use client'
import { useAuthInit } from '@/hooks/initializeAuth'
import { RootState } from '@/store'
import React from 'react'
import { useSelector } from 'react-redux'

const DashboardHomePage = () => {
    useAuthInit();
    const user = useSelector((state: RootState) => state.auth.user);
    console.log(user);
    return (
      <div>
        DashboardPage
        <h1>{user?.email}</h1>
        <h1>{user?._id}</h1>
      </div>
    );
}

export default DashboardHomePage