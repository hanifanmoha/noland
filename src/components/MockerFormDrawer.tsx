import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import { Button, Drawer, Form, FormProps, Input, Select, Space } from 'antd'

interface IMockerFormDrawerProps {
  isOpen: boolean
  field?: IField
  mode?: 'edit' | 'create'
  onClose: () => void
}

const MockerFormDrawer = ({
  onClose,
  isOpen,
  mode,
  field,
}: IMockerFormDrawerProps) => {
  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Drawer
      title={mode === 'edit' ? field?.name : 'Create New Field'}
      onClose={onClose}
      open={isOpen}
      placement='bottom'
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          {mode === 'edit' && (
            <Button type='primary' onClick={form.submit}>
              Update
            </Button>
          )}
          {mode === 'create' && (
            <Button type='primary' onClick={form.submit}>
              Create
            </Button>
          )}
        </Space>
      }
    >
      <Form
        form={form}
        initialValues={field}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Space direction='vertical' size='large'>
          <Form.Item label='Name' name='name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label='Type' name='type' rules={[{ required: true }]}>
            <Select
              options={Object.keys(FieldType).map((f: string) => ({
                label: f,
                value: FieldType[f as keyof typeof FieldType],
              }))}
            />
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  )
}

export default MockerFormDrawer
