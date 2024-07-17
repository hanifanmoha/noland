'use client'

import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { encodeFieldTree } from '@/utils/mock'
import { CopyOutlined, GlobalOutlined, SyncOutlined } from '@ant-design/icons'
import { FloatButton, message } from 'antd'
import { usePathname } from 'next/navigation'
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

  const getURL = () => {
    let host = ''
    if (typeof window !== 'undefined') {
      host = window.location.origin
    }
    const query = encodeFieldTree(fieldTree)
    const path = `/api/mock?_q=${query}`
    return {
      host,
      path,
    }
  }

  useEffect(() => {
    const refetch = async () => {
      const key = uuid()
      setIsFetching(true)
      try {
        const { path } = getURL()
        const res = await fetch(path, { signal })
        const data = await res.json()
        setJsonData(data)
      } catch (err) {
      } finally {
        setIsFetching(false)
      }
    }
    refetch()
  }, [fieldTree])

  const handleOpenNewTab = () => {
    const { host, path } = getURL()
    const url = `${host}/${path}`
    if (typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  const handleCopy = async () => {
    const { host, path } = getURL()
    const url = `${host}/${path}`
    if (typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(url)
    }
    message.success('Copied to clipboard!')
  }

  const handleRefresh = async () => {
    setIsFetching(true)
    try {
      const { path } = getURL()
      const res = await fetch(path, { signal })
      const data = await res.json()
      setJsonData(data)
    } catch (err) {
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div
      style={{
        backgroundColor: `rgb(0, 43, 54)`,
        padding: 20,
        paddingBottom: 200,
        minHeight: '100%',
        fontSize: 16,
      }}
    >
      <JSONTree data={jsonData} shouldExpandNodeInitially={() => true} />
      <FloatButton.Group shape='square' style={{ left: 24 }}>
        <FloatButton
          icon={<CopyOutlined />}
          tooltip='Copy URL'
          onClick={handleCopy}
        />
        <FloatButton
          icon={<GlobalOutlined />}
          tooltip='Open in New Page'
          onClick={handleOpenNewTab}
        />
        <FloatButton
          icon={<SyncOutlined />}
          tooltip='Refresh Mock Data'
          onClick={handleRefresh}
        />
      </FloatButton.Group>
    </div>
  )
}

export default DataViewer
