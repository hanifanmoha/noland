'use client'

import { Layout, Menu } from 'antd'
import Title from 'antd/es/typography/Title'
import styles from './NolandLayout.module.css'
import { useEffect, useState } from 'react'
import APIList from './APIList'
import useMocker from '@/hooks/useMocker'
import { AimOutlined } from '@ant-design/icons'
import { uuid } from 'uuidv4'
import { exampleEmptyField } from '@/utils/initialvalue'

const { Header } = Layout

const NolandLayoutHeader = () => {

    const [loaded, setLoaded] = useState(false)
    const [isAPIListOpen, setIsAPIListOpen] = useState(false)
    const { loadMock } = useMocker()

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 0)
    }, [])

    function handleCreate() {
        loadMock({
            id: uuid(),
            path: '',
            method: 'GET',
            field: exampleEmptyField
        })
    }

    if (!loaded) {
        return <div className={styles.loading}>Loading ...</div>
    }

    return (
        <>
            <Header className={styles.header}>
                <Title className={styles.title} level={4}>THE GOLDEN CITY DOES EXIST</Title>
                <Menu
                    className={styles.menu}
                    mode='horizontal'
                    selectable={false}
                    items={[
                        { key: 'create-new', label: 'Create New API', onClick: () => handleCreate() },
                        { key: 'history', label: 'Load Saved API', onClick: () => setIsAPIListOpen(true) }
                    ]}
                />
            </Header>

            <APIList onClose={() => setIsAPIListOpen(false)} open={isAPIListOpen} />
        </>
    )
}

export default NolandLayoutHeader
