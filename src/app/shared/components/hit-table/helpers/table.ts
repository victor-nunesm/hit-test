import { NbMenuItem } from '@nebular/theme'

export function assignMenuActionId(TABLE_ACTIONS: Record<string, NbMenuItem>) {
  return Object.keys(TABLE_ACTIONS)
    .map((key) => TABLE_ACTIONS[key])
    .map((item, i, src) => {
      if (item.data) item.data = { ...item.data, id: i + 1 }
      else item.data = { id: i + 1 }
      return item
    })
}
