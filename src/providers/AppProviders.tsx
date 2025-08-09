'use client'
import React from 'react'
import ReactQueryProvider from './ReactQueryProvider'
import ReduxProvider from './ReduxProvider'
import { Toaster } from 'sonner'

const AppProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        {children}
        <Toaster />
      </ReduxProvider>
    </ReactQueryProvider>
  )
}

export default AppProviders