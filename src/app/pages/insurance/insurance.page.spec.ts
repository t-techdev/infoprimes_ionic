import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePage } from './insurance.page';

describe('InsurancePage', () => {
  let component: InsurancePage;
  let fixture: ComponentFixture<InsurancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
