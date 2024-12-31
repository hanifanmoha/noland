import { IAPIStorage } from '@/interfaces/interfaces';
import Dexie, { Table } from 'dexie';
import { useCallback, useState, useEffect } from 'react';

// Create Dexie instance and define schema

// Extend Dexie and define the table type
class NolandDB extends Dexie {
    nolandapis!: Table<IAPIStorage>; // Strongly type the table

    constructor() {
        super('nolanddb');
        this.version(1).stores({
            nolandapis: 'id, datastring', // Define schema: 'id' is the primary key
        });
    }
}

const db = new NolandDB();

// Custom Hook
export function useAPIStorage() {
    const [data, setData] = useState<IAPIStorage[]>([]); // To hold the list of items

    // Save data to IndexedDB
    const saveData = useCallback(
        async (item: IAPIStorage) => {
            const { id } = item;
            try {
                const existingItem = await db.nolandapis.get(id);

                if (existingItem) {
                    await db.nolandapis.update(id, item);
                    console.log('Data updated successfully:', item);
                } else {
                    await db.nolandapis.add(item);
                    console.log('Data saved successfully:', item);
                }
            } catch (error) {
                console.error('Error saving data:', error);
            }
        },
        []
    );

    // Load data from IndexedDB
    const loadData = useCallback(async () => {
        try {
            const items = await db.nolandapis.toArray(); // Typed retrieval
            setData(items);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }, []);

    // Automatically load data on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    return { data, saveData, loadData };
}
