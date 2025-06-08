'use client'

import React, { useState } from 'react'
import { Alert, Button, Collapse, Input, notification, Popover, Select, Space, Tag, Tooltip, Tree } from 'antd'
import type { TreeDataNode } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { PiBracketsCurlyBold, PiBracketsSquareBold } from 'react-icons/pi'

import styles from './MockerForm.module.css'
import { APIMethod, IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import MockerFormDrawer from './MockerFormDrawer'
import useMocker from '@/hooks/useMocker'
import debugLogger from '@/utils/log'
import { FIELD_ROOT_NAME, PREFIX_API } from '@/utils/consts'
import { useAPIStorage } from '@/hooks/useAPIStorage'

const { DirectoryTree } = Tree

interface IFormDrawerState {
  isOpen: boolean
  mode?: 'edit' | 'create'
  field?: IField
}

const getIcon = (type: FieldType) => {
  if (type === FieldType.ARRAY) {
    return <PiBracketsSquareBold className='anticon' />
  }
  if (type === FieldType.OBJECT) {
    return <PiBracketsCurlyBold className='anticon' />
  }
  return <></>
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
    getEncodedString,
    headers,
    setHeaders
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
    notification.success({
      message: 'API Saved',
      duration: 1
    });
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
        message="Information"
        description={<p>This configuration doesn’t affect the API yet. Any request to <i><u>/api/mock/any-path-you-want</u></i> with any method will work, as long as you don’t modify the <i>__q</i> search parameter.</p>}
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
    return <>
      {!fieldTree.children?.length && <>
        <Alert
          description="You can load example from Load Saved API > Example API."
          type="info"
          showIcon
        />
        <br />
      </>}
      <DirectoryTree
        key={apiID}
        multiple
        showLine
        defaultExpandAll
        treeData={[treeData]}
        titleRender={parameter}
        selectable={false}
      />
    </>
  }

  function handleHeaderChange(idx: number, field: 'key' | 'value', val: string) {
    const next = [...headers];
    next[idx] = { ...next[idx], [field]: val };
    setHeaders(next);
  }

  function addHeader() {
    setHeaders([...headers, { key: '', value: '' }]);
  }

  function removeHeader(idx: number) {
    setHeaders(headers.filter((_, i) => i !== idx));
  }

  function ResponseHeader() {
    return (
      <div className={styles.headerConfig}>
        {headers.map((header, idx) => (
          <div className={styles.headerRow} key={idx}>
            <Input
              placeholder="Header Key"
              value={header.key}
              onChange={e => handleHeaderChange(idx, 'key', e.target.value)}
              className={styles.headerKey}
            />
            <Input
              placeholder="Header Value"
              value={header.value}
              onChange={e => handleHeaderChange(idx, 'value', e.target.value)}
              className={styles.headerValue}
            />
            {headers.length > 1 && (
              <Button danger onClick={() => removeHeader(idx)} icon={<DeleteOutlined />} />
            )}
          </div>
        ))}
        <Button type="dashed" onClick={addHeader} icon={<PlusOutlined />}>Add Header</Button>
      </div>
    );
  }

  return (
    <div className={[styles.overflow, styles.container].join(' ')}>
      <Collapse
        defaultActiveKey={['config', 'headers', 'response']}
        items={[
          { key: 'config', label: 'Configuration', children: Config() },
          { key: 'headers', label: 'Response Header', children: ResponseHeader() },
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