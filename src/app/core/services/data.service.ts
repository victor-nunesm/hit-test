import { Injectable } from '@angular/core'
import { TableData } from '@core/models'
import { ApiService } from '@core/services'
import { TableStateService } from '@store/table'
import { map, take } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private state: TableStateService, private api: ApiService) {}

  getAll() {
    return this.api.get<TableData[]>('assets/json/backend-classification.json').pipe(
      take(1),
      map((data) => {
        const _data = data.map((x) => ({
          ...x,
          id: x.time.time_id,
        }))
        this.state.upsertMany(data)
        return _data
      })
    )
  }
}
