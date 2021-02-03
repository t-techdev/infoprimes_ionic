import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgHouseholdComponent } from './svg-household.component';

describe('SvgHouseholdComponent', () => {
  let component: SvgHouseholdComponent;
  let fixture: ComponentFixture<SvgHouseholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgHouseholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
