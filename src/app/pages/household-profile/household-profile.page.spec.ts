import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdProfilePage } from './household-profile.page';

describe('HouseholdProfilePage', () => {
  let component: HouseholdProfilePage;
  let fixture: ComponentFixture<HouseholdProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseholdProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
