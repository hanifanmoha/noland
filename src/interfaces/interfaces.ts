import { FieldType } from "@/utils/enums"

export interface IField {
  isRoot?: boolean
  name: string
  key: string
  type: FieldType
  children?: IField[]
}