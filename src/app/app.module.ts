import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ErrorInterceptor } from '@core/interceptors/http-error-interceptor'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule, JwtInterceptor } from './core'

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule.forRoot()],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
