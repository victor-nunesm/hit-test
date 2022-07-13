import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { Team } from '../models'
import { DataService } from '../services'

@Injectable({
  providedIn: 'root',
})
export class JsonDataResolver implements Resolve<Team[]> {
  constructor(private service: DataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> {
    return this.service.getAll()
  }
}
