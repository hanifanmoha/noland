import { createContext, ReactNode, useContext, useState } from 'react'
import { uuid } from 'uuidv4'

import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import debugLogger from '@/utils/log'
import { MockerContext, useMockerContext } from '@/contexts/MockerContext'

export const ROOT_NAME = ':root:'

export const initialFieldTree: IField = {
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
): { [key: string]: IFieldWithParent } => {
  let map: { [key: string]: IFieldWithParent } = {}

  map[field.key] = { ...field, parent }

  for (let child of field.children ?? []) {
    const childMap = field2Map(child, field)
    map = { ...map, ...childMap }
  }

  return map
}

const traverseUpdate = (current: IField, updated: IField): IField => {
  const res: IField = { ...current }

  res.children = res.children?.map((child) => traverseUpdate(child, updated))

  if (current.key !== updated.key) {
    return res
  }

  res.name = updated.name
  res.type = updated.type

  if (![FieldType.ARRAY, FieldType.OBJECT].includes(res.type)) {
    res.children = []
  }

  return res
}

const traverseInsert = (
  current: IField,
  inserted: IField,
  parentKey: string
): IField => {
  const res: IField = { ...current }

  res.children = res.children?.map((child) =>
    traverseInsert(child, inserted, parentKey)
  )

  if (
    [FieldType.ARRAY, FieldType.OBJECT].includes(res.type) &&
    parentKey === res.key
  ) {
    res.children = [...(res.children ?? []), inserted]
  }

  return res
}

const traverseRemove = (current: IField, removedKey: string): IField => {
  const res: IField = { ...current }
  res.children = res.children
    ?.filter((child) => child.key !== removedKey)
    .map((child) => traverseRemove(child, removedKey))
  return res
}

type IFieldWithParent = IField & { parent?: IField }

interface IUseMocker {
  fieldTree: IField
  fieldMap: { [key: string]: IFieldWithParent }
  onUpdateField: (field: IField) => void
  onInsertField: (field: IField, parentKey: string) => void
  onRemoveField: (fieldKey: string) => void
}

const useMocker = (): IUseMocker => {
  const logger = debugLogger('useMocker', true)

  const { fieldTree, setFieldTree } = useMockerContext()

  const fieldMap = field2Map(fieldTree, undefined)

  const onUpdateField = (field: IField) => {
    logger.log('onUpdateField', field)
    const updatedRoot = traverseUpdate(fieldTree, field)
    setFieldTree(updatedRoot)
  }

  const onInsertField = (field: IField, parentKey: string) => {
    logger.log('onInsertField', field, parentKey)
    const updatedRoot = traverseInsert(fieldTree, field, parentKey)
    setFieldTree(updatedRoot)
  }

  const onRemoveField = (fieldKey: string) => {
    logger.log('onRemoveField', fieldKey)
    const updatedRoot = traverseRemove(fieldTree, fieldKey)
    setFieldTree(updatedRoot)
  }

  return { fieldTree, fieldMap, onUpdateField, onInsertField, onRemoveField }
}

export default useMocker
