'use client'

import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { encodeFieldTree } from '@/utils/encoding'
import {
  CopyOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import { Card, FloatButton, message, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { JSONTree } from 'react-json-tree'
import { uuid } from 'uuidv4'
import { SPECIAL_QUERY_PARAMS_KEY } from '@/utils/consts'
import style from './DataViewer.module.css'

const controller = new AbortController()
const signal = controller.signal

const DataViewer = () => {
  const logger = debugLogger('DataViewer', true)
  const { fieldTree, method, title } = useMocker()
  const [isFetching, setIsFetching] = useState(false)
  const [jsonData, setJsonData] = useState<any>({})

  const getURL = () => {
    let host = ''
    if (typeof window !== 'undefined') {
      host = window.location.origin
    }
    const query = encodeFieldTree({
      title,
      method,
      field: fieldTree,
    })
    const path = `/api/mock?${SPECIAL_QUERY_PARAMS_KEY}=${query}`
    return {
      host,
      path,
    }
  }

  useEffect(() => {
    const refetch = async () => {
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

  return <div style={containerStyle}>
    <Card
      className={style.overflow}
      style={cardStyle}
    >
      <JSONTree data={jsonData} shouldExpandNodeInitially={() => true} />
    </Card>
    <FloatButton.Group shape='square' style={floatButtonGroup}>
      <FloatButton
        icon={<RocketOutlined rotate={45} />}
        tooltip='Open API in New Page'
        onClick={handleOpenNewTab}
      />
      <FloatButton
        icon={<CopyOutlined />}
        tooltip='Copy API URL'
        onClick={handleCopy}
      />
      <FloatButton
        icon={<CopyOutlined />}
        tooltip='Refresh Mock Data'
        onClick={handleRefresh}
      />
    </FloatButton.Group>
  </div>

}

export default DataViewer

const containerStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  padding: '20px 0'
}

const cardStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: 'rgb(0, 43, 54)',
  color: 'white',
  padding: '20px 0'
}

const floatButtonGroup: React.CSSProperties = {
  left: 48,
  right: 'auto'
}
