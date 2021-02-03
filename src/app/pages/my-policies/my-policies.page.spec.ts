import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPoliciesPage } from './my-policies.page';

describe('MyPoliciesPage', () => {
  let component: MyPoliciesPage;
  let fixture: ComponentFixture<MyPoliciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPoliciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPoliciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
