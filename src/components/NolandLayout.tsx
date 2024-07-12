import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import MockerForm from './MockerForm'

const layoutStyle: React.CSSProperties = {
  height: '100vh',
  flexDirection: 'row',
}

const contentStyle: React.CSSProperties = {
  width: '45%',
  overflow: 'auto',
  minHeight: '100vh',
  backgroundColor: 'white'
}

const NolandLayout = () => {
  return (
    <Layout style={layoutStyle}>
      {/* <Content style={contentStyle}>
      </Content> */}
      <Content style={contentStyle}>
        <Header />
        <MockerForm />
      </Content>
    </Layout>
  )
}

export default NolandLayout
