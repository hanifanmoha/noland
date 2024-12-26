'use client'

import { APIMethod, IAPIMock, IField } from '@/interfaces/interfaces'
import { SPECIAL_QUERY_PARAMS_KEY } from '@/utils/consts'
import { decodeFieldTree, encodeFieldTree } from '@/utils/encoding'
import { exampleOrderList } from '@/utils/initialvalue'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

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

function getFieldTreeInitialValue(encodedFieldTree: string): IField {

  if (encodedFieldTree) {
    try {
      const { field } = decodeFieldTree(decodeURIComponent(encodedFieldTree))
      if (!field.isRoot) {
        throw new Error('Failed to parse query')
      }
      return field
    } catch (e) {
      console.error(e)
    }
  }

  return exampleOrderList

}

const MockerProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams()
  const encodedFieldTree = searchParams.get(SPECIAL_QUERY_PARAMS_KEY) ?? ''
  const initialField = getFieldTreeInitialValue(encodedFieldTree)

  const [fieldTree, setFieldTree] = useState(initialField)
  const [method, setMethod] = useState<APIMethod>('GET')
  const [title, setTitle] = useState('')

  useEffect(() => {
    const encodedData = encodeFieldTree({
      title,
      method,
      field: fieldTree,
    })
    const url = new URL(window.location.href)
    url.searchParams.set(SPECIAL_QUERY_PARAMS_KEY, encodedData)
    window.history.replaceState({}, '', url)
  }, [fieldTree, title, method])

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
