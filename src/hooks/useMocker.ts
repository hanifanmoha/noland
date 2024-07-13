import { useState } from 'react'
import { uuid } from 'uuidv4'

import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'

export const ROOT_NAME = ':root:'

const initialFieldTree: IField = {
  isRoot: true,
  name: ROOT_NAME,
  type: FieldType.OBJECT,
  key: uuid(),
  children: [
    {
      name: 'name',
      type: FieldType.VALUE,
      key: uuid(),
    },
    {
      name: 'orders',
      type: FieldType.ARRAY,
      key: uuid(),
      children: [
        {
          name: 'order_id',
          type: FieldType.VALUE,
          key: uuid(),
        },
        {
          name: 'date',
          type: FieldType.VALUE,
          key: uuid(),
        },
      ],
    },
  ],
}

const field2Map = (
  field: IField,
  parent?: IField
): { [key: string]: { field: IField; parent?: IField } } => {
  let map: { [key: string]: { field: IField; parent?: IField } } = {}

  map[field.key] = {
    field,
    parent,
  }

  for (let child of field.children ?? []) {
    const childMap = field2Map(child, field)
    map = { ...map, ...childMap }
  }

  return map
}

interface IUseMocker {
  fieldTree: IField
  fieldMap: { [key: string]: { field: IField; parent?: IField } }
}

const useMocker = (): IUseMocker => {
  const [fieldTree, setFieldTree] = useState(initialFieldTree)

  const fieldMap = field2Map(fieldTree, undefined)

  return { fieldTree, fieldMap }
}

export default useMocker
