import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageLoanEditPage } from './mortgage-loan-edit.page';

describe('MortgageLoanEditPage', () => {
  let component: MortgageLoanEditPage;
  let fixture: ComponentFixture<MortgageLoanEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortgageLoanEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageLoanEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
