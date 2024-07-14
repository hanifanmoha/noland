'use client'

import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { encodeFieldTree, renderMocker } from '@/utils/mock'
import { message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { JSONTree } from 'react-json-tree'
import { uuid } from 'uuidv4'

const controller = new AbortController()
const signal = controller.signal

const DataViewer = () => {
  const logger = debugLogger('DataViewer', true)
  const { fieldTree } = useMocker()
  const [isFetching, setIsFetching] = useState(false)
  const [jsonData, setJsonData] = useState<any>({})

  useEffect(() => {
    const refetch = async () => {
      const key = uuid()
      setIsFetching(true)
      try {
        const query = encodeFieldTree(fieldTree)
        const res = await fetch(`/api/mock?_q=${query}`, { signal })
        const data = await res.json()
        setJsonData(data)
      } catch (err) {
      } finally {
        setIsFetching(false)
      }
    }
    refetch()
  }, [fieldTree])

  return (
    <div
      style={{
        backgroundColor: `rgb(0, 43, 54)`,
        padding: 20,
        minHeight: '100%',
        fontSize: 16,
      }}
    >
      <JSONTree data={jsonData} shouldExpandNodeInitially={() => true} />
    </div>
  )
}

export default DataViewer
