'use client'

import React, { useState } from 'react'
import { Button, Card, Popover, Space, Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import {
  BorderlessTableOutlined,
  FolderOutlined,
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import styles from './MockerForm.module.css'
import { uuid } from 'uuidv4'
import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import MockerFormDrawer from './MockerFormDrawer'

const { DirectoryTree } = Tree

const ROOT_NAME = ':root:'

interface IFormDrawerState {
  isOpen: boolean
  mode?: 'edit' | 'create'
  field?: IField
}

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

const getIcon = (type: FieldType) => {
  if (type === FieldType.ARRAY) {
    return <FolderOutlined />
  }
  if (type === FieldType.OBJECT) {
    return <FileOutlined />
  }
  return <BorderlessTableOutlined />
}

const field2TreeData = (field: IField): TreeDataNode => {
  return {
    title: field.name,
    key: field.key,
    children: (field.children ?? []).map(field2TreeData),
    icon: getIcon(field.type),
  }
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

const MockerForm = () => {
  const [fieldTree, setFieldTree] = useState(initialFieldTree)
  const [formDrawer, setFormDrawer] = useState<IFormDrawerState>({
    isOpen: false,
  })

  const treeData = field2TreeData(fieldTree)
  const fieldMap = field2Map(fieldTree, undefined)

  const onFromDrawerClosed = () => {
    setFormDrawer({ isOpen: false })
  }

  const onParamAction =
    (e: any) => (action: 'add' | 'remove' | 'edit', param: TreeDataNode) => {
      e.stopPropagation()
      const field = fieldMap[param.key as string]

      if (action === 'remove') {
      } else if (action === 'add') {
        setFormDrawer({ isOpen: true, mode: 'create' })
      } else {
        setFormDrawer({ isOpen: true, mode: 'edit', field: field.field })
      }
    }

  const titleContent = (props: TreeDataNode) => {
    return (
      <Space direction='vertical'>
        <Button
          type='primary'
          icon={<EditOutlined />}
          block
          onClick={(e) => onParamAction(e)('edit', props)}
        >
          Edit
        </Button>
        <Button
          icon={<PlusOutlined />}
          block
          onClick={(e) => onParamAction(e)('add', props)}
        >
          Create Child
        </Button>
        {props.title !== ROOT_NAME && (
          <Button
            danger
            icon={<DeleteOutlined />}
            block
            onClick={(e) => onParamAction(e)('remove', props)}
          >
            Remove
          </Button>
        )}
      </Space>
    )
  }

  const title = (props: TreeDataNode) => {
    return (
      <Popover
        placement='right'
        title={props.title as string}
        content={() => titleContent(props)}
      >
        <span className={styles.paramTitle}>{props.title as string}</span>
      </Popover>
    )
  }

  return (
    <Space direction='vertical' style={spaceStyle}>
      <Card>
        <DirectoryTree
          multiple
          showLine
          defaultExpandAll
          treeData={[treeData]}
          titleRender={title}
        />
      </Card>
      <MockerFormDrawer
        isOpen={formDrawer.isOpen}
        mode={formDrawer.mode}
        field={formDrawer.field}
        onClose={onFromDrawerClosed}
      />
    </Space>
  )
}

export default MockerForm

const spaceStyle: React.CSSProperties = {
  padding: 20,
  width: '100%',
  display: 'flex',
}
