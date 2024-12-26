import { IField } from "@/interfaces/interfaces"

export const encodeFieldTree = (rootField: IField): string => {
    const str = JSON.stringify(rootField)
    return Buffer.from(str).toString('base64')
}

export const decodeFieldTree = (base64String: string): IField => {
    const str = Buffer.from(base64String, 'base64').toString('utf-8')
    return JSON.parse(str)
}