// SavedListPopup.tsx
import React, { useEffect } from 'react';
import { useAPIStorage } from '@/hooks/useAPIStorage';
import { Empty, List, Modal, Tabs, Tag } from 'antd';
import { decodeFieldTree } from '@/utils/encoding';
import { APIMethod, IAPIMock } from '@/interfaces/interfaces';
import useMocker from '@/hooks/useMocker';
import { exampleAPIList } from '@/utils/initialvalue';
import { v4 as uuid } from 'uuid';;

const colors: Record<APIMethod, string> = {
    GET: '#4CAF50',
    POST: '#2196F3',
    PUT: '#FF9800',
    DELETE: '#F44336',
    PATCH: '#9C27B0',
    OPTIONS: '#9E9E9E',
    HEAD: '#00BCD4',
};


interface IAPIListProps {
    onClose: () => void;
    open: boolean
}

const APIList = ({ onClose, open }: IAPIListProps) => {
    const { data, loadData, deleteData } = useAPIStorage();
    const { loadMock } = useMocker()

    useEffect(() => {
        loadData();
    }, [loadData, open]);

    function handleLoad(mock: IAPIMock) {
        const newMock = { ...mock }
        if (!newMock.id) {
            newMock.id = uuid()
        }
        loadMock(newMock)
        onClose()
    }

    function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this API?')) {
            return
        }

        deleteData(id)
    }

    const apiList = data.map(d => decodeFieldTree(d.datastring))

    return (
        <Modal
            title="API List"
            open={open}
            onCancel={onClose}
            footer={[]}
        >
            <Tabs defaultActiveKey="1" items={
                [
                    {
                        key: '1',
                        label: 'Saved API',
                        children: <>
                            {apiList.length > 0 && <List
                                dataSource={apiList}
                                renderItem={(api) => (
                                    <List.Item key={api.id}
                                        actions={[
                                            <a key="list-load" onClick={() => handleLoad(api)}>Load</a>,
                                            <a key="list-delete" onClick={() => handleDelete(api.id)}>Delete</a>,
                                        ]}>
                                        <Tag color={colors[api.method]}>{api.method}</Tag>
                                        {' '}
                                        {api.path}
                                    </List.Item>
                                )}
                            />}
                            {apiList.length === 0 && <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{ height: 60 }}
                                description={'You dont have any saved data.'}
                            />}
                        </>
                    },
                    {
                        key: '2',
                        label: 'Example API',
                        children: <>
                            <List
                                dataSource={exampleAPIList}
                                renderItem={(api) => (
                                    <List.Item key={api.id}
                                        actions={[
                                            <a key="list-load" onClick={() => handleLoad(api)}>Load</a>
                                        ]}>
                                        <Tag color={colors[api.method]}>{api.method}</Tag>
                                        {' '}
                                        {api.path}
                                    </List.Item>
                                )}
                            />
                        </>
                    }
                ]
            } />
        </Modal>
    );
};

export default APIList;