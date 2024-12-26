'use client'

import { ConfigProvider, Layout } from 'antd'
// import { Content, Header } from 'antd/es/layout/layout'
import MockerForm from './MockerForm'
import DataViewer from './DataViewer'
import Title from 'antd/es/typography/Title'

const { Content, Header } = Layout

const rootLayout: React.CSSProperties = {
  height: '100vh',
}

const headerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #f0f0f0',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  position: 'relative',
  zIndex: 10,
}

const layoutStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  flexDirection: 'row',
}

const contentStyle: React.CSSProperties = {
  width: '45%',
  backgroundColor: '#ffffff',
  padding: '0 20px',
}

const titleStyle: React.CSSProperties = {
  color: '#000000',
  textTransform: 'uppercase',
}

const NolandLayout = () => {
  return (
    <ConfigProvider>
      <Layout style={rootLayout}>
        <Header style={headerStyle}>
          <Title style={titleStyle} level={4}>The Golden City Does Exist</Title>
        </Header>
        <Layout style={layoutStyle}>
          <Content style={contentStyle}>
            <DataViewer />
          </Content>
          <Content style={contentStyle}>
            <MockerForm />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default NolandLayout
