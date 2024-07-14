import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import MockerForm from './MockerForm'
import DataViewer from './DataViewer'

const rootLayout: React.CSSProperties = {
  height: '100vh',
}

const layoutStyle: React.CSSProperties = {
  flexDirection: 'row',
}

const contentStyle: React.CSSProperties = {
  width: '45%',
  overflow: 'auto',
  backgroundColor: 'white',
}

const NolandLayout = () => {
  return (
    <Layout style={rootLayout}>
      <Header />
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <DataViewer />
        </Content>
        <Content style={contentStyle}>
          <MockerForm />
        </Content>
      </Layout>
    </Layout>
  )
}

export default NolandLayout
