import { IField, IFieldConfig } from '@/interfaces/interfaces'
import { FieldType } from './enums'
import { uuid } from 'uuidv4'
import { Chance } from 'chance'

const chance = new Chance()

interface IMockOptions {
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
  {
    key: 'person.name',
    name: 'Person - Name',
    lib: 'chance',
    fn: () => chance.name()
  },
  {
    key: 'text.sentence',
    name: 'Text - Sentence',
    lib: 'chance',
    fn: () => chance.sentence()
  },
  {
    key: 'text.word',
    name: 'Text - Word',
    lib: 'chance',
    fn: () => chance.word()
  },
  {
    key: 'web.email',
    name: 'Web - Email',
    lib: 'chance',
    fn: () => chance.email()
  },
  {
    key: 'time.date',
    name: 'Time - Date',
    lib: 'chance',
    fn: () => new Date().toDateString()
  }
]

export const MOCK_OPTIONS_MAP = MOCK_OPTIONS.reduce((acc, curr) => {
  acc[curr.name] = curr.key
  return acc
}, {} as Record<string, string>)

export const encodeFieldTree = (rootField: IField): string => {
  const str = JSON.stringify(rootField)
  return Buffer.from(str).toString('base64')
}

export const decodeFieldTree = (base64String: string): IField => {
  const str = Buffer.from(base64String, 'base64').toString('utf-8')
  return JSON.parse(str)
}

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
