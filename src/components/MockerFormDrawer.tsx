import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import debugLogger from '@/utils/log'
import { MOCK_OPTIONS } from '@/utils/mock'
import {
  Button,
  Divider,
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
  valueType: string
  minLength: number
  maxLength: number
  staticValueNumber: number
  staticValueString: string
  staticValueBoolean: boolean
}

const parseInitialValue = (field: IField): IFormValues => {
  console.log('parseInitialValue', field)
  return {
    name: field.name,
    type: field.type,
    valueType: field?.config?.valueType ?? 'id.uuidv4',
    minLength: field?.config?.minLength ?? 1,
    maxLength: field.config?.maxLength ?? 5,
    staticValueNumber: field?.config?.staticValue?.number ?? 0,
    staticValueString: field?.config?.staticValue?.string ?? '',
    staticValueBoolean: field?.config?.staticValue?.boolean ?? false,
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
  const fieldValueTypeValue = Form.useWatch('valueType', form)

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
        staticValue: {
          number: values.staticValueNumber,
          string: values.staticValueString,
          boolean: values.staticValueBoolean,
        },
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
    logger.log('onFinishFailed', errorInfo)
  }

  function getValueTypeOptions(): any[] {
    return [{
      label: <span>General</span>,
      title: 'default',
      options: MOCK_OPTIONS.filter(f => !f.lib).map((f) => ({
        label: f.name,
        value: f.key,
      }))
    }, {
      label: <span>Chance JS</span>,
      title: 'chancejs',
      options: MOCK_OPTIONS.filter(f => f.lib === 'chance').map((f) => ({
        label: f.name,
        value: f.key,
      }))
    }]
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
              showSearch
              options={getValueTypeOptions()}
              filterOption={(input, option) => {
                if (option.options || option.title) return false
                return (option.label ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
            />
          </Form.Item>
          <Divider />
          {renderValueConfig()}
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

  function renderValueConfig() {
    if (fieldValueTypeValue === 'static.number') {
      return (
        <Form.Item
          label='Value'
          name='staticValueNumber'
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
      )
    } else if (fieldValueTypeValue === 'static.string') {
      return (
        <Form.Item
          label='Value'
          name='staticValueString'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      )
    } else if (fieldValueTypeValue === 'static.boolean') {
      return (
        <Form.Item
          label='Value'
          name='staticValueBoolean'
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: 'True', value: true },
              { label: 'False', value: false },
            ]}
          />
        </Form.Item>
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
