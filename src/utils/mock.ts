import { IField, IFieldConfig } from '@/interfaces/interfaces'
import { FieldType } from './enums'
import { v4 as uuid } from 'uuid';
import { CHANCE_MOCK_OPTIONS } from './chancejs'
import { FAKERJS_MOCK_OPTIONS } from './fakerjs'

export interface IMockOptions {
  key: string,
  name: string,
  lib?: string,
  fn: (...args: any[]) => any
}

export const MOCK_OPTIONS: IMockOptions[] = [
  {
    key: 'id.uuidv4',
    name: 'ID - UUIDV4',
    fn: () => uuid()
  },
  {
    key: 'static.number',
    name: 'Static - Number',
    fn: (config: IFieldConfig) => config.staticValue?.number ?? 0
  },
  {
    key: 'static.string',
    name: 'Static - String',
    fn: (config: IFieldConfig) => config.staticValue?.string ?? ''
  },
  {
    key: 'static.boolean',
    name: 'Static - Boolean',
    fn: (config: IFieldConfig) => config.staticValue?.boolean ?? false
  },
  {
    key: 'static.null',
    name: 'Static - Null',
    fn: () => null
  },
  ...CHANCE_MOCK_OPTIONS,
  ...FAKERJS_MOCK_OPTIONS
] as const

const getMockedValue = (config: IFieldConfig) => {
  const mockOption = MOCK_OPTIONS.find(opt => opt.key === config.valueType)
  if (mockOption) {
    return mockOption.fn(config)
  } else {
    return `<default value>`
  }
}

const traverseValue = (current: IField): any => {
  if (current.type === FieldType.ARRAY) {
    const val = []
    const minLength = current.config?.minLength ?? 1
    const maxLength = current.config?.maxLength ?? 5
    const len = Math.floor(
      Math.random() * (maxLength - minLength + 1) + minLength
    )
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
