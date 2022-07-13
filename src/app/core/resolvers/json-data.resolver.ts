import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { TeamStateService } from '@store/team'
import { Observable, of, switchMap, take, tap } from 'rxjs'
import { Team } from '../models'
import { DataService } from '../services'

@Injectable({
  providedIn: 'root',
})
export class JsonDataResolver implements Resolve<Team[]> {
  constructor(private service: DataService, private state: TeamStateService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> {
    return this.state.getAll().pipe(
      take(1),
      switchMap((teams) => {
        if (!teams || teams.length === 0) {
          return this.service.getAll().pipe(tap((_teams) => this.state.upsertMany(_teams)))
        }

        return of(teams)
      })
    )
  }
}
