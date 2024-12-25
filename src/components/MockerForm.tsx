'use client'

import React, { useState } from 'react'
import { Button, Card, Popover, Radio, Row, Space, Tree, Typography } from 'antd'
import type { RadioChangeEvent, TreeDataNode } from 'antd'
import {
  BorderlessTableOutlined,
  FolderOutlined,
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'

import styles from './MockerForm.module.css'
import { IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import MockerFormDrawer from './MockerFormDrawer'
import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { FIELD_ROOT_NAME } from '@/utils/consts'

const { DirectoryTree } = Tree

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
    title: `${field.name}`,
    key: field.key,
    children: (field.children ?? []).map(field2TreeData),
    icon: getIcon(field.type),
  }
}

const MockerForm = () => {
  const logger = debugLogger('MockerForm', false)

  const [formDrawer, setFormDrawer] = useState<IFormDrawerState>({
    isOpen: false,
  })
  const { fieldTree, fieldMap, onUpdateField, onInsertField, onRemoveField, onMoveField } =
    useMocker()
  const treeData = field2TreeData(fieldTree)

  const onFormDrawerClosed = () => {
    setFormDrawer({ isOpen: false })
  }

  const onParamAction =
    (e: any) => (action: 'add' | 'remove' | 'edit' | 'move' | 'moveup' | 'movedown', param: TreeDataNode) => {
      e.stopPropagation()
      const field = fieldMap[param.key as string]
      if (action === 'remove') {
        onRemoveField(field?.key)
      } else if (action === 'add') {
        setFormDrawer({ isOpen: true, mode: 'create', field: field })
      } else if (action === 'edit') {
        setFormDrawer({ isOpen: true, mode: 'edit', field: field })
      } else if (action === 'moveup') {
        onMoveField(field?.key, true)
      } else if (action === 'movedown') {
        onMoveField(field?.key, false)
      }
    }

  const onFormDrawerSubmit = (field: IField) => {
    logger.log('onFromDrawerSubmit', formDrawer.mode, field)

    if (formDrawer.mode === 'edit') {
      onUpdateField(field)
    } else if (formDrawer.mode === 'create' && formDrawer.field) {
      onInsertField(field, formDrawer.field?.key)
    }

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
        {[FieldType.ARRAY, FieldType.OBJECT].includes(field.type) && (
          <Button
            icon={<PlusOutlined />}
            block
            onClick={(e) => onParamAction(e)('add', props)}
          >
            Create Child
          </Button>
        )}
        {props.title !== FIELD_ROOT_NAME && (
          <>
            <Button
              danger
              icon={<DeleteOutlined />}
              block
              onClick={(e) => onParamAction(e)('remove', props)}
            >
              Remove
            </Button>
            <Button
              block
              icon={<ArrowUpOutlined />}
              onClick={(e) => onParamAction(e)('moveup', props)}
            />
            <Button
              block
              icon={<ArrowDownOutlined />}
              onClick={(e) => onParamAction(e)('movedown', props)}
            />
          </>
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
        onSave={onFormDrawerSubmit}
        onClose={onFormDrawerClosed}
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
