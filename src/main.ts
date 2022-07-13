import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppState } from '@store/app.state'
import { default as localForage, getAllDataFromLocalForage } from 'ngrx-store-persist'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
  bootstrap()
} else {
  const persist = localStorage.getItem('persist')
  if (persist === 'true') {
    getAllDataFromLocalForage({
      driver: localForage.INDEXEDDB,
      keys: Object.keys(new AppState()),
    }).then(() => {
      bootstrap()
    })
  } else {
    bootstrap()
  }
}

function bootstrap() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err))
}
