'use client'

import { ConfigProvider, Layout } from 'antd'
import MockerForm from './MockerForm'
import DataViewer from './DataViewer'
import styles from './NolandLayout.module.css'
import { useEffect, useState } from 'react'
import APIList from './APIList'
import NolandLayoutHeader from './NolandLayoutHeader'

const { Content } = Layout

const NolandLayout = () => {

  const [loaded, setLoaded] = useState(false)
  const [isAPIListOpen, setIsAPIListOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 0)
  }, [])

  if (!loaded) {
    return <div className={styles.loading}>Loading ...</div>
  }

  return (
    <ConfigProvider theme={{ token: { fontFamily: 'inherit' } }}>
      <Layout className={styles.root}>
        <NolandLayoutHeader />
        <Layout className={styles.layout}>
          <Content className={styles.content}>
            <DataViewer />
          </Content>
          <div className={styles.dividerContainer}>
            <div className={styles.divider} />
          </div>
          <Content className={styles.content}>
            <MockerForm />
          </Content>
        </Layout>
      </Layout>
      <APIList onClose={() => setIsAPIListOpen(false)} open={isAPIListOpen} />
    </ConfigProvider>
  )
}

export default NolandLayout
