'use client'

import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { encodeFieldTree } from '@/utils/encoding'
import {
  CopyOutlined,
  RocketOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Card, FloatButton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { JSONTree } from 'react-json-tree'
import { SPECIAL_QUERY_PARAMS_KEY } from '@/utils/consts'
import styles from './DataViewer.module.css'

const controller = new AbortController()
const signal = controller.signal

const DataViewer = () => {
  const logger = debugLogger('DataViewer', true)
  const { fieldTree, method, path, id } = useMocker()
  const [isFetching, setIsFetching] = useState(false)
  const [jsonData, setJsonData] = useState<any>({})

  const getURL = () => {
    let host = ''
    if (typeof window !== 'undefined') {
      host = window.location.origin
    }
    const query = encodeFieldTree({
      id,
      path,
      method,
      field: fieldTree,
    })
    const url = `/api/mock?${SPECIAL_QUERY_PARAMS_KEY}=${query}`
    return {
      host,
      path: url,
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

  return <div className={styles.container}>
    <Card
      className={[styles.overflow, styles.card].join(' ')}
    >
      <JSONTree data={jsonData} shouldExpandNodeInitially={() => true} />
    </Card>
    <FloatButton.Group shape='square' className={styles.floatButtonGroup}>
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
        icon={<SyncOutlined />}
        tooltip='Refresh Mock Data'
        onClick={handleRefresh}
      />
    </FloatButton.Group>
  </div>

}

export default DataViewer
