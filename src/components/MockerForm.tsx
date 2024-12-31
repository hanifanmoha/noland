'use client'

import React, { useState } from 'react'
import { Alert, Button, Collapse, Input, Popover, Select, Space, Tooltip, Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import {
  BorderlessTableOutlined,
  FolderOutlined,
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SaveOutlined,
} from '@ant-design/icons'

import styles from './MockerForm.module.css'
import { APIMethod, IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import MockerFormDrawer from './MockerFormDrawer'
import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { FIELD_ROOT_NAME, PREFIX_API } from '@/utils/consts'
import { el } from '@faker-js/faker'
import { get } from 'http'
import { useAPIStorage } from '@/hooks/useAPIStorage'
import { uuid } from 'uuidv4'

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
  const {
    id: apiID,
    fieldTree,
    fieldMap,
    path,
    method,
    setMethod,
    setPath,
    onUpdateField,
    onInsertField,
    onRemoveField,
    onMoveField,
    getEncodedString
  } =
    useMocker()

  const { saveData } = useAPIStorage()

  const treeData = field2TreeData(fieldTree)

  const onFormDrawerClosed = () => {
    setFormDrawer({ isOpen: false })
  }

  const handleConfigChange = (key: string) => (value: string) => {
    if (key === 'method') {
      setMethod(value as APIMethod)
    } else if (key === 'path') {
      setPath(value)
    }
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

  const onSaveAPI = () => {
    logger.log('onSave')
    const query = getEncodedString()
    saveData({ id: apiID, datastring: query })
  }

  const paramOptions = (props: TreeDataNode) => {
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

  const parameter = (props: TreeDataNode) => {
    return (
      <Popover
        placement='right'
        title={props.title as string}
        content={() => paramOptions(props)}
      >
        <span className={styles.paramTitle}>{props.title as string}</span>
      </Popover>
    )
  }

  function Config() {
    const methodOptions = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'].map((method) => ({
      label: method,
      value: method,
    }))
    return <div className={styles.config}>
      <Alert
        description="This config has no effect on the API yet."
        type="info"
        showIcon
      />
      <br />
      <div className={styles.configInput}>
        <Select
          className={styles.configInputMethod}
          defaultValue='GET'
          options={methodOptions}
          value={method}
          onChange={handleConfigChange('method')}
        />
        <Input
          className={styles.configInputPath}
          addonBefore={`${PREFIX_API}/`}
          placeholder='your-api-name'
          value={path}
          onChange={(e) => handleConfigChange('path')(e.target.value)}
        />
        <Tooltip title='Save to Localstorage'>
          <Button type="primary" icon={<SaveOutlined />} disabled={!path} onClick={onSaveAPI} />
        </Tooltip>
      </div>
    </div>
  }

  function Response() {
    return <DirectoryTree
      multiple
      showLine
      defaultExpandAll
      treeData={[treeData]}
      titleRender={parameter}
    />
  }

  return (
    <div className={[styles.overflow, styles.container].join(' ')}>
      <Collapse
        defaultActiveKey={['config', 'response']}
        items={[
          { key: 'config', label: 'Configuration', children: Config() },
          { key: 'response', label: 'Response Structure', children: Response() }
        ]}
      />
      <MockerFormDrawer
        key={`${formDrawer.mode}-${formDrawer.field?.key}`}
        isOpen={formDrawer.isOpen}
        mode={formDrawer.mode}
        field={formDrawer.field}
        onSave={onFormDrawerSubmit}
        onClose={onFormDrawerClosed}
      />
    </div>
  )
}

export default MockerForm