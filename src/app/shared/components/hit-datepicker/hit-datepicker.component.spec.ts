import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HitDatepickerComponent } from './Hit-datepicker.component'

describe('HitDatepickerComponent', () => {
  let component: HitDatepickerComponent
  let fixture: ComponentFixture<HitDatepickerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HitDatepickerComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HitDatepickerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
