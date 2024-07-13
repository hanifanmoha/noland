import { IField } from '@/interfaces/interfaces'
import { Button, Drawer, Space } from 'antd'

interface IMockerFormDrawerProps {
  isOpen: boolean
  field?: IField
  mode?: 'edit' | 'create'
  onClose: () => void
}

const MockerFormDrawer = ({
  onClose,
  isOpen,
  mode,
  field,
}: IMockerFormDrawerProps) => {
  return (
    <Drawer
      title={mode === 'edit' ? field?.name : 'Create New Field'}
      onClose={onClose}
      open={isOpen}
      placement='bottom'
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          {mode === 'edit' && (
            <Button type='primary' onClick={onClose}>
              Update
            </Button>
          )}
          {mode === 'create' && (
            <Button type='primary' onClick={onClose}>
              Create
            </Button>
          )}
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
}

export default MockerFormDrawer
