import { IField, IFieldConfig } from '@/interfaces/interfaces'
import { FieldType, ValueType } from './enums'
import { uuid } from 'uuidv4'

export const encodeFieldTree = (rootField: IField): string => {
  const str = JSON.stringify(rootField)
  return Buffer.from(str).toString('base64')
}

export const decodeFieldTree = (base64String: string): IField => {
  const str = Buffer.from(base64String, 'base64').toString('utf-8')
  return JSON.parse(str)
}

const getMockedValue = (config: IFieldConfig) => {
  switch (config.valueType) {
    case ValueType['ID - UUIDV4']:
      return uuid()
    case ValueType['Person - Name']:
      return 'Person Name'
    case ValueType['Text - Sentence']:
      return 'Hello World'
    case ValueType['Text - Word']:
      return '<mocked>'
    case ValueType['Web - Email']:
      return 'test@gmail.com'
  }
}

const traverseValue = (current: IField): any => {
  if (current.type === FieldType.ARRAY) {
    const val = []
    const minLength = 1
    const maxLength = 3
    const len = Math.floor(Math.random() * (maxLength - minLength) + minLength)
    for (let i = 0; i < len; i++) {
      let tmpVal: any = {}
      for (let child of current.children ?? []) {
        tmpVal[child.name] = traverseValue(child)
      }
      val.push(tmpVal)
    }
    return val
  } else if (current.type === FieldType.OBJECT) {
    const val: any = {}
    for (let child of current.children ?? []) {
      val[child.name] = traverseValue(child)
    }
    return val
  } else if (current.type === FieldType.VALUE) {
    if (!current.config) return null
    return getMockedValue(current.config)
  }

  return null
}

export const renderMocker = (root: IField): any => {
  return traverseValue(root)
}
