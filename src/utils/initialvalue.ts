import { uuid } from 'uuidv4'

import { IField } from '@/interfaces/interfaces'
import { FieldType, ValueType } from '@/utils/enums'
import { FIELD_ROOT_NAME } from './consts'

export const exampleUserOrders: IField = {
    isRoot: true,
    name: FIELD_ROOT_NAME,
    type: FieldType.OBJECT,
    key: uuid(),
    children: [
        {
            key: uuid(),
            name: 'customer_id',
            type: FieldType.VALUE,
            config: {
                valueType: ValueType['ID - UUIDV4'],
            },
        },
        {
            key: uuid(),
            name: 'customer_name',
            type: FieldType.VALUE,
            config: {
                valueType: ValueType['Person - Name'],
            },
        },
        {
            key: uuid(),
            name: 'customer_email',
            type: FieldType.VALUE,
            config: {
                valueType: ValueType['Web - Email'],
            },
        },
        {
            key: uuid(),
            name: 'orders',
            type: FieldType.ARRAY,
            children: [
                {
                    key: uuid(),
                    name: 'order_id',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['ID - UUIDV4'],
                    },
                },
                {
                    key: uuid(),
                    name: 'order_date',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['Time - Date'],
                    },
                },
                {
                    key: uuid(),
                    name: 'order_details',
                    type: FieldType.ARRAY,
                    children: [
                        {
                            key: uuid(),
                            name: 'product_id',
                            type: FieldType.VALUE,
                            config: {
                                valueType: ValueType['ID - UUIDV4'],
                            },
                        },
                        {
                            key: uuid(),
                            name: 'product_name',
                            type: FieldType.VALUE,
                            config: {
                                valueType: ValueType['Text - Word'],
                            },
                        },
                    ],
                },
                {
                    key: uuid(),
                    name: 'meta',
                    type: FieldType.OBJECT,
                    children: [
                        {
                            key: uuid(),
                            name: 'created_by',
                            type: FieldType.VALUE,
                            config: {
                                valueType: ValueType['Web - Email'],
                            },
                        },
                        {
                            key: uuid(),
                            name: 'created_at',
                            type: FieldType.VALUE,
                            config: {
                                valueType: ValueType['Time - Date'],
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

export const exampleOrderList: IField = {
    isRoot: true,
    name: FIELD_ROOT_NAME,
    type: FieldType.ARRAY,
    key: uuid(),
    config: {
        minLength: 5,
        maxLength: 5,
    },
    children: [
        {
            key: uuid(),
            name: 'order_id',
            type: FieldType.VALUE,
            config: {
                valueType: ValueType['ID - UUIDV4'],
            },
        },
        {
            key: uuid(),
            name: 'order_date',
            type: FieldType.VALUE,
            config: {
                valueType: ValueType['Time - Date'],
            },
        },
        {
            key: uuid(),
            name: 'customer',
            type: FieldType.OBJECT,
            children: [
                {
                    key: uuid(),
                    name: 'customer_id',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['ID - UUIDV4'],
                    },
                },
                {
                    key: uuid(),
                    name: 'customer_name',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['Person - Name'],
                    },
                },
                {
                    key: uuid(),
                    name: 'customer_email',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['Web - Email'],
                    },
                },
            ],
        },
        {
            key: uuid(),
            name: 'order_details',
            type: FieldType.ARRAY,
            children: [
                {
                    key: uuid(),
                    name: 'product_id',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['ID - UUIDV4'],
                    },
                },
                {
                    key: uuid(),
                    name: 'product_name',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['Text - Word'],
                    },
                },
            ],
        },
        {
            key: uuid(),
            name: 'meta',
            type: FieldType.OBJECT,
            children: [
                {
                    key: uuid(),
                    name: 'created_by',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['Web - Email'],
                    },
                },
                {
                    key: uuid(),
                    name: 'created_at',
                    type: FieldType.VALUE,
                    config: {
                        valueType: ValueType['Time - Date'],
                    },
                },
            ],
        },
    ],
}