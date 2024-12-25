import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import debugLogger from '@/utils/log'
import { useMockerContext } from '@/contexts/MockerContext'

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
  let children: IField[] | undefined

  if (current.key !== updated.key) {
    return {
      ...current,
      children: current.children?.map((child) =>
        traverseUpdate(child, updated)
      ),
    }
  } else {
    return {
      ...updated,
      children: current.children?.map((child) =>
        traverseUpdate(child, updated)
      ),
    }
  }
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

  useEffect(() => {
    logger.log('useEffect[fieldTree]', fieldTree)
  }, [fieldTree])

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
