// SavedListPopup.tsx
import React, { useEffect } from 'react';
import { useAPIStorage } from '@/hooks/useAPIStorage';
import { Empty, List, Modal, Tabs, Tag } from 'antd';
import { decodeFieldTree } from '@/utils/encoding';
import { APIMethod, IAPIMock } from '@/interfaces/interfaces';
import useMocker from '@/hooks/useMocker';
import { exampleAPIList, exampleEmptyField } from '@/utils/initialvalue';
import { uuid } from 'uuidv4';

const { TabPane } = Tabs;

const colors: Record<APIMethod, string> = {
    GET: '#4CAF50',
    POST: '#2196F3',
    PUT: '#FF9800',
    DELETE: '#F44336',
    PATCH: '#9C27B0',
    OPTIONS: '#9E9E9E',
    HEAD: '#00BCD4',
};


interface SavedListPopupProps {
    onClose: () => void;
    open: boolean
}

const APIList: React.FC<SavedListPopupProps> = ({ onClose, open }) => {
    const { data, loadData } = useAPIStorage();
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

    const apiList = data.map(d => decodeFieldTree(d.datastring))

    return (
        <Modal
            title="API List"
            open={open}
            onCancel={onClose}
            footer={[]}
        >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Saved API" key="1">
                    {apiList.length > 0 && <List
                        dataSource={apiList}
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
                    />}
                    {apiList.length === 0 && <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        imageStyle={{ height: 60 }}
                        description={'You dont have any saved data.'}
                    />}
                </TabPane>
                <TabPane tab="Example API" key="2"><List
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
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default APIList;