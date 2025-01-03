import { v4 as uuid } from 'uuid';

import { IAPIMock, IField } from '@/interfaces/interfaces'
import { FieldType } from '@/utils/enums'
import { FIELD_ROOT_NAME } from './consts'

export const exampleEmptyField: IField = {
    isRoot: true,
    name: FIELD_ROOT_NAME,
    type: FieldType.OBJECT,
    key: uuid(),
    children: [],
}

export const exampleAPIList: IAPIMock[] = [
    {
        id: '',
        path: 'orders',
        method: 'GET',
        field: {
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
                        valueType: 'id.uuidv4',
                    },
                },
                {
                    key: uuid(),
                    name: 'order_date',
                    type: FieldType.VALUE,
                    config: {
                        valueType: 'chance.date',
                    },
                },
                {
                    key: uuid(),
                    name: 'tax_percentage',
                    type: FieldType.VALUE,
                    config: {
                        valueType: 'static.number',
                        staticValue: {
                            number: 0.01,
                        },
                    },
                },
                {
                    key: uuid(),
                    name: 'company_code',
                    type: FieldType.VALUE,
                    config: {
                        valueType: 'static.string',
                        staticValue: {
                            string: 'CXT',
                        },
                    },
                },
                {
                    key: uuid(),
                    name: 'is_valid',
                    type: FieldType.VALUE,
                    config: {
                        valueType: 'static.boolean',
                        staticValue: {
                            boolean: true,
                        },
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
                                valueType: 'id.uuidv4',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'customer_name',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'chance.name',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'customer_email',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'chance.email',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'customer_address',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'chance.address',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'order_location',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'chance.coordinates',
                            },
                        },
                    ],
                },
                {
                    key: uuid(),
                    name: 'order_details',
                    type: FieldType.ARRAY,
                    config: {
                        minLength: 1,
                        maxLength: 3,
                    },
                    children: [
                        {
                            key: uuid(),
                            name: 'product_id',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'id.uuidv4',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'product_name',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'fakerjs.commerce.product',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'product_color',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'fakerjs.color.human',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'vendor',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'fakerjs.company.name',
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
                                valueType: 'chance.email',
                            },
                        },
                        {
                            key: uuid(),
                            name: 'created_at',
                            type: FieldType.VALUE,
                            config: {
                                valueType: 'chance.timestamp',
                            },
                        },
                    ],
                },
            ],
        }
    },
    {
        id: '',
        path: 'user',
        method: 'POST',
        field: {
            isRoot: true,
            name: FIELD_ROOT_NAME,
            type: FieldType.OBJECT,
            key: uuid(),
            children: [
                {
                    key: uuid(),
                    name: 'message',
                    type: FieldType.VALUE,
                    config: {
                        valueType: 'static.string',
                        staticValue: {
                            string: 'User created!',
                        },
                    },
                },
                {
                    key: uuid(),
                    name: 'user_id',
                    type: FieldType.VALUE,
                    config: {
                        valueType: 'id.uuidv4',
                    },
                },
            ],
        }
    }
]

export const defaultFields = exampleEmptyField