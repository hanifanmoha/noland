import { FieldType } from '@/utils/enums'
import { MOCK_OPTIONS_MAP } from '@/utils/mock'

export interface IField {
  isRoot?: boolean
  name: string
  key: string
  type: FieldType
  config?: IFieldConfig
  children?: IField[]
}

export interface IFieldConfig {
  valueType?: keyof typeof MOCK_OPTIONS_MAP
  minLength?: number
  maxLength?: number
  staticValue?: IFieldConfigStaticValue
}

export interface IFieldConfigStaticValue {
  number?: number
  string?: string
  boolean?: boolean
}
