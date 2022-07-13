import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule, registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import localePt from '@angular/common/locales/pt'
import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { getBRPaginatorIntl } from '@core/material'
import { environment } from '@environments/environment'
import { LayoutModule } from '@layout/layout.module'
import { NbDateFnsDateModule } from '@nebular/date-fns'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
    NbDatepickerModule,
    NbDialogModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbThemeModule,
    NbToastrModule,
    NbWindowModule
} from '@nebular/theme'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { effects, metaReducers, reducers } from '@store/app.state'
import { ptBR } from 'date-fns/locale'
import { NgChartsModule } from 'ng2-charts'
import { storageSyncMetaReducer } from 'ngrx-store-persist'
import { IConfig, NgxMaskModule } from 'ngx-mask'

registerLocaleData(localePt)

const maskConfigFunction: () => Partial<IConfig> = () => ({
  validation: false,
})

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'hit-theme' }),
    NbWindowModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      format: 'dd/MM/yyyy',
      formatOptions: {
        locale: ptBR,
      },
      parseOptions: {
        locale: ptBR,
      },
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    StoreModule.forRoot(reducers, { metaReducers: [storageSyncMetaReducer, ...metaReducers] }),
    EffectsModule.forRoot(effects),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        }),
    NgxMaskModule.forRoot(maskConfigFunction),
    LayoutModule,
    NgChartsModule,
    PortalModule,
    OverlayModule,
  ],
  exports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    LayoutModule,
    NbToastrModule,
    NbDateFnsDateModule,
    NgChartsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useValue: getBRPaginatorIntl() },
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
    }
  }
}
