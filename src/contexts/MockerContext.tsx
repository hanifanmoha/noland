'use client'

import { APIMethod, IAPIMock, IField } from '@/interfaces/interfaces'
import { SPECIAL_QUERY_PARAMS_KEY } from '@/utils/consts'
import { decodeFieldTree, encodeFieldTree } from '@/utils/encoding'
import { defaultFields, exampleOrderList } from '@/utils/initialvalue'
import { useSearchParams } from 'next/navigation'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';

interface IMockerContext {
  id: string
  setID: (id: string) => void,
  fieldTree: IField
  setFieldTree: (field: IField) => void
  method: APIMethod
  setMethod: (method: APIMethod) => void
  path: string
  setPath: (path: string) => void
}

export const MockerContext = createContext<IMockerContext | undefined>(
  undefined
)

function getFieldTreeInitialValue(encodedFieldTree: string): IAPIMock {

  if (encodedFieldTree) {
    try {
      const apiMock = decodeFieldTree(decodeURIComponent(encodedFieldTree))
      if (!apiMock?.field.isRoot) {
        throw new Error('Failed to parse query')
      }
      return apiMock
    } catch (e) {
      console.error(e)
    }
  }

  return { id: uuid(), path: '', method: 'GET', field: defaultFields }

}

const MockerProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams()
  const encodedFieldTree = searchParams.get(SPECIAL_QUERY_PARAMS_KEY) ?? ''
  const apiMock = getFieldTreeInitialValue(encodedFieldTree)

  const [fieldTree, setFieldTree] = useState(apiMock.field)
  const [method, setMethod] = useState<APIMethod>(apiMock.method)
  const [path, setPath] = useState(apiMock.path)
  const [id, setID] = useState(apiMock.id)

  useEffect(() => {
    const encodedData = encodeFieldTree({
      id: apiMock.id,
      path,
      method,
      field: fieldTree,
    })
    const url = new URL(window.location.href)
    url.searchParams.set(SPECIAL_QUERY_PARAMS_KEY, encodedData)
    window.history.replaceState({}, '', url)
  }, [fieldTree, path, method])

  return (
    <MockerContext.Provider value={{ id, setID, fieldTree, setFieldTree, method, setMethod, path, setPath }}>
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
