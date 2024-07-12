'use client'

import React from 'react'
import { Button, Card, Popover, Space, Tree } from 'antd'
import type { GetProps, TreeDataNode } from 'antd'
import {
  BorderlessTableOutlined,
  FolderOutlined,
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import styles from './MockerForm.module.css'

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>

const { DirectoryTree } = Tree

enum FieldType {
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'VALUE' = 'value',
}

interface IField {
  isRoot?: boolean
  name: string
  type: FieldType
  children?: IField[]
}

const mock: IField = {
  isRoot: true,
  name: ':root:',
  type: FieldType.OBJECT,
  children: [
    {
      name: 'name',
      type: FieldType.VALUE,
    },
    {
      name: 'orders',
      type: FieldType.ARRAY,
      children: [
        {
          name: 'order_id',
          type: FieldType.VALUE,
        },
        {
          name: 'date',
          type: FieldType.VALUE,
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

const mock2TreeData = (mock: IField): TreeDataNode => {
  return {
    title: mock.name,
    key: mock.name,
    children: (mock.children ?? []).map(mock2TreeData),
    icon: getIcon(mock.type),
  }
}

const treeData: TreeDataNode[] = [mock2TreeData(mock)]

const MockerForm = () => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info)
  }

  const onClickTitle = (props: TreeDataNode) => {
    console.log(props)
  }

  const titleContent = () => {
    return (
      <Space direction='vertical'>
        <Button type='primary' icon={<EditOutlined />} block>
          Edit
        </Button>
        <Button icon={<PlusOutlined />} block>
          Create Child
        </Button>
        <Button danger icon={<DeleteOutlined />} block>
          Remove
        </Button>
      </Space>
    )
  }

  const title = (props: TreeDataNode) => {
    return (
      <Popover placement='right' title={props.title as string} content={titleContent}>
        <span>{props.title as string}</span>
      </Popover>
    )
  }

  return (
    <Space direction='vertical' style={spaceStyle}>
      <Card style={cardStyle}>
        <DirectoryTree
          multiple
          showLine
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
          titleRender={title}
        />
      </Card>
    </Space>
  )
}

export default MockerForm

const spaceStyle: React.CSSProperties = {
  padding: 20,
  width: '100%',
  display: 'flex',
}

const cardStyle: React.CSSProperties = {
  // width: '100%'
}
