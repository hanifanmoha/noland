import { IField } from '@/interfaces/interfaces'
import { FieldType } from './enums'

export const encodeFieldTree = (rootField: IField): string => {
  const str = JSON.stringify(rootField)
  return Buffer.from(str).toString('base64')
}

export const decodeFieldTree = (base64String: string): IField => {
  const str = Buffer.from(base64String, 'base64').toString('utf-8')
  return JSON.parse(str)
}

const traverseValue = (current: IField): any => {
  let val: any = 'Hello World'

  if (current.type === FieldType.ARRAY) {
    val = []
    for (let i = 0; i < 5; i++) {
      let tmpVal: any = {}
      for (let child of current.children ?? []) {
        tmpVal[child.name] = traverseValue(child)
      }
      val.push(tmpVal)
    }
  } else if (current.type === FieldType.OBJECT) {
    val = {}
    for (let child of current.children ?? []) {
      val[child.name] = traverseValue(child)
    }
  }

  return val
}

export const renderMocker = (root: IField): any => {
  return traverseValue(root)
}
