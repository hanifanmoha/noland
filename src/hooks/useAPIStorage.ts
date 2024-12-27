import { IAPIStorage } from '@/interfaces/interfaces';
import Dexie from 'dexie';
import { useCallback, useState, useEffect } from 'react';

// Create Dexie instance and define schema

const TABLE_NAME = 'nolandapis'

const db = new Dexie('nolanddb');

db.version(1).stores({
    [TABLE_NAME]: 'id, datastring', // Define schema: 'id' is the primary key
});

// Custom Hook
export function useAPIStorage() {
    const [data, setData] = useState<Record<string, any>[]>([]); // To hold the list of items

    // Save data to IndexedDB
    const saveData = useCallback(
        async (data: IAPIStorage) => {
            console.log(data)
            try {
                await db.table(TABLE_NAME).add(data);
                console.log('Data saved successfully:', data);
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },
        []
    );

    // Load data from IndexedDB
    const loadData = useCallback(async () => {
        try {
            const items = await db.table(TABLE_NAME).toArray();
            setData(items);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }, []);

    // Automatically load data on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    return { saveData, data, loadData };
}