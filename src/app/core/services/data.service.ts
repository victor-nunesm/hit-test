import { Injectable } from '@angular/core'
import { Team } from '@core/models'
import { ApiService } from '@core/services'
import { TeamStateService } from '@store/team'
import { map, take } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private state: TeamStateService, private api: ApiService) {}

  getAll() {
    return this.api.get<Team[]>('assets/json/backend-classification.json').pipe(
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
