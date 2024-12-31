import {
  useEffect,
} from 'react'

import { APIMethod, IAPIMock, IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import debugLogger from '@/utils/log'
import { useMockerContext } from '@/contexts/MockerContext'
import { encodeFieldTree } from '@/utils/encoding'
import { exampleEmptyField } from '@/utils/initialvalue'
import { v4 as uuid } from 'uuid';

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

const traverseMove = (current: IField, movedKey: string, isMoveUp: boolean) => {
  const res: IField = { ...current }

  const childIndex = current.children?.findIndex((child) => child.key === movedKey) || 0

  if (current.children && childIndex >= 0) {
    const newIndex = isMoveUp ? childIndex - 1 : childIndex + 1
    if (newIndex >= 0 && newIndex < current.children.length) {
      const tmp = current.children[childIndex]
      current.children[childIndex] = current.children[newIndex]
      current.children[newIndex] = tmp
    }
  }

  res.children = res.children?.map((child) =>
    traverseMove(child, movedKey, isMoveUp)
  )

  return res
}

type IFieldWithParent = IField & { parent?: IField }

interface IUseMocker {
  id: string
  fieldTree: IField
  fieldMap: { [key: string]: IFieldWithParent }
  path: string
  method: APIMethod
  setPath: (title: string) => void
  setMethod: (method: APIMethod) => void
  onUpdateField: (field: IField) => void
  onInsertField: (field: IField, parentKey: string) => void
  onRemoveField: (fieldKey: string) => void
  onMoveField: (fieldKey: string, isMoveUp: boolean) => void
  getEncodedString: () => string
  loadMock: (mock: IAPIMock) => void
}

const useMocker = (): IUseMocker => {
  const logger = debugLogger('useMocker', true)

  const { id, setID, fieldTree, setFieldTree, path, setPath, method, setMethod } = useMockerContext()

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

  const onMoveField = (fieldKey: string, isMoveUp: boolean) => {
    logger.log('onMoveField', fieldKey, isMoveUp)
    const updatedRoot = traverseMove(fieldTree, fieldKey, isMoveUp)
    setFieldTree(updatedRoot)
  }

  const loadMock = (mock: IAPIMock) => {
    logger.log('loadMock', mock)
    setID(mock.id)
    setMethod(mock.method)
    setPath(mock.path)
    setFieldTree(mock.field)
  }

  const getEncodedString = () => {
    const query = encodeFieldTree({
      id,
      path,
      method,
      field: fieldTree,
    })
    return query
  }

  return {
    id,
    fieldTree,
    fieldMap,
    path,
    method,
    onUpdateField,
    onInsertField,
    onRemoveField,
    onMoveField,
    setPath,
    setMethod,
    getEncodedString,
    loadMock
  }
}

export default useMocker
