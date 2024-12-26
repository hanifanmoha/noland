'use client'

import { ConfigProvider, Layout } from 'antd'
// import { Content, Header } from 'antd/es/layout/layout'
import MockerForm from './MockerForm'
import DataViewer from './DataViewer'
import Title from 'antd/es/typography/Title'
import styles from './NolandLayout.module.css'

const { Content, Header } = Layout

const NolandLayout = () => {
  return (
    <ConfigProvider>
      <Layout className={styles.root}>
        <Header className={styles.header}>
          <Title className={styles.title} level={4}>THE GOLDEN CITY DOES EXIST</Title>
        </Header>
        <Layout className={styles.layout}>
          <Content className={styles.content}>
            <DataViewer />
          </Content>
          <Content className={styles.content}>
            <MockerForm />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default NolandLayout
