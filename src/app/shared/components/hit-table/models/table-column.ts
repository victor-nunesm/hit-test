export class TableColumn {
  key: string
  columnName: string
  pipe?: {
    type: 'date' | 'currency' | 'ngx-mask' | 'boolean'
    mask: string
    applyIf?: (value: any) => boolean
  }

  constructor(
    key: string,
    columnName: string,
    pipe?: { type: 'date' | 'currency' | 'ngx-mask'; mask: string; applyIf: (value: any) => boolean }
  ) {
    this.key = key
    this.columnName = columnName
    this.pipe = pipe
  }
}
