import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import MockerForm from './MockerForm'
import DataViewer from './DataViewer'
import Title from 'antd/es/typography/Title'

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

const titleStyle: React.CSSProperties = {
  color: 'white',
  textTransform: 'uppercase',
  // textAlign: 'center',
}

const NolandLayout = () => {
  return (
    <Layout style={rootLayout}>
      <Header>
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
  )
}

export default NolandLayout
