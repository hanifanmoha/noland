import { IField } from '@/interfaces/interfaces'
import { FieldType } from './enums'

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
