import { IField } from '@/interfaces/interfaces'
import { FieldType, ValueType } from '@/utils/enums'
import debugLogger from '@/utils/log'
import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd'
import { uuid } from 'uuidv4'

interface IMockerFormDrawerProps {
  isOpen: boolean
  field?: IField
  mode?: 'edit' | 'create'
  onSave: (field: IField) => void
  onClose: () => void
}

interface IFormValues {
  name: string
  type: FieldType
  valueType: ValueType
  minLength: number
  maxLength: number
}

const parseInitialValue = (field: IField): IFormValues => {
  console.log('parseInitialValue', field)
  return {
    name: field.name,
    type: field.type,
    valueType: field?.config?.valueType ?? ValueType['Text - Word'],
    minLength: field?.config?.minLength ?? 1,
    maxLength: field.config?.maxLength ?? 5,
  }
}

const MockerFormDrawer = ({
  isOpen,
  mode,
  field,
  onSave,
  onClose,
}: IMockerFormDrawerProps) => {
  const logger = debugLogger('MockerFormDrawer', true)

  const [form] = Form.useForm()
  const fieldTypeValue = Form.useWatch('type', form)

  const onFinish: FormProps<IFormValues>['onFinish'] = (values) => {
    logger.log('onFinish', values)

    const val: IField = {
      key: uuid(),
      name: values.name,
      type: values.type,
      config: {
        valueType: values.valueType,
        minLength: values.minLength,
        maxLength: values.maxLength,
      },
    }

    if (mode === 'edit' && field) {
      val.key = field.key
      return onSave(val)
    } else if (mode === 'create') {
      return onSave(val)
    }
  }

  const onFinishFailed: FormProps<IFormValues>['onFinishFailed'] = (
    errorInfo
  ) => {
    logger.log('MockerFormDrawer.onFinishFailed', errorInfo)
  }

  const renderFormConfig = () => {
    if (fieldTypeValue === FieldType.VALUE) {
      return (
        <>
          <Form.Item
            label='Value Type'
            name='valueType'
            rules={[{ required: fieldTypeValue === FieldType.VALUE }]}
          >
            <Select
              options={Object.keys(ValueType).map((f: string) => ({
                label: f,
                value: ValueType[f as keyof typeof ValueType],
              }))}
            />
          </Form.Item>
        </>
      )
    }
    if (fieldTypeValue === FieldType.ARRAY) {
      return (
        <>
          <Space direction='horizontal'>
            <Form.Item
              label='Minimum Length'
              name='minLength'
              rules={[{ required: fieldTypeValue === FieldType.ARRAY }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label='Maxiumum Length'
              name='maxLength'
              rules={[{ required: fieldTypeValue === FieldType.ARRAY }]}
            >
              <InputNumber />
            </Form.Item>
          </Space>
        </>
      )
    }
  }

  return (
    <Drawer
      title={mode === 'edit' ? field?.name : 'Create New Field'}
      onClose={onClose}
      open={isOpen}
      // placement='bottom'
      size='large'
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
        initialValues={
          mode === 'edit' && field ? parseInitialValue(field) : undefined
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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

        {renderFormConfig()}
      </Form>
    </Drawer>
  )
}

export default MockerFormDrawer
