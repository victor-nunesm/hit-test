import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { map, Observable, throwError } from 'rxjs'
import { BasePagination } from '..'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  datesToBeNormalizedInPayload = [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'cancelledAt',
    'vehicleOilChange',
    'bornDate',
    'start',
    'end',
  ]
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: HttpParams, url: 'v1' | 'v2' = 'v1'): Observable<T> {
    const extras = { params: params }
    if (params) extras['observe'] = 'response'
    return this.http
      .get(`${url === 'v1' ? environment.apiUrl : environment.apiUrl}${path}`, { ...extras })
      .pipe(map((res: any) => this.normalizeISODateFromPayloadResponse(res, this.datesToBeNormalizedInPayload))) as any
  }

  put<T>(path: string, body: Object = {}, url: 'v1' | 'v2' = 'v1'): Observable<T> {
    return this.http.put(
      `${url === 'v1' ? environment.apiUrl : environment.apiUrl}${path}`,
      body
    ) as any as Observable<T>
  }

  post<T>(path: string, body: Object = {}, url: 'v1' | 'v2' = 'v1'): Observable<T> {
    return this.http.post(
      `${url === 'v1' ? environment.apiUrl : environment.apiUrl}${path}`,
      body
    ) as any as Observable<T>
  }

  delete(path: string, url: 'v1' | 'v2' = 'v1'): Observable<any> {
    return this.http.delete(`${url === 'v1' ? environment.apiUrl : environment.apiUrl}${path}`)
  }

  generateHttpParams(pagination: BasePagination): HttpParams {
    let params = new HttpParams()
    if (pagination) {
      if (pagination.pageIndex) params = params.append('pageNumber', `${pagination.pageIndex}`)
      if (pagination.pageSize) params = params.append('pageSize', `${pagination.pageSize}`)
      if (pagination.sortField) params = params.append('sortField', `${pagination.sortField}`)
      if (pagination.search) params = params.append('search', `${pagination.search}`)
      if (pagination.sortOrder) params = params.append('sortOrder', `${pagination.sortOrder}`)

      if (pagination.filters) {
        pagination.filters.forEach((filter) => {
          filter.value.forEach((value) => {
            params = params.append(filter.key, value)
          })
        })
      }
    } else {
      params = params.append('pageNumber', `1`)
      params = params.append('pageSize', `5`)
    }
    return params
  }

  private normalizeISODateFromPayloadResponse(data: any, params: string[]): any {
    ;(data?.body || data || []).forEach((item) => {
      params.forEach((param) => {
        if (item[param] && item[param][(item[param] as any).length - 1] != 'Z') {
          item[param] += 'Z'
        }
      })
    })
    return data
  }

  private formatErrors(error: any) {
    return throwError(() => new Error(error))
  }
}
