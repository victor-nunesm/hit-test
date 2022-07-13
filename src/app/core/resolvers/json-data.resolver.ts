import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { TableData } from '../models'
import { DataService } from '../services'

@Injectable({
  providedIn: 'root',
})
export class JsonDataResolver implements Resolve<TableData[]> {
  constructor(private service: DataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TableData[]> {
    return this.service.getAll()
  }
}
