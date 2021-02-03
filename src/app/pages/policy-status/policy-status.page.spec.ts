import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyStatusPage } from './policy-status.page';

describe('PolicyStatusPage', () => {
  let component: PolicyStatusPage;
  let fixture: ComponentFixture<PolicyStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
