import { NgModule } from '@angular/core'
import { AccessNestedPropertyOfObjectPipe } from './pipes/access-nested-property-of-object.pipe'

@NgModule({
  declarations: [AccessNestedPropertyOfObjectPipe],
  exports: [AccessNestedPropertyOfObjectPipe],
})
export class SharedModule {}
