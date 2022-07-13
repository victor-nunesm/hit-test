import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@core/services'
import { CoreStateService } from '@store/core'
import { Observable, switchMap, take } from 'rxjs'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private coreState: CoreStateService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.coreState.getCore().pipe(
      take(1),
      switchMap(({ authenticatedUser: user }) => {
        let token = `Bearer ${this.authService.authenticatedUserValue?.token}`

        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: token,
            },
          })
        }
        return next.handle(request)
      })
    )
  }
}
