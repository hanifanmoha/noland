'use client'

import { ConfigProvider, Layout, Menu } from 'antd'
// import { Content, Header } from 'antd/es/layout/layout'
import MockerForm from './MockerForm'
import DataViewer from './DataViewer'
import Title from 'antd/es/typography/Title'
import styles from './NolandLayout.module.css'
import { useEffect, useState } from 'react'
import APIList from './APIList'

const { Content, Header } = Layout

const NolandLayout = () => {

  const [loaded, setLoaded] = useState(false)
  const [isAPIListOpen, setIsAPIListOpen] = useState(false)

  useEffect(() => {
    // set loaded after 5 seconds
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
        <Header className={styles.header}>
          <Title className={styles.title} level={4}>THE GOLDEN CITY DOES EXIST</Title>
          <Menu
            className={styles.menu}
            mode='horizontal'
            selectable={false}
            items={[
              { key: 'history', label: 'Load Saved List', onClick: () => setIsAPIListOpen(true) }
            ]}
          />
        </Header>
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
