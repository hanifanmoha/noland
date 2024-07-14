import { FieldType, ValueType } from '@/utils/enums'

export interface IField {
  isRoot?: boolean
  name: string
  key: string
  type: FieldType
  config?: IFieldConfig
  children?: IField[]
}

export interface IFieldConfig {
  valueType: ValueType
}
