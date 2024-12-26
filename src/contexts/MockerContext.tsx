'use client'

import { APIMethod, IField } from '@/interfaces/interfaces'
import { exampleOrderList } from '@/utils/initialvalue'
import { createContext, ReactNode, useContext, useState } from 'react'

interface IMockerContext {
  fieldTree: IField
  setFieldTree: (field: IField) => void
  method: APIMethod
  setMethod: (method: APIMethod) => void
  title: string
  setTitle: (title: string) => void
}

export const MockerContext = createContext<IMockerContext | undefined>(
  undefined
)

const MockerProvider = ({ children }: { children: ReactNode }) => {
  const [fieldTree, setFieldTree] = useState(exampleOrderList)
  const [method, setMethod] = useState<APIMethod>('GET')
  const [title, setTitle] = useState('')

  return (
    <MockerContext.Provider value={{ fieldTree, setFieldTree, method, setMethod, title, setTitle }}>
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
