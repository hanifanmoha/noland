// SavedListPopup.tsx
import React, { useEffect } from 'react';
import { useAPIStorage } from '@/hooks/useAPIStorage';
import styels from './APIList.module.css'
import { Badge, List, Modal, Tabs, Tag } from 'antd';
import { decodeFieldTree } from '@/utils/encoding';
import { APIMethod } from '@/interfaces/interfaces';

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

    useEffect(() => {
        loadData();
    }, [loadData]);

    const apiList = data.map(d => decodeFieldTree(d.datastring))

    return (
        <Modal
            title="API List"
            open={true}
            onCancel={onClose}
            footer={[]}
        >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Saved Data" key="1">
                    <List
                        dataSource={apiList}
                        renderItem={(api) => (
                            <List.Item key={api.id}>
                                <Tag color={colors[api.method]}>{api.method}</Tag>
                                {' '}
                                {api.path}
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="Example Data" key="2">
                    {/* <List
                        dataSource={exampleData}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                {JSON.stringify(item)}
                            </List.Item>
                        )}
                    /> */}
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default APIList;