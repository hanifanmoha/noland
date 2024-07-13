import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import debugLogger from '@/utils/log'
import { Button, Drawer, Form, FormProps, Input, Select, Space } from 'antd'
import { uuid } from 'uuidv4'

const logger = debugLogger(true)

interface IMockerFormDrawerProps {
  isOpen: boolean
  field?: IField
  mode?: 'edit' | 'create'
  onSave: (field: IField, key?: string) => void
  onClose: () => void
}

interface IFormValues {
  name: string
  type: FieldType
}

const MockerFormDrawer = ({
  isOpen,
  mode,
  field,
  onSave,
  onClose,
}: IMockerFormDrawerProps) => {
  const [form] = Form.useForm()

  const onFinish: FormProps<IFormValues>['onFinish'] = (values) => {
    logger.log('MockerFormDrawer.onFinish', values)
    if (mode === 'edit' && field) {
      const val: IField = {
        key: field.key,
        name: values.name,
        type: values.type,
      }
      return onSave(val, field.key)
    } else if (mode === 'create') {
      const val: IField = {
        key: uuid(),
        name: values.name,
        type: values.type,
      }
      return onSave(val)
    }
  }

  const onFinishFailed: FormProps<IFormValues>['onFinishFailed'] = (
    errorInfo
  ) => {
    logger.log('MockerFormDrawer.onFinishFailed', errorInfo)
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
