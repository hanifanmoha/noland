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
import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import MockerFormDrawer from './MockerFormDrawer'
import useMocker, { ROOT_NAME } from '@/hooks/useMocker'
import debugLogger from '@/utils/log'

const { DirectoryTree } = Tree

const logger = debugLogger(true)

interface IFormDrawerState {
  isOpen: boolean
  mode?: 'edit' | 'create'
  field?: IField
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

const MockerForm = () => {
  const [formDrawer, setFormDrawer] = useState<IFormDrawerState>({
    isOpen: false,
  })
  const { fieldTree, fieldMap } = useMocker()
  const treeData = field2TreeData(fieldTree)

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

  const onFromDrawerSubmit = (field: IField, key?: string) => {
    logger.log('MockerForm.onFromDrawerSubmit', formDrawer.mode, key, field)
    setFormDrawer({ isOpen: false })
  }

  const titleContent = (props: TreeDataNode) => {
    const field = fieldMap[props.key as string]
    if (!field) return null

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
        {[FieldType.ARRAY, FieldType.OBJECT].includes(field.field.type) && (
          <Button
            icon={<PlusOutlined />}
            block
            onClick={(e) => onParamAction(e)('add', props)}
          >
            Create Child
          </Button>
        )}
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
        key={`${formDrawer.mode}-${formDrawer.field?.key}`}
        isOpen={formDrawer.isOpen}
        mode={formDrawer.mode}
        field={formDrawer.field}
        onSave={onFromDrawerSubmit}
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
