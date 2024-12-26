import { FieldType } from '@/utils/enums'

export type APIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
export interface IAPIMock {
  title: string
  method: APIMethod
  field: IField
}
export interface IField {
  isRoot?: boolean
  name: string
  key: string
  type: FieldType
  config?: IFieldConfig
  children?: IField[]
}

export interface IFieldConfig {
  valueType?: string
  minLength?: number
  maxLength?: number
  staticValue?: IFieldConfigStaticValue
}

export interface IFieldConfigStaticValue {
  number?: number
  string?: string
  boolean?: boolean
}
