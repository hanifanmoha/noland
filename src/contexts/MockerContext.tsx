'use client'

import { initialFieldTree } from '@/hooks/useMocker'
import { IField } from '@/interfaces/interfaces'
import { createContext, ReactNode, useContext, useState } from 'react'

interface IMockerContext {
  fieldTree: IField
  setFieldTree: (field: IField) => void
}

export const MockerContext = createContext<IMockerContext | undefined>(
  undefined
)

const MockerProvider = ({ children }: { children: ReactNode }) => {
  const [fieldTree, setFieldTree] = useState(initialFieldTree)

  return (
    <MockerContext.Provider value={{ fieldTree, setFieldTree }}>
      {children}
    </MockerContext.Provider>
  )
}

export const useMockerContext = () => {
  const context = useContext(MockerContext)
  if (context === undefined) {
    throw new Error('useMockerContext must be used within an MokcerProvider')
  }
  return context
}

export default MockerProvider
