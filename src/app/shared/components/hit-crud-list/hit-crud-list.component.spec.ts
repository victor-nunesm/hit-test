import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HitCrudListComponent } from './v4u-crud-list.component'

describe('HitCrudListComponent', () => {
  let component: HitCrudListComponent
  let fixture: ComponentFixture<HitCrudListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HitCrudListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HitCrudListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
